import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;

  price: number;
  discountPrice?: number;

  images: string[];

  category: string;

  features: string[];

  availableFinishes: string[];

  availableSizes: string[];

  stock: number;

  averageRating: number;
  totalRatings: number;

  warrantyAvailable: boolean;
  warrantyMonths?: number;

  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    images: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    availableFinishes: {
      type: [String],
      default: [],
    },

    availableSizes: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    warrantyAvailable: {
      type: Boolean,
      default: false,
    },

    warrantyMonths: {
      type: Number,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;