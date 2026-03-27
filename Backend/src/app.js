import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bundleRoutes from "./routes/bundle.routes.js";

import { globalErrorHandler } from "./middlewares/error.middleware.js";

import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//////////////////////////////////////////////////
//  SECURITY MIDDLEWARES
//////////////////////////////////////////////////

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(cookieParser());

// NoSQL injection
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});

// XSS protection
app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// Rate limit
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, try later",
});

app.use("/api", limiter);

//////////////////////////////////////////////////
//  GLOBAL MIDDLEWARES
//////////////////////////////////////////////////

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
//  IMPORTANT: Stripe Webhook BEFORE json()
import { webhook } from "./controllers/order.controller.js";

app.post(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  webhook,
);

// JSON parser
app.use(express.json());

// Print the coming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//////////////////////////////////////////////////
// STATIC FILES
//////////////////////////////////////////////////

app.use(
  "/products",
  express.static(path.join(__dirname, "../public/products"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  }),
);

//////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/bundles", bundleRoutes);

//////////////////////////////////////////////////
//  ERROR HANDLING
//////////////////////////////////////////////////

app.use(globalErrorHandler);

//////////////////////////////////////////////////
//  ROOT
//////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;
