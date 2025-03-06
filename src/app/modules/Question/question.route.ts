import express from 'express';
import { createQuestion, deleteQuestion, getAllQuestion } from './question.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';

const router = express.Router();

router.post('/create-question', AuthMiddleware(UserRole.admin), createQuestion);
router.get('/get-all-question', getAllQuestion);
router.delete('/delete-question/:questionId', deleteQuestion);



export const QuestionRoutes = router;
