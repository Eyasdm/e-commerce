import mongoose from "mongoose";

// order.model.js - update orderItemSchema
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false, // ✅ not required for bundles
    },
    bundle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bundle",
    },
    isBundle: {
      type: Boolean,
      default: false,
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    //  user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //  items
    items: [orderItemSchema],

    //  pricing
    totalPrice: {
      type: Number,
      required: true,
    },

    //  payment
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentMethod: {
      type: String,
      default: "stripe",
    },

    stripeSessionId: String,

    //  order status
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    //  (optional later)
    shippingAddress: {
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
