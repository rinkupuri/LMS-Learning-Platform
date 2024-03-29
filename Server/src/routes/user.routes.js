import express from "express";
import {
  activationRoute,
  deleteUser,
  getAdminRoleUser,
  getAllUserAdmin,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUser,
  updateUserRole,
  updateUserToken,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSpecific } from "../middleware/userSpecific.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/activate", activationRoute);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refreshtoken", updateUserToken);
router.get("/me", isAuthenticated, getUser);
router.post("/socialauth", socialAuth);
router.put("/update", isAuthenticated, updateUser);
router.put("/update-password", isAuthenticated, updatePassword);
router.put("/update-profile", isAuthenticated, updateProfilePicture);
router.get(
  "/getAllAdmin",
  isAuthenticated,
  userSpecific("admin"),
  getAllUserAdmin
);
router.put(
  "/update-role",
  isAuthenticated,
  userSpecific("admin"),
  updateUserRole
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  userSpecific("admin"),
  deleteUser
);

router.get(
  "/getadmins",
  isAuthenticated,
  userSpecific("admin"),
  getAdminRoleUser
);

export default router;
