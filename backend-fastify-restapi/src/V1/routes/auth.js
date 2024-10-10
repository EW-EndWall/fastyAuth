import loginHandler from "../handlers/auth/loginHandler.js";
import registerHandler from "../handlers/auth/registerHandler.js";
import resetPasswordHandler from "./../handlers/auth/resetPasswordHandler.js";
import resetPasswordUpdateHandler from "../handlers/auth/resetPasswordUpdateHandler.js";

const defaultResponse = {
  200: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      message: { type: "array" },
    },
  },
  201: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      message: { type: "array" },
    },
  },
  400: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      error: { type: "array" },
    },
  },
  401: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      error: { type: "array" },
    },
  },
  404: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      error: { type: "array" },
    },
  },
  500: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      error: { type: "array" },
    },
  },
};

const authRoutes = async (fastify, options) => {
  // * users login
  fastify.post(
    "/login",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          properties: {},
        },
        body: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          oneOf: [
            { required: ["username"] },
            { required: ["email"] },
            { required: ["phone"] },
          ],
          required: ["password"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            password: { type: "string" },
            rememberMe: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
          200: {
            type: "object",
            additionalProperties: false, // * Prevents excess data from being returned
            properties: {
              message: { type: "array" },
              token: { type: "string" },
              username: { type: "string" },
              // * sub properties
              details: {
                type: "object",
                additionalProperties: false, // * Prevents excess data from being returned
                properties: {
                  language: { type: "string" },
                  translationLanguage: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    loginHandler
  );

  // * users register
  fastify.post(
    "/register",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          properties: {},
        },
        body: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
            // * sub properties
            contact: {
              type: "object",
              additionalProperties: false, // * Prevents excess data from being returned
              required: ["email", "phone"],
              properties: {
                email: { type: "string" },
                phone: { type: "string" },
              },
            },
            // * sub properties
            details: {
              type: "object",
              additionalProperties: false, // * Prevents excess data from being returned
              required: [
                "firstName",
                "lastName",
                "birthdate",
                "country",
                "language",
                "translationLanguage",
              ],
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                birthdate: { type: "string", format: "date" },
                country: { type: "string" },
                language: { type: "string" },
                translationLanguage: { type: "string" },
              },
            },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    registerHandler
  );

  // * password reset get token - email or phone
  fastify.post(
    "/reset-password",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          properties: {},
        },
        body: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          oneOf: [{ required: ["email"] }, { required: ["phone"] }],
          properties: {
            email: { type: "string" },
            phone: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    resetPasswordHandler
  );

  // * reset password
  fastify.post(
    "/reset-password-update",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          properties: {},
        },
        body: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          oneOf: [{ required: ["email"] }, { required: ["phone"] }],
          required: ["verifyCode", "password"],
          properties: {
            email: { type: "string" },
            phone: { type: "string" },
            verifyCode: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    resetPasswordUpdateHandler
  );
};

export default authRoutes;
