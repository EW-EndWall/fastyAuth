import userModel from "../../models/userModel.js";
import { updateProfileSchema } from "../../utils/validate.js";
import { deepMerge } from "../../utils/utilityFunctions.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * is validation
  const { error, value } = updateProfileSchema(request.t).validate(
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
    // * update data to db
    const user = await userModel.findById(token.id);
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * email and username find
    const userExist = value?.username
      ? await userModel.findOne({ username: value.username })
      : false;
    const emailExist = value.contact?.email
      ? await userModel.findOne({ "contact.email": value.contact.email })
      : false;
    // * log
    request.log.debug({ userId: user.id }, "Profile update request received");
    request.log.debug({ value }, "Profile data to be updated");
    // * username unique
    if (userExist)
      return reply
        .status(400)
        .send({ error: [request.t("auth.register.userExist")] });
    // * email unique
    if (emailExist)
      return reply
        .status(400)
        .send({ error: [request.t("auth.register.emailExist")] });
    // * Attach sent data to user

    deepMerge(user, value);
    // * Save data to db
    await user.save();
    // * log
    request.log.debug("Profile data successfully updated in the database");
    request.log.info({ userId: user.id }, "User profile updated");
    // * result mesage
    return reply
      .status(200)
      .send({ message: [request.t("account.update.success")] });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Profile update failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.updateProfileHandler")] });
  }
};
