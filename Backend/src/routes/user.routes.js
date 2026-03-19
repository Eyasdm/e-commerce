import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
