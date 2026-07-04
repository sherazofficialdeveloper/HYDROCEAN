import Contact from '../models/Contact.js';
import Notification from '../models/Notification.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const submitContact = catchAsync(async (req, res, next) => {
  console.log('📧 Contact form data received:', req.body);

  const { name, email, subject, message } = req.body;

  const trimmedName = name ? name.trim() : '';
  const trimmedEmail = email ? email.trim() : '';
  const trimmedSubject = subject ? subject.trim() : '';
  const trimmedMessage = message ? message.trim() : '';

  console.log('📧 Trimmed data:', { 
    name: trimmedName, 
    email: trimmedEmail, 
    subject: trimmedSubject, 
    message: trimmedMessage 
  });

  if (!trimmedName || trimmedName === '') {
    return next(new AppError('Name is required.', 400));
  }

  if (!trimmedEmail || trimmedEmail === '') {
    return next(new AppError('Email is required.', 400));
  }

  if (!trimmedSubject || trimmedSubject === '') {
    return next(new AppError('Subject is required.', 400));
  }

  if (!trimmedMessage || trimmedMessage === '') {
    return next(new AppError('Message is required.', 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  // ✅ Create contact
  const contact = await Contact.create({
    name: trimmedName,
    email: trimmedEmail.toLowerCase(),
    subject: trimmedSubject,
    message: trimmedMessage,
    userId: req.user?._id || null,
  });

  console.log('✅ Contact created:', contact._id);

  // ✅ Notify admin - Fix: Use null instead of "system" string
  try {
    await Notification.create({
      userId: req.user?._id || null,
      title: 'New Contact Message 📧',
      message: `New message from ${trimmedName}: ${trimmedSubject}`,
      type: 'contact',
      link: `/admin/contacts/${contact._id}`,
      metadata: { contactId: contact._id },
    });
  } catch (error) {
    console.error('❌ Notification error:', error.message);
    // ✅ Don't block the response if notification fails
  }

  // ✅ Notify user if logged in
  if (req.user?._id) {
    try {
      await Notification.create({
        userId: req.user._id,
        title: 'Message Sent ✅',
        message: `Your message "${trimmedSubject}" has been sent successfully.`,
        type: 'contact',
        link: '/contact',
      });
    } catch (error) {
      console.error('❌ User notification error:', error.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully.',
    contact,
  });
});

export const getUserContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    contacts,
  });
});