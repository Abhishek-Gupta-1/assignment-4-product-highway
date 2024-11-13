import { createUserPost, showPost, deletePost, updatePost} from "../services/post.js";

export const createPost = async(req, res) => {
    try {
        const userId = req.user.id;
        const postCreated = await createUserPost(userId, req.body);
        return res.status(201).json({ 
            success: true, 
            message: "Post created successfully",
            data: postCreated,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error creating Post",
        });
    }
}

export const showPost = async(req, res) => {
    try {
        const userId = req.user.id;
        const posts = await showUserPost(userId, req.body);
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully", 
            data: posts,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error retrieving posts", 
        });
    }
}

export const deletePost = async(req, res) => {
    try {
        const userId = req.user.id;
        const deletedPost = await deleteUserPost(userId, req.body);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",  
            data: deletedPost,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error deleting post",  
        });
    }
}

export const updatePost = async(req, res) => {  
    try {
        const userId = req.user.id;
        const updatedPost = await updateUserPost(userId, req.body);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",  
            data: updatedPost,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error updating post",  
        });
    }
}