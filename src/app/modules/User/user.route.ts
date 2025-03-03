import express from 'express';
import { registerUser } from './user.controller';

const router = express.Router();


router.get('/register-user', registerUser);


export const UserRoutes = router;
