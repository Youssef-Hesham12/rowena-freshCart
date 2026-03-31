import { userInfoSchema } from "@/schema/userInfo.schema";
import z from "zod";

export type UserInfoDataType = z.infer<typeof userInfoSchema>;
