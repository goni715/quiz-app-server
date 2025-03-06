import express from 'express';
import { createQuiz, deleteQuiz, getAllQuiz, getSingleQuiz } from './quiz.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { createQuizSchema } from './quiz.validation';

const router = express.Router();

router.post('/create-quiz', AuthMiddleware(UserRole.admin), validateRequest(createQuizSchema), createQuiz);
router.get('/get-all-quiz', getAllQuiz);
router.delete('/delete-quiz/:quizId', AuthMiddleware(UserRole.admin), deleteQuiz);
router.get('/get-single-quiz/:quizId', getSingleQuiz);



export const QuizRoutes = router;
