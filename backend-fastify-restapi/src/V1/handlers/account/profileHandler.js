import userModel from "../../models/userModel.js";

export default async (request, reply) => {
  // * is token check
  const token = request.userToken;
  // * process
  try {
    // * find user
    const user = await userModel.findById(token.id).select({
      userId: true,
      username: true,
      contact: {
        email: true,
        phone: true,
      },
      details: {
        firstName: true,
        lastName: true,
        birthdate: true,
        country: true,
        language: true,
        translationLanguage: true,
      },
      status: {
        accountStatus: true,
        systemStatus: true,
      },
      verify: {
        verificationType: {
          emailVerified: true,
          phoneVerified: true,
        },
      },
      createdAt: true,
    });
    // * not user find
    if (!user)
      return reply
        .status(404)
        .send({ error: [request.t("account.profile.notFound")] });
    // * log
    request.log.debug(
      { userId: user.id },
      "Account information submission request received"
    );
    request.log.info(
      { userId: token.id },
      "Account information submission successfully"
    );
    // * result mesage
    return reply.status(200).send({
      userId: user.userId,
      username: user.username,
      contact: {
        email: user.contact.email,
        phone: user.contact.phone,
      },
      details: {
        firstName: user.details.firstName,
        lastName: user.details.lastName,
        birthdate: user.details.birthdate,
        country: user.details.country,
        language: user.details.language,
        translationLanguage: user.details.translationLanguage,
      },
      status: {
        accountStatus: user.status.accountStatus,
        systemStatus: user.status.systemStatus,
      },
      verify: {
        verificationType: {
          emailVerified: user.verify.verificationType.emailVerified,
          phoneVerified: user.verify.verificationType.phoneVerified,
        },
      },
      createdAt: user.createdAt,
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack, userId: user.id },
      "Account information submission failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.profileHandler")] });
  }
};
