import jwt from "jsonwebtoken";
import { redis } from "../config/redis.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import { asyncErrorWrapper } from "./catchAsyncErrors.js";
export const isAuthenticated = asyncErrorWrapper(async (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const verify = jwt.verify(access_token, process.env.ACCESS_TOKEN);
  console.log(verify);
  if (!verify) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  redis.get(verify.id, (err, data) => {
    if (err) throw next(new ErrorHandler("User Not Logedin", 401));
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
  req.userId = verify.id;
  next();
});
