import Cart from "../models/cart.model";

import {
    cancelOrder,
  createOrder,
  getMyOrders,
  getOrderById,
  getOrderStats,
} from "../repositories/order.repository";

export const createOrderService = async (
  userId: string,
  data: any
) => {
  const cartItems =
    await Cart.find({
      userId,
    }).populate("productId");

  if (!cartItems.length) {
    throw new Error(
      "Cart is empty"
    );
  }

  let subtotal = 0;

  const items = cartItems.map(
    (item: any) => {
      const product =
        item.productId;

      subtotal +=
        product.price *
        item.quantity;

      return {
        productId:
          product._id,

        name:
          product.name,

        image:
          product.images[0],

        selectedFinish:
          item.selectedFinish,

        selectedSize:
          item.selectedSize,

        quantity:
          item.quantity,

        unitPrice:
          product.price,
      };
    }
  );

  const shippingCharge =
    data.deliveryMethod ===
    "express"
      ? 199
      : 0;

  const totalAmount =
    subtotal +
    shippingCharge;

  const order =
    await createOrder({
      userId,

      items,

      shippingAddress:
        data.shippingAddress,

      deliveryMethod:
        data.deliveryMethod,

      subtotal,

      shippingCharge,

      totalAmount,

      paymentMethod:
        "cod",

      paymentStatus:
        "pending",

      orderStatus:
        "pending",
    });

  await Cart.deleteMany({
    userId,
  });

  return order;
};

export const getMyOrdersService =
  async (
    userId: string,
    filters: any
  ) => {
    return getMyOrders(
      userId,
      filters
    );
  };

  export const getOrderByIdService =
  async (
    userId: string,
    orderId: string
  ) => {
    const order =
      await getOrderById(orderId);

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    if (
      order.userId.toString() !==
      userId
    ) {
      throw new Error(
        "Unauthorized"
      );
    }

    return order;
  };

  export const cancelOrderService =
  async (
    userId: string,
    orderId: string
  ) => {
    const order =
      await getOrderById(orderId);

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    if (
      order.userId.toString() !==
      userId
    ) {
      throw new Error(
        "Unauthorized"
      );
    }

    if (
      ![
        "pending",
        "confirmed",
      ].includes(
        order.orderStatus
      )
    ) {
      throw new Error(
        "Order cannot be cancelled"
      );
    }

    return cancelOrder(orderId);
  };

  export const getOrderStatsService =
  async (
    userId: string
  ) => {
    return getOrderStats(
      userId
    );
  };