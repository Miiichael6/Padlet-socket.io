import { Router } from 'express';
import AuthRouter from "../auth/auth.route"
import PostRouter from "./post.route"

const router = Router();

router.use("/auth", AuthRouter)
router.use("/posts", PostRouter)

export default router;