import { createUserPost, showUserPost, deleteUserPost, updateUserPost} from "../services/post.js";

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
        const result = await showUserPost(userId);
        
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: result.data,
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
        const postId = req.params.postId;  

        const result = await deleteUserPost(userId, { postId });

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
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
        const { postId, content } = req.body;

        const result = await updateUserPost(userId, { postId, content });

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: result.data,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error updating post",
        });
    }
}