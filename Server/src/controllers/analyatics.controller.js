import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import Course from "../models/Course.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import { generate12MonthData } from "../utilities/analaytics.generator.js";

// order Analyatics
export const orderAnalyatics = asyncErrorWrapper(async (req, res, next) => {
  try {
    const user = await generate12MonthData(Order);
    res.status(200).json({
      success: true,
      message: "Order Analyatics",
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// course Analyatics
export const courseAnalyatics = asyncErrorWrapper(async (req, res, next) => {
  try {
    const course = await generate12MonthData(Course);
    res.status(200).json({
      success: true,
      message: "Course Analyatics",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

//   user analyatics

export const userAnalyatics = asyncErrorWrapper(async (req, res, next) => {
  try {
    const user = await generate12MonthData(User);
    res.status(200).json({
      success: true,
      message: "User Analyatics",
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});
