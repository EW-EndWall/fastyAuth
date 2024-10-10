import userModel from "../../models/userModel.js";
import { resetPasswordUpdateSchema } from "../../utils/validate.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { sendResetPasswordUpdateEmail } from "../../utils/nodeMailler.js";

export default async (request, reply) => {
  // * is validation
  const { error, value } = resetPasswordUpdateSchema(request.t).validate(
    request.body,
    {
      abortEarly: false,
    }
  );
  // * is error
  if (error)
    return reply
      .status(400)
      .send({ error: error.details.map((err) => err.message) });
  // * process
  try {
    const user = await userModel
      .findOne({
        $or: [
          { "contact.email": value.email },
          { "contact.phone": value.phone },
        ].filter(Boolean),
      })
      .select({
        "+password": true,
        "+contact.email": true,
        "+contact.phone": true,
        "+verify.verifyCode.emailCode": true,
        "+verify.verifyCode.phoneCode": true,
      });
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * log
    request.log.debug(
      { userId: user.id },
      "Reset password update request received"
    );
    request.log.debug({ value }, "Reset password data to be updated");
    // * check verify
    if (
      user.verify.verifyCode.emailCode[1][0] == value.verifyCode && // * is code match
      user.verify.verifyCode?.emailCode[1][1] > Date.now() // * check code time
    ) {
      user.verify.verifyCode.emailCode[1][1] = Date.now();
      // ? bug fix - For the problem of not detecting changes when adding data of array type
      user.markModified("verify.verifyCode.emailCode");
    } else if (
      user.verify.verifyCode.phoneCode[1][0] == value.verifyCode && // * is code match
      user.verify.verifyCode?.phoneCode[1][1] > Date.now() // * check code time
    ) {
      user.verify.verifyCode.phoneCode[1][1] = Date.now();
      // ? bug fix - For the problem of not detecting changes when adding data of array type
      user.markModified("verify.verifyCode.phoneCode");
    } else
      return reply
        .status(400)
        .send({ error: [request.t("auth.resetPasswordUpdate.fail")] });
    // * add data
    user.password = await hashPassword({ password: value.password });
    // * save data to db
    await user.save();
    // * log
    request.log.debug("Reset password successfully updated in the database");
    request.log.info({ userId: user.id }, "Reset password successfully");
    // * Email sending process
    await sendResetPasswordUpdateEmail(request, user.contact.email);
    // * result mesage
    return reply
      .status(200)
      .send({ message: [request.t("auth.resetPasswordUpdate.success")] });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Reset password failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.resetPasswordUpdateHandler")] });
  }
};
