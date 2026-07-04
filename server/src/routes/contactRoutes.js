import express from 'express';
import { submitContact, getUserContacts } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes
router.use(protect);
router.get('/my-messages', getUserContacts);

export default router;