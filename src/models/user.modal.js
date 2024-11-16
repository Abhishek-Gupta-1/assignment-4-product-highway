import mongoose, { Model } from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required:true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
});

UserSchema.index({ username: 1 }, { unique: true });

const UserModal = mongoose.models.User || mongoose.model('User', UserSchema);


export default UserModal;