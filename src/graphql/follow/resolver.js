import { toggleFollow, getFollowStats } from "../../services/follow.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const graphqlMiddleware = {
  Mutation: {
    toggleFollow: authMiddleware,
  },
  Query: {
    followStats: authMiddleware,
  }
};

export const followResolvers = {
  Query: {
    followStats: async (_, { userId }, context) => {
      const res = await getFollowStats(userId);
      
      if (res.success) {
        // Get the authenticated user's ID to check if they're following
        const authUserId = context.user.id;
        
        // Check if the authenticated user is following the requested user
        const isFollowing = res.data.followers.some(
          followerId => followerId.toString() === authUserId
        );
        
        return {
          ...res,
          data: {
            ...res.data,
            following: isFollowing
          }
        };
      }
      
      return res;
    }
  },
  Mutation: {
    toggleFollow: async (_, { userId }, context) => {
      const systemId = context.user.id;
      const res = await toggleFollow(systemId, { userId });
      
      if (res.success) {
        // Get updated stats after toggle
        const statsRes = await getFollowStats(userId);
        return {
          ...res,
          data: {
            ...res.data,
            stats: statsRes.success ? statsRes.data.stats : null
          }
        };
      }
      
      return res;
    }
  }
};