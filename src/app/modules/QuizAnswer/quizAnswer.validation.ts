import { z } from "zod";

export const submitQuizAnswerSchema = z.object({
  friendId: z
    .string({
      required_error: "friendId is required",
    })
    .trim(),
  quizId: z
    .string({
      required_error: "friendId is required",
    })
    .trim(),
  selectedOption: z
    .string({
      required_error: "seletedOption is required",
    })
    .trim(),
  xp: z.number({ required_error: "xp is required" })
});