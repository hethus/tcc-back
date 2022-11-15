import express from 'express';

import { getAll, getById, create, update, remove } from '../controllers/basic';

const router = express.Router({ mergeParams: true });

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
