import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    id: ID!
    name: String
    username: String!
    bio: String
    avatar: String
    followers: [User!]!
    following: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    success: Boolean!
    token: String
    user: User
    message: String
    error: String
  }

  type UpdateUserResponse {
    success: Boolean!
    user: User
    message: String
    error: String
  }

  type UserDataResponse {
    user: User
    message: String
    success: Boolean
    error: String
  }
`;

export const userQuery = gql`
  type Query {
    Getuser(username: String!): UserDataResponse
  }
`;

export const userMutation = gql`
  type Mutation {
    register(
      name: String!
      username: String!
      password: String!
      bio: String
    ): AuthPayload!

    login(username: String!, password: String!): AuthPayload!

    updateUser(name: String, bio: String, avatar: String): UpdateUserResponse!
  }
`;