import { model, Schema } from "mongoose";
import { IQuestion } from "./question.interface";


const questionSchema = new Schema<IQuestion>(
  {
    question: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



const QuestionModel = model<IQuestion>('Querstion', questionSchema);
export default QuestionModel;