import {
  createWishlistItem,
  findWishlistItem,
  getWishlistItems,
  removeWishlistItem,
} from "../repositories/wishlist.repository";

export const addToWishlistService = async (
  userId: string,
  productId: string
) => {
  const existing = await findWishlistItem(
    userId,
    productId
  );

  if (existing) {
    throw new Error(
      "Product already exists in wishlist"
    );
  }

  return createWishlistItem(
    userId,
    productId
  );
};

export const getWishlistService = async (
  userId: string
) => {
  return getWishlistItems(userId);
};

export const removeWishlistService = async (
  userId: string,
  productId: string
) => {
  return removeWishlistItem(
    userId,
    productId
  );
};