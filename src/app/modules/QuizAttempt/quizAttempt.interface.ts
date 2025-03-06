import { Types } from "mongoose";


export interface IQuizAttempt {
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
}