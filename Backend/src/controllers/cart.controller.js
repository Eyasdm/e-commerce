import * as cartService from "../services/cart.service.js";
import catchAsync from "../utils/catchAsync.js";

// add item
export const addItem = catchAsync(async (req, res) => {
  try {
    const cart = await cartService.addToCart(
      req.user._id,
      req.body.productId,
      req.body.quantity,
    );

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// get cart
export const getUserCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.json({ success: true, data: cart });
});

//  remove item
export const removeItem = async (req, res) => {
  await cartService.removeFromCart(req.user._id, req.params.productId);

  return res.status(204).send();
};

// update item
export const updateItem = catchAsync(async (req, res) => {
  const cart = await cartService.updateQuantity(
    req.user._id,
    req.body.productId,
    req.body.quantity,
  );

  res.json({ success: true, data: cart });
});
