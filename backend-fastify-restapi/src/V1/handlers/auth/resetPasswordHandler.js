import userModel from "../../models/userModel.js";

import { resetPasswordSchema } from "../../utils/validate.js";
import { verificationCode } from "../../utils/utilityFunctions.js";
import { sendResetPasswordEmail } from "../../utils/nodeMailler.js";
import { sendResetPasswordPhone } from "../../utils/smsSend.js";

export default async (request, reply) => {
  // * is validation
  const { error, value } = resetPasswordSchema(request.t).validate(
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
      "Create reset password code request received"
    );
    request.log.debug(
      { value },
      "Create reset password code data to be updated"
    );
    // * create verify code
    const createVerificationCode = verificationCode();
    if (value.email) {
      if (
        !user.verify.verifyCode?.emailCode?.[1]?.[1] || // * if emailCode[1] doesn't exist, assume true
        user.verify.verifyCode.emailCode[1][1] < Date.now() // * check code time if it exists
      ) {
        // * add data
        user.verify.verifyCode.emailCode[1] = [
          createVerificationCode,
          Date.now() + Number(process.env.VERIFY_TIMEOUT),
        ];
        // ? bug fix - For the problem of not detecting changes when adding data of array type
        user.markModified("verify.verifyCode.emailCode");
        // * Email sending process
        await sendResetPasswordEmail(
          request,
          user.contact.email,
          createVerificationCode
        );
      } else {
        return reply.status(200).send({
          message: [request.t("auth.resetPassword.success")],
        });
      }
    } else if (value.phone) {
      if (
        !user.verify.verifyCode?.phoneCode?.[1]?.[1] || // * if phoneCode[1] doesn't exist, assume true
        user.verify.verifyCode.phoneCode[1][1] < Date.now() // * check code time if it exists
      ) {
        // * add data
        user.verify.verifyCode.phoneCode[1] = [
          createVerificationCode,
          Date.now() + Number(process.env.VERIFY_TIMEOUT),
        ];
        // ? bug fix - For the problem of not detecting changes when adding data of array type
        user.markModified("verify.verifyCode.phoneCode");
        // * SMS sending process
        await sendResetPasswordPhone(
          request,
          user.contact.phone,
          createVerificationCode
        );
      } else {
        return reply.status(200).send({
          message: [request.t("auth.resetPassword.success")],
        });
      }
    } else
      return reply
        .status(400)
        .send({ error: [request.t("auth.resetPassword.fail")] });
    // * save data to db
    await user.save();
    // * log
    request.log.debug(
      "Create reset password code successfully updated in the database"
    );
    request.log.info(
      { userId: user.id },
      "Create reset password code successfully"
    );
    // * return data;
    return reply
      .status(200)
      .send({ message: [request.t("auth.resetPassword.success")] });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Create reset password code failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.resetPasswordHandler")] });
  }
};
