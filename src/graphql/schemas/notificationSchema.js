import { gql } from "apollo-server-express";

export const notificationTypes = gql`
  type Notification {
    id: ID!
    type: NotificationType!
    message: String!
    userId: ID!
    createdAt: String!
    isRead: Boolean!
  }

  enum NotificationType {
    NEW_FOLLOWER
    NEW_COMMENT
    LIKE
    MENTION
  }

 type FollowResponse {
    success: Boolean!
    message: String
    error: String
    followedUser: UserFollowData
  }

  type UserFollowData {
    id: ID!
    username: String!
    email: String!
  }
    
  type Subscription {
    notificationAdded(userId: ID!): Notification!
  }
`;

export const notificationQuery = gql`
  type Query {
    getNotifications: [Notification!]!
    getUnreadNotificationsCount: Int!
  }
`;

export const notificationMutation = gql`
  type Mutation {
    markNotificationAsRead(notificationId: ID!): Notification!
    markAllNotificationsAsRead:Boolean!
 }
`;