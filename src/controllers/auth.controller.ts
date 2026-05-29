import { Request, Response } from "express";

import { loginSchema, registerSchema } from "../validations/auth.validation";
import { loginUserService, registerUserService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUserService(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  // Implement login logic here
  try{
    const validatedData = loginSchema.parse(req.body);
    const user = await loginUserService(validatedData);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};