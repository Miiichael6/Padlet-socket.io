import { NextFunction, Response } from "express";
import { AuthRequest } from "./checkAuth.middleware";

type Roles = string[];

const checkAuthorization = (...roles: Roles) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      return res.status(403).send({
        message: `You need to be loged`,
      });
    }

    for (let i = 0; i < roles.length; i++) {
      const value = roles[i];
      if (user.roles.includes(value)) {
        next();
        return;
      }
    }

    return res.status(401).send({
      message: `You're not allowed to do that`,
    });
  };
};

export default checkAuthorization;
