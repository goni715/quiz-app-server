import { Types } from "mongoose";


export interface IQuizAnswer {
    gameSessionId: Types.ObjectId;
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
}

