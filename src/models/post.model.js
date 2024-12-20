import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 5000 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const PostModel =  mongoose.models.Post || mongoose.model('Post', PostSchema);
export default PostModel;