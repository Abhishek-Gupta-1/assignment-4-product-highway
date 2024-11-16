import { togglePostLike } from "../services/post.js";
import { authMiddleware } from "./authMiddleware.js";

export const graphqlMiddleware = {
  Mutation: {
    updateUser: authMiddleware,
    createPost: authMiddleware,
    updatePost: authMiddleware,
    deletePost: authMiddleware,
    toggleFollow: authMiddleware,
    togglePostLike: authMiddleware,
  },
  Query: {
    userPosts: authMiddleware,
    followStats: authMiddleware,
    feed: authMiddleware,
  },
};
