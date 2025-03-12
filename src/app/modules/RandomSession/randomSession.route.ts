
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createRandomSession, getRandomSessions } from './randomSession.controller';

const router = express.Router();

router.post('/create-random-session', AuthMiddleware(UserRole.user), createRandomSession);
router.get('/get-random-sessions', AuthMiddleware(UserRole.user), getRandomSessions);




export const RandomSessionRoutes = router;
