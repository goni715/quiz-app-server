import express from 'express';
import { createQuestion, deleteQuestion, getAllQuestion } from './question.controller';

const router = express.Router();

router.post('/create-question', createQuestion);
router.get('/get-all-question', getAllQuestion);
router.delete('/delete-question/:questionId', deleteQuestion);



export const QuestionRoutes = router;
