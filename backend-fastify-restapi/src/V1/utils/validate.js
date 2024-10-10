import Joi from "joi";
import { userValidationSchema } from "./../schemas/userValidation.js";

// * Login Schema
const loginSchema = (t) =>
  Joi.object({
    username: userValidationSchema(t).username,
    email: userValidationSchema(t).email,
    phone: userValidationSchema(t).phone,
    password: userValidationSchema(t).password.required(),
    rememberMe: userValidationSchema(t).rememberMe,
  }).or("username", "email", "phone");

// * Register Schema
const registerSchema = (t) =>
  Joi.object({
    username: userValidationSchema(t).username.required(),
    password: userValidationSchema(t).newPassword.required(),
    contact: {
      email: userValidationSchema(t).email.required(),
      phone: userValidationSchema(t).phone.required(),
    },
    details: {
      firstName: userValidationSchema(t).firstName.required(),
      lastName: userValidationSchema(t).lastName.required(),
      birthdate: userValidationSchema(t).birthdate.required(),
      country: userValidationSchema(t).country.required(),
      language: userValidationSchema(t).language.required(),
      translationLanguage:
        userValidationSchema(t).translationLanguage.required(),
    },
  });

// * Delete Schema
const deleteSchema = (t) =>
  Joi.object({
    password: userValidationSchema(t).password.required(),
  });

// * Update Schema
const updateProfileSchema = (t) =>
  Joi.object({
    username: userValidationSchema(t).username.optional(),
    contact: {
      email: userValidationSchema(t).email.optional(),
      phone: userValidationSchema(t).phone.optional(),
    },
    details: {
      firstName: userValidationSchema(t).firstName.optional(),
      lastName: userValidationSchema(t).lastName.optional(),
      birthdate: userValidationSchema(t).birthdate.optional(),
      country: userValidationSchema(t).country.optional(),
      language: userValidationSchema(t).language.optional(),
      translationLanguage:
        userValidationSchema(t).translationLanguage.optional(),
    },
  });

const updatePasswordSchema = (t) =>
  Joi.object({
    password: userValidationSchema(t).password.required(),
    newPassword: userValidationSchema(t).newPassword.required(),
  });

const updateAccountStatusSchema = (t) =>
  Joi.object({
    accountStatus: userValidationSchema(t).status.accountStatus.required(),
  });

const updateSystemStatusSchema = (t) =>
  Joi.object({
    systemStatus: userValidationSchema(t).status.systemStatus.required(),
  });

// * verify Schema
const verificationTypeSchema = (t) =>
  Joi.object({
    verificationType:
      userValidationSchema(t).verify.verificationType.required(),
  });

const verifyCodeSchema = (t) =>
  Joi.object({
    verifyCode: userValidationSchema(t).verify.verifyCode.required(),
  });

// * Reset Schema
const resetPasswordSchema = (t) =>
  Joi.object({
    email: userValidationSchema(t).email,
    phone: userValidationSchema(t).phone,
  }).or("email", "phone");

const resetPasswordUpdateSchema = (t) =>
  Joi.object({
    email: userValidationSchema(t).email,
    phone: userValidationSchema(t).phone,
    verifyCode: userValidationSchema(t).verify.verifyCode.required(),
    password: userValidationSchema(t).newPassword.required(),
  }).or("email", "phone");

export {
  loginSchema,
  registerSchema,
  deleteSchema,
  updateProfileSchema,
  updatePasswordSchema,
  updateAccountStatusSchema,
  updateSystemStatusSchema,
  verificationTypeSchema,
  verifyCodeSchema,
  resetPasswordSchema,
  resetPasswordUpdateSchema,
};
