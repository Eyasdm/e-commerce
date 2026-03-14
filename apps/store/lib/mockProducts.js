const productImages = [
  "/products/headphone1.png",
  "/products/headphone2.png",
  "/products/headphone3.png",
  "/products/headphone4.png",
];

const brands = ["Anker", "Razer", "Ugreen", "Logitech", "Aukey"];

export const generateMockProducts = (page = 1, limit = 12, filters = {}) => {
  const { category, brand, rating, min, max, sort } = filters;

  const TOTAL_ITEMS = 60;

  // 1️⃣ Generate full dataset
  let allProducts = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
    const price = Math.floor(Math.random() * 150) + 50;
    const hasDiscount = Math.random() > 0.5;
    const discount = hasDiscount ? Math.floor(Math.random() * 30) + 5 : null;

    const oldPrice = hasDiscount
      ? Math.floor(price / (1 - discount / 100))
      : null;

    return {
      id: i + 1,
      name: `${category || "Product"} ${i + 1}`,
      brand: brands[Math.floor(Math.random() * brands.length)],
      image: productImages[Math.floor(Math.random() * productImages.length)],
      price,
      oldPrice,
      rating: Math.floor(Math.random() * 5) + 1,
      reviews: Math.floor(Math.random() * 300) + 10,
      discount,
    };
  });

  // 2️⃣ Apply Filters

  if (brand) {
    allProducts = allProducts.filter((p) => p.brand === brand);
  }

  if (rating) {
    allProducts = allProducts.filter((p) => p.rating >= Number(rating));
  }

  if (min) {
    allProducts = allProducts.filter((p) => p.price >= Number(min));
  }

  if (max) {
    allProducts = allProducts.filter((p) => p.price <= Number(max));
  }

  // 3️⃣ Apply Sorting

  if (sort === "price_asc") {
    allProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    allProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating_desc") {
    allProducts.sort((a, b) => b.rating - a.rating);
  }

  // 4️⃣ Pagination AFTER filtering
  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedProducts = allProducts.slice(start, end);

  return {
    products: paginatedProducts,
    page,
    totalPages,
    totalItems,
    hasMore: page < totalPages,
  };
};
