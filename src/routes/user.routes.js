import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { register, login, update } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", authenticateUser, update);

export default router;
