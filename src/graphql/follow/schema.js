// followSchema.js
import { gql } from "apollo-server-express";
import { followResolvers } from "../resolvers/followResolvers.js";

const typeDefs = gql`
  type FollowStats {
    followers: Int!
    following: Int!
  }

  type FollowData {
    stats: FollowStats
    following: Boolean
    followers: [ID!]
    following: [ID!]
  }

  type FollowResponse {
    success: Boolean!
    message: String
    error: String
    data: FollowData
  }

  type Query {
    followStats(userId: ID!): FollowResponse!
  }

  type Mutation {
    toggleFollow(userId: ID!): FollowResponse!
  }
`;

const resolvers = {
  Query: {
    ...followResolvers.Query,
  },
  Mutation: {
    ...followResolvers.Mutation,
  }
};

export { typeDefs, resolvers };