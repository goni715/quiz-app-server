import { Types } from "mongoose";
import { string } from "zod";


export interface IFriend {
    friends: Types.ObjectId[];
}

export type TFriendQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  "friendDetails.country"?: string,
  "friendDetails.university"?: string,
  "friendDetails.profession"?: string;
};