import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("*Please enter your name").min(2,"*Name is too short").max(50,"*Name is too long"),
    email: z
      .email("*Invalid email address")
      .nonempty("*Please enter your email"),
    password: z
      .string()
      .nonempty("*Please enter your password")
      .min(8, "*Password must be at least 8 characters")
      .regex(/[A-Z]/, "*Must contain one uppercase letter")
      .regex(/[a-z]/, "*Must contain one lowercase letter")
      .regex(/[#?!@$%^&*-]/, "*Must contain one special character")
      .regex(/[0-9]/, "*Must contain one number"),
    rePassword: z.string().nonempty("*Please confirm your password"),
    phone: z
      .string()
      .nonempty("*Please enter your phone number")
      .regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "*Only Egyptian phone numbers are allowed"),
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
