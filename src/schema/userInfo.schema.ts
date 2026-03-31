import * as z from "zod";

export const userInfoSchema = z.object({
  name: z
    .string()
    .nonempty("*Please enter your name")
    .min(2, "*Name is too short")
    .max(50, "*Name is too long"),
  email: z.email("*Invalid email address").nonempty("*Please enter your email"),
  phone: z
    .string()
    .nonempty("*Please enter your phone number")
    .regex(
      /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
      "*Only Egyptian phone numbers are allowed",
    ),
});
