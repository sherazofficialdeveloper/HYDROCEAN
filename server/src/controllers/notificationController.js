import Notification from '../models/Notification.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

export const getNotifications = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Notification.countDocuments({ userId: req.user._id });
  const unread = await Notification.countDocuments({
    userId: req.user._id,
    isRead: false,
  });

  res.status(200).json({
    success: true,
    notifications,
    unread,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});

export const markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  
  if (!notification) {
    return next(new AppError('Notification not found.', 404));
  }

  // ✅ Allow null userId check
  if (notification.userId && notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to update this notification.', 403));
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({
    success: true,
    message: 'Notification marked as read.',
  });
});

export const markAllAsRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    { userId: req.user._id, isRead: false },
    { isRead: true }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read.',
  });
});

export const deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  
  if (!notification) {
    return next(new AppError('Notification not found.', 404));
  }

  // ✅ Allow null userId check
  if (notification.userId && notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to delete this notification.', 403));
  }

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully.',
  });
});