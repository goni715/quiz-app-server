import { z } from "zod";


export const registerUserSchema = z.object({
  fullName: z.string({
    required_error: "Full Name is required",
  }),
  email: z.string().email(),
  country: z.string({
    required_error: "Country is required",
  }),
  university: z.string({
    required_error: "University is required",
  }),
  profession: z.string({
    required_error: "Profession is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password minimum 6 characters long")
    .trim(),
  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({ message: "{VALUE} is not supported" }),
    })
    .default("user"),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password minimum 6 characters long")
    .trim(),
});


export const forgotPassSendOtpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .trim(),
});


export const forgotPassVerifyOtpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .trim(),
  otp: z
    .string({
      required_error: "Otp is required",
    })
    .min(4, "otp must be 4 characters long")
    .max(4, "otp must be 4 characters long")
    .trim(),
});


export const forgotPassCreateNewPassSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .trim(),
  otp: z
    .string({
      required_error: "Otp is required",
    })
    .min(4, "otp must be 4 characters long")
    .max(4, "otp must be 4 characters long")
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password minimum 6 characters long")
    .trim(),
});



export const changePasswordSchema = z.object({
  currentPassword: z
    .string({
      required_error: "Current Password is required",
    })
    .min(6, "CurrePassword minimum 6 characters long")
    .trim(),
    newPassword: z
    .string({
      required_error: "New Password is required",
    })
    .min(6, "New Password minimum 6 characters long")
    .trim()
});
