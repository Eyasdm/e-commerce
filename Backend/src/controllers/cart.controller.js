import * as cartService from "../services/cart.service.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// ================= ADD ITEM =================
export const addItem = catchAsync(async (req, res, next) => {
  const cart = await cartService.addToCart(
    req.user._id,
    req.body.productId,
    req.body.quantity,
  );
  res.status(200).json({
    success: true,
    data: cart,
  });
});

// ================= GET CART =================
export const getCart = catchAsync(async (req, res, next) => {
  const cart = await cartService.getCart(req.user._id);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  res.status(200).json({
    success: true,
    data: cart,
  });
});

// ================= REMOVE ITEM =================
export const removeItem = catchAsync(async (req, res, next) => {
  await cartService.removeFromCart(req.user._id, req.params.productId);
  res.status(204).send();
});

// ================= UPDATE ITEM =================
export const updateItem = catchAsync(async (req, res, next) => {
  const cart = await cartService.updateQuantity(
    req.user._id,
    req.body.productId,
    req.body.quantity,
  );
  res.status(200).json({
    success: true,
    data: cart,
  });
});

// ================= Add BUNDLE Item =================
export const addBundleItem = catchAsync(async (req, res, next) => {
  const cart = await cartService.addBundleToCart(
    req.user._id,
    req.params.bundleId,
  );
  res.status(200).json({ success: true, data: cart });
});

// ================= Remove Item By Id =================
export const removeItemById = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("Cart not found", 404));

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.itemId,
  );

  await cart.save();
  res.status(204).send();
});
