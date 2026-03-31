import { userPasswordsSchema } from "@/schema/userPasswords.schema";
import z from "zod";

export type UserPasswordsDataType = z.infer<typeof userPasswordsSchema>;
