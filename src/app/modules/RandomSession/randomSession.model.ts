import { IRandomSession } from "./randomSession.interface";
import { model, Schema } from "mongoose";

const RandomSessionSchema = new Schema<IRandomSession>({
    players: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        validate: [
            (val: Schema.Types.ObjectId[]) => val.length >= 1 && val.length <= 2,
            'Players must be between 1 and 2',
        ],
        required: true,
    },
    quizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    }],
    status: {
        type: String,
        enum: ['active', 'acceptedd', 'removed'],
        required: true,
        default: 'active'
    },
}, 
{ timestamps: true, versionKey: false }
);

const RandomSessionModel = model<IRandomSession>('RandomSession', RandomSessionSchema);
export default RandomSessionModel;