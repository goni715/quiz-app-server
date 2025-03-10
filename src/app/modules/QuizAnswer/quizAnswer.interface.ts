import { Types } from "mongoose";


export interface IQuizAnswer {
    gameSessionId: Types.ObjectId;
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
    xp: number;
}


export interface ISubmitAnswer {
    friendId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    xp: number; 
}


export type IType = "weekly" | "monthly";
