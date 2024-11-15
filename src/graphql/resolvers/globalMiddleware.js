import { authMiddleware } from "../../middleware/authMiddleware.js";

export const graphqlMiddleware = {
  Mutation: {
    updateUser: authMiddleware,
    createPost: authMiddleware,
    updatePost: authMiddleware,
    deletePost: authMiddleware,
  },
  Query: {
    userPosts: authMiddleware,
  },
};
