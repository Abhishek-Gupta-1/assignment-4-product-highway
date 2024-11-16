import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import NotificationService from "./notification.js";

export const toggleFollow = async (userId, followingId) => {
  try {
    // Input validation
    if (!userId || !followingId) {
      return {
        success: false,
        message: "UserId and followingId are required",
      };
    }

    if (userId === followingId) {
      return {
        success: false,
        message: "User cannot follow themselves",
      };
    }

    // Find both users
    const [currentUser, userToFollow] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(followingId),
    ]);

    // Validate both users exist
    if (!currentUser || !userToFollow) {
      return {
        success: false,
        message: "One or both users not found",
      };
    }

    // Initialize arrays if they don't exist
    if (!Array.isArray(currentUser.following)) {
      currentUser.following = [];
    }
    if (!Array.isArray(userToFollow.followers)) {
      userToFollow.followers = [];
    }

    // Check if already following
    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === followingId.toString()
    );

    if (alreadyFollowing) {
      // Remove from following and followers
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== followingId.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== userId.toString()
      );

      const state = "follow";

      await Promise.all([currentUser.save(), userToFollow.save()]);
      await NotificationService.newFollower(followingId, userId, state);

      return {
        success: true,
        message: "Successfully unfollowed the user",
        currentUser,
        userToFollow,
      };
    } else {
      // Add to following and followers
      currentUser.following.push(followingId);
      userToFollow.followers.push(userId);

      const state = "Unfollow";

      await Promise.all([currentUser.save(), userToFollow.save()]);
      await NotificationService.newFollower(followingId, userId, state);

      return {
        success: true,
        message: "Successfully followed the user",
        currentUser,
        userToFollow,
      };
    }
  } catch (error) {
    console.error("Error in toggleFollow:", error);
    return {
      success: false,
      message: "Error processing follow/unfollow request",
      error: error.message,
    };
  }
};

export const getFollowStats = async (userId) => {
  try {

    const findUser = await UserModel.findById(userId)
      .populate({
        path: "followers",
        select: "-password -createdAt -updatedAt",
        model: "User",
      })
      .populate({
        path: "following",
        select: "-password -createdAt -updatedAt",
        model: "User",
      })
      .select("-password -createdAt -updatedAt");


    if (!findUser) {
      return {
        success: false,
        message: "USer Not found",
      };
    }

    return {
      success: true,
      findUser,
    };
  } catch (error) {
    console.error("Error in getFollowStats:", error);
    return {
      success: false,
      message: "Error getting follow statistics",
      error: error.message,
    };
  }
};
