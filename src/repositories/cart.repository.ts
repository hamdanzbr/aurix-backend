import Cart from "../models/cart.model";

export const findCartItem = async (
  userId: string,
  productId: string,
  selectedFinish: string,
  selectedSize: string
) => {
  return Cart.findOne({
    userId,
    productId,
    selectedFinish,
    selectedSize,
  });
};

export const createCartItem = async (
  data: any
) => {
  return Cart.create(data);
};

export const getCartItems = async (
  userId: string
) => {
  return Cart.find({
    userId,
  }).populate(
    "productId",
    "name slug price discountPrice images stock description"
  );
};

export const updateCartQuantity = async (
  cartId: string,
  quantity: number
) => {
  return Cart.findByIdAndUpdate(
    cartId,
    { quantity },
    { new: true }
  );
};

export const deleteCartItem = async (
  cartId: string
) => {
  return Cart.findByIdAndDelete(cartId);
};