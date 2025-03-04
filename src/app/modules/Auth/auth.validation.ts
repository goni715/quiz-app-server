import { z } from "zod";


export const forgotPassVerifyEmailSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email().trim()
})