import { z } from "zod";


export const addToReviewSchema = z.object({
    quizId: z.string({
        required_error: "quizId is required"
    }),
})