import z from "zod";
import { loginSchema } from "../validations/auth.validation";

export type LoginInput = z.infer<typeof loginSchema>;