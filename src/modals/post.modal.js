import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;