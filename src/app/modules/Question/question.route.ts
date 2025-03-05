import express from 'express';
import { createQuestion } from './question.controller';

const router = express.Router();

router.post('/create-question', createQuestion);


export const QuestionRoutes = router;
