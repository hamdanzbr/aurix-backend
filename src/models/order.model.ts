import mongoose, {
  Schema,
  Document,
} from "mongoose";

interface OrderItem {
  productId: mongoose.Types.ObjectId;

  name: string;

  image: string;

  selectedFinish: string;

  selectedSize: string;

  quantity: number;

  unitPrice: number;
}

interface ShippingAddress {
  fullName: string;

  phoneNumber: string;

  email: string;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  landmark?: string;
}

export interface IOrder
  extends Document {
  userId: mongoose.Types.ObjectId;

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  deliveryMethod:
    | "standard"
    | "express";

  subtotal: number;

  shippingCharge: number;

  totalAmount: number;

  paymentMethod: "cod";

  paymentStatus:
    | "pending"
    | "paid"
    | "failed";

  orderStatus:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";
}

const orderItemSchema =
  new Schema(
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      selectedFinish: {
        type: String,
        required: true,
      },

      selectedSize: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      unitPrice: {
        type: Number,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const shippingAddressSchema =
  new Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      phoneNumber: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: {
        type: String,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      landmark: {
        type: String,
      },
    },
    {
      _id: false,
    }
  );

const orderSchema =
  new Schema<IOrder>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      items: {
        type: [orderItemSchema],
        required: true,
      },

      shippingAddress: {
        type:
          shippingAddressSchema,
        required: true,
      },

      deliveryMethod: {
        type: String,
        enum: [
          "standard",
          "express",
        ],
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
      },

      shippingCharge: {
        type: Number,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: ["cod"],
        default: "cod",
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "pending",
      },

      orderStatus: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model<IOrder>(
    "Order",
    orderSchema
  );

export default Order;