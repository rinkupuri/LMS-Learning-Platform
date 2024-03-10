import express from "express";
import {
  courseAnalyatics,
  orderAnalyatics,
  userAnalyatics,
} from "../controllers/analyatics.controller.js";
const router = express.Router();
import { isAuthenticated } from "../middleware/isAuthenticated.js";

router.get("/analyatics-order", isAuthenticated, orderAnalyatics);
router.get("/analyatics-course", isAuthenticated, courseAnalyatics);
router.get("/analyatics-user", isAuthenticated, userAnalyatics);

export default router;
