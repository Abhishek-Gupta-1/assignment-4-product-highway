import { authMiddleware } from "./authMiddleware.js";

//This is where we are connecting the authMiddleware to specific API's which are depended on data from authToken or need authorisation

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
