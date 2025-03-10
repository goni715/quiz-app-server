import { Types } from "mongoose";


export interface IQuizAnswer {
    gameSessionId: Types.ObjectId;
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
    responseTime: number; //seconds
}


export interface ISubmitAnswer {
    gameSessionId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    responseTime: number;
}


export type IType = "weekly" | "monthly";
