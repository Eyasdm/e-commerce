// controllers/auth.controller.js

import { signupUser, loginUser } from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";

export const signup = catchAsync(async (req, res, next) => {
  try {
    const result = await signupUser(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const login = catchAsync(async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
