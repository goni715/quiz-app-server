import { z } from "zod";


export const makeFriendSchema = z.object({
  friendId: z
    .string({
      required_error: "friendId is required",
    })
    .min(1, "friendId is required")
    .trim(),
});