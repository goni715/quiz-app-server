import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";



const reviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
        trim: true
    },
    intervalTimes: { type: [Number], default: [24, 48, 72, 144, 288, 576] }, // 6 intervals in hours
    lastReviewed: { type: Date, default: Date.now },
    nextReview: { type: Date, default: function () { return new Date(Date.now() + 24 * 60 * 60 * 1000); } }, // Next review 24h later
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
})


const ReviewModel = model('ReviewMode', reviewSchema);
export default ReviewModel;


