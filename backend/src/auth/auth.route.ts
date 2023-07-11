import checkAuthorization from "../middlewares/Authorization.middleware";
import checkAuth from "../middlewares/checkAuth.middleware";
import {
  findAll,
  login,
  findOne,
  updateOne,
  removeOne,
  register,
  profile,
} from "./auth.controller";
import { Router } from "express";

const router = Router();

router.get("/", findAll);
router.get(
  "/profile",
  [checkAuth, checkAuthorization("user", "admin")],
  profile
);
router.post("/login", login);
router.post("/register", register);
router.get("/:id", [checkAuth], findOne);
router.put("/:id", updateOne);
router.delete("/:id", [checkAuth, checkAuthorization("user")], removeOne);

export default router;
