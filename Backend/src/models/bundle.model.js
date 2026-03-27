import mongoose from "mongoose";

const bundleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    image: {
      type: String,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    // 💰 الأسعار
    originalPrice: {
      type: Number,
      required: true,
    },

    bundlePrice: {
      type: Number,
      required: true,
    },

    savings: {
      type: Number,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

bundleSchema.pre("save", function () {
  this.savings = this.originalPrice - this.bundlePrice;
});

export default mongoose.model("Bundle", bundleSchema);
