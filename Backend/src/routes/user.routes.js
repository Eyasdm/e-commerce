import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getCurrentUser,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);

router.use(protect, restrictTo("admin"));

router.get("/", getAllUsers);
router.route("/:id").delete(deleteUser).patch(updateUserRole);

export default router;
