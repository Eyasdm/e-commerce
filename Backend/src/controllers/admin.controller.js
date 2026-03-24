import Order from "../models/order.model.js";
import catchAsync from "../utils/catchAsync.js";

//////////////////////////////////////////////////
//  HELPER: DATE FILTER
//////////////////////////////////////////////////
const getDateFilter = (range, startDate, endDate) => {
  let filter = {};

  if (range === "7d") {
    filter = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
  } else if (range === "30d") {
    filter = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
  } else if (startDate && endDate) {
    filter = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  return filter;
};

//////////////////////////////////////////////////
//  REVENUE + GROWTH
//////////////////////////////////////////////////
export const getRevenueAnalytics = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;

  const dateFilter = getDateFilter(range, startDate, endDate);

  const currentMatch = {
    isPaid: true,
    ...(dateFilter && { createdAt: dateFilter }),
  };

  // current stats
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

  // previous period (same length)
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
        ...(prevFilter && { createdAt: prevFilter }),
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

  res.json({
    success: true,
    data: {
      current: curr,
      previous: prev,
      growth,
    },
  });
});

//////////////////////////////////////////////////
// DAILY SALES (WITH FILTER)
//////////////////////////////////////////////////
export const getDailySalesAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;

  const dateFilter = getDateFilter(range, startDate, endDate);

  const matchStage = {
    isPaid: true,
    ...(dateFilter && { createdAt: dateFilter }),
  };

  const sales = await Order.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    data: sales,
  });
});

//////////////////////////////////////////////////
// ORDERS STATUS (WITH FILTER)
//////////////////////////////////////////////////
export const getOrdersStatsAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;

  const dateFilter = getDateFilter(range, startDate, endDate);

  const stats = await Order.aggregate([
    {
      $match: {
        ...(dateFilter && { createdAt: dateFilter }),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    success: true,
    data: stats,
  });
});

//////////////////////////////////////////////////
//  TOP PRODUCTS (WITH FILTER)
//////////////////////////////////////////////////
export const getTopProductsAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;

  const dateFilter = getDateFilter(range, startDate, endDate);

  const products = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        ...(dateFilter && { createdAt: dateFilter }),
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
        revenue: {
          $sum: {
            $multiply: ["$items.price", "$items.quantity"],
          },
        },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);

  res.json({
    success: true,
    data: products,
  });
});
