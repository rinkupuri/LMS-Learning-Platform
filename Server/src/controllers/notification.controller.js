import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import Notification from "../models/Notification.js";
import ErrorHandler from "../utilities/ErrorHandler.js";

// get all notifications
export const getNotifications = asyncErrorWrapper(async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
});

// read Notification
export const readNotification = asyncErrorWrapper(async (req, res, next) => {
  try {
    const not = await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });
    if (!not) {
      return next(new ErrorHandler("Notification not found", 404));
    }
    const notification = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      notification,
    });
  } catch (err) {
    next(new ErrorHandler(err, 500));
  }
});

// create a cron who run in every 4 sec and log somwthing
import cron from "node-cron";
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDayAgo = new Date() - 30 * 24 * 60 * 60 * 1000;
  await Notification.deleteMany(
    { read: true },
    { createdAt: { $lt: thirtyDayAgo } }
  );
  console.log("Notification is Deleted");
});
