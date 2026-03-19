import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// generate token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// signup
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

  return {
    user,
    token: generateToken(user._id),
  };
};

// login
export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: generateToken(user._id),
  };
};
