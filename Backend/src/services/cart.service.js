import Cart from "../models/cart.model.js";
import Bundle from "../models/bundle.model.js";

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

  // ✅ Clean null items before doing anything
  cart.items = cart.items.filter((item) => item.product != null);

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
  return await Cart.findOne({ user: userId })
    .populate("items.product")
    .populate("items.bundle");
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

// Add bundle
export const addBundleToCart = async (userId, bundleId) => {
  const bundle = await Bundle.findById(bundleId);
  if (!bundle) throw new Error("Bundle not found");

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  // ✅ Fix: check bundle._id not bundle toString
  const exists = cart.items.find(
    (item) => item.bundle && item.bundle.toString() === bundleId.toString(),
  );
  if (exists) throw new Error("Bundle already in cart");

  cart.items.push({
    bundle: bundle._id,
    name: bundle.name,
    image: bundle.image,
    price: bundle.bundlePrice,
    isBundle: true,
    quantity: 1,
  });

  await cart.save();
  return cart;
};
