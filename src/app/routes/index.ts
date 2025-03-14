import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { QuizRoutes } from '../modules/Quiz/quiz.route';
import { SummaryRoutes } from '../modules/Summary/summary.route';
import { InfoRoutes } from '../modules/Info/info.route';
import { FriendRoutes } from '../modules/Friend/friend.route';
import { GameSessionRoutes } from '../modules/GameSession/gameSession.route';
import { QuizAnswerRoutes } from '../modules/QuizAnswer/quizAnswer.route';
import { RandomSessionRoutes } from '../modules/RandomSession/randomSession.route';
import { ReviewRoutes } from '../modules/Review/review.route';

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
        path: '/quiz-answer',
        route: QuizAnswerRoutes
    },
    {
        path: '/summary',
        route: SummaryRoutes
    },
    {
        path: '/info',
        route: InfoRoutes
    },
    {
        path: '/friend',
        route: FriendRoutes
    },
    {
        path: '/game-session',
        route: GameSessionRoutes
    },
    {
        path: '/random-session',
        route: RandomSessionRoutes
    },
    {
        path: '/review',
        route: ReviewRoutes
    }
]

moduleRoutes.forEach((item, i)=> router.use(item.path, item.route));

export default router;