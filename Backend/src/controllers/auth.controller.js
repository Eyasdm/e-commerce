import {
  signupUser,
  loginUser,
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../services/auth.service.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/user.model.js";

// ================= SIGNUP =================
export const signup = catchAsync(async (req, res, next) => {
  const result = await signupUser(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
});

// ================= LOGIN =================
export const login = catchAsync(async (req, res, next) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// ================= LOGOUT =================
export const logout = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $unset: { refreshToken: 1 },
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
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
