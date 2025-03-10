import { model, Schema } from "mongoose";
import { IQuiz } from "./quiz.interface";


const quizSchema = new Schema<IQuiz>(
  {
    quiz: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options: string[]) {
          return options.length >= 2; // Ensure at least two options
        },
        message: "There must be at least two options.",
      },
    },
    answer: {
      type: String,
      required: true,
      validate: {
        validator: function (answer: string) {
          return this.options.includes(answer);
        },
        message: "Answer must be one of the provided options.",
      },
    },
    explanation: {
      type: String,
      required: true
    },
    readingTime: {
      type: Number,
      required: true
    },
    point: {
      type: Number,
      required: true
    },
    condition: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



const QuizModel = model<IQuiz>('Quiz', quizSchema);
export default QuizModel;