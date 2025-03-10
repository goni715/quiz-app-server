
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { calculateXP, getMyQuizHistory, getQuizResults, submitQuizAnswer } from './quizAnswer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { submitQuizAnswerSchema } from './quizAnswer.validation';

const router = express.Router();

router.post('/submit-quiz-answer', AuthMiddleware(UserRole.user), submitQuizAnswer);
router.get('/get-quiz-results/:type', AuthMiddleware(UserRole.admin, UserRole.user), getQuizResults);
router.get('/get-my-quiz-history', AuthMiddleware(UserRole.user), getMyQuizHistory);
router.put('/calculate-xp/:gameSessionId', AuthMiddleware(UserRole.admin), calculateXP);



export const QuizAnswerRoutes = router;
