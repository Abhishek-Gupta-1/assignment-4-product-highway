import { gql } from "apollo-server-express";
import { userResolvers } from "./resolvers/userResolvers.js";
import { postResolvers } from "./resolvers/postResolvers.js";
import { followResolvers } from "./resolvers/followResolver.js";
import { userTypes, userQuery, userMutation } from "./schemas/userSchema.js";
import { postQuery, postMutation, postTypes } from "./schemas/postSchema.js";
import { followQuery, followMutation, followTypes } from "./schemas/followSchema.js";
import { feedQuery, feedTypes } from "./schemas/feedSchema.js";
import { feedResolvers } from "./resolvers/feedResolver.js";
import {
  notificationMutation,
  notificationQuery,
  notificationTypes,
} from "./schemas/notificationSchema.js";
import { notificationResolvers } from "./resolvers/notificationResolver.js";

const typeDefs = gql`
  ${userTypes}
  ${postTypes}
  ${followTypes}
  ${feedTypes}
  ${feedTypes}
  ${notificationTypes}

  ${userQuery}
  ${postQuery}
  ${followQuery}
  ${feedQuery}
  ${notificationQuery}

  ${userMutation}
  ${postMutation}
  ${followMutation}
  ${notificationMutation}
`;

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...followResolvers.Query,
    ...feedResolvers.Query,
    ...notificationResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...followResolvers.Mutation,
    ...notificationResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Post: {
    ...postResolvers.Post,
  },
  Subscription: {
    ...notificationResolvers.Subscription,
  },
};

export { typeDefs, resolvers };
