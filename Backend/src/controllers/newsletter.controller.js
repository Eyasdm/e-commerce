// controllers/newsletter.controller.js
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";

export const subscribe = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new AppError("Please provide a valid email address.", 400));
  }

  const shopURL = `${req.protocol}://${req.get("host")}/shop`;

  // Build a minimal user-like object — Email class only needs .email and .name
  const subscriber = { email, name: email.split("@")[0] };

  await new Email(subscriber, shopURL).sendNewsletter();

  res.status(200).json({
    success: true,
    message: "Subscribed! Check your inbox for your 10% discount code.",
  });
});
