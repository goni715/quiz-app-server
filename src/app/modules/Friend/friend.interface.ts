import { Types } from "mongoose";


export interface IFriend {
    friends: Types.ObjectId[];
}

export type TFriendQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };