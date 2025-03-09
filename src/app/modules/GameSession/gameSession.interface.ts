import { Types } from "mongoose";


export interface IGameSession {
    players: Types.ObjectId[];
    quiz: Types.ObjectId;
}
