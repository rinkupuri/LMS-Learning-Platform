import User from "../models/User.js";
import { redis } from "../config/redis.js";

export const sendToken = async (user, statusCode, res) => {
  // sending data to redis

  await redis.set(user.id, JSON.stringify(user), (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  // sending token
  const accessToken = await user.createrAccessToken();
  const refreshToken = await user.createRefreshToken();

  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    sameSite: "none",
  };
  const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  const { password, ...others } = user._doc;

  res.status(statusCode).json({
    success: true,
    user: others,
    accessToken,
  });
};
