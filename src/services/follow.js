// services/follow.js
import FollowModel from "../models/follow.model.js";

export const toggleFollow = async (systemId, data) => {
  try {
    const { userId } = data;

    if (!userId) {
      return {
        success: false,
        message: "UserId is required"
      };
    }

    if (systemId === userId) {
      return {
        success: false,
        message: "You cannot follow yourself"
      };
    }

    // Check if already following
    const existingFollow = await FollowModel.findOne({
      systemId,
      userId
    });

    if (existingFollow) {
      // Unfollow - remove the existing follow
      await FollowModel.findByIdAndDelete(existingFollow._id);
      return {
        success: true,
        message: "User unfollowed successfully",
        data: {
          following: false
        }
      };
    } else {
      // Follow - create new follow
      const newFollow = new FollowModel({
        systemId,
        userId
      });
      await newFollow.save();
      return {
        success: true,
        message: "User followed successfully",
        data: {
          following: true
        }
      };
    }
  } catch (error) {
    console.error('Error in toggleFollow:', error);
    return {
      success: false,
      message: "Error processing follow/unfollow request",
      error: error.message
    };
  }
};

export const getFollowStats = async (userId) => {
  try {
    const [followers, following] = await Promise.all([
      FollowModel.countDocuments({ userId }), // People following this user
      FollowModel.countDocuments({ systemId: userId }) // People this user follows
    ]);

    return {
      success: true,
      data: {
        followers,
        following
      }
    };
  } catch (error) {
    console.error('Error in getFollowStats:', error);
    return {
      success: false,
      message: "Error getting follow statistics",
      error: error.message
    };
  }
};