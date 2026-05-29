import {
  createProduct,
  findProductBySlug,
  getProducts,
  getRelatedProducts,
} from "../repositories/product.repository";

export const createProductService = async (data: any) => {
  const existingProduct = await findProductBySlug(data.slug);

  if (existingProduct) {
    throw new Error("Product slug already exists");
  }

  return createProduct(data);
};

export const getProductsService = async (
  filters: any,
  page: number,
  limit: number
) => {
  return getProducts(filters, page, limit);
};

export const getProductBySlugService = async (
  slug: string
) => {
  const product = await findProductBySlug(slug);

  if (!product) {
    throw new Error("Product not found");
  }

  const relatedProducts =
    await getRelatedProducts(
      product.category,
      product._id.toString()
    );

  return {
    product,
    relatedProducts,
  };
};