import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Step 1: Personal Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  whatsAppNumber: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  aboutYourself: {
    type: String,
    required: true,
    maxlength: 20000,
  },
  email: {
    type: String,
    required: true,
  },
  
  // Step 2: Documents
  candidatePhoto: {
    type: String,
    required: true,
  },
  cvUrl: {
    type: String,
    required: true,
  },
  depositSlipUrl: {
    type: String,
    required: true,
  },
  depositSlipNumber: {
    type: String,
    default: '',
  },

  // Status
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  rejectionReason: {
    type: String,
    default: '',
  },
  adminNotes: {
    type: String,
    default: '',
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Generate tracking ID before saving
applicationSchema.pre('save', function(next) {
  if (!this.trackingId) {
    const year = new Date().getFullYear();
    const count = Math.floor(Math.random() * 999999) + 1;
    this.trackingId = `HMS-${year}-${String(count).padStart(6, '0')}`;
  }
  next();
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;