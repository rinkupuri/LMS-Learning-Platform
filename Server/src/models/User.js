import mongoose from "Mongoose";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
      match: [emailRegexPattern, "Please enter a valid email"],
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      public_id: String,
      url: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash passsword before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrpt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bycrpt.compare(enteredPassword, this.password);
};

// create Access token

userSchema.methods.createrAccessToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });
};

// Refresh tocken

userSchema.methods.createRefreshToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "3d",
  });
};

export default mongoose.model("User", userSchema);
