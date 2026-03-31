import * as z from "zod";



export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("*Please enter your password")
      .min(8, "*Password must be at least 8 characters")
      .regex(/[A-Z]/, "*Must contain one uppercase letter")
      .regex(/[a-z]/, "*Must contain one lowercase letter")
      .regex(/[#?!@$%^&*-]/, "*Must contain one special character")
      .regex(/[0-9]/, "*Must contain one number"),
    rePassword: z.string().nonempty("*Please confirm your password"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.rePassword ? true : false;
    },
    {
      message: "*Passwords do not match",
      path: ["rePassword"],
    },
  );
