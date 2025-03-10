import { Types } from "mongoose";


export interface IGameSession {
    players: Types.ObjectId[];
    quizzes: Types.ObjectId[];
    receiverId: Types.ObjectId,
    status: 'pending' | 'accepted' | 'rejected'
}
