import Product from "../models/product.model";

export const createProduct = async (data: any) => {
  return Product.create(data);
};

export const findProductBySlug = async (slug: string) => {
  return Product.findOne({
    slug,
    isActive: true,
  });
};

export const getRelatedProducts = async (
  category: string,
  productId: string
) => {
  return Product.find({
    category,
    _id: { $ne: productId },
    isActive: true,
  })
    .limit(4)
    .select(
      "name slug price discountPrice images averageRating"
    );
};

export const getProducts = async (
  filters: any,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const query: any = {
    isActive: true,
  };

if (filters.categories) {
  const categories =
    filters.categories.split(",");

  query.category = {
    $in: categories,
  };
}

if (filters.finishes) {
  const finishes =
    filters.finishes.split(",");

  query.availableFinishes = {
    $in: finishes,
  };
}

if (filters.features) {
  const features =
    filters.features.split(",");

  query.features = {
    $in: features,
  };
}

if (filters.keyword) {
  query.$or = [
    {
      name: {
        $regex: filters.keyword,
        $options: "i",
      },
    },
    {
      description: {
        $regex: filters.keyword,
        $options: "i",
      },
    },
  ];
}

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};

    if (filters.minPrice) {
      query.price.$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price.$lte = Number(filters.maxPrice);
    }
  }

  let sortOptions: any = {
    createdAt: -1,
  };

  switch (filters.sortBy) {
    case "price_asc":
      sortOptions = { price: 1 };
      break;

    case "price_desc":
      sortOptions = { price: -1 };
      break;

    case "rating":
      sortOptions = { averageRating: -1 };
      break;

    case "newest":
      sortOptions = { createdAt: -1 };
      break;
  }

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(query);

  return {
    products,
    totalProducts,
  };
};