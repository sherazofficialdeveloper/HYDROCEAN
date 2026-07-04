import express from 'express';
import {
  applyForJob,
  getUserApplications,
  getApplication,
  getApplicationStats,
} from '../controllers/applicationController.js';
import {
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';
import { uploadFields } from '../middleware/upload.js';

const router = express.Router();

// ✅ All routes require authentication
router.use(protect);

// ✅ User routes
router.post('/apply', uploadFields, applyForJob);
router.get('/my-applications', getUserApplications);
router.get('/stats', getApplicationStats);
router.get('/:id', getApplication);

// ✅ Admin routes
router.use(adminOnly);
router.get('/admin/all', getApplicationsAdmin);
router.put('/admin/:id/status', updateApplicationStatus);
router.delete('/admin/:id', deleteApplication);

export default router;