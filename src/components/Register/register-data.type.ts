import { registerSchema } from "@/schema/register.schema";
import z from "zod";

export type RegisterDataType = z.infer<typeof registerSchema>;
