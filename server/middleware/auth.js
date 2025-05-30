const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

// Protect routes - verify JWT token
const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this token',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account has been deactivated',
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
  }
});

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }

    next();
  };
};

// Check subscription limits
const checkSubscriptionLimits = (feature) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const subscription = user.subscription;
    
    switch (feature) {
      case 'resume_creation':
        // Check if user has reached resume limit
        const resumeCount = await require('../models/Resume').countDocuments({ userId: user._id });
        if (resumeCount >= subscription.features.maxResumes) {
          return res.status(403).json({
            success: false,
            message: 'Resume limit reached. Please upgrade your subscription.',
            limit: subscription.features.maxResumes,
            current: resumeCount,
          });
        }
        break;
        
      case 'pdf_export':
        // Check PDF export limit (could be tracked in user analytics)
        if (user.analytics.resumesDownloaded >= subscription.features.pdfExports) {
          return res.status(403).json({
            success: false,
            message: 'PDF export limit reached. Please upgrade your subscription.',
            limit: subscription.features.pdfExports,
            current: user.analytics.resumesDownloaded,
          });
        }
        break;
        
      case 'custom_branding':
        if (!subscription.features.customBranding) {
          return res.status(403).json({
            success: false,
            message: 'Custom branding is not available in your subscription plan.',
          });
        }
        break;
        
      default:
        break;
    }

    next();
  });
};

// Rate limiting for specific users
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return next();
    }
    
    const now = Date.now();
    const userRequests = requests.get(userId) || { count: 0, resetTime: now + windowMs };
    
    // Reset if window has passed
    if (now > userRequests.resetTime) {
      userRequests.count = 0;
      userRequests.resetTime = now + windowMs;
    }
    
    // Check if limit exceeded
    if (userRequests.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((userRequests.resetTime - now) / 1000),
      });
    }
    
    // Increment counter
    userRequests.count++;
    requests.set(userId, userRequests);
    
    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': maxRequests - userRequests.count,
      'X-RateLimit-Reset': new Date(userRequests.resetTime).toISOString(),
    });
    
    next();
  };
};

// Optional auth - doesn't fail if no token
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, continue without user
  if (!token) {
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get user from token
    const user = await User.findById(decoded.id);

    if (user && user.isActive) {
      req.user = user;
    }
  } catch (error) {
    // Continue without user if token is invalid
    console.log('Optional auth failed:', error.message);
  }

  next();
});

module.exports = {
  auth,
  authorize,
  checkSubscriptionLimits,
  userRateLimit,
  optionalAuth,
};
