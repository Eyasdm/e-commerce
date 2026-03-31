import catchAsync from "../utils/catchAsync.js";
import {
  fetchRevenueAnalytics,
  fetchDailySales,
  fetchOrdersStats,
  fetchTopProducts,
} from "../services/admin.service.js";

// ── Revenue + growth ───────────────────────────────────────────────────────────
export const getRevenueAnalytics = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;
  const data = await fetchRevenueAnalytics(range, startDate, endDate);
  res.json({ success: true, data });
});

// ── Daily sales ────────────────────────────────────────────────────────────────
export const getDailySalesAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;
  const data = await fetchDailySales(range, startDate, endDate);
  res.json({ success: true, data });
});

// ── Order status breakdown ─────────────────────────────────────────────────────
export const getOrdersStatsAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;
  const data = await fetchOrdersStats(range, startDate, endDate);
  res.json({ success: true, data });
});

// ── Top products ───────────────────────────────────────────────────────────────
export const getTopProductsAdvanced = catchAsync(async (req, res) => {
  const { range, startDate, endDate } = req.query;
  const data = await fetchTopProducts(range, startDate, endDate);
  res.json({ success: true, data });
});
