import { gql } from "apollo-server-express";
import { postResolvers } from "../resolvers/postResolvers.js";

const typeDefs = gql`
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

  type Query {
    userPosts(userId: ID!): PostResponse!
  }

  type Mutation {
    createPost(content: String!): PostResponse!
    updatePost(postId: ID!, content: String!): PostResponse!
    deletePost(postId: ID!): PostResponse!
  }
`;

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
  },
  Post: {
    ...postResolvers.Post,
  },
};

export { typeDefs, resolvers };