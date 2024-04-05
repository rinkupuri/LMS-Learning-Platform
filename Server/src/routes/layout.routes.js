import express from "express";
import { getLayout, layoutUpdate } from "../controllers/layout.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSpecific } from "../middleware/userSpecific.js";
const router = express.Router();

router.post("/update", isAuthenticated, userSpecific("admin"), layoutUpdate);
router.get("/get", getLayout);

export default router;
