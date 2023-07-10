import { NextFunction, Response, Request } from "express";
import { User as UserRepository } from "../entities";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// interface User {
//   id: string;
// }

export interface AuthRequest extends Request {
  user?: UserRepository;
}

const getUserFromToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string };

    // Aquí iría la lógica para buscar el usuario en la base de datos o en algún otro sistema de almacenamiento
    const user = await UserRepository.findOne({
      where: { id: decodedToken.id },
      select: [
        "id",
        "email",
        "firstname",
        "createdAt",
        "updatedAt",
        "lastname",
        "roles",
      ],
    });

    return user;
  } catch (err) {
    return null;
  }
};

// verificar usuario
const checkAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Token doesn't exist" });
  }

  const user = await getUserFromToken(token);

  if (!user) {
    return res.status(400).json({ error: "user does not exist, sorry" });
  }

  req.user = user;

  next();
};

export default checkAuth;
