import mongoose from "mongoose";
import UserModel from "../models/user.modal.js";

export const toggleFollow = async (userId, followingId) => {
  try {
    if (userId == followingId) {
      return {
        success: false,
        message: "User Can't Follow ItSelf",
      };
    }
    console.log("user id ", userId, "follwing id : ", followingId);
    if (!userId) {
      return {
        success: false,
        message: "UserId is required",
      };
    }

    const findFollowing = await UserModel.findById(followingId);

    if (!findFollowing) {
      return {
        success: false,
        message: "Follwing Account not found",
      };
    }

    if (!Array.isArray(findFollowing.followers)) {
      findFollowing.followers = [];
    }

    // Check if the user already follows
    const alreadyFollows = findFollowing.followers.some(
      (followerId) => followerId.toString() === userId.toString()
    );

    if (alreadyFollows) {
      // Remove the user from followers
      findFollowing.followers = findFollowing.followers.filter(
        (followerId) => followerId.toString() !== userId.toString()
      );
      await findFollowing.save();
      return {
        success: true,
        message: "Successfully unfollowed the user",
        findFollowing,
      };
    } else {
      // Add the user to followers
      findFollowing.followers.push(userId);
      await findFollowing.save();
      return {
        success: true,
        message: "Successfully followed the user",
        findFollowing,
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
    console.log("USERID", userId);

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

    console.log("USER ", findUser);

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
