import userModel from "../../models/userModel.js";

import { registerSchema } from "../../utils/validate.js";
import { hashPassword } from "../../utils/bcrypt.js";

export default async (request, reply) => {
  // * is validation
  const { error, value } = registerSchema(request.t).validate(request.body, {
    abortEarly: false,
  });
  // * is error
  if (error)
    return reply
      .status(400)
      .send({ error: error.details.map((err) => err.message) });
  // * process
  try {
    // * log
    request.log.debug("Received registration request");
    request.log.debug(
      { username: value.username, email: value.contact.email },
      "User registration data"
    );
    // * email and username find
    const userExist = value?.username
      ? await userModel.findOne({ username: value.username })
      : false;
    const emailExist = value.contact?.email
      ? await userModel.findOne({ "contact.email": value.contact.email })
      : false;
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
    // * create pasword hash
    const hashedPassword = await hashPassword({ password: value.password });
    // * create user
    const user = new userModel({
      username: value.username,
      password: hashedPassword,
      contact: {
        email: value.contact.email,
        phone: value.contact.phone,
      },
      details: {
        firstName: value.details.firstName,
        lastName: value.details.lastName,
        birthdate: value.details.birthdate,
        country: value.details.country,
        language: value.details.language,
        translationLanguage: value.details.translationLanguage,
      },
    });
    // * save user
    await user.save();
    // * log
    request.log.debug("User successfully registered in the database");
    request.log.info(
      { username: value.username },
      "User registration successful"
    );
    // * return data;
    return reply.status(201).send({
      message: [request.t("auth.register.success")],
    });
  } catch (err) {
    // * log
    request.log.error(
      { error: err.message, stack: err.stack },
      "User registration failed"
    );
    // * result mesage
    return reply
      .status(500)
      .send({ error: [request.t("pageError.registerHandler")] });
  }
};
