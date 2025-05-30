const express = require('express');
const { body, validationResult } = require('express-validator');

const Resume = require('../models/Resume');
const User = require('../models/User');
const { auth, checkSubscriptionLimits } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// @desc    Get all resumes for authenticated user
// @route   GET /api/resumes
// @access  Private
router.get('/', auth, asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ userId: req.user.id })
    .sort({ updatedAt: -1 })
    .select('-__v');

  res.status(200).json({
    success: true,
    count: resumes.length,
    data: resumes,
  });
}));

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
router.get('/:id', auth, asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  res.status(200).json({
    success: true,
    data: resume,
  });
}));

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
router.post('/', [
  auth,
  checkSubscriptionLimits('resume_creation'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
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

  const { title } = req.body;

  // Create resume with default structure
  const resume = await Resume.create({
    userId: req.user.id,
    title,
    personalInfo: {
      fullName: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      phone: '',
      location: '',
    },
    professionalSummary: {
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteerExperience: [],
    publications: [],
    references: [],
    template: 'modern-classic',
  });

  // Update user's resume count
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { 'analytics.resumesCreated': 1 },
  });

  res.status(201).json({
    success: true,
    message: 'Resume created successfully',
    data: resume,
  });
}));

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
router.put('/:id', [
  auth,
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
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

  let resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  // Update resume
  resume = await Resume.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Resume updated successfully',
    data: resume,
  });
}));

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  await Resume.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully',
  });
}));

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
router.post('/:id/duplicate', [
  auth,
  checkSubscriptionLimits('resume_creation'),
], asyncHandler(async (req, res) => {
  const originalResume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!originalResume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  // Create duplicate
  const duplicateData = originalResume.toObject();
  delete duplicateData._id;
  delete duplicateData.createdAt;
  delete duplicateData.updatedAt;
  delete duplicateData.shareUrl;
  
  duplicateData.title = `${originalResume.title} (Copy)`;
  duplicateData.isPublic = false;
  duplicateData.analytics = {
    views: 0,
    downloads: 0,
    shares: 0,
  };

  const duplicateResume = await Resume.create(duplicateData);

  res.status(201).json({
    success: true,
    message: 'Resume duplicated successfully',
    data: duplicateResume,
  });
}));

// @desc    Export resume
// @route   GET /api/resumes/:id/export/:format
// @access  Private
router.get('/:id/export/:format', [
  auth,
  checkSubscriptionLimits('pdf_export'),
], asyncHandler(async (req, res) => {
  const { format } = req.params;
  
  if (!['pdf', 'docx', 'json'].includes(format)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid export format. Supported formats: pdf, docx, json',
    });
  }

  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  // Increment download count
  await resume.incrementDownloads();

  // Update user's download count
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { 'analytics.resumesDownloaded': 1 },
  });

  switch (format) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.json"`);
      return res.json({
        success: true,
        data: resume,
      });

    case 'pdf':
      // TODO: Implement PDF generation
      return res.status(501).json({
        success: false,
        message: 'PDF export not yet implemented',
      });

    case 'docx':
      // TODO: Implement DOCX generation
      return res.status(501).json({
        success: false,
        message: 'DOCX export not yet implemented',
      });

    default:
      return res.status(400).json({
        success: false,
        message: 'Invalid format',
      });
  }
}));

// @desc    Share/unshare resume
// @route   PUT /api/resumes/:id/share
// @access  Private
router.put('/:id/share', [
  auth,
  body('isPublic')
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
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

  const { isPublic } = req.body;

  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  resume.isPublic = isPublic;
  await resume.save();

  const shareUrl = resume.shareUrl 
    ? `${req.protocol}://${req.get('host')}/shared/${resume.shareUrl}`
    : null;

  res.status(200).json({
    success: true,
    message: isPublic ? 'Resume shared successfully' : 'Resume made private',
    data: {
      isPublic: resume.isPublic,
      shareUrl,
    },
  });
}));

// @desc    Get public resume by share URL
// @route   GET /api/resumes/shared/:shareUrl
// @access  Public
router.get('/shared/:shareUrl', asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    shareUrl: req.params.shareUrl,
    isPublic: true,
  }).populate('userId', 'firstName lastName');

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found or not public',
    });
  }

  // Increment view count
  await resume.incrementViews();

  res.status(200).json({
    success: true,
    data: resume,
  });
}));

// @desc    Get resume analytics
// @route   GET /api/resumes/:id/analytics
// @access  Private
router.get('/:id/analytics', auth, asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  }).select('analytics metadata title');

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  res.status(200).json({
    success: true,
    data: {
      title: resume.title,
      analytics: resume.analytics,
      metadata: resume.metadata,
    },
  });
}));

module.exports = router;
