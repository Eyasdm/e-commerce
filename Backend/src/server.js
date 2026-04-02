import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./config/passport.js";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env ONLY in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, "../.env") });
}

app.use(passport.initialize());

// Dynamic imports (ensure env loads first)
const { default: app } = await import("./app.js");
const { connectDB } = await import("./config/db.js");

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
