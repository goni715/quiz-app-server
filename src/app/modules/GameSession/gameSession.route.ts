
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createGameSession, getMyGameSessions } from './gameSession.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createGameSessionSchema } from './gameSession.validation';



const router = express.Router();

router.post('/create-game-session', AuthMiddleware(UserRole.user), validateRequest(createGameSessionSchema), createGameSession);
router.get('/get-my-game-sessions', AuthMiddleware(UserRole.user), getMyGameSessions);



export const GameSessionRoutes = router;
