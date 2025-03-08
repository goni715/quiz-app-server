
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { makeFriend } from './friend.controller';


const router = express.Router();

router.post('/make-friend', AuthMiddleware(UserRole.user),  makeFriend);





export const FriendRoutes = router;
