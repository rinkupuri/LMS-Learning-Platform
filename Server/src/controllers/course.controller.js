import { asyncErrorWrapper } from "../middleware/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utilities/ErrorHandler.js";
import Course from "../models/Course.js";
import { redis } from "../config/redis.js";
import User from "../models/User.js";
import sendMail from "../utilities/sendMail.js";
import Notification from "../models/Notification.js";
import axios from "axios";

// create course route
export const createCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const data = req.body;
    const uploadThumbnail = await cloudinary.v2.uploader.upload(
      data.thumbnail.url,
      {
        folder: "course",
      }
    );
    data.thumbnail = {
      public_id: uploadThumbnail.public_id,
      url: uploadThumbnail.secure_url,
    };
    const course = await Course.create(data);
    res.status(200).json({
      success: true,
      message: "create course",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(JSON.stringify(error), 500));
  }
});

// update course route

export const updateCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Course not found", 404));
    const data = req.body;
    if (data.thumbnail.url.includes("data:image/"))
      if (course.thumbnail?.public_id !== "") {
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
        const uploadThumbnail = await cloudinary.v2.uploader.upload(
          data.thumbnail?.url,
          {
            folder: "course",
          }
        );
        console.log(uploadThumbnail);
        data.thumbnail = {
          public_id: uploadThumbnail.public_id,
          url: uploadThumbnail.secure_url,
        };
      } else {
        const uploadThumbnail = await cloudinary.v2.uploader.upload(
          data.thumbnail?.url,
          {
            folder: "course",
          }
        );
        data.thumbnail = {
          public_id: uploadThumbnail.public_id,
          url: uploadThumbnail.secure_url,
        };
      }
    await Course.findByIdAndUpdate(req.params.id, data);
    await redis.del(req.params.id);
    await redis.set(req.params.id, JSON.stringify(data), "EX", 604800);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "update course",
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error, 500));
  }
});

// get all course

export const getAllCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const redisExist = await redis.get("allCourses");
    if (redisExist) {
      return res.status(200).json({
        success: true,
        message: "get all course",
        courses: JSON.parse(redisExist),
      });
    } else {
      const courses = await Course.find().select(
        "-courseData.videoUrl -courseData.question -courseData.suggestion -courseData.links "
      );
      await redis.set("allCourses", JSON.stringify(courses), "EX", 604800);
      return res.status(200).json({
        success: true,
        message: "get all course",
        courses,
      });
    }
  } catch (error) {
    next(new ErrorHandler(JSON.stringify(error), 500));
  }
});

// get custom 1 course

export const getCustomCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const id = req.params.id;
    const redisExist = await redis.get(id);
    if (redisExist) {
      return res.status(200).json({
        success: true,
        message: "get custom course",
        course: JSON.parse(redisExist),
      });
    } else {
      const course = await Course.findById(req.params.id).select(
        "-courseData.videoUrl -courseData.question -courseData.suggestion -courseData.links "
      );
      if (!course) return next(new ErrorHandler("Course not found", 404));
      await redis.set(id, JSON.stringify(course), "EX", 604800);
      return res.status(200).json({
        success: true,
        message: "get custom course",
        course,
      });
    }
  } catch (error) {
    next(new ErrorHandler(JSON.stringify(error), 500));
  }
});

// get Course For Admin
export const getCustomCourseForAdmin = asyncErrorWrapper(
  async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return next(new ErrorHandler("Course not found", 404));
      return res.status(200).json({
        success: true,
        message: "get custom course",
        course,
      });
    } catch (error) {
      next(new ErrorHandler(JSON.stringify(error), 500));
    }
  }
);

// get purchased course

export const getPurchasedCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const courseList = user.courses;
    if (!courseList) {
      return next(new ErrorHandler("Contact to Admin to Resolve", 404));
    }
    const courseIsExist = await courseList.find(
      (course) => course.courseId === req.params.id
    );
    if (!courseIsExist) {
      return next(new ErrorHandler("Invalid API Route", 404));
    }
    const course = await Course.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Course Details",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// updating question

export const updateQuestion = asyncErrorWrapper(async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));
    const user = await User.findById(req.userId);
    const { question } = req.body;
    if (!question) {
      return next(new ErrorHandler("Invalid API Route", 404));
    }
    course.courseData[0].question.push({
      user,
      question,
    });
    await course.save();
    await Notification.create({
      title: "New Question",
      message: `You have a new question on ${course.name}`,
      user: req.userId,
    });
    await redis.del(req.body.courseId);
    await redis.set(req.body.courseId, JSON.stringify(course), "EX", 604800);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "Question Updated",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// adding answer

export const addAnswer = asyncErrorWrapper(async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.courseId);
    const user = await User.findById(req.userId);
    if (!course) return next(new ErrorHandler("Course not found", 404));
    const { answer } = req.body;
    if (!answer) {
      return next(new ErrorHandler("Please provide answer to add", 404));
    }
    await course.courseData[0].question.map((question) => {
      if (question._id.toString() === req.body.id) {
        question.questionReply.push({
          user,
          answer: answer,
        });
        if (req.userId !== question.user._id.toString()) {
          const data = {
            name: question.user.name,
            title: course.courseData[0].title,
            link: course._id,
          };
          sendMail({
            email: question.user.email,
            subject: "Update on Query on LMS Panel",
            template: "email.ejs",
            data: data,
          });
        }
      }
    });
    await course.save();
    await redis.del(req.body.courseId);
    await redis.set(req.body.courseId, JSON.stringify(course), "EX", 604800);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "Answer Added",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// add review to course

export const addReview = asyncErrorWrapper(async (req, res, next) => {
  try {
    const userRaw = await redis.get(req.userId);
    const user = JSON.parse(userRaw);
    if (!user) return next(new ErrorHandler("Please login to add review", 404));
    const courseIsExist = user?.courses?.find(
      (course) => course.courseId === req.params.id
    );
    if (!courseIsExist)
      return next(new ErrorHandler("You have no access to this course", 404));
    const { review, reviewRating } = req.body;
    if (!review || !reviewRating)
      return next(new ErrorHandler("Please provide review and rating", 404));
    const course = await Course.findById(req.params.id);
    course.reviews.push({ user, review, reviewRating });
    await course.save();
    await redis.del(req.params.id);
    await redis.set(req.params.id, JSON.stringify(course), "EX", 604800);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "Review Added",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// add reply to review

export const replyReview = asyncErrorWrapper(async (req, res, next) => {
  try {
    const userRaw = await redis.get(req.userId);
    const user = JSON.parse(userRaw);
    const { comment } = req.body;
    if (!comment) return next(new ErrorHandler("Please provide comment", 404));
    const course = await Course.findById(req.params.id);
    course.reviews.map((review) => {
      if (review._id.toString() === req.body.id) {
        review.reviewReply.push({ user, comment });
      }
    });
    await course.save();
    await redis.del(req.params.id);
    await redis.set(req.params.id, JSON.stringify(course), "EX", 604800);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "Reply Added",
      course,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// get All Courses for admin

export const getAllCoursesForAdmin = asyncErrorWrapper(
  async (req, res, next) => {
    try {
      const courses = await Course.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete course

export const deleteCourse = asyncErrorWrapper(async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Course not found", 404));
    await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
    await Course.findByIdAndDelete(req.params.id);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      message: "Course Deleted",
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});

// create video ciper otp and playerinfo
export const vidociper = asyncErrorWrapper(async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const responce = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {
        // Request body
      },
      {
        headers: {
          Authorization: `Apisecret ${process.env.VDOCIPERAPI}`,
          "Content-Type": "application/json",
        },
        params: {
          ttl: 300,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "otp created",
      otp: responce.data.otp,
      playbackInfo: responce.data.playbackInfo,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
});
