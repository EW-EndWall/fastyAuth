import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// * Nodemailer SMTP setting (mail server on the domain)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // * Mail server address (e.g. mail.yourdomain.com)
  port: process.env.SMTP_PORT, // * Usually port 465 (SSL) or 587 (TLS) is used
  secure: process.env.SMTP_SECURE, // * If true, uses SSL, if false, uses TLS.
  auth: {
    user: process.env.SMTP_USER, // * Email address
    pass: process.env.SMTP_PASS, // * Email password
  },
});

// * Email sending function
const sendVerificationEmail = async (request, email, verificationCode) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: request.t("mail.verificationEmail.content.subject"),
    text: `${request.t(
      "mail.verificationEmail.content.text"
    )}: ${verificationCode}`,
    html: `<p>${request.t(
      "mail.verificationEmail.content.html"
    )}</p><br><p><strong>${verificationCode}</strong></p>`,
  };

  try {
    request.log.debug("Verification email request received");
    const info = await transporter.sendMail(mailOptions);
    request.log.info("Email send: %s", info.messageId);
  } catch (error) {
    request.log.error({ error: error.message, stack: error.stack });
  }
};

const sendResetPasswordEmail = async (request, email, resetCode) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: request.t("mail.resetPasswordEmail.content.subject"),
    text: `${request.t("mail.resetPasswordEmail.content.text")}: ${resetCode}`,
    html: `<p>${request.t(
      "mail.resetPasswordEmail.content.html"
    )}: <strong>${resetCode}</strong></p>`,
  };

  try {
    request.log.debug("Reset password email request received");
    const info = await transporter.sendMail(mailOptions);
    request.log.info("Email send: %s", info.messageId);
  } catch (error) {
    request.log.error({ error: error.message, stack: error.stack });
  }
};

const sendResetPasswordUpdateEmail = async (request, email) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: request.t("mail.resetPasswordUpdateEmail.content.subject"),
    text: `${request.t("mail.resetPasswordUpdateEmail.content.text")}`,
    html: `<p>${request.t("mail.resetPasswordUpdateEmail.content.html")}</p>`,
  };

  try {
    request.log.debug("Reset password update email request received");
    const info = await transporter.sendMail(mailOptions);
    request.log.info("Email send: %s", info.messageId);
  } catch (error) {
    request.log.error({ error: error.message, stack: error.stack });
  }
};

export {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendResetPasswordUpdateEmail,
};
