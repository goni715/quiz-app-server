import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { forgotPassVerifyEmailSchema } from './auth.validation';

const router = express.Router();


router.post('/forgot-pass-verify-email', validateRequest(forgotPassVerifyEmailSchema), )