import { Request, Response } from "express";

import { addWishlistSchema } from "../validations/wishlist.validation";

import {
  addToWishlistService,
  getWishlistService,
  removeWishlistService,
} from "../services/wishlist.service";

export const addToWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } =
      addWishlistSchema.parse(req.body);

    const userId = req.user?.userId as string;

    const wishlist =
      await addToWishlistService(
        userId,
        productId
      );

    return res.status(201).json({
      success: true,
      data: wishlist,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId as string;

    const wishlist =
      await getWishlistService(userId);

    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId as string;

    const { productId } = req.params as { productId: string };

    await removeWishlistService(
      userId,
      productId
    );

    return res.status(200).json({
      success: true,
      message:
        "Product removed from wishlist",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};