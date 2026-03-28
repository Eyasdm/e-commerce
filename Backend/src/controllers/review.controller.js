import * as reviewService from "../services/review.service.js";
import catchAsync from "../utils/catchAsync.js";

export const getProductReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getProductReviews(req.params.productId);
  res.status(200).json({ success: true, data: reviews });
});

export const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createReview(
    req.user._id,
    req.params.productId,
    req.body,
  );
  res.status(201).json({ success: true, data: review });
});
