const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Resume = require('../models/Resume');
const { auth, authorize } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', [
  auth,
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { firstName, lastName, email, profileImage, preferences } = req.body;

  // Check if email is already taken by another user
  if (email) {
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.user.id } 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken',
      });
    }
  }

  const updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (email) updateData.email = email;
  if (profileImage) updateData.profileImage = profileImage;
  if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
}));

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
router.get('/stats', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const resumeStats = await Resume.getUserStats(req.user.id);

  const stats = {
    user: {
      joinDate: user.createdAt,
      lastLogin: user.lastLogin,
      subscription: user.subscription,
      analytics: user.analytics,
    },
    resumes: resumeStats,
  };

  res.status(200).json({
    success: true,
    data: stats,
  });
}));

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
router.put('/preferences', [
  auth,
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('language')
    .optional()
    .isLength({ min: 2, max: 5 })
    .withMessage('Language code must be 2-5 characters'),
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      preferences: {
        ...req.user.preferences,
        ...req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: 'Preferences updated successfully',
    data: user.preferences,
  });
}));

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
router.delete('/account', [
  auth,
  body('password')
    .notEmpty()
    .withMessage('Password is required to delete account'),
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { password } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect password',
    });
  }

  // Delete all user's resumes
  await Resume.deleteMany({ userId: req.user.id });

  // Delete user account
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully',
  });
}));

// @desc    Get user activity log
// @route   GET /api/users/activity
// @access  Private
router.get('/activity', auth, asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  
  // In a real app, you'd have an activity log collection
  // For now, we'll return recent resume activities
  const resumes = await Resume.find({ userId: req.user.id })
    .sort({ updatedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('title updatedAt analytics.lastViewed analytics.lastDownloaded');

  const activities = [];
  
  resumes.forEach(resume => {
    activities.push({
      type: 'resume_updated',
      description: `Updated resume "${resume.title}"`,
      timestamp: resume.updatedAt,
      resumeId: resume._id,
    });
    
    if (resume.analytics.lastViewed) {
      activities.push({
        type: 'resume_viewed',
        description: `Resume "${resume.title}" was viewed`,
        timestamp: resume.analytics.lastViewed,
        resumeId: resume._id,
      });
    }
    
    if (resume.analytics.lastDownloaded) {
      activities.push({
        type: 'resume_downloaded',
        description: `Downloaded resume "${resume.title}"`,
        timestamp: resume.analytics.lastDownloaded,
        resumeId: resume._id,
      });
    }
  });

  // Sort activities by timestamp
  activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.status(200).json({
    success: true,
    data: activities.slice(0, limit),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: activities.length,
    },
  });
}));

// @desc    Export user data
// @route   GET /api/users/export
// @access  Private
router.get('/export', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const resumes = await Resume.find({ userId: req.user.id });

  const exportData = {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      preferences: user.preferences,
      analytics: user.analytics,
    },
    resumes: resumes.map(resume => ({
      id: resume._id,
      title: resume.title,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      template: resume.template,
      analytics: resume.analytics,
      // Include resume data
      personalInfo: resume.personalInfo,
      professionalSummary: resume.professionalSummary,
      workExperience: resume.workExperience,
      education: resume.education,
      skills: resume.skills,
      projects: resume.projects,
      certifications: resume.certifications,
      languages: resume.languages,
      awards: resume.awards,
      volunteerExperience: resume.volunteerExperience,
      publications: resume.publications,
      references: resume.references,
    })),
    exportedAt: new Date().toISOString(),
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="user-data-${user._id}.json"`);
  
  res.status(200).json({
    success: true,
    data: exportData,
  });
}));

module.exports = router;
