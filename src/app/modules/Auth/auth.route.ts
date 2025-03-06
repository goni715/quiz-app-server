import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { forgotPassCreateNewPassSchema, forgotPassSendOtpSchema, forgotPassVerifyOtpSchema, loginUserSchema, registerUserSchema } from './auth.validation';
import { forgotPassCreateNewPass, forgotPassSendOtp, forgotPassVerifyOtp, loginUser, registerUser } from './auth.controller';

const router = express.Router();

router.post('/register-user', validateRequest(registerUserSchema), registerUser);
router.post('/login-user', validateRequest(loginUserSchema), loginUser);
//firgot-password
router.post('/forgot-pass-send-otp', validateRequest(forgotPassSendOtpSchema), forgotPassSendOtp);
router.post('/forgot-pass-verify-otp', validateRequest(forgotPassVerifyOtpSchema), forgotPassVerifyOtp);
router.post('/forgot-pass-create-new-pass', validateRequest(forgotPassCreateNewPassSchema), forgotPassCreateNewPass);


export const AuthRoutes = router;
