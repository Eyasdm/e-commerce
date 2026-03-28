import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import AppError from "../utils/appError.js";

export const getProductReviews = async (productId) => {
  return await Review.find({ product: productId })
    .populate("user", "name")
    .sort("-createdAt");
};

export const createReview = async (
  userId,
  productId,
  { rating, comment, orderId },
) => {
  //  Check user actually bought this product in this order
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
    status: "delivered",
    "items.product": productId,
  });

  if (!order) {
    throw new AppError(
      "You can only review products you have purchased and received.",
      403,
    );
  }

  //  Check not already reviewed this specific order
  const alreadyReviewed = await Review.findOne({
    user: userId,
    order: orderId,
  });
  if (alreadyReviewed) {
    throw new AppError("You have already reviewed this order.", 400);
  }

  const review = await Review.create({
    product: productId,
    user: userId,
    rating,
    comment,
    order: orderId,
  });

  return await review.populate("user", "name");
};
