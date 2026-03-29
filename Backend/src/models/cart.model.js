import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    //  Either product OR bundle — not both
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    bundle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bundle",
    },
    name: String,
    image: String,
    price: Number,
    isBundle: {
      type: Boolean,
      default: false,
    },
    itemType: {
      type: String,
      enum: ["product", "bundle"],
      default: "product",
    },

    // Snapshot — locked at time of adding
    name: String,
    price: Number,
    image: String,

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: true },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
