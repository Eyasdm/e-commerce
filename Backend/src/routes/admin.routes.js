import express from "express";
import {
  getRevenueAnalytics,
  getDailySalesAdvanced,
  getOrdersStatsAdvanced,
  getTopProductsAdvanced,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin only
router.use(protect, restrictTo("admin"));

//  revenue + growth
router.get("/analytics/revenue", getRevenueAnalytics);

//  daily sales
router.get("/analytics/daily-sales", getDailySalesAdvanced);

// order status
router.get("/analytics/orders", getOrdersStatsAdvanced);

// top products
router.get("/analytics/top-products", getTopProductsAdvanced);

export default router;
