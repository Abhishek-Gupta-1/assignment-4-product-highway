import { PubSub } from "graphql-subscriptions";
import NotificationModel from "../models/notification.model.js";
import UserModel from "../models/user.model.js";

const pubsub = new PubSub();
const NOTIFICATION_ADDED = "NOTIFICATION_ADDED";

class NotificationService {
  static instance = null;

  constructor() {
    if (NotificationService.instance) {
      return NotificationService.instance;
    }
    NotificationService.instance = this;
    this.debug = true;
  }

  log(...args) {
    if (this.debug) {
      console.log("[NotificationService]", ...args);
    }
  }

  async createNotification({ type, userId, message, relatedId }) {
    try {
      this.log("Creating notification:", { type, userId, message, relatedId });

      const notification = await NotificationModel.create({
        type,
        userId,
        message,
        relatedId,
      });

      this.log("Notification created:", notification);

      const channelName = `${NOTIFICATION_ADDED}.${userId}`;
      this.log("Publishing to channel:", channelName);

      await pubsub.publish(channelName, {
        notificationAdded: notification.toObject(),
      });

      this.log("Published successfully");
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }

  async newFollower(followerId, followedUserId, state) {
    try {
      this.log("New follower notification:", { followerId, followedUserId });

      if (!followerId || !followedUserId) {
        throw new Error("Missing required parameters");
      }

      const [follower, followed] = await Promise.all([
        UserModel.findById(followerId),
        UserModel.findById(followedUserId),
      ]);

      if (!follower || !followed) {
        throw new Error("User not found");
      }

      this.log("Users found:", {
        follower: follower.username,
        followed: followed.username,
      });

      const message = `${follower.username} ${state} you`;

      return await this.createNotification({
        type: "NEW_FOLLOWER",
        userId: followedUserId,
        message,
        relatedId: followerId,
      });
    } catch (error) {
      console.error("Error in newFollower:", error);
      throw error;
    }
  }
  
  async newComment(comment, postAuthorId) {
    const message = `New comment on your post: "${comment.content.substring(
      0,
      30
    )}..."`;
    return await this.createNotification({
      type: "NEW_COMMENT",
      userId: postAuthorId,
      message,
      relatedId: comment._id,
    });
  }


  async newLike(likerId, postAuthorId, postId, state) {
    const liker = await UserModel.findById(likerId);
    const message = `${liker.username} ${state} your post`;
    return await this.createNotification({
      type: "LIKE",
      userId: postAuthorId,
      message,
      relatedId: postId,
    });
  }
}

export default new NotificationService();
