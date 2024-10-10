// * import dependence
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

import { connectDB } from "./V1/config/db.js";
import routes from "./routes/index.js";

import pino from "pino";

dotenv.config();
const fastify = await Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    stream:
      process.env.LOG_LOCATION === "console"
        ? process.stdout
        : pino.destination(process.env.LOG_LOCATION),
  },
});
const API_URL = process.env.API_URL || 3000;
const API_PORT = process.env.API_PORT || 3000;

// * CORS configuration
fastify.register(fastifyCors, {
  origin: true, // * This accepts requests from all backgrounds.
  // origin: ["http://localhost"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // * Accepted HTTP methods
  ignoreTrailingSlash: true,
});

connectDB(fastify);

// * router
fastify.register(routes);

fastify.listen({ host: API_URL, port: API_PORT }, (error, address) => {
  if (error) {
    fastify.log.error({ error: error.message, stack: error.stack });
    console.error(error);
    process.exit(1);
  }
  fastify.log.info(`Server running on ${address}`);
});
