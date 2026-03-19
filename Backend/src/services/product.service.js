import Product from "../models/product.model.js";

// ================= GET ALL PRODUCTS WITH PAGINATION =================
export const getAllProducts = async (filters) => {
  const {
    category,
    keyword,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 8,
  } = filters;

  let query = {};

  // Filter
  if (category) query.category = category;

  // Search
  if (keyword) {
    query.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  // Price filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let productsQuery = Product.find(query);

  // Sorting
  if (sort === "price_asc") {
    productsQuery = productsQuery.sort({ price: 1 });
  } else if (sort === "price_desc") {
    productsQuery = productsQuery.sort({ price: -1 });
  } else if (sort === "newest") {
    productsQuery = productsQuery.sort({ createdAt: -1 });
  }

  // Pagination
  const currentPage = Number(page);
  const perPage = Number(limit);

  const skip = (currentPage - 1) * perPage;

  productsQuery = productsQuery.skip(skip).limit(perPage);

  const products = await productsQuery;

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page: currentPage,
    pages: Math.ceil(total / perPage),
  };
};

// ================= GET SINGLE PRODUCT =================
export const getProductById = async (id) => {
  return await Product.findById(id);
};
