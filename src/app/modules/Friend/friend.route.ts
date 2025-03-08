
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { makeFriend } from './friend.controller';
import validateRequest from '../../middlewares/validateRequest';
import { makeFriendSchema } from './friend.validation';


const router = express.Router();

router.post('/make-friend', AuthMiddleware(UserRole.user), validateRequest(makeFriendSchema),  makeFriend);





export const FriendRoutes = router;
