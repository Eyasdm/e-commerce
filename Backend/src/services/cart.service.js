import Cart from "../models/cart.model.js";

// add to cart
export const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  return cart;
};

// get cart
export const getCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

// remove item
export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();
  return cart;
};

// update quantity
export const updateQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return null;

  const item = cart.items.find((i) => i.product.toString() === productId);

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();
  return cart;
};
