import mongoose from "mongoose";
import PostModel from "../models/post.model.js";

export const createUserPost = async (userId, data) => {
  try {
    const { content } = data;
    console.log("the post content : ", content);
    console.log("ther user id : ", userId);

    const newPost = new PostModel({
      content,
      userId,
    });

    const savePost = await newPost.save();
    console.log("Post created: ", savePost);

    // Transform the response to include explicit postId
    const transformedPost = {
      postId: savePost._id,
      content: savePost.content,
      userId: savePost.userId,
      likes: savePost.likes,
      createdAt: savePost.createdAt,
      updatedAt: savePost.updatedAt,
      isActive: savePost.isActive,
    };

    return {
      success: true,
      data: {
        post: transformedPost,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error Posting the content",
      error: error.message,
    };
  }
};

export const showUserPost = async (userId) => {
  try {
    const posts = await PostModel.find({
      userId,
    }).sort({ createdAt: -1 });

    // Transform each post to include explicit postId
    const transformedPosts = posts.map((post) => ({
      postId: post._id,
      content: post.content,
      userId: post.userId,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isActive: post.isActive,
    }));

    return {
      success: true,
      data: {
        posts: transformedPosts,
        count: transformedPosts.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error retrieving posts",
      error: error.message,
    };
  }
};

export const updateUserPost = async (userId, data) => {
  try {
    const { postId, content } = data;

    const post = await PostModel.findOne({
      _id: postId,
      userId,
      isActive: true,
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found or you don't have permission to update",
      };
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );

    // Transform the response to include explicit postId
    const transformedPost = {
      postId: updatedPost._id,
      content: updatedPost.content,
      userId: updatedPost.userId,
      likes: updatedPost.likes,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
      isActive: updatedPost.isActive,
    };

    return {
      success: true,
      data: {
        post: transformedPost,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating post",
      error: error.message,
    };
  }
};

export const deleteUserPost = async (userId, data) => {
  try {
    const { postId } = data;

    if (!postId) {
      return {
        success: false,
        message: "PostId is required",
      };
    }

    const deletedPost = await PostModel.findOneAndDelete({
      _id: postId,
      userId,
    });

    if (!deletedPost) {
      return {
        success: false,
        message: "Post not found or you don't have permission to delete",
      };
    }

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteUserPost:", error);
    return {
      success: false,
      message: "Error deleting post",
      error: error.message,
    };
  }
};

export const togglePostLike = async (userId, data) => {
  try {
    const { postId } = data;

    const objectId = new mongoose.Types.ObjectId(postId);
    const post = await PostModel.findById(objectId);


    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    const hasLiked = post.likes.includes(userId);

    let updatedPost;
    if (!hasLiked) {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );
    } else {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    }

    const transformedPost = {
      postId: updatedPost._id,
      content: updatedPost.content,
      userId: updatedPost.userId,
      likes: updatedPost.likes,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
      isActive: updatedPost.isActive,
    };

    return {
      success: true,
      data: {
        post: transformedPost,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error toggling post like",
      error: error.message,
    };
  }
};
