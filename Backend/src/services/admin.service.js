import Order from "../models/order.model.js";

// ── Helper ─────────────────────────────────────────────────────────────────────
export const getDateFilter = (range, startDate, endDate) => {
  if (range === "7d") {
    return { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
  }
  if (range === "30d") {
    return { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
  }
  if (startDate && endDate) {
    return { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  return {};
};

// ── Revenue + growth ───────────────────────────────────────────────────────────
export const fetchRevenueAnalytics = async (range, startDate, endDate) => {
  const dateFilter = getDateFilter(range, startDate, endDate);
  const hasFilter = Object.keys(dateFilter).length > 0;

  const currentMatch = {
    isPaid: true,
    ...(hasFilter ? { createdAt: dateFilter } : {}),
  };

  const current = await Order.aggregate([
    { $match: currentMatch },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
        aov: { $avg: "$totalPrice" },
      },
    },
  ]);

  // Previous period — same duration, immediately before the current window
  let prevFilter = {};
  if (dateFilter.$gte) {
    const diff = Date.now() - new Date(dateFilter.$gte).getTime();
    prevFilter = {
      $gte: new Date(dateFilter.$gte.getTime() - diff),
      $lte: new Date(dateFilter.$gte),
    };
  }

  const previous = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        ...(Object.keys(prevFilter).length > 0
          ? { createdAt: prevFilter }
          : {}),
      },
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
  ]);

  const curr = current[0] || { revenue: 0, orders: 0, aov: 0 };
  const prev = previous[0] || { revenue: 0, orders: 0 };

  const growth = {
    revenueGrowth:
      prev.revenue === 0
        ? 0
        : ((curr.revenue - prev.revenue) / prev.revenue) * 100,
    ordersGrowth:
      prev.orders === 0 ? 0 : ((curr.orders - prev.orders) / prev.orders) * 100,
  };

  return { current: curr, previous: prev, growth };
};

// ── Daily sales ────────────────────────────────────────────────────────────────
export const fetchDailySales = async (range, startDate, endDate) => {
  const dateFilter = getDateFilter(range, startDate, endDate);
  const hasFilter = Object.keys(dateFilter).length > 0;

  return Order.aggregate([
    {
      $match: {
        isPaid: true,
        ...(hasFilter ? { createdAt: dateFilter } : {}),
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

// ── Order status breakdown ─────────────────────────────────────────────────────
export const fetchOrdersStats = async (range, startDate, endDate) => {
  const dateFilter = getDateFilter(range, startDate, endDate);
  const hasFilter = Object.keys(dateFilter).length > 0;

  return Order.aggregate([
    {
      $match: {
        ...(hasFilter ? { createdAt: dateFilter } : {}),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
};

// ── Top products ───────────────────────────────────────────────────────────────
export const fetchTopProducts = async (range, startDate, endDate) => {
  const dateFilter = getDateFilter(range, startDate, endDate);
  const hasFilter = Object.keys(dateFilter).length > 0;

  return Order.aggregate([
    {
      $match: {
        isPaid: true,
        ...(hasFilter ? { createdAt: dateFilter } : {}),
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
    // Lookup products collection
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    // Lookup bundles collection
    {
      $lookup: {
        from: "bundles",
        localField: "_id",
        foreignField: "_id",
        as: "bundleInfo",
      },
    },
    // Flatten: prefer product, fall back to bundle, fall back to {}
    {
      $addFields: {
        resolvedName: {
          $ifNull: [
            { $arrayElemAt: ["$productInfo.name", 0] },
            {
              $ifNull: [
                { $arrayElemAt: ["$bundleInfo.name", 0] },
                "Deleted Item",
              ],
            },
          ],
        },
        resolvedImage: {
          $ifNull: [
            { $arrayElemAt: ["$productInfo.image", 0] },
            { $arrayElemAt: ["$bundleInfo.image", 0] },
          ],
        },
        resolvedBrand: {
          $ifNull: [{ $arrayElemAt: ["$productInfo.brand", 0] }, "Bundle"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalSold: 1,
        revenue: 1,
        name: "$resolvedName",
        image: "$resolvedImage",
        brand: "$resolvedBrand",
      },
    },
  ]);
};
