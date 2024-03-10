import { redis } from "../config/redis.js";
import User from "../models/User.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import { asyncErrorWrapper } from "./catchAsyncErrors.js";

export const userSpecific = (role) =>
  asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) return next(new ErrorHandler("Please login to continue", 404));
    console.log(user.role, role);
    if (user.role !== role) {
      return next(
        new ErrorHandler(`You are not authorized to access this resource`, 403)
      );
    }
    next();
  });
