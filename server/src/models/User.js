import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  phone: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'sub_admin', 'admin'],
    default: 'user',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
    default: '',
  },
  lastLogin: {
    type: Date,
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordOTPExpiry: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin' || this.role === 'sub_admin';
};

// Check if user is main admin
userSchema.methods.isMainAdmin = function() {
  return this.role === 'admin';
};

const User = mongoose.model('User', userSchema);
export default User;