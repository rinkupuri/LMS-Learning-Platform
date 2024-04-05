import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { ErrorMiddleware } from "./middleware/error.js";
export const app = express();
import user from "./routes/user.routes.js";
import course from "./routes/course.routes.js";
import order from "./routes/order.routes.js";
import notification from "./routes/notification.routes.js";
import analaytics from "./routes/analyatics.routes.js";
import layout from "./routes/layout.routes.js";

// using json
app.use(express.json({ limit: "50mb" }));

// using cookie parser
app.use(cookieParser());

// using morgan to see request
app.use(morgan("tiny"));

// using cors

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://lms-learning-platform-sage.vercel.app",
    ],
    credentials: true,
  })
);

// user related all routes
app.use("/api/users", user);
// couse related all routes
app.use("/api/course", course);
// All order Routes
app.use("/api/order", order);
// Get All Notification
app.use("/api/notification", notification);
// Analyatics
app.use("/api/analytics", analaytics);
//Layout
app.use("/api/layout", layout);

// listining server
app.get("/", (req, res) => {
  res.send("object");
});

app.all("*", (req, res, next) => {
  res.status(404).json({ success: false, meassge: "Request Url not Found" });
});

// using error middleware
app.use(ErrorMiddleware);
