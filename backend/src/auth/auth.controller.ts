import { Request, Response } from "express";
import { User as UserRepository } from "../entities";
import bcrypt from "bcrypt";
import { handleErrors } from "../utils/handlerErrors";
import { jwtSign } from "../helpers/jwt";
import { AuthRequest } from "../middlewares/checkAuth.middleware";

export const findAll = async (req: Request, res: Response) => {
  const users = await UserRepository.find({});

  return res.send(users);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    const user = UserRepository.create({ email, firstname, lastname });

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await UserRepository.save(user);

    const token = jwtSign(user.id);

    return res.send({ created: true, token });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
      detail: error.detail,
      errorCode: error.code,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserRepository.findOneBy({ email });

    if (!user) {
      return res
        .status(404)
        .send({ message: `incorrect email or does not exist` });
    }

    const confirmPassword = bcrypt.compareSync(password, user.password);

    if (!confirmPassword) {
      return res
        .status(401)
        .send({ message: "Email or Password incorrect, please try again" });
    }

    const { token, expiresIn } = jwtSign(user.id);

    return res.send({ token, expiresIn });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
      detail: error.detail,
      errorCode: error.code,
    });
  }
};

export const profile = async (req: AuthRequest, res: Response) => {
  const { user } = req;

  return res.send(user);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserRepository.findOne({
      where: { id },
      select: [
        "id",
        "email",
        "firstname",
        "lastname",
        "roles",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `el usuario con <<${id}>> no existe` });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(handleErrors(error));
  }
};

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  res.send(`Update item by ID: id`);
};

export const removeOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userExist = await UserRepository.findOne({ where: { id: id } });

    if (!userExist) {
      return res
        .status(404)
        .send({ message: `El Usuario con Id: '${id}' no existe` });
    }

    const result = await UserRepository.delete({ id: id });

    if (result.affected === 0) {
      return res.status(201).send({
        message: `error del servidor Usuario con Id: <<${id}>> no ha sido eliminado`,
      });
    }

    return res
      .status(200)
      .send({ message: `User with id => <<${id}>> have been eliminated` });
  } catch (error: any) {
    return res.status(501).send(handleErrors(error));
  }
};
