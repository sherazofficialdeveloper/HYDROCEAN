import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { limiter, authLimiter, apiLimiter, otpLimiter } from './middleware/rateLimiter.js';

import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { visitorTracker } from './middleware/visitorTracker.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// ✅ Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// ✅ Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// ✅ Rate limiting
app.use('/api', limiter);
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);
app.use('/api/auth/send-otp', otpLimiter);
app.use('/api/auth/resend-otp', otpLimiter);

// ✅ Body parser - Increased limit for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ Request logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`);
  if (req.method === 'POST' && req.path !== '/api/auth/login' && req.path !== '/api/auth/register') {
    console.log('📋 Body:', req.body);
    if (req.files) {
      console.log('📎 Files:', Object.keys(req.files));
    }
  }
  next();
});

// ✅ Visitor tracking (public)
app.use('/api', visitorTracker);

// ✅ Static files - For serving uploaded files (optional)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ✅ Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hydrocean API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      jobs: '/api/jobs',
      applications: '/api/applications',
      admin: '/api/admin',
      contact: '/api/contact',
      notifications: '/api/notifications',
    }
  });
});

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
});

export default app;