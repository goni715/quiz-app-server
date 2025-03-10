import { model, Schema } from "mongoose";
import { IGameSession } from "./gameSession.interface";


const gameSessionSchema = new Schema<IGameSession>(
  {
    players: [{ type: Schema.Types.ObjectId, ref: "User", required: true }], // Two players
    quizzes: [{
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    }],
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


  const GameSessionModel = model<IGameSession>('GameSession', gameSessionSchema);
  export default GameSessionModel;