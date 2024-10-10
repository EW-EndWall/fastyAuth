import userModel from "../../models/userModel.js";
import { verificationTypeSchema } from "../../utils/validate.js";
import { verificationCode } from "../../utils/utilityFunctions.js";
import { sendVerificationEmail } from "../../utils/nodeMailler.js";
import { sendVerificationPhone } from "../../utils/smsSend.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = verificationTypeSchema(request.t).validate(
    request.query,
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
    const user = await userModel.findById(token.id).select({
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
      "Create verify code request received"
    );
    request.log.debug({ value }, "Create verify code data to be updated");
    // * create verify code
    const createVerificationCode = verificationCode();
    // * send verify code
    if (
      value.verificationType == "email" && // * is verify email
      user.verify.verificationType.emailVerified == false // * is not verified
    ) {
      if (
        !user.verify.verifyCode?.emailCode?.[0]?.[1] || // * if emailCode[1] doesn't exist, assume true
        user.verify.verifyCode.emailCode[0][1] < Date.now() // * check code time if it exists
      ) {
        // * add data
        user.verify.verifyCode.emailCode[0] = [
          createVerificationCode,
          Date.now() + Number(process.env.VERIFY_TIMEOUT),
        ];
        // ? bug fix - For the problem of not detecting changes when adding data of array type
        user.markModified("verify.verifyCode.emailCode");
        // * Email sending process
        await sendVerificationEmail(
          request,
          user.contact.email,
          createVerificationCode
        );
      } else {
        return reply.status(200).send({
          message: [request.t("account.verify.send")],
        });
      }
    } else if (
      value.verificationType == "phone" && // * is verify phone
      user.verify.verificationType.phoneVerified == false // * is not verified
    ) {
      if (
        !user.verify.verifyCode?.phoneCode?.[0]?.[1] || // * if phoneCode[1] doesn't exist, assume true
        user.verify.verifyCode.phoneCode[0][1] < Date.now() // * check code time if it exists
      ) {
        // * add data
        user.verify.verifyCode.phoneCode[0] = [
          createVerificationCode,
          Date.now() + Number(process.env.VERIFY_TIMEOUT),
        ];
        // ? bug fix - For the problem of not detecting changes when adding data of array type
        user.markModified("verify.verifyCode.phoneCode");
        // * SMS sending process
        await sendVerificationPhone(
          request,
          user.contact.phone,
          createVerificationCode
        );
      } else {
        return reply.status(200).send({
          message: [request.t("account.verify.send")],
        });
      }
    } else
      return reply
        .status(400)
        .send({ error: [request.t("account.verify.fail")] });
    // * save data to db
    await user.save();
    // * log
    request.log.debug(
      "Create verify code successfully updated in the database"
    );
    request.log.info({ userId: user.id }, "Create verify code successfully");
    // * result mesage
    return reply.status(200).send({
      message: [request.t("account.verify.send")],
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Create verify code failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.verifyHandler")] });
  }
};
