import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const saltRounds = 10;

// * Password hash
const hashPassword = async ({ password }) =>
  await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));

// * Password compare
const comparePassword = async ({ password, hash }) =>
  await bcrypt.compare(password, hash);

// * Verify password
const verifyPassword = async ({ request, reply, password, hash }) => {
  // * is password match
  const isMatch = await comparePassword({
    password: await password,
    hash: await hash,
  });
  // * not password match
  if (!isMatch)
    return reply
      .status(400)
      .send({ error: [request.t("auth.login.invalidCredentials")] });
};

// * Create token
const createToken = async ({ userId, rememberMe }) =>
  await jwt.sign(
    { id: userId, rememberMe: rememberMe },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIME,
    }
  );

// * Verify token and check its expiration
const verifytoken = async (request, reply) => {
  try {
    request.userToken = jwt.verify(
      await request.headers["authorization"].replace(/^Bearer\s+/, ""),
      process.env.JWT_SECRET
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // * Parse old token and check rememberMe
      const expiredToken = jwt.decode(
        await request.headers["authorization"].replace(/^Bearer\s+/, "")
      );
      if (expiredToken?.rememberMe) {
        // * Token renewal process
        const newToken = await createToken({
          userId: expiredToken.id,
          rememberMe: true, // * RememberMe is a long-term token because it is active
        });
        // * Reply back with new token
        return reply.status(200).send({
          newToken: newToken,
        });
      }
    }
    // console.log({ tokenError: error }); // * debug
    return reply
      .status(401)
      .send({ error: [request.t("account.profile.invalidToken")] });
  }
};

export {
  hashPassword,
  comparePassword,
  verifyPassword,
  createToken,
  verifytoken,
};
