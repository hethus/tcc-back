import express from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/user';
import { isAllowed, isAllowedOrIsMe } from '../../lib/authLib';
import enums from '../../lib/enumLib';

const { userType } = enums;

const router = express.Router();

router.post(
  '/:type',
  isAllowed([userType.admin.value, userType.teacher.value]),
  createUser
);
router.put('/:type/:id', isAllowedOrIsMe(userType.admin.value), updateUser);
router.delete(
  '/:type/:id',
  isAllowed([userType.admin.value, userType.teacher.value]),
  deleteUser
);

export default router;
