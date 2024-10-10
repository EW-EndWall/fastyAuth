import Joi from "joi";

const userValidationSchema = (t) => ({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
      "any.required": t("user.validation.username.required"),
      "string.base": t("user.validation.username.base"),
      "string.empty": t("user.validation.username.empty"),
      "string.min": t("user.validation.username.min", { limit: 3 }),
      "string.max": t("user.validation.username.max", { limit: 30 }),
    }),
  password: Joi.string().messages({
    "any.required": t("user.validation.password.required"),
    "string.base": t("user.validation.password.base"),
    "string.empty": t("user.validation.password.empty"),
  }),
  newPassword: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&., /\\\\\"'`;<>|é+()\\[\\]{}=\\-])[A-Za-z\\d@$!%*#?&., /\\\\\"'`;<>|é+()\\[\\]{}=\\-]{8,}$"
      )
    )
    .min(8)
    .messages({
      "any.required": t("user.validation.newPassword.required"),
      "string.base": t("user.validation.newPassword.base"),
      "string.empty": t("user.validation.newPassword.empty"),
      "string.min": t("user.validation.newPassword.min", { limit: 8 }),
      "string.pattern.base": t("user.validation.newPassword.pattern"),
    }),
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/, { name: "only letters" })
    .messages({
      "any.required": t("user.validation.firstName.required"),
      "string.base": t("user.validation.firstName.base"),
      "string.empty": t("user.validation.firstName.empty"),
      "string.pattern.base": t("user.validation.firstName.pattern"),
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/, { name: "only letters" })
    .messages({
      "any.required": t("user.validation.lastName.required"),
      "string.base": t("user.validation.lastName.base"),
      "string.empty": t("user.validation.lastName.empty"),
      "string.pattern.base": t("user.validation.lastName.regex"),
    }),
  email: Joi.string()
    .email()
    .messages({
      "any.required": t("user.validation.email.required"),
      "string.email": t("user.validation.email.base"),
      "string.empty": t("user.validation.email.empty"),
    }),
  birthdate: Joi.date()
    .min("1900-01-01")
    .raw()
    .messages({
      "any.required": t("user.validation.birthdate.required"),
      "date.base": t("user.validation.birthdate.base"),
      "string.empty": t("user.validation.birthdate.empty"),
      "date.min": t("user.validation.birthdate.min"),
    }),
  phone: Joi.string()
    .pattern(/^\d+$/, { name: "only number" })
    .min(8)
    .max(15)
    .messages({
      "any.required": t("user.validation.phone.required"),
      "string.base": t("user.validation.phone.base"),
      "string.empty": t("user.validation.phone.empty"),
      "string.min": t("user.validation.phone.min", { limit: 8 }),
      "string.max": t("user.validation.phone.max", { limit: 15 }),
      "string.pattern.base": t("user.validation.phone.regex"),
    }),
  country: Joi.string()
    .pattern(/^[a-zA-ZçÇğĞöÖşŞüÜıİ]+$/, { name: "only letters" })
    .messages({
      "any.required": t("user.validation.email.required"),
      "string.base": t("user.validation.country.base"),
      "string.empty": t("user.validation.country.empty"),
      "string.pattern.base": t("user.validation.phone.regex"),
    }),
  language: Joi.string()
    .pattern(/^[a-zA-ZçÇğĞöÖşŞüÜıİ_]+$/, { name: "only letters and _" })
    .min(5)
    .max(5)
    .messages({
      "any.required": t("user.validation.language.required"),
      "string.base": t("user.validation.language.base"),
      "string.empty": t("user.validation.language.empty"),
      "string.min": t("user.validation.language.min", { limit: 5 }),
      "string.max": t("user.validation.language.max", { limit: 5 }),
      "string.pattern.base": t("user.validation.language.regex"),
    }),
  translationLanguage: Joi.string()
    .pattern(/^[a-zA-ZçÇğĞöÖşŞüÜıİ_]+$/, { name: "only letters and _" })
    .min(5)
    .max(5)
    .messages({
      "any.required": t("user.validation.translationLanguage.required"),
      "string.base": t("user.validation.translationLanguage.base"),
      "string.empty": t("user.validation.translationLanguage.empty"),
      "string.min": t("user.validation.translationLanguage.min", { limit: 5 }),
      "string.max": t("user.validation.translationLanguage.max", { limit: 5 }),
      "string.pattern.base": t("user.validation.translationLanguage.regex"),
    }),
  status: {
    accountStatus: Joi.string()
      .pattern(/\b(?:active|passive)\b/, { name: "only active or passive" })
      .messages({
        "any.required": t("user.validation.status.accountStatus.required"),
        "string.base": t("user.validation.status.accountStatus.base"),
        "string.empty": t("user.validation.status.accountStatus.empty"),
        "string.pattern.base": t("user.validation.status.accountStatus.regex"),
      }),
    systemStatus: Joi.string()
      .pattern(/\b(?:active|suspended|banned|deleted)\b/, {
        name: "only active, suspended, banned or deleted",
      })
      .messages({
        "any.required": t("user.validation.status.systemStatus.required"),
        "string.base": t("user.validation.status.systemStatus.base"),
        "string.empty": t("user.validation.status.systemStatus.empty"),
        "string.pattern.base": t("user.validation.status.systemStatus.regex"),
      }),
  },
  verify: {
    verificationType: Joi.string()
      .pattern(/\b(?:email|phone)\b/, {
        name: "only active or passive",
      })
      .messages({
        "any.required": t("user.validation.verify.verificationType.required"),
        "string.base": t("user.validation.verify.verificationType.base"),
        "string.empty": t("user.validation.verify.verificationType.empty"),
        "string.pattern.base": t(
          "user.validation.verify.verificationType.regex"
        ),
      }),
    verifyCode: Joi.string()
      .min(6)
      .max(6)
      .messages({
        "any.required": t("user.validation.verify.verifyCode.required"),
        "string.base": t("user.validation.verify.verifyCode.base"),
        "string.empty": t("user.validation.verify.verifyCode.empty"),
        "string.min": t("user.validation.verify.verifyCode.min", {
          limit: 6,
        }),
        "string.max": t("user.validation.verify.verifyCode.max", {
          limit: 6,
        }),
      }),
  },
  rememberMe: Joi.boolean().messages({
    "any.required": t("user.validation.rememberMe.required"),
    "boolean.base": t("user.validation.rememberMe.base"),
    "string.empty": t("user.validation.rememberMe.empty"),
  }),
});

export { userValidationSchema };
