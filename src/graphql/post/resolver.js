import { createUserPost, showUserPost, updateUserPost, deleteUserPost } from "../../services/post.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import UserModal from "../../models/user.modal.js";

export const graphqlMiddleware = {
  Mutation: {
    createPost: authMiddleware,
    updatePost: authMiddleware,
    deletePost: authMiddleware,
  },
  Query: {
    userPosts: authMiddleware,
  },
};

export const postResolvers = {
  Query: {
    userPosts: async (_, { userId }, context) => {
      const res = await showUserPost(userId);
      return res;
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const userId = context.user.id;
      const res = await createUserPost(userId, args);
      return res;
    },
    updatePost: async (_, args, context) => {
      const userId = context.user.id;
      const res = await updateUserPost(userId, args);
      return res;
    },
    deletePost: async (_, args, context) => {
      const userId = context.user.id;
      const res = await deleteUserPost(userId, args);
      return res;
    },
  },
  Post: {
    user: async (post) => {
      const user = await UserModal.findById(post.userId);
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    },
    likes: async (post) => {
      const users = await UserModal.find({
        _id: { $in: post.likes }
      });
      return users.map(user => ({
        id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
    }
  }
};