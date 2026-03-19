import * as orderService from "../services/order.service.js";

// create order
export const create = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user._id);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get my orders
export const getMyOrders = async (req, res) => {
  const orders = await orderService.getUserOrders(req.user._id);

  res.json({
    success: true,
    results: orders.length,
    data: orders,
  });
};
