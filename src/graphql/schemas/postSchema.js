import { gql } from "apollo-server-express";

export const postTypes = gql`
  type Post {
    postId: ID!
    content: String!
    userId: ID!
    user: User!
    likes: [User!]!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
    isActive: Boolean!
  }
  
   type Comment {
    commentId: ID!
    content: String!
    postId: ID!
    userId: ID!
    user: User!
    createdAt: String!
    updatedAt: String!
    isActive: Boolean!
  }

  type CommentData {
    comment: Comment
    comments: [Comment!]
    count: Int
  }

  type CommentResponse {
    success: Boolean!
    data: CommentData
    message: String
    error: String
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
    comments: [Comment!]
  }
`;

export const postQuery = gql`
  type Query {
    userPosts(userId: ID!): PostResponse!
    getPostComments(postId: ID!): CommentResponse!
  }
`;

export const postMutation = gql`
  type Mutation {
    createPost(content: String!): PostResponse!
    updatePost(postId: ID!, content: String!): PostResponse!
    deletePost(postId: ID!): PostResponse!
    togglePostLike(postId: ID!): PostResponse!
     createComment(postId: ID!, content: String!): CommentResponse!
    updateComment(commentId: ID!, content: String!): CommentResponse!
    deleteComment(commentId: ID!): CommentResponse!
  }
`;
