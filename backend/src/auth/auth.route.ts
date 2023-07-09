import { findAll, login, findOne, updateOne, removeOne, register } from "./auth.controller"
import { Router } from 'express';

const router = Router();

router.get('/', findAll);
router.post('/login', login);
router.post("/register", register)
router.post('/:id', findOne);
router.put('/:id', updateOne);
router.delete('/:id', removeOne);

export default router;