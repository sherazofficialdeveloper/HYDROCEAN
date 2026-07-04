import express from 'express';
import {
  getDashboardStats,
  getUsers,
  getUserById,
  updateUser,
  blockUser,
  deleteUser,
  updateUserRole,
  getContacts,
  updateContactStatus,
  replyContact,
  deleteContact,
  globalSearch,
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly, mainAdminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

// Dashboard
router.get('/stats', getDashboardStats);

// Users
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.put('/users/:id/block', blockUser);
router.delete('/users/:id', deleteUser);

// User role (main admin only)
router.put('/users/:id/role', mainAdminOnly, updateUserRole);

// Contacts
router.get('/contacts', getContacts);
router.put('/contacts/:id/status', updateContactStatus);
router.post('/contacts/:id/reply', replyContact);
router.delete('/contacts/:id', deleteContact);

// Global Search
router.get('/search', globalSearch);

export default router;