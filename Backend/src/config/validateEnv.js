const required = [
  "DATABASE",
  "JWT_SECRET",
  "PORT",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "GEMINI_API_KEY",
  "CLIENT_URL",
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}
