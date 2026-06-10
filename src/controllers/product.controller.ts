import { Request, Response } from "express";

import { createProductSchema } from "../validations/product.validation";
import { createProductService, getProductBySlugService, getProductsService } from "../services/product.service";
interface ProductParams {
  slug: string;
}
export const createProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const product = await createProductService(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

const filters = {
  keyword: req.query.keyword,
  categories: req.query.categories,
  finishes: req.query.finishes,
  features: req.query.features,

  minPrice: req.query.minPrice,
  maxPrice: req.query.maxPrice,

  sortBy: req.query.sortBy,
};

    const result = await getProductsService(
      filters,
      page,
      limit
    );

    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: {
        page,
        limit,
        total: result.totalProducts,
        totalPages: Math.ceil(
          result.totalProducts / limit
        ),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductBySlugController = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const result =
      await getProductBySlugService(slug);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};