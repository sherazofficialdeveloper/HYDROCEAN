import Job from '../models/Job.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

// Get all jobs (public)
export const getJobs = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, location, status } = req.query;
  
  const query = { isHidden: false };
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (location) {
    query.country = location;
  }
  
  if (status === 'open') {
    query.isOpen = true;
  } else if (status === 'closed') {
    query.isOpen = false;
  }

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Job.countDocuments(query);

  res.status(200).json({
    success: true,
    jobs,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});

// Get featured jobs (home page)
export const getFeaturedJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ isHidden: false, isOpen: true })
    .sort({ createdAt: -1 })
    .limit(2);

  res.status(200).json({
    success: true,
    jobs,
  });
});

// Get single job
export const getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new AppError('Job not found.', 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
});

// Admin: Create job
export const createJob = catchAsync(async (req, res, next) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    job,
  });
});

// Admin: Update job
export const updateJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new AppError('Job not found.', 404));
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    job: updatedJob,
  });
});

// Admin: Delete job
export const deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new AppError('Job not found.', 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully.',
  });
});

// Admin: Toggle job status
export const toggleJobStatus = catchAsync(async (req, res, next) => {
  const { field } = req.params;
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new AppError('Job not found.', 404));
  }

  const validFields = ['isOpen', 'isHidden', 'isArchived'];
  if (!validFields.includes(field)) {
    return next(new AppError('Invalid field.', 400));
  }

  job[field] = !job[field];
  await job.save();

  res.status(200).json({
    success: true,
    job,
  });
});

// Admin: Get all jobs (including hidden)
export const getAllJobsAdmin = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, status, location } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (location) {
    query.country = location;
  }
  
  if (status === 'open') {
    query.isOpen = true;
  } else if (status === 'closed') {
    query.isOpen = false;
  } else if (status === 'hidden') {
    query.isHidden = true;
  } else if (status === 'archived') {
    query.isArchived = true;
  }

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Job.countDocuments(query);

  res.status(200).json({
    success: true,
    jobs,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});