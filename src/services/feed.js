import UserModal from "../models/user.modal.js";
import PostModel from "../models/post.model.js";

export const getUserFeed = async (userId, options = {}) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Validate and sanitize pagination options
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(options.limit) || 10));
    const skip = (page - 1) * limit;

    // Get user and verify existence
    const user = await UserModal.findById(userId).select('following');

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Handle case when user follows no one
    if (!Array.isArray(user.following) || user.following.length === 0) {
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

    // Get total count and posts concurrently
    const [totalPosts, posts] = await Promise.all([
      PostModel.countDocuments({
        userId: { $in: user.following },
      }),
      PostModel.find({
        userId: { $in: user.following },
      })
        .populate('userId', 'name username avatar')
        .select('content likes createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    ]);

    if (!posts.length) {
      return {
        success: true,
        message: "No posts found for the current page",
        data: {
          posts: [],
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            hasMore: false,
          },
        },
      };
    }

    // Transform posts with proper likes handling
    const transformedPosts = posts.map(post => {
      try {
        // Ensure likes is always an array
        const likesArray = post.likes || [];

        return {
          postId: post._id,
          content: post.content,
          author: post.userId ? {
            userId: post.userId._id,
            name: post.userId.name,
            username: post.userId.username,
            profilePic: post.userId.avatar
          } : null,
          likes: likesArray, 
          likeCount: likesArray.length,
          isLiked: likesArray.includes(userId),
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      } catch (error) {
        console.error(`Error transforming post ${post._id}:`, error);
        return null;
      }
    }).filter(Boolean);

    const totalPages = Math.ceil(totalPosts / limit);

    return {
      success: true,
      message: transformedPosts.length ? "Posts fetched successfully" : "No posts found",
      data: {
        posts: transformedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasMore: page < totalPages,
          limit,
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
