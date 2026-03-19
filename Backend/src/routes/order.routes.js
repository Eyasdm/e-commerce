import express from "express";
import {
  create,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { protect, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  protected
router.use(protect);

router.route("/").get(getMyOrders).post(create);

// admin routes
router.get("/admin", restrictTo("admin"), getAllOrders);
router.patch(
  "/admin/:id",

  restrictTo("admin"),
  updateOrderStatus,
);

export default router;
