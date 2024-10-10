import v1Register from "./../V1/routes/index.js";

const routes = async (fastify, options) => {
  // * V1 Register route
  fastify.register(v1Register, { prefix: "/api/v1" });
};

export default routes;
