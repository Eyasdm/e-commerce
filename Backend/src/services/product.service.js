import Product from "../models/product.model.js";

// ================= GET ALL PRODUCTS WITH PAGINATION =================
export const getAllProducts = async (filters) => {
  const {
    category,
    keyword,
    min,
    max,
    sort,
    brand,
    rating,
    page = 1,
    limit = 8,
  } = filters;
  let query = {};

  // Filter
  if (category) query.category = category;

  // Search
  if (keyword) {
    const words = keyword.toLowerCase().trim().split(" ").filter(Boolean);

    query.$and = words.map((word) => ({
      $or: [
        { name: { $regex: word, $options: "i" } },
        { category: { $regex: word, $options: "i" } },
        { brand: { $regex: word, $options: "i" } },
      ],
    }));
  }

  // Price filter
  if (min || max) {
    query.price = {};
    if (min) query.price.$gte = Number(min);
    if (max) query.price.$lte = Number(max);
  }

  // Brand filter
  if (brand) {
    query.brand = brand;
  }

  // Rating filter
  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  let productsQuery = Product.find(query);

  // Sorting
  if (sort === "price_asc") {
    productsQuery = productsQuery.sort({ price: 1 });
  } else if (sort === "price_desc") {
    productsQuery = productsQuery.sort({ price: -1 });
  } else if (sort === "newest") {
    productsQuery = productsQuery.sort({ createdAt: -1 });
  } else if (sort === "rating") {
    productsQuery = productsQuery.sort({ rating: -1 });
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
