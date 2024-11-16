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
      console.log("thse userdi : ", userId, "and the contest id: ", context.user.userId);
      const response = await toggleFollow(userId, followingId);
      return response;
    },
  },
};
