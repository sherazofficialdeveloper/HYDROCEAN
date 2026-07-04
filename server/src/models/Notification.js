import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,  // ✅ Changed from true to false
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['application', 'status', 'contact', 'system'],
    default: 'system',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: '',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;