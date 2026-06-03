import { z } from "zod";

export const createOrderSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string(),

    phoneNumber: z.string(),

    email: z.string().email(),

    addressLine1: z.string(),

    addressLine2: z.string().optional(),

    city: z.string(),

    state: z.string(),

    country: z.string(),

    postalCode: z.string(),

    landmark: z.string().optional(),
  }),

  deliveryMethod: z.enum([
    "standard",
    "express",
  ]),

  paymentMethod: z.literal("cod"),
});