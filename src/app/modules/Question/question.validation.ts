import { z } from "zod";

export const createQuestionSchema = z
  .object({
    question: z
      .string({
        required_error: "Question is required",
      })
      .min(1, "Question is required")
      .trim(),
    options: z.array(z.string()).min(2, "There must be at least two options"),
    answer: z.string({
      required_error: "Answer is required",
    }),
  })
  .superRefine((values, ctx) => {
    const { options, answer } = values;
    if (!options.includes(answer)) {
      ctx.addIssue({
        path: ["answer"],
        message: "Answer must be one of the provided options.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
