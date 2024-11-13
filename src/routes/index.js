import express from "express";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import followRoutes from "./follow.routes.js";
import feedRoutes from "./feed.routes.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/follow", followRoutes);
router.use("/feed", feedRoutes);


export default router;
