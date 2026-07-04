import { AppError } from '../utils/AppError.js';

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You must be logged in to access this resource.', 401));
  }

  // ✅ Allow both admin and sub_admin
  if (req.user.role !== 'admin' && req.user.role !== 'sub_admin') {
    return next(new AppError('You do not have permission to access this resource.', 403));
  }

  next();
};

export const mainAdminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You must be logged in to access this resource.', 401));
  }

  // ✅ Only main admin can access
  if (req.user.role !== 'admin') {
    return next(new AppError('Only main administrators can perform this action.', 403));
  }

  next();
};

export const subAdminPermissions = (requiredPermissions = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('You must be logged in to access this resource.', 401));
    }

    // ✅ Main admin has all permissions
    if (req.user.role === 'admin') {
      return next();
    }

    // ✅ Sub admin permission check
    if (req.user.role === 'sub_admin') {
      const hasAllPermissions = requiredPermissions.every(perm =>
        req.user.permissions?.includes(perm)
      );

      if (!hasAllPermissions) {
        return next(new AppError('You do not have the required permissions for this action.', 403));
      }
      return next();
    }

    return next(new AppError('You do not have permission to access this resource.', 403));
  };
};