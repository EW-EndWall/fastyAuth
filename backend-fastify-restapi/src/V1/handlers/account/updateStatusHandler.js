import userModel from "../../models/userModel.js";
import { updateAccountStatusSchema } from "../../utils/validate.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = updateAccountStatusSchema(request.t).validate(
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
    const user = await userModel.findById(token.id);
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * log
    request.log.debug(
      { userId: user.id },
      "User account status update request received"
    );
    request.log.debug({ value }, "User account status data to be updated");
    // * add data
    user.status.accountStatus = value.accountStatus;
    // * save data to db
    await user.save();
    // * log
    request.log.debug(
      "User account status successfully updated in the database"
    );
    request.log.info({ userId: user.id }, "User account status updated");
    // * result mesage
    return reply.status(200).send({
      message: [request.t("account.accountStatus.success")],
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "User account status update failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.updateStatusHandler")] });
  }
};
