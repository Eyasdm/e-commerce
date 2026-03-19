import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../../src/models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log("ENV:", process.env.DATABASE);

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
);

const importData = async () => {
  try {
    console.log("Importing products...");
    await Product.create(products);

    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// To Run ImportData():
// node dev-data/data/import-dev-data.js --import
// To Run DeleteDate():
// node dev-data/data/import-dev-data.js --delete
