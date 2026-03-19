import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
