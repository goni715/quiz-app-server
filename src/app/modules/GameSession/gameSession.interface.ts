import { Types } from "mongoose";

export type TSessionStatus = 'pending' | 'accepted' | 'rejected';

export interface IGameSession {
    players: Types.ObjectId[];
    quizzes: Types.ObjectId[];
    receiverId: Types.ObjectId,
    status: TSessionStatus
}
