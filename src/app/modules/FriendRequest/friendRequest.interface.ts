import { Types } from "mongoose";


export interface IFriendRequest {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    status: "pending" | "accepted" | "rejected" | "cancelled";
}