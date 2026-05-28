import User from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ username });
};

export const createUser = async (data: any) => {
  return User.create(data);
};