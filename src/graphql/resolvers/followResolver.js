import { toggleFollow, getFollowStats } from "../../services/follow.js";

export const followResolvers = {
  Query: {
    followStats: async (_, { userId }, context) => {
      if (!context.user) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const response = await getFollowStats(userId);
      return response;
    },
  },

  Mutation: {
    toggleFollow: async (_, { followingId }, context) => {
      const userId = context.user.id;
      const response = await toggleFollow(userId, followingId);
      return response;
    },
  },
};
