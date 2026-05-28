import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../repositories/user.repository";
import { generateAccessToken } from "../utils/generateToken";
import { LoginInput } from "../types/auth.types";

export const registerUserService = async (data: any) => {
  const existingEmail = await findUserByEmail(data.email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingUsername = await findUserByUsername(data.username);

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });
  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });
  return {
  user: {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  },
  accessToken,
};
};

export const loginUserService = async (data: LoginInput) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  return {
  user: {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  },
  accessToken,
};
};