import { userRegister, userLogin, userUpdate, getUserDataByUsername } from "../../services/user.js";

export const userResolvers = {
  Query: {
    Getuser: async (_, { username }) => {
      return await getUserDataByUsername(username);
    },
  },
  Mutation: {
    register: async (_, args) => {
      const res = await userRegister(args);
      console.log("the token and user: ", res);
      return res;
    },
    login: async (_, args) => {
      const res = await userLogin(args);
      console.log("the token and user: ", res);
      return res;
    },
    updateUser: async (_, args, context) => {
      const userId = context.user.id;
      const res = await userUpdate(userId, args);
      return {
        success: res.success,
        user: res.success ? res.user : null,
        message: res.message,
        error: res.error,
      };
    },
  },
  User: {
    followers: async (user) => {
      const followers = await getUserFollowers(user.id);
      return followers;
    },
    following: async (user) => {
      const following = await getUserFollowing(user.id);
      return following;
    },
  },
};
