import {
  createCartItem,
  findCartItem,
  getCartItems,
  updateCartQuantity,
  deleteCartItem,
} from "../repositories/cart.repository";

export const addToCartService = async (
  userId: string,
  data: any
) => {
  const existing = await findCartItem(
    userId,
    data.productId,
    data.selectedFinish,
    data.selectedSize
  );

  if (existing) {
    existing.quantity += data.quantity;

    await existing.save();

    return existing;
  }

  return createCartItem({
    userId,
    ...data,
  });
};

export const getCartService = async (
  userId: string
) => {
  const cartItems =
    await getCartItems(userId);

  let subtotal = 0;
  let totalItems = 0;

  const items = cartItems.map(
    (item: any) => {
      const product =
        item.productId;

      const unitPrice =
        product.discountPrice ||
        product.price;

      const itemTotal =
        unitPrice *
        item.quantity;

      subtotal += itemTotal;

      totalItems +=
        item.quantity;

      return {
        ...item.toObject(),
        itemTotal,
      };
    }
  );

  return {
    items,
    subtotal,
    totalItems,
  };
};

export const updateCartService = async (
  cartId: string,
  quantity: number
) => {
  return updateCartQuantity(
    cartId,
    quantity
  );
};

export const removeCartItemService = async (
  cartId: string
) => {
  return deleteCartItem(cartId);
};