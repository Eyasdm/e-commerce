import express from "express";
import {
  addItem,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cart.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getCart).post(addItem).put(updateItem);

router.delete("/:productId", removeItem);

export default router;
