import express from "express";
import {
  addAnswer,
  addReview,
  createCourse,
  deleteCourse,
  getAllCourse,
  getAllCoursesForAdmin,
  getCustomCourse,
  getCustomCourseForAdmin,
  getPurchasedCourse,
  replyReview,
  updateCourse,
  updateQuestion,
  vidociper,
} from "../controllers/course.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSpecific } from "../middleware/userSpecific.js";
const router = express.Router();

router.post("/create", isAuthenticated, userSpecific("admin"), createCourse);
router.put("/update/:id", isAuthenticated, userSpecific("admin"), updateCourse);
router.get("/get", isAuthenticated, getAllCourse);
router.get("/get/:id", isAuthenticated, getCustomCourse);
router.get("/access/:id", isAuthenticated, getPurchasedCourse);
router.put("/questions", isAuthenticated, updateQuestion);
router.put("/addanswer", isAuthenticated, addAnswer);
router.put("/review/:id", isAuthenticated, addReview);
router.put(
  "/reviewreply/:id",
  isAuthenticated,
  userSpecific("admin"),
  replyReview
);
router.get(
  "/getAllAdmin",
  isAuthenticated,
  userSpecific("admin"),
  getAllCoursesForAdmin
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  userSpecific("admin"),
  deleteCourse
);

router.get(
  "/getacourse/:id",
  isAuthenticated,
  userSpecific("admin"),
  getCustomCourseForAdmin
);

router.post("/vidociper/:id", vidociper);

export default router;
