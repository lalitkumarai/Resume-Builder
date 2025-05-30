const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Sample template data - in a real app, this would come from a database
const templates = [
  {
    id: 'modern-classic',
    name: 'Modern Classic',
    description: 'A clean, professional design perfect for most industries',
    category: 'ats-friendly',
    previewImage: '/templates/modern-classic.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#333333',
      secondary: '#666666',
      accent: '#007bff',
      text: '#333333',
      background: '#ffffff',
    },
    features: ['ATS Optimized', 'Clean Layout', 'Professional'],
    popularity: 95,
  },
  {
    id: 'creative-modern',
    name: 'Creative Modern',
    description: 'A stylish template with color accents for creative professionals',
    category: 'creative',
    previewImage: '/templates/creative-modern.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      accent: '#3498db',
      text: '#2c3e50',
      background: '#ffffff',
    },
    features: ['Modern Design', 'Color Accents', 'Creative Layout'],
    popularity: 87,
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'Simple and elegant design focusing on content',
    category: 'modern',
    previewImage: '/templates/minimal-elegant.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#1a1a1a',
      secondary: '#666666',
      accent: '#e74c3c',
      text: '#1a1a1a',
      background: '#ffffff',
    },
    features: ['Minimal Design', 'Content Focused', 'Elegant Typography'],
    popularity: 78,
  },
  {
    id: 'executive-professional',
    name: 'Executive Professional',
    description: 'Premium design for senior-level positions',
    category: 'classic',
    previewImage: '/templates/executive-professional.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#f39c12',
      text: '#2c3e50',
      background: '#ffffff',
    },
    features: ['Executive Style', 'Premium Look', 'Leadership Focused'],
    popularity: 82,
  },
  {
    id: 'tech-specialist',
    name: 'Tech Specialist',
    description: 'Perfect for software developers and tech professionals',
    category: 'modern',
    previewImage: '/templates/tech-specialist.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      accent: '#27ae60',
      text: '#2c3e50',
      background: '#ffffff',
    },
    features: ['Tech Focused', 'Skills Highlight', 'Project Showcase'],
    popularity: 91,
  },
  {
    id: 'student-fresh',
    name: 'Student Fresh',
    description: 'Ideal for students and recent graduates',
    category: 'modern',
    previewImage: '/templates/student-fresh.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#34495e',
      secondary: '#7f8c8d',
      accent: '#9b59b6',
      text: '#34495e',
      background: '#ffffff',
    },
    features: ['Student Friendly', 'Education Focus', 'Fresh Design'],
    popularity: 73,
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Designed for medical and healthcare professionals',
    category: 'classic',
    previewImage: '/templates/healthcare-professional.png',
    isATSFriendly: true,
    colorScheme: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      accent: '#16a085',
      text: '#2c3e50',
      background: '#ffffff',
    },
    features: ['Healthcare Focus', 'Professional', 'Trust Building'],
    popularity: 69,
  },
  {
    id: 'marketing-creative',
    name: 'Marketing Creative',
    description: 'Eye-catching design for marketing professionals',
    category: 'creative',
    previewImage: '/templates/marketing-creative.png',
    isATSFriendly: false,
    colorScheme: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      accent: '#e67e22',
      text: '#2c3e50',
      background: '#ffffff',
    },
    features: ['Creative Design', 'Marketing Focus', 'Visual Appeal'],
    popularity: 85,
  },
];

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { category, atsOnly, sortBy } = req.query;
  
  let filteredTemplates = [...templates];
  
  // Filter by category
  if (category && category !== 'all') {
    filteredTemplates = filteredTemplates.filter(template => 
      template.category === category
    );
  }
  
  // Filter ATS-friendly only
  if (atsOnly === 'true') {
    filteredTemplates = filteredTemplates.filter(template => 
      template.isATSFriendly
    );
  }
  
  // Sort templates
  switch (sortBy) {
    case 'popularity':
      filteredTemplates.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'name':
      filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      // In a real app, you'd sort by creation date
      break;
    default:
      // Default sort by popularity
      filteredTemplates.sort((a, b) => b.popularity - a.popularity);
  }

  res.status(200).json({
    success: true,
    count: filteredTemplates.length,
    data: filteredTemplates,
  });
}));

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const template = templates.find(t => t.id === req.params.id);
  
  if (!template) {
    return res.status(404).json({
      success: false,
      message: 'Template not found',
    });
  }

  res.status(200).json({
    success: true,
    data: template,
  });
}));

// @desc    Get template categories
// @route   GET /api/templates/categories
// @access  Public
router.get('/meta/categories', asyncHandler(async (req, res) => {
  const categories = [
    {
      id: 'all',
      name: 'All Templates',
      count: templates.length,
    },
    {
      id: 'ats-friendly',
      name: 'ATS Friendly',
      count: templates.filter(t => t.category === 'ats-friendly').length,
    },
    {
      id: 'modern',
      name: 'Modern',
      count: templates.filter(t => t.category === 'modern').length,
    },
    {
      id: 'creative',
      name: 'Creative',
      count: templates.filter(t => t.category === 'creative').length,
    },
    {
      id: 'classic',
      name: 'Classic',
      count: templates.filter(t => t.category === 'classic').length,
    },
  ];

  res.status(200).json({
    success: true,
    data: categories,
  });
}));

// @desc    Get popular templates
// @route   GET /api/templates/meta/popular
// @access  Public
router.get('/meta/popular', asyncHandler(async (req, res) => {
  const popularTemplates = templates
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  res.status(200).json({
    success: true,
    data: popularTemplates,
  });
}));

// @desc    Get template statistics
// @route   GET /api/templates/meta/stats
// @access  Public
router.get('/meta/stats', asyncHandler(async (req, res) => {
  const stats = {
    totalTemplates: templates.length,
    atsTemplates: templates.filter(t => t.isATSFriendly).length,
    categories: {
      'ats-friendly': templates.filter(t => t.category === 'ats-friendly').length,
      modern: templates.filter(t => t.category === 'modern').length,
      creative: templates.filter(t => t.category === 'creative').length,
      classic: templates.filter(t => t.category === 'classic').length,
    },
    averagePopularity: Math.round(
      templates.reduce((sum, t) => sum + t.popularity, 0) / templates.length
    ),
  };

  res.status(200).json({
    success: true,
    data: stats,
  });
}));

module.exports = router;
