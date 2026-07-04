import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Production error response
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error('❌ ERROR:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  }
};

export const notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
};