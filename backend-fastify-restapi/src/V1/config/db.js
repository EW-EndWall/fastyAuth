import mongoose from "mongoose";

const connectDB = (fastify) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => fastify.log.info("MongoDB connected"))
    .catch((error) =>
      fastify.log.error({
        "MongoDB connection error:": {
          error: error.message,
          stack: error.stack,
        },
      })
    );
};

export { connectDB };
