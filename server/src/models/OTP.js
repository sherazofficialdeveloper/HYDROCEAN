import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ['registration', 'login', 'forgot_password'],
    default: 'registration',
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 300 }, // Auto delete after 5 minutes
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  // ✅ Store user data temporarily for registration
  userData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
}, {
  timestamps: true,
});

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;