import express from "express";
import {
  addItem,
  getCart,
  removeItem,
  updateItem,
  addBundleItem,
  removeItemById,
} from "../controllers/cart.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getCart).post(addItem).put(updateItem);
router.post("/bundle/:bundleId", protect, addBundleItem);
router.delete("/item/:itemId", removeItemById);
router.delete("/:productId", removeItem);

export default router;
