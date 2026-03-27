import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Product from "../../src/models/product.model.js";
import Bundle from "../../src/models/bundle.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

// ================= READ FILES =================
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
);

const bundles = JSON.parse(
  fs.readFileSync(`${__dirname}/bundles.json`, "utf-8"),
);

// ================= IMPORT =================
const importData = async () => {
  try {
    console.log("Importing products...");
    const createdProducts = await Product.create(products);

    //  map name → _id
    const productMap = {};
    createdProducts.forEach((p) => {
      productMap[p.name] = p._id;
    });

    //  convert bundle products → ObjectIds
    const formattedBundles = bundles.map((bundle) => ({
      ...bundle,
      products: bundle.products.map((name) => productMap[name]),
    }));

    console.log("Importing bundles...");
    await Bundle.create(formattedBundles);

    console.log("🔥 Products + Bundles imported successfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// ================= DELETE =================
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Bundle.deleteMany();

    console.log("🔥 Products + Bundles deleted successfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// ================= RUN =================
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
// To Run ImportData():
// node dev-data/data/import-dev-data.js --import
// To Run DeleteDate():
// node dev-data/data/import-dev-data.js --delete
