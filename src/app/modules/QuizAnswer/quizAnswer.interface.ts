import { Types } from "mongoose";


export interface IQuizAnswer {
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
    responseTime: number; //seconds
    review: boolean
}


export interface ISubmitAnswer {
    quizId: Types.ObjectId;
    selectedOption: string;
    responseTime: number;
}


export type IType = "weekly" | "monthly";


export type TQuizResult = {
  userId: string;
  quizId: string;
  isCorrect: boolean;
  responseTime: number;
  timeLimit: number;
  point: number;
};

export type TPlayerXP = {
  userId: string;
  XP: number;
};

export type TQuizResults = {
  [key: string]: TQuizResult[];
};

export interface ICalculateXP {
  quizResults: TQuizResults;
  playersXP: TPlayerXP[];
}