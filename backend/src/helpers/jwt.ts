import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtSign = (id: string) => {
  const jwtOptions = { expiresIn: "30d" };

  const token = jwt.sign(
    { id: id },
    process.env.JWT_SECRET_KEY as string,
    jwtOptions
  );

  return { token, expiresIn: jwtOptions.expiresIn };
};
