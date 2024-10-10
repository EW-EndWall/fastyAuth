import userModel from "../../models/userModel.js";
import { updatePasswordSchema } from "../../utils/validate.js";
import { hashPassword, verifyPassword } from "../../utils/bcrypt.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = updatePasswordSchema(request.t).validate(
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
    const user = await userModel.findById(token.id).select("+password");
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * log
    request.log.debug({ userId: user.id }, "Password update request received");
    request.log.debug({ value }, "User password data to be updated");
    // * is password match
    await verifyPassword({
      request,
      reply,
      password: value.password,
      hash: user.password,
    });
    // * add data
    user.password = await hashPassword({ password: value.newPassword });
    // * save data to db
    await user.save();
    // * log
    request.log.debug("User password successfully updated in the database");
    request.log.info({ userId: user.id }, "User password updated");
    // * result mesage
    return reply.status(200).send({
      message: [request.t("account.updatePassword.success")],
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Password update failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.updatePasswordHandler")] });
  }
};
