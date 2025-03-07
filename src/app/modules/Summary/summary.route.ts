
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { getSummarty } from './summary.controller';

const router = express.Router();

router.get('/get-summary', AuthMiddleware(UserRole.admin), getSummarty);




export const SummaryRoutes = router;
