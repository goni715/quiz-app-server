
import { Schema, model } from "mongoose";
import { IFriend } from "./friend.interface";



const friendSchema = new Schema<IFriend>(
  {
    members: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const FriendModel = model<IFriend>("Friend", friendSchema);
export default FriendModel;
