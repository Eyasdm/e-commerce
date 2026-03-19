import * as orderService from "../services/order.service.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Order from "../models/order.model.js";

// create order
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

// get my orders
export const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await orderService.getUserOrders(req.user._id);

  res.status(200).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});

//  admin: get all orders
export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate("user");

  res.status(200).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});

//  admin: update order status
export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});
