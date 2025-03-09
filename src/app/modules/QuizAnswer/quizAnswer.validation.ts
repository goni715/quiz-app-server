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
});