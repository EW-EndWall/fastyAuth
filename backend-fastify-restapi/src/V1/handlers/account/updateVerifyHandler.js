import userModel from "../../models/userModel.js";
import { verifyCodeSchema } from "../../utils/validate.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = verifyCodeSchema(request.t).validate(request.body, {
    abortEarly: false,
  });
  // * is error
  if (error)
    return reply
      .status(400)
      .send({ error: error.details.map((err) => err.message) });
  // * process
  try {
    const user = await userModel.findById(token.id).select({
      "+verify.verifyCode.emailCode": true,
      "+verify.verifyCode.phoneCode": true,
    });
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * log
    request.log.debug({ userId: user.id }, "Verify update request received");
    request.log.debug({ value }, "Verify data to be updated");
    // * check verify
    if (
      user.verify.verificationType.emailVerified == false && // * is not verified
      user.verify.verifyCode.emailCode[0][0] == value.verifyCode && // * is code match
      user.verify.verifyCode?.emailCode[0][1] > Date.now() // * check code time
    ) {
      user.verify.verificationType.emailVerified = true;
      user.verify.verifyCode.emailCode[0][1] = Date.now();
      // ? bug fix - For the problem of not detecting changes when adding data of array type
      user.markModified("verify.verifyCode.emailCode");
    } else if (
      user.verify.verificationType.phoneVerified == false && // * is not verified
      user.verify.verifyCode.phoneCode[0][0] == value.verifyCode && // * is code match
      user.verify.verifyCode?.phoneCode[0][1] > Date.now() // * check code time
    ) {
      user.verify.verificationType.phoneVerified = true;
      user.verify.verifyCode.phoneCode[0][1] = Date.now();
      // ? bug fix - For the problem of not detecting changes when adding data of array type
      user.markModified("verify.verifyCode.phoneCode");
    } else
      return reply
        .status(400)
        .send({ error: [request.t("account.verify.fail")] });
    // * save data to db
    await user.save();
    // * log
    request.log.debug("Verify successfully updated in the database");
    request.log.info({ userId: user.id, value }, "Verify successfully");
    // * result mesage
    return reply.status(200).send({
      message: [request.t("account.verify.success")],
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Verify failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.updateVerifyHandler")] });
  }
};
