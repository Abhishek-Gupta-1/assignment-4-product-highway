import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {showPost, createPost, deletePost, updatePost} from "../controllers/postController.js";


const router = express.Router();

router.get("/show", authenticateUser, showPost);
router.post("/create", authenticateUser, createPost);
router.post("/delete", authenticateUser, deletePost);
router.post("/update", authenticateUser, updatePost);

export default router;
