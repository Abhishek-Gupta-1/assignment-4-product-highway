import { authMiddleware } from "./authMiddleware.js";

export const graphqlMiddleware = {
  Mutation: {
    updateUser: authMiddleware,
    createPost: authMiddleware,
    updatePost: authMiddleware,
    deletePost: authMiddleware,
    toggleFollow: authMiddleware,
    togglePostLike: authMiddleware,
    createComment: authMiddleware,
    updateComment: authMiddleware,
    deleteComment: authMiddleware,

  },
  Query: {
    userPosts: authMiddleware,
    followStats: authMiddleware,
    feed: authMiddleware,
    getPostComments: authMiddleware,
  },
};
