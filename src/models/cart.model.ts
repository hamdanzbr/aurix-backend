import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;

  selectedFinish: string;
  selectedSize: string;

  quantity: number;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index(
  {
    userId: 1,
    productId: 1,
    selectedFinish: 1,
    selectedSize: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model<ICart>(
  "Cart",
  cartSchema
);