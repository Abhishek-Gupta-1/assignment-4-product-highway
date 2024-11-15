import { gql } from "apollo-server-express";
import { userResolvers } from "../resolvers/userResolvers.js";


export const types = gql`
  type User {
    id: ID!
    name: String!
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
`;


export const query = gql`
  type Query {
    me: User!
    user(username: String!): User
  }
`;

export const mutation = gql`
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


const typeDefs = gql`
 ${types}


   ${query}
  

 ${mutation}
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
    
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
};


export { typeDefs, resolvers };
