import crypto from "crypto";
import {
  signupUser,
  loginUser,
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../services/auth.service.js";
import Email from "../utils/email.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/user.model.js";
import { handleGoogleLogin } from "../services/auth.service.js";

// ================= SIGNUP =================
export const signup = catchAsync(async (req, res, next) => {
  const result = await signupUser(req.body);

  // extract token
  const token = result.accessToken;

  // sanitize user
  const user = result.user.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;

  // send welcome email (non-blocking — failure won't break signup)
  try {
    const shopURL = `${req.protocol}://${req.get("host")}/shop`;
    await new Email(result.user, shopURL).sendWelcome();
  } catch (err) {
    console.error("Welcome email failed to send:", err.message);
  }

  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    data: { user },
  });
});
// ================= LOGIN =================
export const login = catchAsync(async (req, res, next) => {
  const result = await loginUser(req.body);

  const token = result.accessToken;

  const user = result.user.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

// ================= LOGOUT =================
export const logout = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { refreshToken: 1 },
  });

  res.clearCookie("token", cookieOptions);

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ================= GET ME =================
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
};
// ================= UPDATE PASSWORD =================
export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  // check current password
  const isMatch = await user.comparePassword(
    req.body.currentPassword,
    user.password,
  );

  if (!isMatch) {
    return next(new AppError("Current password is wrong", 401));
  }

  // set new password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// ================= FORGOT PASSWORD =================
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No user with that email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/auth/reset-password/${resetToken}`;

  await new Email(user, resetURL).sendPasswordReset();

  // console.log("RESET URL:", resetURL);

  res.status(200).json({
    success: true,
    message: "Token sent (check console for now)",
  });
});
// ================= RESET PASSWORD =================

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

// ================= REFRESH TOKEN =================
export const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError("No refresh token provided", 401));
  }

  // hash incoming token
  const hashed = hashToken(refreshToken);

  // find user
  const user = await User.findOne({ refreshToken: hashed });

  //  REUSE DETECTION
  if (!user) {
    return next(
      new AppError("Invalid or reused refresh token (possible attack)", 403),
    );
  }

  //  ROTATION STARTS

  // 1️) generate new tokens
  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken();

  // 2️) replace old refresh token
  user.refreshToken = hashToken(newRefreshToken);
  await user.save({ validateBeforeSave: false });

  // 3️) send response
  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

// =================  Google Callback =================

export const googleCallback = async (req, res) => {
  try {
    console.log("GOOGLE USER:", req.user?.email, req.user?.role);
    const { redirectUrl } = await handleGoogleLogin(req.user);
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("GOOGLE CALLBACK ERROR:", err.message);
    return res.redirect(`${process.env.CLIENT_URL}/auth?error=server_error`);
  }
};
