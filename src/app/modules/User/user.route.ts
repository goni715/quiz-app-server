import express from 'express';
import { registerUser } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { registerUserSchema } from './user.validation';

const router = express.Router();


router.post('/register-user', validateRequest(registerUserSchema), registerUser);


export const UserRoutes = router;
