import express from 'express'
import { getUserById } from '../controllers/user.controller';

const router = express.Router();

router.get('/:userId', getUserById)

export default router