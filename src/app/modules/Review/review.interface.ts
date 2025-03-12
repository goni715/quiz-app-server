import { Types } from "mongoose";


export interface IReview {
    userId: Types.ObjectId;
    quizId: Types.ObjectId;
    intervalTimes: number[],
    lastReviewed: Date,
    nextReview: Date,
    status: 'pending' | 'completed'
}