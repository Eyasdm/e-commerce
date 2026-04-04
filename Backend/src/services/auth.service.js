import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import crypto from "crypto";
import AppError from "../utils/appError.js";

// ================= HASH TOKEN =================
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// ================= ACCESS TOKEN =================
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ================= REFRESH TOKEN =================
export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// ================= SIGNUP =================
export const signupUser = async (data) => {
  const { name, email, password, passwordConfirm } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

// ================= LOGIN =================
export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

// ================= LOGOUT =================
export const logoutUser = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } },
    { new: true },
  );
};

// ================= Google Login =================
export const handleGoogleLogin = async (user) => {
  const token = generateAccessToken(user._id);
  const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
  return { token, redirectUrl };
};
