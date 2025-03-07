import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { QuizRoutes } from '../modules/Quiz/quiz.route';
import { SummaryRoutes } from '../modules/Summary/summary.route';

const router = express.Router();


const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/quiz',
        route: QuizRoutes
    },
    {
        path: '/summary',
        route: SummaryRoutes
    }
]

moduleRoutes.forEach((item, i)=> router.use(item.path, item.route));

export default router;