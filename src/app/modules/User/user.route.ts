import express from 'express';
import { getSuggestedUsers } from './user.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from './user.constant';

const router = express.Router();


router.get('/get-suggested-users', AuthMiddleware(UserRole.user), getSuggestedUsers)


export const UserRoutes = router;
