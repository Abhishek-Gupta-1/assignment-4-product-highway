import { authMiddleware } from "../../middleware/authMiddleware.js";

export const graphqlMiddleware = {
  Mutation: {
    updateUser: authMiddleware,
    createPost: authMiddleware,
    updatePost: authMiddleware,
    deletePost: authMiddleware,
    toggleFollow: authMiddleware,

  },
  Query: {
    userPosts: authMiddleware,
    followStats: authMiddleware,
    feed: authMiddleware

  },
};
