import { Request, Response } from "express";

import {
  addToCartSchema,
  updateCartSchema,
} from "../validations/cart.validation";

import {
  addToCartService,
  getCartService,
  updateCartService,
  removeCartItemService,
} from "../services/cart.service";

interface CartParams {
  cartId: string;
}
export const addToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      addToCartSchema.parse(req.body);

    const userId =
      req.user?.userId as string;

    const cart =
      await addToCartService(
        userId,
        data
      );

    return res.status(201).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      req.user?.userId as string;

    const cart =
      await getCartService(userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCart = async (
  req: Request<CartParams>,
  res: Response
) => {
  try {
    const { quantity } =
      updateCartSchema.parse(req.body);

    const updated =
      await updateCartService(
        req.params.cartId,
        quantity
      );

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem = async (
  req: Request<CartParams>,
  res: Response
) => {
  try {
    await removeCartItemService(
      req.params.cartId
    );

    return res.status(200).json({
      success: true,
      message:
        "Item removed from cart",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};