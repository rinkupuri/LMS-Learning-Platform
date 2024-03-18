import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import User from "../models/User.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utilities/sendMail.js";
import { sendToken } from "../utilities/sendTocken.js";
import { redis } from "../config/redis.js";
import * as cloudinary from "cloudinary";

// user Register Route

export const registerUser = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) return next(new ErrorHandler("User already exist", 400));
  const user = {
    name,
    email,
    password,
    avatar,
  };
  const { activationCode, activationTocken } = await createActivationTocken(
    user
  );
  const data = { name, activationCode };
  try {
    await sendMail({
      email: email,
      subject: "Account Activation",
      template: "activation-mail.ejs",
      data: data,
    });
    res.status(201).json({
      success: true,
      message: "Please check email to verify email",
      token: activationTocken,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// creating Tocken Here

const createActivationTocken = async (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000);
  const activationTocken = await jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );
  return { activationCode, activationTocken };
};

// acount activation Route

export const activationRoute = asyncErrorWrapper(async (req, res, next) => {
  const { activationCode, activationToken } = req.body;
  const { user: reqUser, activationCode: code } = jwt.verify(
    activationToken,
    process.env.JWT_SECRET
  );

  if (code !== activationCode) {
    return next(new ErrorHandler("Invalid activation code", 400));
  }

  const user = await User.findOne({ email: reqUser.email });
  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  reqUser.isVerified = true;

  const newUser = await User.create(reqUser);
  sendToken(newUser, 201, res);
});

// login user Route

export const loginUser = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// logout user Route

export const logoutUser = asyncErrorWrapper(async (req, res, next) => {
  res.cookie("access_token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    maxAge: 0,
  });
  res.cookie("refresh_token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    maxAge: 0,
  });
  redis.del(req.userId);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// updating User Token

export const updateUserToken = asyncErrorWrapper(async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;
  const verifyToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
  if (!verifyToken) return next(new ErrorHandler("Invalid Token", 401));

  const user = await redis.get(verifyToken.id);
  if (!user) return next(new ErrorHandler("Invalid Token", 401));
  const userData = JSON.parse(user);
  const newAccessToken = jwt.sign(
    { id: userData._id },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "5m",
    }
  );
  const newRefreshToken = jwt.sign(
    { id: userData._id },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "3d",
    }
  );
  res.cookie("access_token", newAccessToken);
  res.cookie("refresh_token", newRefreshToken);
  res.status(200).json({
    success: true,
    message: "Token updated successfully",
    token: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

// get user

export const getUser = asyncErrorWrapper(async (req, res, next) => {
  const user = await redis.get(req.userId);
  if (user) {
    const newUser = JSON.parse(user);
    const { password, ...others } = newUser;
    res.status(200).json({
      success: true,
      user: others,
    });
  } else {
    const userDB = await User.findById(req.userId);
    const { password, ...others } = userDB;
    res.status(200).json({
      success: true,
      user: others,
    });
  }
});

// social login with google and facebook

export const socialAuth = asyncErrorWrapper(async (req, res, next) => {
  console.log(req.body);
  const { name, email, avatar } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    sendToken(user, 200, res);
  } else {
    const newUser = await User.create({
      name,
      email,
      avatar,
    });
    sendToken(newUser, 201, res);
  }
});

// update user
export const updateUser = asyncErrorWrapper(async (req, res, next) => {
  let redisUser = await redis.get(req.userId);
  const { name } = req.body;
  if (name === undefined)
    return next(new ErrorHandler("Please provide  name", 400));
  redisUser = JSON.parse(redisUser);
  if (name === redisUser.name) {
    return next(new ErrorHandler("Please provide new Details to update", 400));
  }
  const user = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
    runValidators: true,
  });
  await redis.set(req.userId, JSON.stringify(user), "EX", 608400);
  res.status(200).json({
    success: true,
    user,
  });
});

// update password

export const updatePassword = asyncErrorWrapper(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please provide old and new password", 400));
  if (newPassword.length < 6)
    return next(
      new ErrorHandler("Password must be at least 6 characters", 400)
    );
  if (oldPassword === newPassword)
    return next(
      new ErrorHandler("Old and new password must be different", 400)
    );
  const user = await User.findById(req.userId).select("+password");
  if (!user) return next(new ErrorHandler("User Doesn't exists"));
  if (user.password === undefined)
    return next(new ErrorHandler("Invalid password", 404));
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid old password", 400));
  user.password = newPassword;
  await user.save();
  await redis.set(req.userId, JSON.stringify(user), "EX", 608400);
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// update profile picture
export const updateProfilePicture = asyncErrorWrapper(
  async (req, res, next) => {
    try {
      if (!req.body.avatar)
        return next(new ErrorHandler("Please select image to update"));
      const user = await User.findById(req.userId);
      if (user.avatar.public_id) {
        cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      const newUser = await user.save();
      await redis.set(req.userId, JSON.stringify(user), "EX", 608400);
      res.status(200).json({
        success: true,
        user: newUser,
        message: "Profile Picture updated successfully",
      });
    } catch (err) {
      next(new ErrorHandler(JSON.stringify(err), 500));
    }
  }
);

// get All User

export const getAllUserAdmin = asyncErrorWrapper(async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// update user Role

export const updateUserRole = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  user.role = role;
  await user.save();
  await redis.del(id);
  await redis.set(id, JSON.stringify(user), "EX", 608400);
  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});

// delete User

export const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  if (user.avatar.public_id) {
    cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }
  await user.remove();
  await redis.del(id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
