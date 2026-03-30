import express from "express";
import rateLimit from "express-rate-limit";
import {
  chatHandler,
  listModelsHandler,
} from "../controllers/chat.controller.js";

const router = express.Router();

const chatLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  message: "Too many chat requests, please slow down.",
});

router.post("/", chatLimiter, chatHandler);
router.get("/list-models", listModelsHandler); // http://localhost:8000/api/v1/chat/list-models

export default router;
