import express from "express";
import {
  getProductReviews,
  createReview,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true }); // mergeParams to get productId

router.get("/", getProductReviews);
router.post("/", protect, createReview);

export default router;
