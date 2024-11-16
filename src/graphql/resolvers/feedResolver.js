import { getUserFeed } from "../../services/feed.js";

export const feedResolvers = {
  Query: {
    feed: async (_, { options }, context) => {
      const userId = context.user.id;
      
      const feedResponse = await getUserFeed(userId, options);
      
      return feedResponse;
    }
  }
};