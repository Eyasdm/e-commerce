import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
    },

    description: {
      type: String,
      maxlength: 1000,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["headphones", "chargers", "powerbanks", "keyboards", "mouse"],
    },

    brand: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
productSchema.virtual("discountedPrice").get(function () {
  if (!this.discount) return this.price;

  return Math.round(this.price - (this.price * this.discount) / 100);
});

const Product = mongoose.model("Product", productSchema);

export default Product;
