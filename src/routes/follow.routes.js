import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { handleToggleFollow, getFollowerStats } from "../controllers/followController.js";

const router = express.Router();

router.post("/toggle", authenticateUser, handleToggleFollow);
router.get("/stats/:userId?", authenticateUser, getFollowerStats);

export default router;