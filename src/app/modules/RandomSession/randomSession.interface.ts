import { Types } from "mongoose";

export type TRandomStatus = 'active' | 'accepted' | 'removed';

export interface IRandomSession {
    players: Types.ObjectId[];
    quizzes: Types.ObjectId[];
    status: TRandomStatus
}


export type TRandomSessionQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  "player.country"?: string,
  "player.university"?: string,
  "player.profession"?: string;
};