import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import crypto from "crypto";

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

// ================= REFRESH TOKEN  =================
export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// ================= SIGNUP =================
export const signupUser = async (data) => {
  const { name, email, password, passwordConfirm } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  //  generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  //  store hashed refresh token
  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// ================= LOGIN =================
export const loginUser = async (data) => {
  const { email, password } = data;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await user.comparePassword(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    throw err;
  }
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
  // Pass token in URL so frontend can set its own cookie
  const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
  return { token, redirectUrl };
};
