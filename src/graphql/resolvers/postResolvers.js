import {
  createUserPost,
  showUserPost,
  updateUserPost,
  deleteUserPost,
  togglePostLike,
} from "../../services/post.js";
import UserModal from "../../models/user.modal.js";

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
      console.log("createuserpost");
      const res = await createUserPost(userId, args);
      return res;
    },
    updatePost: async (_, args, context) => {
      const userId = context.user.id;
      const res = await updateUserPost(userId, args);
      return res;
    },
    togglePostLike: async (_, { postId }, context) => {
      console.log(
        "the post Id is : ",
        postId,
        "and the context is : ",
        context
      );
      const userId = context.user.id;
      console.log("the userid", userId);
      const res = await togglePostLike(userId, { postId });
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
        updatedAt: user.updatedAt,
      };
    },
    likes: async (post) => {
      const users = await UserModal.find({
        _id: { $in: post.likes },
      });
      return users.map((user) => ({
        id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    },
  },
};
