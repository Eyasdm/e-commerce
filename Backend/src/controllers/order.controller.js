import * as orderService from "../services/order.service.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Order from "../models/order.model.js";
import { getStripe } from "../utils/stripe.js";

const stripe = getStripe();

//////////////////////////////////////////////////
// CREATE ORDER (manual - rarely used now)
//////////////////////////////////////////////////
export const create = catchAsync(async (req, res, next) => {
  const order = await orderService.createOrder(req.user._id);

  if (!order) {
    return next(new AppError("Failed to create order", 400));
  }

  res.status(201).json({
    success: true,
    data: order,
  });
});

//////////////////////////////////////////////////
//  STRIPE CHECKOUT SESSION
//////////////////////////////////////////////////
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  const session = await orderService.createCheckoutSession(req.user);

  res.status(200).json({
    success: true,
    session,
  });
});

//////////////////////////////////////////////////
//  STRIPE WEBHOOK (IMPORTANT)
//////////////////////////////////////////////////
export const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  //  payment success
  if (event.type === "checkout.session.completed") {
    await orderService.createOrderFromSession(event.data.object);
  }

  res.status(200).json({ received: true });
};

//////////////////////////////////////////////////
//  GET MY ORDERS
//////////////////////////////////////////////////
export const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await orderService.getUserOrders(req.user._id);

  res.status(200).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});

//////////////////////////////////////////////////
// GET ORDER BY ID
//////////////////////////////////////////////////

export const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

//////////////////////////////////////////////////
// ADMIN: GET ALL ORDERS
//////////////////////////////////////////////////
export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});

//////////////////////////////////////////////////
//  ADMIN: UPDATE ORDER STATUS
//////////////////////////////////////////////////
export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError("Invalid order status", 400));
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  order.status = status;

  //  auto update paid flag
  if (status === "paid") {
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    data: order,
  });
});
