import express from 'express';
import { getFriends } from './user.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from './user.constant';

const router = express.Router();


router.get('/get-suggested-users', AuthMiddleware(UserRole.user), getFriends)
router.get('/get-friends', AuthMiddleware(UserRole.user), getFriends)


export const UserRoutes = router;
