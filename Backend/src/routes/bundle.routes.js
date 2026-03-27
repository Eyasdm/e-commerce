import express from "express";
import {
  getBundles,
  getBundle,
  createBundle,
} from "../controllers/bundle.controller.js";

// ---------------------------------------------------------
// Its messing create bundle which should be an admin route
// ----------------------------------------------------------

const router = express.Router();

router.get("/", getBundles);
router.get("/:id", getBundle);
router.post("/", createBundle);

export default router;
