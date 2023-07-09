import { findAll, create, findOne, updateOne, removeOne } from "./auth.controller"
import { Router } from 'express';

const router = Router();

router.get('/', findAll);
router.post('/', create);
router.post('/:id', findOne);
router.put('/:id', updateOne);
router.delete('/:id', removeOne);

export default router;