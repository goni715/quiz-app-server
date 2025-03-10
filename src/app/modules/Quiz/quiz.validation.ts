import { z } from "zod";

export const createQuizSchema = z
  .object({
    quiz: z
      .string({
        required_error: "Quiz is required",
      })
      .min(1, "Quiz is required")
      .trim(),
    options: z.array(z.string()).min(2, "There must be at least two options"),
    answer: z.string({
      required_error: "Answer is required",
    }),
    explanation: z.string({
      required_error: "Answer is required",
    }),
    readingTime: z
      .number({ required_error: "readingTime is required" })
      .positive("Reading time must be a positive number"),
    point: z
      .number({ required_error: "Point is required" })
      .positive("Point must be a positive number"),
    condition: z.string({
      required_error: "Condition is required",
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
