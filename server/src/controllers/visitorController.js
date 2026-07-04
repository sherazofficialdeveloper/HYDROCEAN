import Visitor from '../models/Visitor.js';
import { catchAsync } from '../utils/catchAsync.js';

export const trackVisitor = catchAsync(async (req, res, next) => {
  const { path, referrer, userAgent, sessionId } = req.body;
  
  // Determine device type
  let deviceType = 'desktop';
  const ua = userAgent || req.headers['user-agent'] || '';
  
  if (/mobile/i.test(ua)) deviceType = 'mobile';
  else if (/tablet/i.test(ua)) deviceType = 'tablet';

  // Get browser and OS
  let browser = 'Unknown';
  let os = 'Unknown';
  
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'Mac';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  await Visitor.create({
    ip: req.ip || req.connection.remoteAddress || 'Unknown',
    userAgent: ua,
    path,
    referrer: referrer || '',
    userId: req.user?._id,
    sessionId: sessionId || req.headers['x-session-id'] || 'unknown',
    isLoggedIn: !!req.user,
    deviceType,
    browser,
    os,
  });

  res.status(200).json({ success: true });
});