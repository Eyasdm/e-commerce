import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Order from "../../src/models/order.model.js";
import Product from "../../src/models/product.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB connection successful");
});

// ── Read file ──────────────────────────────────────────────────────────────────
const rawOrders = JSON.parse(
  fs.readFileSync(`${__dirname}/orders.json`, "utf-8"),
);

// ── Import ─────────────────────────────────────────────────────────────────────
const importData = async () => {
  try {
    // Build a name → _id map from the real products in the DB
    const products = await Product.find().select("name _id").lean();
    const productMap = {};
    products.forEach((p) => {
      productMap[p.name] = p._id;
    });

    // Replace item names with real product ObjectIds
    const orders = rawOrders.map((order) => ({
      ...order,
      // user is a placeholder string — keep as-is or replace with a real user _id
      items: order.items.map((item) => ({
        product: productMap[item.name] ?? null,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      // Convert ISO strings to Date objects
      createdAt: new Date(order.createdAt),
      ...(order.paidAt ? { paidAt: new Date(order.paidAt) } : {}),
    }));

    console.log("Importing orders...");
    await Order.create(orders);
    console.log(`✅ ${orders.length} orders imported successfully`);
    process.exit();
  } catch (err) {
    console.error("❌ Import failed:", err);
    process.exit(1);
  }
};

// ── Delete ─────────────────────────────────────────────────────────────────────
const deleteData = async () => {
  try {
    await Order.deleteMany();
    console.log("✅ All orders deleted successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Delete failed:", err);
    process.exit(1);
  }
};

// ── Run ────────────────────────────────────────────────────────────────────────
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  console.log("Usage:");
  console.log("  node dev-data/data/import-orders.js --import");
  console.log("  node dev-data/data/import-orders.js --delete");
  process.exit();
}
