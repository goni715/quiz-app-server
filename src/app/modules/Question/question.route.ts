import express from 'express';
import { createQuestion, deleteQuestion, getAllQuestion, getSingleQuestion } from './question.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { createQuestionSchema } from './question.validation';

const router = express.Router();

router.post('/create-question', AuthMiddleware(UserRole.admin), validateRequest(createQuestionSchema), createQuestion);
router.get('/get-all-question', getAllQuestion);
router.delete('/delete-question/:questionId', AuthMiddleware(UserRole.admin), deleteQuestion);
router.get('/get-single-question/:questionId', getSingleQuestion);



export const QuestionRoutes = router;
