import { gql } from "apollo-server-express";

export const followTypes = gql`
  type User {
    id: ID!
    username: String
    email: String
  }

  type UserFollowData {
    followers: [User]
    following: [User]
  }

  type FollowResponse {
    success: Boolean!
    message: String
    error: String
    findUser: UserFollowData
  }
`;

export const followQuery = gql`
  type Query {
    followStats(userId: ID!): FollowResponse!
  }
`;

export const followMutation = gql`
  type Mutation {
    toggleFollow(followingId: ID!): FollowResponse!
  }
`;