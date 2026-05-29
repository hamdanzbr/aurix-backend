import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),

  slug: z.string().min(3),

  description: z.string().min(10),

  price: z.number().positive(),

  discountPrice: z.number().positive().optional(),

  images: z.array(z.string()).min(1),

  category: z.string(),

  features: z.array(z.string()),

  availableFinishes: z.array(z.string()),

  availableSizes: z.array(z.string()),

  stock: z.number().min(0),

  warrantyAvailable: z.boolean(),

  warrantyMonths: z.number().optional(),
});