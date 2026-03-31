// The password to all these users is the same: Test1234
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "../../src/models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB connection successful");
});

const rawUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, "utf-8"),
);

// ── Import ─────────────────────────────────────────────────────────────────────
const importData = async () => {
  try {
    // Use User.create() so the pre('save') hook runs and hashes all passwords
    for (const userData of rawUsers) {
      const existing = await User.findById(userData._id);
      if (existing) {
        console.log(`⚠️  User ${userData.name} already exists — skipping`);
        continue;
      }

      // Temporarily override _id so it matches what orders.json references
      const user = new User({
        _id: new mongoose.Types.ObjectId(userData._id),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        passwordConfirm: userData.passwordConfirm,
        role: userData.role ?? "user",
      });

      await user.save(); // triggers pre('save') → hashes password automatically
      console.log(`✅ Created user: ${user.name} (${user.email})`);
    }

    console.log(`\n✅ All users imported. Password for all: Test1234`);
    process.exit();
  } catch (err) {
    console.error("❌ Import failed:", err);
    process.exit(1);
  }
};

// ── Delete ─────────────────────────────────────────────────────────────────────
const deleteData = async () => {
  try {
    // Only delete the seeded users (by their known IDs), not your admin account
    const ids = rawUsers.map((u) => u._id);
    const result = await User.deleteMany({ _id: { $in: ids } });
    console.log(`✅ Deleted ${result.deletedCount} seeded users`);
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
  console.log("  node dev-data/data/import-users.js --import");
  console.log("  node dev-data/data/import-users.js --delete");
  process.exit();
}
