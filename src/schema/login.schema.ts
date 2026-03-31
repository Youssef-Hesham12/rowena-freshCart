import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").nonempty("*Email is required"),
  password: z
    .string()
    .nonempty("*Password is required")
    .min(8, "*Password must be at least 8 characters"),
});