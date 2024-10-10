import profileHandler from "../handlers/account/profileHandler.js";
import updateProfileHandler from "../handlers/account/updateProfileHandler.js";
import updatePasswordHandler from "../handlers/account/updatePasswordHandler.js";
import updateStatusHandler from "../handlers/account/updateStatusHandler.js";
import verifyHandler from "./../handlers/account/verifyHandler.js";
import updateVerifyHandler from "./../handlers/account/updateVerifyHandler.js";
import deleteProfileHandler from "../handlers/account/deleteProfileHandler.js";

import { verifytoken } from "../utils/bcrypt.js";

const defaultResponse = {
  200: {
    type: "object",
    additionalProperties: false, // * Prevents excess data from being returned
    properties: {
      newToken: { type: "string" }, // * is new create token
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

const accountRoutes = async (fastify, options) => {
  // * token verify
  fastify.addHook("preHandler", verifytoken);

  // * profile get data
  fastify.get(
    "/profile",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          properties: {},
        },
        response: {
          ...defaultResponse, // * default response
          200: {
            type: "object",
            additionalProperties: false, // * Prevents excess data from being returned
            properties: {
              newToken: { type: "string" }, // * is new create token
              userId: { type: "string" },
              username: { type: "string" },
              // * sub properties
              contact: {
                type: "object",
                additionalProperties: false, // * Prevents excess data from being returned
                properties: {
                  email: { type: "string" },
                  phone: { type: "string" },
                },
              },
              // * sub properties
              details: {
                type: "object",
                additionalProperties: false, // * Prevents excess data from being returned
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  birthdate: { type: "string", format: "date" },
                  country: { type: "string" },
                  language: { type: "string" },
                  translationLanguage: { type: "string" },
                },
              },
              // * sub properties
              status: {
                type: "object",
                additionalProperties: false, // * Prevents excess data from being returned
                properties: {
                  accountStatus: { type: "string" },
                  systemStatus: { type: "string" },
                },
              },
              // * sub properties
              verify: {
                type: "object",
                additionalProperties: false, // * Prevents excess data from being returned
                properties: {
                  verificationType: {
                    emailVerified: { type: "Boolean" },
                    phoneVerified: { type: "Boolean" },
                  },
                },
              },
              createdAt: { type: "string" },
            },
          },
        },
      },
    },
    profileHandler
  );

  // * profile update
  fastify.patch(
    "/profile",
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
          properties: {
            username: { type: "string" },
            // * sub properties
            contact: {
              type: "object",
              additionalProperties: false, // * Prevents excess data from being returned
              properties: {
                email: { type: "string" },
                phone: { type: "string" },
              },
            },
            // * sub properties
            details: {
              type: "object",
              additionalProperties: false, // * Prevents excess data from being returned
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
    updateProfileHandler
  );

  // * password changle
  fastify.patch(
    "/update-password",
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
          required: ["password", "newPassword"],
          properties: {
            password: { type: "string" },
            newPassword: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    updatePasswordHandler
  );

  // * status update
  fastify.patch(
    "/status",
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
          required: ["accountStatus"],
          properties: {
            accountStatus: {
              type: "string",
              enum: ["active", "passive"], // * Must be active or passive
            },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    updateStatusHandler
  );

  // * get verify code
  fastify.get(
    "/verify",
    {
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false, // * Prevents excess data from being returned
          required: ["verificationType"],
          properties: {
            verificationType: {
              type: "string",
              enum: ["email", "phone"], // * Must be email or phone
            },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    verifyHandler
  );

  // * verify update
  fastify.post(
    "/verify",
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
          required: ["verifyCode"],
          properties: {
            verifyCode: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    updateVerifyHandler
  );

  // * profile delete
  fastify.delete(
    "/profile",
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
          required: ["password"],
          properties: {
            password: { type: "string" },
          },
        },
        response: {
          ...defaultResponse, // * default response
        },
      },
    },
    deleteProfileHandler
  );
};

export default accountRoutes;
