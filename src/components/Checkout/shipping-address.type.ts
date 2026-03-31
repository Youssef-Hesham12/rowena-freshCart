import { shippingAddressSchema } from "@/schema/shippingAddress.schema";
import z from "zod";

export type ShippingAddressDataType = z.infer<typeof shippingAddressSchema>;