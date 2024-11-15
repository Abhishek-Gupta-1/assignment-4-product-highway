// feedSchema.js
import { gql } from "apollo-server-express";
import { feedResolvers } from "../resolvers/feedResolvers.js";

const typeDefs = gql`
  type PostAuthor {
    userId: ID!
    name: String!
    username: String!
    profilePic: String
  }

  type FeedPost {
    postId: ID!
    content: String!
    author: PostAuthor!
    likes: [ID!]!
    createdAt: String!
    updatedAt: String!
  }

  type PaginationInfo {
    currentPage: Int!
    totalPages: Int!
    totalPosts: Int!
    hasMore: Boolean!
  }

  type FeedData {
    posts: [FeedPost!]!
    pagination: PaginationInfo!
  }

  type FeedResponse {
    success: Boolean!
    message: String
    error: String
    data: FeedData
  }

  input FeedOptions {
    page: Int
    limit: Int
  }

  type Query {
    feed(options: FeedOptions): FeedResponse!
  }
`;

const resolvers = {
  Query: {
    ...feedResolvers.Query
  }
};

export { typeDefs, resolvers };