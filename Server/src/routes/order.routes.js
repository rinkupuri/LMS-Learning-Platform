import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";
import { userSpecific } from "../middleware/userSpecific.js";

router.post("/create", isAuthenticated, createOrder);
router.get("/getAll", isAuthenticated, userSpecific("admin"), getAllOrders);

export default router;
