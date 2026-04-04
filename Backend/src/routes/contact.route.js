// routes/contact.route.js
import express from "express";
import { sendContactMessage } from "../controllers/contact.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many requests, please try again later.",
});

router.post("/", emailLimiter, sendContactMessage);

export default router;
