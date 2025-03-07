
import { Schema, model } from "mongoose";
import { IFriendRequest } from "./friendRequest.interface";



const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequestModel = model<IFriendRequest>("FriendRequest", friendRequestSchema);
export default FriendRequestModel;
