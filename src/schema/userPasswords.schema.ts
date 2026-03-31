import * as z from "zod";

export const userPasswordsSchema = z
  .object({
    currentPassword: z.string().nonempty("*Please enter your current password"),
    password: z
      .string()
      .nonempty("*Please enter your new password").min(6),
    rePassword: z.string().nonempty("*Please confirm your password"),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword ? true : false;
    },
    {
      message: "*Passwords do not match",
      path: ["rePassword"],
    },
  );
