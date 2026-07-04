import rateLimit from 'express-rate-limit';

// ✅ General API limiter - Increase limit
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // ✅ Increased from 100 to 200
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // ✅ Skip rate limiting for localhost in development
    return req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === 'localhost';
  },
});

// ✅ Authentication limiter - Increase limit
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // ✅ Increased from 5 to 20
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // ✅ Skip rate limiting for localhost
    return req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === 'localhost';
  },
});

// ✅ OTP specific limiter - Separate limit for OTP
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 OTP requests per 15 minutes
  message: {
    success: false,
    message: 'Too many OTP requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === 'localhost';
  },
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // ✅ Increased from 30 to 60
  message: {
    success: false,
    message: 'Too many requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === 'localhost';
  },
});