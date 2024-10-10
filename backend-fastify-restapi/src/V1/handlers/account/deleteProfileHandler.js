import userModel from "../../models/userModel.js";
import { deleteSchema } from "../../utils/validate.js";
import { verifyPassword } from "../../utils/bcrypt.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = deleteSchema(request.t).validate(request.body, {
    abortEarly: false,
  });
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
    request.log.debug({ userId: user.id }, "Account deletion request received");
    // * is password match
    await verifyPassword({
      request,
      reply,
      password: value.password,
      hash: user.password,
    });
    // * Delete user if password is correct
    await userModel.findByIdAndDelete(token.id);
    // * log
    request.log.debug("User account successfully deleted from the database");
    request.log.info({ userId: token.id }, "User account deleted");
    // * result mesage
    return reply
      .status(200)
      .send({ message: [request.t("account.delete.success")] });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Account deletion failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.deleteProfileHandler")] });
  }
};
