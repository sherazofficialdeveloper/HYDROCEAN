import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  titleUr: {
    type: String,
    trim: true,
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true,
  },
  qualificationUr: {
    type: String,
    trim: true,
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  descriptionUr: {
    type: String,
    trim: true,
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  requirements: {
    type: [String],
    default: [],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);
export default Job;