import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { changePasswordSchema, forgotPassCreateNewPassSchema, forgotPassSendOtpSchema, forgotPassVerifyOtpSchema, loginUserSchema, registerUserSchema } from './auth.validation';
import { changePassword, forgotPassCreateNewPass, forgotPassSendOtp, forgotPassVerifyOtp, loginAdmin, loginUser, registerUser } from './auth.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';

const router = express.Router();

router.post('/register-user', validateRequest(registerUserSchema), registerUser);
router.post('/login-user', validateRequest(loginUserSchema), loginUser);
router.post('/login-admin', validateRequest(loginUserSchema), loginAdmin);

//firgot-password
router.post('/forgot-pass-send-otp', validateRequest(forgotPassSendOtpSchema), forgotPassSendOtp);
router.post('/forgot-pass-verify-otp', validateRequest(forgotPassVerifyOtpSchema), forgotPassVerifyOtp);
router.post('/forgot-pass-create-new-pass', validateRequest(forgotPassCreateNewPassSchema), forgotPassCreateNewPass);

router.put('/change-password', AuthMiddleware(UserRole.admin, UserRole.user), validateRequest(changePasswordSchema), changePassword);




export const AuthRoutes = router;
