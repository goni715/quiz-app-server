import { z } from "zod";


export const createInfoSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .trim(),
    subTitle: z
    .string({
      required_error: "Sub Title is required",
    })
    .min(1, "Sub Title is required")
    .trim(),
    explainOne: z
    .string({
      required_error: "explainOne is required",
    })
    .min(1, "explainOne is required")
    .trim(),
    explainTwo: z
    .string({
      required_error: "explainTwo is required",
    })
    .min(1, "explainTwo is required")
    .trim()
});