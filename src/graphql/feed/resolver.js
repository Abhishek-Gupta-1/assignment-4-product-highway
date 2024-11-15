import { getUserFeed } from "../../services/feed.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const graphqlMiddleware = {
  Query: {
    feed: authMiddleware
  }
};

export const feedResolvers = {
  Query: {
    feed: async (_, { options }, context) => {
      // Get the authenticated user's ID from context
      const userId = context.user.id;
      
      // Call the feed service with userId and pagination options
      const feedResponse = await getUserFeed(userId, options);
      
      return feedResponse;
    }
  }
};