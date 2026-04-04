import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { getStripe } from "../utils/stripe.js";

const stripe = getStripe();

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
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  return orders;
};

//  CREATE STRIPE CHECKOUT SESSION
export const createCheckoutSession = async (user) => {
  const cart = await Cart.findOne({ user: user._id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // ✅ Clean null products and filter valid items
  const validItems = cart.items.filter(
    (item) => item.bundle || item.product !== null,
  );

  if (validItems.length === 0) throw new Error("No valid items in cart");

  const line_items = validItems.map((item) => {
    // ✅ Handle bundle items
    const isBundle = !!item.bundle;
    const name = isBundle ? item.name : item.product?.name;
    const price = isBundle ? item.price : item.product?.price;
    const image = isBundle ? item.image : item.product?.image;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name,
          images: [`${process.env.BASE_URL}${image}`],
        },
        unit_amount: price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    customer_email: user.email,
    metadata: { userId: user._id.toString() },
  });

  return session;
};

export const createOrderFromSession = async (session) => {
  try {
    const userId = session.metadata.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) return;

    const orderItems = cart.items
      .filter((item) => item.bundle || item.product)
      .map((item) => {
        const isBundle = !!item.bundle;
        return {
          product: isBundle ? undefined : item.product._id,
          bundle: isBundle ? item.bundle : undefined,
          isBundle,
          name: isBundle ? item.name : item.product.name,
          price: isBundle ? item.price : item.product.price,
          quantity: item.quantity,
          image: isBundle ? item.image : item.product.image,
        };
      });

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      status: "paid",
      stripeSessionId: session.id,
      paymentMethod: "stripe",
    });

    cart.items = [];
    await cart.save();
  } catch (err) {
    console.error("ORDER CREATION ERROR:", err.message);
    console.error(err.stack);
  }
};
