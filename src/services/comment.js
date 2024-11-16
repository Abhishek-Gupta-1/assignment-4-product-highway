import CommentModel from "../models/comment.model.js";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";
import mongoose from "mongoose";
import NotificationService from "./notification.js";

export const createComment = async (userId, data) => {
  try {
    const { postId, content } = data;

    const userExists = await UserModel.findOne({
      _id: userId,
    });

    if (!userExists) {
      return {
        success: false,
        message: "User not found or inactive",
      };
    }

    const post = await PostModel.findOne({
      _id: postId,
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found or inactive",
      };
    }

    const newComment = new CommentModel({
      content,
      postId,
      userId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const savedComment = await newComment.save({ session });

      await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: savedComment._id } },
        { session }
      );

      await NotificationService.newComment(savedComment, post.userId);

      await session.commitTransaction();

      const transformedComment = {
        commentId: savedComment._id,
        content: savedComment.content,
        postId: savedComment.postId,
        userId: savedComment.userId,
        createdAt: savedComment.createdAt,
        updatedAt: savedComment.updatedAt,
        isActive: savedComment.isActive,
      };

      return {
        success: true,
        data: {
          comment: transformedComment,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return {
      success: false,
      message: "Error creating comment",
      error: error.message,
    };
  }
};

export const deleteComment = async (userId, data) => {
  try {
    const { commentId } = data;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const comment = await CommentModel.findOne({
        _id: commentId,
        userId,
      });

      if (!comment) {
        await session.abortTransaction();
        session.endSession();
        return {
          success: false,
          message: "Comment not found or you don't have permission to delete",
        };
      }

      await CommentModel.findByIdAndDelete(commentId, { session });

      await PostModel.findByIdAndUpdate(
        comment.postId,
        { $pull: { comments: commentId } },
        { session }
      );

      await session.commitTransaction();

      return {
        success: true,
        message: "Comment deleted successfully",
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return {
      success: false,
      message: "Error deleting comment",
      error: error.message,
    };
  }
};

export const getPostComments = async (postId) => {
  try {
    const post = await PostModel.findOne({
      _id: postId,
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found or inactive",
      };
    }

    const comments = await CommentModel.find({
      postId,
    }).sort({ createdAt: -1 });

    const transformedComments = comments.map((comment) => ({
      commentId: comment._id,
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      isActive: comment.isActive,
    }));

    return {
      success: true,
      data: {
        comments: transformedComments,
        count: transformedComments.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error retrieving comments",
      error: error.message,
    };
  }
};

export const updateComment = async (userId, data) => {
  try {
    const { commentId, content } = data;

    const userExists = await UserModel.findOne({
      _id: userId,
    });

    if (!userExists) {
      return {
        success: false,
        message: "User not found or inactive",
      };
    }

    const comment = await CommentModel.findOne({
      _id: commentId,
      userId,
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found or you don't have permission to update",
      };
    }

    const post = await PostModel.findOne({
      _id: comment.postId,
    });

    if (!post) {
      return {
        success: false,
        message: "Associated post not found or inactive",
      };
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        {
          content,
          updatedAt: new Date(), 
        },
        {
          new: true,
          session,
        }
      );

      await session.commitTransaction();

      const transformedComment = {
        commentId: updatedComment._id,
        content: updatedComment.content,
        postId: updatedComment.postId,
        userId: updatedComment.userId,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt,
        isActive: updatedComment.isActive,
      };

      return {
        success: true,
        data: {
          comment: transformedComment,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return {
      success: false,
      message: "Error updating comment",
      error: error.message,
    };
  }
};
