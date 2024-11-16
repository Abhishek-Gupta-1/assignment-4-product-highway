import UserModal from "../models/user.modal.js";
import PostModel from "../models/post.model.js";

export const getUserFeed = async (userId, options = {}) => {
  try {
    console.log("userdid: ", userId);

    // Default pagination options
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    // Get user's following list directly from UserModal
    const user = await UserModal.findById(userId);

    console.log("user: ", user);

    // If user not found or follows no one, return empty feed
    if (!user || user.following.length === 0) {
      return {
        success: true,
        message: "No posts available - try following some users!",
        data: {
          posts: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalPosts: 0,
            hasMore: false,
          },
        },
      };
    }

    // Get total count for pagination
    const totalPosts = await PostModel.countDocuments({
      userId: { $in: user.following },
    });

    console.log("tot cou: ", totalPosts);

    // Get posts from followed users
    const posts = await PostModel.find({
      userId: { $in: user.following },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    

    console.log("posts: ", posts);

    // Transform posts for consistent response
    const transformedPosts = posts.map((post) => ({
      postId: post._id,
      content: post.content,
      author: {
        userId: post.userId._id,
        name: post.userId.name,
        username: post.userId.username,
        profilePic: post.userId.avatar, // Changed to match schema
      },
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    console.log("treansform psot: ", transformedPosts);

    const totalPages = Math.ceil(totalPosts / limit);

    return {
      success: true,
      data: {
        posts: transformedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasMore: page < totalPages,
        },
      },
    };
  } catch (error) {
    console.error("Error in getUserFeed:", error);
    return {
      success: false,
      message: "Error fetching user feed",
      error: error.message,
    };
  }
};
