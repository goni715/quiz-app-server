
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createFriendGameSession, createRandomGameSession, getMyGameSessions, updateSessionStatus } from './gameSession.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createGameSessionSchema, updateSessionStatusSchema } from './gameSession.validation';



const router = express.Router();

router.post('/create-friend-game-session', AuthMiddleware(UserRole.user), validateRequest(createGameSessionSchema), createFriendGameSession);
router.post('/create-random-game-session', AuthMiddleware(UserRole.user), validateRequest(createGameSessionSchema), createRandomGameSession);
router.put('/update-session-status/:gameSessionId', AuthMiddleware(UserRole.user), validateRequest(updateSessionStatusSchema), updateSessionStatus);

router.get('/get-my-game-sessions/:status', AuthMiddleware(UserRole.user), getMyGameSessions);



export const GameSessionRoutes = router;
