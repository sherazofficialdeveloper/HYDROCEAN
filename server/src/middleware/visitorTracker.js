import { catchAsync } from '../utils/catchAsync.js';
import Visitor from '../models/Visitor.js';

export const visitorTracker = catchAsync(async (req, res, next) => {
  try {
    // Skip tracking for API calls that are not page views
    if (req.path.includes('/api/') && !req.path.includes('/api/visitors/track')) {
      return next();
    }

    // Only track GET requests for page views
    if (req.method !== 'GET') {
      return next();
    }

    // Check if we should track this request
    const shouldTrack = req.headers['x-track-visitor'] !== 'false';
    if (!shouldTrack) {
      return next();
    }

    const userAgent = req.headers['user-agent'] || '';
    const sessionId = req.headers['x-session-id'] || req.cookies?.sessionId || 
                     req.headers['x-visitor-id'] || 'unknown';

    // Determine device type
    let deviceType = 'desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'mobile';
    else if (/tablet/i.test(userAgent)) deviceType = 'tablet';

    // Get browser and OS
    let browser = 'Unknown';
    let os = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'Mac';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    // Don't wait for visitor tracking to complete - fire and forget
    const visitorData = {
      ip: req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || 'Unknown',
      userAgent: userAgent,
      path: req.path || req.url || '/',
      referrer: req.headers.referer || req.headers.referrer || '',
      userId: req.user?._id || null,
      sessionId: sessionId,
      isLoggedIn: !!req.user,
      deviceType,
      browser,
      os,
    };

    // Save visitor asynchronously
    setImmediate(async () => {
      try {
        await Visitor.create(visitorData);
      } catch (error) {
        console.error('Error tracking visitor:', error.message);
      }
    });

    next();
  } catch (error) {
    console.error('Visitor tracking error:', error.message);
    next(); // Don't block the request
  }
});