import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['NEW_FOLLOWER', 'NEW_COMMENT', 'NEW_LIKE', 'MENTION'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
},{
    timestamps: true
});

const NotificatonModel = mongoose.model.Notification || mongoose.model('Notification', notificationSchema);
export default NotificatonModel;