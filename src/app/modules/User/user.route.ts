import express from 'express';
import { registerUser } from './user.controller';

const router = express.Router();


router.post('regoster-user', registerUser);



export default router;