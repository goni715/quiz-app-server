
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createRandomSession } from './randomSession.controller';

const router = express.Router();

router.post('/create-random-session', AuthMiddleware(UserRole.user), createRandomSession);



export const RandomSessionRoutes = router;
