import { gql } from "apollo-server-express";
import { userResolvers } from "../resolvers/userResolvers.js";
import { postResolvers } from "../resolvers/postResolvers.js";
import { followResolvers } from "../resolvers/followResolver.js";
import { userTypes, userQuery, userMutation } from "./userSchema.js";
import { postQuery, postMutation, postTypes } from "./postSchema.js";
import { followQuery, followMutation, followTypes } from "./followSchema.js";
import { feedQuery, feedTypes } from "./feedSchema.js";
import { feedResolvers } from "../resolvers/feedResolver.js";
import { notificationMutation, notificationQuery, notificationTypes } from "./notificationSchema.js";
import { notificationResolvers } from "../resolvers/notificationResolver.js";

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

// const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     username: String!
//     bio: String
//     avatar: String
//     followers: [User!]!
//     following: [User!]!
//     createdAt: String!
//     updatedAt: String!
//   }

//   type AuthPayload {
//     success: Boolean!
//     token: String
//     user: User
//     message: String
//     error: String
//   }

//   type UpdateUserResponse {
//     success: Boolean!
//     user: User
//     message: String
//     error: String
//   }

//   type Query {
//     me: User!
//     user(username: String!): User
//   }

//   type Mutation {
//     register(
//       name: String!
//       username: String!
//       password: String!
//       bio: String
//     ): AuthPayload!
//     login(username: String!, password: String!): AuthPayload!
//     updateUser(name: String, bio: String, avatar: String): UpdateUserResponse!
//   }
// `;

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...followResolvers.Query,
    ...feedResolvers.Query,
    ...notificationResolvers.Query
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
  Subscription:{
    ...notificationResolvers.Subscription,
  }
};

export { typeDefs, resolvers };
