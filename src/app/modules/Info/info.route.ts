
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createInfo } from './info.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createInfoSchema } from './info.validation';

const router = express.Router();

router.post('/create-info', AuthMiddleware(UserRole.admin), validateRequest(createInfoSchema), createInfo);




export const InfoRoutes = router;
