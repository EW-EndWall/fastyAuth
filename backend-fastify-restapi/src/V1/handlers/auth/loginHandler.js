import userModel from "../../models/userModel.js";

import { loginSchema } from "../../utils/validate.js";
import { createToken, verifyPassword } from "../../utils/bcrypt.js";

export default async (request, reply) => {
  // * is validation
  const { error, value } = loginSchema(request.t).validate(request.body, {
    abortEarly: false,
  });
  // * is error
  if (error)
    return reply
      .status(400)
      .send({ error: error.details.map((err) => err.message) });
  try {
    // * log
    request.log.debug("Login request received");
    request.log.debug(
      { username: value.username, email: value.email, phone: value.phone },
      "Login attempt with username"
    );
    // * not user find
    const user = await userModel
      .findOne({
        $or: [
          { username: value.username },
          { "contact.email": value.email },
          { "contact.phone": value.phone },
        ].filter(Boolean),
      })
      .select({
        username: true,
        password: true,
        details: {
          language: true,
          translationLanguage: true,
        },
      });
    // * not user find
    if (!user)
      return reply
        .status(401)
        .send({ error: [request.t("auth.login.notFound")] });
    // * is password match
    await verifyPassword({
      request,
      reply,
      password: value.password,
      hash: user.password,
    });
    // * create token
    const token = await createToken({
      userId: user._id,
      rememberMe: value.rememberMe,
    });
    // * log
    request.log.debug("User credentials validated");
    request.log.info({ userId: user.id }, "User login successful");
    // * return data
    return reply.status(200).send({
      message: [request.t("auth.login.success")],
      token: token,
      username: user.username,
      details: {
        language: user.details.language,
        translationLanguage: user.details.translationLanguage,
      },
    });
  } catch (err) {
    // * log
    request.log.error({ error: err.message, stack: err.stack }, "Login failed");
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.loginHandler")] });
  }
};
