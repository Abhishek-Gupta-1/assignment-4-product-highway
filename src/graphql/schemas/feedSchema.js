import { gql } from "apollo-server-express";

export const feedTypes = gql`
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
`;

export const feedQuery = gql`
  type Query {
    feed(options: FeedOptions): FeedResponse!
  }
`;
