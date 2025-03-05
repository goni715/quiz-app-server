import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { forgotPassVerifyEmailSchema, forgotPassVerifyOtpSchema, loginUserSchema, registerUserSchema } from './auth.validation';
import { forgotPassVerifyEmail, forgotPassVerifyOtp, loginUser, registerUser } from './auth.controller';

const router = express.Router();

router.post('/register-user', validateRequest(registerUserSchema), registerUser);
router.post('/login-user', validateRequest(loginUserSchema), loginUser);
//firgot-password
router.post('/forgot-pass-verify-email', validateRequest(forgotPassVerifyEmailSchema), forgotPassVerifyEmail);
router.post('/forgot-pass-verify-otp', validateRequest(forgotPassVerifyOtpSchema), forgotPassVerifyOtp);


export const AuthRoutes = router;
