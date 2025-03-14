
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { acceptRandomPlayer, createRandomSession, getRandomSessions, removeRandomPlayer } from './randomSession.controller';

const router = express.Router();

router.post('/create-random-session', AuthMiddleware(UserRole.user), createRandomSession);
router.get('/get-random-sessions', AuthMiddleware(UserRole.user), getRandomSessions);
router.put('/accept-random-player/:gameSessionId', AuthMiddleware(UserRole.user), acceptRandomPlayer);
router.put('/remove-random-player/:gameSessionId', AuthMiddleware(UserRole.user), removeRandomPlayer);




export const RandomSessionRoutes = router;
