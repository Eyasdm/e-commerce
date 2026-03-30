// controllers/contact.controller.js
import nodemailer from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
import path from "path";
import { fileURLToPath } from "url";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export const sendContactMessage = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // ── Validation ─────────────────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return next(new AppError("All fields are required.", 400));
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new AppError("Please provide a valid email address.", 400));
  }

  if (message.trim().length < 10) {
    return next(new AppError("Message must be at least 10 characters.", 400));
  }

  // ── Render email template ──────────────────────────────────────────────────
  const html = pug.renderFile(
    path.join(__dirname, "../views/email/contact.pug"),
    { senderName: name, senderEmail: email, subject, message },
  );

  // ── Send to YOUR inbox ─────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,           // your verified sender
    to: process.env.CONTACT_RECEIVER_EMAIL, // YOUR personal inbox e.g. Eyasadam01@outlook.com
    replyTo: email,                         // so "Reply" in Gmail goes straight to the sender
    subject: `[TechNest Contact] ${subject}`,
    html,
    text: convert(html),
  });

  res.status(200).json({
    success: true,
    message: "Message sent! I'll get back to you as soon as possible.",
  });
});
