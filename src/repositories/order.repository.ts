import mongoose from "mongoose";
import Order from "../models/order.model";

export const createOrder = async (
  data: any
) => {
  return Order.create(data);
};

export const getMyOrders = async (
  userId: string,
  filters: {
    keyword?: string;
    status?: string;
    sortBy?: string;
    startDate?: string;
    endDate?: string;
    page: number;
    limit: number;
  }
) => {
  const query: any = {
    userId,
  };

  if (
    filters.status &&
    filters.status !== "all"
  ) {
    query.orderStatus =
      filters.status;
  }

  if (
    filters.startDate ||
    filters.endDate
  ) {
    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte =
        new Date(
          filters.startDate
        );
    }

    if (filters.endDate) {
      query.createdAt.$lte =
        new Date(
          filters.endDate
        );
    }
  }

  if (filters.keyword) {
    query["items.name"] = {
      $regex:
        filters.keyword,
      $options: "i",
    };
  }

  let sortOptions: any = {
    createdAt: -1,
  };

  switch (
    filters.sortBy
  ) {
    case "oldest":
      sortOptions = {
        createdAt: 1,
      };
      break;

    case "price_high_to_low":
      sortOptions = {
        totalAmount: -1,
      };
      break;

    case "price_low_to_high":
      sortOptions = {
        totalAmount: 1,
      };
      break;

    default:
      sortOptions = {
        createdAt: -1,
      };
  }

  const skip =
    (filters.page - 1) *
    filters.limit;

  const orders =
    await Order.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(filters.limit);

  const total =
    await Order.countDocuments(
      query
    );

  return {
    orders,
    total,
  };
};

export const getOrderById = async (
  orderId: string
) => {
  return Order.findById(orderId);
};

export const cancelOrder = async (
  orderId: string
) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus:
        "cancelled",
    },
    {
      new: true,
    }
  );
};

export const getOrderStats =
  async (
    userId: string
  ) => {
    const [
      totalOrders,
      deliveredOrders,
      shippedOrders,
      cancelledOrders,
      totalSpent,
    ] = await Promise.all([
      Order.countDocuments({
        userId,
      }),

      Order.countDocuments({
        userId,
        orderStatus:
          "delivered",
      }),

      Order.countDocuments({
        userId,
        orderStatus:
          "shipped",
      }),

      Order.countDocuments({
        userId,
        orderStatus:
          "cancelled",
      }),

      Order.aggregate([
        {
          $match: {
            userId:
              new mongoose.Types.ObjectId(
                userId
              ),
          },
        },
        {
          $group: {
            _id: null,
            totalSpent:
              {
                $sum:
                  "$totalAmount",
              },
          },
        },
      ]),
    ]);

    const processingOrders =
      await Order.countDocuments(
        {
          userId,
          orderStatus: {
            $in: [
              "pending",
              "confirmed",
            ],
          },
        }
      );

    return {
      totalOrders,

      processingOrders,

      shippedOrders,

      deliveredOrders,

      cancelledOrders,

      totalSpent:
        totalSpent[0]
          ?.totalSpent || 0,
    };
  };