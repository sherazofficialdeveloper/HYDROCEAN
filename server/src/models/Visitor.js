import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
    default: '',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sessionId: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  deviceType: {
    type: String,
    enum: ['mobile', 'tablet', 'desktop'],
    default: 'desktop',
  },
  browser: {
    type: String,
    default: '',
  },
  os: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index for faster queries
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ sessionId: 1 });
visitorSchema.index({ userId: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;