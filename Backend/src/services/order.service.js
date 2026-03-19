import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

//  create order from cart
export const createOrder = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  //  build order items (snapshot)
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image,
  }));

  //  calculate total
  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  //  create order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalPrice,
  });

  //  clear cart
  cart.items = [];
  await cart.save();

  return order;
};

//  get user orders
export const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};
