// routes/contact.route.js
import express from "express";
import { sendContactMessage } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;
