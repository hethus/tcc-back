import express from 'express';
import { getEnums } from '../controllers/public';

const router = express.Router();

router.get('/enums', getEnums);

export default router;
