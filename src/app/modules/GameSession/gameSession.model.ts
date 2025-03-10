import { model, Schema } from "mongoose";
import { IGameSession } from "./gameSession.interface";


const gameSessionSchema = new Schema<IGameSession>(
    {
      players: [
        { type: Schema.Types.ObjectId, ref: "User", required: true }
    ], // Two players
      quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true }, // Quiz being played
     
    },
    { 
      timestamps: true,
      versionKey: false
    }
  );


  const GameSessionModel = model<IGameSession>('GameSession', gameSessionSchema);
  export default GameSessionModel;