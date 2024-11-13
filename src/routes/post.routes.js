import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { createPost, showPost, deletePost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", authenticateUser, showPost);          
router.post("/", authenticateUser, createPost);       
router.delete("/:postId", authenticateUser, deletePost); 
router.put("/", authenticateUser, updatePost);   

export default router;