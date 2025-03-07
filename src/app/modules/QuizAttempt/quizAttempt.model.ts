import { model, Schema } from "mongoose";
import { IQuizAttempt } from "./quizAttempt.interface";

const quizAttemptSchema = new Schema<IQuizAttempt>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuizAttemptModel = model("QuizAttempt", quizAttemptSchema);
export default QuizAttemptModel;
