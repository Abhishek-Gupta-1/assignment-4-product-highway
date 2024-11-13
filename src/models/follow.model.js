import mongoose from 'mongoose';
const { Schema } = mongoose;

const FollowSchema = new Schema({
  systemId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique follows and efficient queries
FollowSchema.index({ systemId: 1, userId: 1 }, { unique: true });

const FollowModel = mongoose.model('Follow', FollowSchema);
export default FollowModel;