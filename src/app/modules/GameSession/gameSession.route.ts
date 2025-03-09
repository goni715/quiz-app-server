
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createGameSession } from './gameSession.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createGameSessionSchema } from './gameSession.validation';



const router = express.Router();

router.post('/create-game-session', AuthMiddleware(UserRole.user), validateRequest(createGameSessionSchema), createGameSession);



export const GameSessionRoutes = router;
