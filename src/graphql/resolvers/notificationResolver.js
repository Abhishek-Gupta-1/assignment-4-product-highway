import NotificatonModel from "../../models/notification.model.js";

export const notificationResolvers = {
    Query: {
        getNotifications: async (_, __, { user }) => {
            return await NotificatonModel.find({
                userId: user.id
            }).sort({ createdAt: -1 });
        },

        getUnreadNotificationsCount: async (_, __, { user, models }) => {
            return await NotificatonModel.countDocuments({
                userId: user.id,
                isRead: false
            });
        },
    },

    Mutation: {
        markNotificationAsRead: async (_, { notificationId }, { user }) => {
            const notification = await NotificatonModel.findOneAndUpdate(
                { _id: notificationId, userId: user.id },
                { isRead: true },
                { new: true }
            );
            return notification;
        },

        markAllNotificationsAsRead: async (_, __, { user, models }) => {
            await NotificatonModelupdateMany(
                { userId: user.id, isRead: false },
                { isRead: true }
            );
            return true;
        },
    },

    Subscription: {
        notificationAdded: {
            subscribe: (_, { userId }) => {
                const channel = `${NOTIFICATION_ADDED}.${userId}`;
                return pubsub.asyncIterator([channel]);
            },
    },
 },
};