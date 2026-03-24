import express from "express";
import {
  create,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getCheckoutSession,
} from "../controllers/order.controller.js";

import { protect, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

//////////////////////////////////////////////////
// PROTECTED ROUTES (ALL USERS)
//////////////////////////////////////////////////
router.use(protect);

//  checkout
router.get("/checkout-session", getCheckoutSession);

// user orders
router
  .route("/")
  .get(getMyOrders) // GET /api/orders
  .post(create); // POST /api/orders (optional/manual)

//////////////////////////////////////////////////
//  ADMIN ROUTES
//////////////////////////////////////////////////

// get all orders
router.get("/admin", restrictTo("admin"), getAllOrders);

// update status
router.patch("/admin/:id/status", restrictTo("admin"), updateOrderStatus);

export default router;
