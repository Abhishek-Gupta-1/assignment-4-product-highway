import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { getFeed } from "../controllers/feedController.js";

const router = express.Router();

router.get("/", authenticateUser, getFeed);

export default router;