import express from "express";
import {
  signup,
  logout,
  login,
  refreshToken,
  updatePassword,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controllers/auth.controller.js";
import passport from "../config/passport.js";
import { googleCallback } from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logout);
router.patch("/update-password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth?error=google_failed`,
  }),
  googleCallback,
);

export default router;
