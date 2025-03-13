import { model, Schema } from "mongoose";
import { IQuizAnswer } from "./quizAnswer.interface";

const quizAnswerSchema = new Schema<IQuizAnswer>(
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
    responseTime: {
      type: Number,
      required: true
    },
    review: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuizAnswerModel = model("QuizAnswer", quizAnswerSchema);
export default QuizAnswerModel;
