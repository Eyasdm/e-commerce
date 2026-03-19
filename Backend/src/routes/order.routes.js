import express from "express";
import { create, getMyOrders } from "../controllers/order.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  protected
router.use(protect);

router.route("/").get(getMyOrders).post(create);

export default router;
