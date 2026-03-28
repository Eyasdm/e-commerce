import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// get current user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -__v -refreshToken",
  );

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
};
// update current user profile
export const updateMe = catchAsync(async (req, res, next) => {
  //  Only allow name update — not password or role
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true },
  ).select("-password -__v -refreshToken");

  res.status(200).json({
    success: true,
    user,
  });
});

//  get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});

//  delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
});

// update role
export const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true },
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
