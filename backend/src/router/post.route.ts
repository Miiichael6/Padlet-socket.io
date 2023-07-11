import {
  findAll,
  create,
  findOne,
  updateOne,
  removeOne,
} from "../controllers/post.controller";
import { Router } from "express";
import checkAuth from "../middlewares/checkAuth.middleware";

const router = Router();

router.get("/", findAll);
router.post("/", create);
router.get("/:id", findOne);
router.put("/:id", updateOne);
router.delete("/:id", [checkAuth ],removeOne);

export default router;
