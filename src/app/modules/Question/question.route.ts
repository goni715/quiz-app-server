import express from 'express';
import { createQuestion, deleteQuestion } from './question.controller';

const router = express.Router();

router.post('/create-question', createQuestion);
router.delete('/delete-question/:questionId', deleteQuestion);



export const QuestionRoutes = router;
