import express from 'express';
import {
  getJobs,
  getFeaturedJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getAllJobsAdmin,
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/featured', getFeaturedJobs);
router.get('/:id', getJob);

// Admin routes
router.use(protect);
router.use(adminOnly);
router.get('/admin/all', getAllJobsAdmin);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.put('/:id/toggle/:field', toggleJobStatus);

export default router;