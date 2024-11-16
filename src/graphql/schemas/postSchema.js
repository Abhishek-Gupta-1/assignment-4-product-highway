import { gql } from "apollo-server-express";

export const postTypes = gql`
  type Post {
    postId: ID!
    content: String!
    userId: ID!
    user: User!
    likes: [User!]!
    createdAt: String!
    updatedAt: String!
    isActive: Boolean!
  }

  type PostResponse {
    success: Boolean!
    data: PostData
    message: String
    error: String
  }

  type PostData {
    post: Post
    posts: [Post!]
    count: Int
  }
`;

export const postQuery = gql`
  type Query {
    userPosts(userId: ID!): PostResponse!
  }
`;

export const postMutation = gql`
  type Mutation {
    createPost(content: String!): PostResponse!
    updatePost(postId: ID!, content: String!): PostResponse!
    deletePost(postId: ID!): PostResponse!
  }
`;
