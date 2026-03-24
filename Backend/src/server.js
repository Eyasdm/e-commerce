import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.join(__dirname, "../.env"),
// });

import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
