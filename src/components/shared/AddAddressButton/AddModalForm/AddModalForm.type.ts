import { addAddressSchema } from "@/schema/addAddress.schema";
import z from "zod";

export type AddAddressDataType = z.infer<typeof addAddressSchema>;