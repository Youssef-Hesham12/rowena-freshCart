import * as z from "zod";

export const shippingAddressSchema = z.object({
  details: z
    .string()
    .nonempty("*Address details is required")
    .min(5, "Address details must be at least 5 characters"),

  phone: z
    .string()
    .nonempty("*Phone number is required")
    .regex(
      /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
      "Please enter a valid Egyptian phone number",
    ),

  city: z
    .string()
    .nonempty("*City name is required")
    .min(3, "City name must be at least 3 characters"),

  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5}$/, "Postal code must be 5 digits")
    .optional(),
    
  paymentMethod: z.enum(["cash", "card"], {
    error: "*Payment method is required",
  }),
});
