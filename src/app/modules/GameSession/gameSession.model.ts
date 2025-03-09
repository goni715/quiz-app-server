import { model, Schema } from "mongoose";
import { IGameSession } from "./GameSession.interface";


const gameSessionSchema = new Schema<IGameSession>(
    {
      players: [
        { type: Schema.Types.ObjectId, ref: "User", required: true }
    ], // Two players
      quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true }, // Quiz being played
     
    },
    { timestamps: true }
  );


  const GameSessionModel = model<IGameSession>('GameSession', gameSessionSchema);
  export default GameSessionModel;