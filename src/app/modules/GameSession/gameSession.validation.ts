import { z } from "zod";


export const createGameSessionSchema = z.object({
  opponentId: z
    .string({
      required_error: "friendId is required",
    })
    .trim()
});

export const updateSessionStatusSchema = z.object({
  status: z
  .enum(["accepted", "rejected"], {
    errorMap: () => ({ message: "{VALUE} is not supported" }),
  })
});