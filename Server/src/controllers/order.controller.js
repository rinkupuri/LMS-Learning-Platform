import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import User from "../models/User.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import Notification from "../models/Notification.js";
import sendMail from "../utilities/sendMail.js";
import Course from "../models/Course.js";
import Order from "../models/Order.js";

// creating order
export const createOrder = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findById(req.userId);
  const userCourse = user.courses;

  try {
    const { courseId } = req.body;
    const orderIsExist = user.courses.find(
      (order) => order.courseId === courseId
    );
    if (orderIsExist) {
      return next(new ErrorHandler("Course is already Purchased", 400));
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    sendMail({
      email: user.email,
      subject: "New Order",
      template: "OrderConfirmation.ejs",
      data: {
        name: user.name,
        date: "23-Nov-2024",
        courseName: course.name,
        courseImage: course.thumbnail?.url,
        price: course.price,
        discountPrice: course.estimatedprice,
      },
    });
    //  here we are checking payment info when we add payment gateway
    user.purchased += 1;
    user.courses.push({ courseId });
    await user.save();
    const order = await Order.create({
      user: user,
      course: courseId,
    });
    await Notification.create({
      title: "New Order",
      message: "You have a new order",
      user: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    user.courses = userCourse;
    await user.save();
    next(new ErrorHandler(error.message, 500));
  }
});

// Get All Orders
export const getAllOrders = asyncErrorWrapper(async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// delete order
export const deleteOrder = asyncErrorWrapper(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});
