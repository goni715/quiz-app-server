
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { addToReview } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { addToReviewSchema } from './review.validation';

const router = express.Router();

router.post('/add-to-review', AuthMiddleware(UserRole.user), validateRequest(addToReviewSchema), addToReview);


export const ReviewRoutes = router;
