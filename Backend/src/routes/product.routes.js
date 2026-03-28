import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import reviewRouter from "./review.routes.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(getProducts)
  .post(protect, restrictTo("admin"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

export default router;
