import Wishlist from "../models/wishlist.model";

export const findWishlistItem = async (userId: string, productId: string) => {
  return Wishlist.findOne({
    userId,
    productId,
  });
};

export const createWishlistItem = async (userId: string, productId: string) => {
  return Wishlist.create({
    userId,
    productId,
  });
};

export const getWishlistItems = async (userId: string) => {
  return Wishlist.find({
    userId,
  }).populate(
    "productId",
    "name slug price discountPrice images averageRating",
  );
};

export const removeWishlistItem = async (userId: string, productId: string) => {
  return Wishlist.findOneAndDelete({
    userId,
    productId,
  });
};
