import { userRegister, userLogin, userUpdate } from '../../services/user.js';

export const userResolvers = {
  Query: {
    me: async (_, __, { user }) => user,
    user: async (_, { username }) => {
      const userData = await getUserByUsername(username);
      return userData;
    }
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
    updateUser: async (_, args, { user }) => {
      const updatedUser = await userUpdate(user.id, args);
      return updatedUser.data.user;
    }
  },
  User: {
    followers: async (user) => {
      const followers = await getUserFollowers(user.id);
      return followers;
    },
    following: async (user) => {
      const following = await getUserFollowing(user.id);
      return following;
    }
  }
};