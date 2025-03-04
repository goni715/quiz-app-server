import express from 'express';
import { loginUser, registerUser } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginUserSchema, registerUserSchema } from './user.validation';

const router = express.Router();


router.post('/register-user', validateRequest(registerUserSchema), registerUser);
router.post('/login-user', validateRequest(loginUserSchema), loginUser);


export const UserRoutes = router;
