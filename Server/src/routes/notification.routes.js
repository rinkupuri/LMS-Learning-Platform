import express from "express";
import { userSpecific } from "../middleware/userSpecific.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getNotifications,
  readNotification,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.get("/get", isAuthenticated, userSpecific("admin"), getNotifications);
router.put(
  "/read/:id",
  isAuthenticated,
  userSpecific("admin"),
  readNotification
);

export default router;
