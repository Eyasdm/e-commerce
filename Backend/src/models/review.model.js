import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true, // ties review to a specific purchase
    },
  },
  { timestamps: true },
);

// One review per user per order — prevents duplicate reviews on same purchase
reviewSchema.index({ user: true, order: true }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
