import { z } from "zod";


export const registerUserSchema = z.object({
    fullName: z.string({
        required_error: "Full Name is required"
    }),
    email: z.string().email(),
    country: z.string({
        required_error: "Country is required"
    }),
    university: z.string({
        required_error: "University is required"
    }),
    profession: z.string({
        required_error: "Profession is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, 'Password must be 6 characters long')
        .trim()
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string({
        required_error: "Password is required"
    }).min(6, 'Password must be 6 characters long')
        .trim()
})


export const forgotPassVerifyEmailSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email().trim()
})


export const forgotPassVerifyOtpSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email().trim(),
    otp: z.string({
        required_error: "Otp is required"
    }).min(4, 'otp must be 4 characters long')
    .max(4, 'otp must be 4 characters long')
        .trim()
})