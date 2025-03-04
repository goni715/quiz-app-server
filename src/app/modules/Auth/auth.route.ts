import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { forgotPassVerifyEmailSchema, loginUserSchema, registerUserSchema } from './auth.validation';
import { forgotPassVerifyEmail, loginUser, registerUser } from './auth.controller';

const router = express.Router();

router.post('/register-user', validateRequest(registerUserSchema), registerUser);
router.post('/login-user', validateRequest(loginUserSchema), loginUser);
router.post('/forgot-pass-verify-email', validateRequest(forgotPassVerifyEmailSchema), forgotPassVerifyEmail);


export const AuthRoutes = router;
