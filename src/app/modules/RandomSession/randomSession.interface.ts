import { Types } from "mongoose";

export type TRandomStatus = 'active' | 'accepted' | 'removed';

export interface IRandomSession {
    players: Types.ObjectId[];
    quizzes: Types.ObjectId[];
    status: TRandomStatus
}
