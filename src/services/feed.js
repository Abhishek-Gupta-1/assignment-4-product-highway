import FollowModel from "../models/follow.model.js";
import PostModel from "../models/post.model.js";

export const getUserFeed = async (systemId, options = {}) => {
  try {
    // Default pagination options
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    // Get list of users that systemId follows
    const following = await FollowModel.find({ 
      systemId 
    }).select('userId');
    
    const followedUserIds = following.map(follow => follow.userId);

    // If user follows no one, return empty feed
    if (followedUserIds.length === 0) {
      return {
        success: true,
        message: "No posts available - try following some users!",
        data: {
          posts: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalPosts: 0,
            hasMore: false
          }
        }
      };
    }

    // Get total count for pagination
    const totalPosts = await PostModel.countDocuments({
      userId: { $in: followedUserIds },
      isActive: true
    });

    // Get posts from followed users
    const posts = await PostModel.find({
      userId: { $in: followedUserIds },
      isActive: true
    })
    .sort({ createdAt: -1 }) 
    .skip(skip)
    .limit(limit)
    .populate('userId', 'name username profilePic') 

    // Transform posts for consistent response
    const transformedPosts = posts.map(post => ({
      postId: post._id,
      content: post.content,
      author: {
        userId: post.userId._id,
        name: post.userId.name,
        username: post.userId.username,
        profilePic: post.userId.profilePic
      },
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }));

    const totalPages = Math.ceil(totalPosts / limit);

    return {
      success: true,
      data: {
        posts: transformedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasMore: page < totalPages
        }
      }
    };

  } catch (error) {
    console.error('Error in getUserFeed:', error);
    return {
      success: false,
      message: "Error fetching user feed",
      error: error.message
    };
  }
};