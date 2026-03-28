import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getMe,
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateMe,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

router.use(protect, restrictTo("admin"));

router.get("/", getAllUsers);
router.route("/:id").delete(deleteUser).patch(updateUserRole);

export default router;
