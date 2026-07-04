import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Unread', 'Read', 'Replied'],
    default: 'Unread',
  },
  replyMessage: {
    type: String,
    default: '',
  },
  repliedAt: {
    type: Date,
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;