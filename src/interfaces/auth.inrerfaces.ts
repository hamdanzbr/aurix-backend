import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: "user" | "admin";
  isBlocked: boolean;
  isVerified: boolean;
}