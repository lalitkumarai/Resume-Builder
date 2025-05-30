import { ResumeTemplate } from '../types/templates';

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and business professionals',
    category: 'Modern',
    difficulty: 'Beginner',
    preview: '/templates/modern-professional-preview.png',
    thumbnail: '/templates/modern-professional-thumb.png',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      text: '#333333',
      background: '#ffffff'
    },
    features: ['ATS-Friendly', 'Clean Layout', 'Modern Typography', 'Color Customizable'],
    isPopular: true
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Timeless design that works for any industry and experience level',
    category: 'Classic',
    difficulty: 'Beginner',
    preview: '/templates/classic-elegant-preview.png',
    thumbnail: '/templates/classic-elegant-thumb.png',
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Traditional Layout', 'Professional', 'Easy to Read', 'Versatile'],
    isPopular: true
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Bold and artistic template for creative professionals and designers',
    category: 'Creative',
    difficulty: 'Intermediate',
    preview: '/templates/creative-designer-preview.png',
    thumbnail: '/templates/creative-designer-thumb.png',
    colors: {
      primary: '#e74c3c',
      secondary: '#c0392b',
      accent: '#f39c12',
      text: '#2c3e50',
      background: '#ecf0f1'
    },
    features: ['Creative Layout', 'Visual Elements', 'Portfolio Section', 'Unique Design'],
    isNew: true
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Simple and clean design that focuses on content over decoration',
    category: 'Minimalist',
    difficulty: 'Beginner',
    preview: '/templates/minimalist-clean-preview.png',
    thumbnail: '/templates/minimalist-clean-thumb.png',
    colors: {
      primary: '#95a5a6',
      secondary: '#7f8c8d',
      accent: '#2ecc71',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Minimal Design', 'Focus on Content', 'Clean Typography', 'Spacious Layout']
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    description: 'Sophisticated template for senior executives and C-level professionals',
    category: 'Executive',
    difficulty: 'Advanced',
    preview: '/templates/executive-premium-preview.png',
    thumbnail: '/templates/executive-premium-thumb.png',
    colors: {
      primary: '#1a1a1a',
      secondary: '#333333',
      accent: '#d4af37',
      text: '#1a1a1a',
      background: '#ffffff'
    },
    features: ['Executive Layout', 'Premium Design', 'Leadership Focus', 'Sophisticated'],
    isPremium: true
  },
  {
    id: 'technical-engineer',
    name: 'Technical Engineer',
    description: 'Structured template designed for engineers and technical professionals',
    category: 'Technical',
    difficulty: 'Intermediate',
    preview: '/templates/technical-engineer-preview.png',
    thumbnail: '/templates/technical-engineer-thumb.png',
    colors: {
      primary: '#0066cc',
      secondary: '#004499',
      accent: '#00ccff',
      text: '#333333',
      background: '#ffffff'
    },
    features: ['Technical Skills Focus', 'Project Highlights', 'Structured Layout', 'ATS-Optimized']
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    description: 'Comprehensive template for academics, researchers, and PhD candidates',
    category: 'Academic',
    difficulty: 'Advanced',
    preview: '/templates/academic-researcher-preview.png',
    thumbnail: '/templates/academic-researcher-thumb.png',
    colors: {
      primary: '#8e44ad',
      secondary: '#9b59b6',
      accent: '#e67e22',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Publications Section', 'Research Focus', 'Academic Format', 'Comprehensive']
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    description: 'Dynamic template for entrepreneurs and startup professionals',
    category: 'Modern',
    difficulty: 'Intermediate',
    preview: '/templates/startup-founder-preview.png',
    thumbnail: '/templates/startup-founder-thumb.png',
    colors: {
      primary: '#ff6b6b',
      secondary: '#ee5a52',
      accent: '#4ecdc4',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Entrepreneurial Focus', 'Achievement Highlights', 'Modern Design', 'Impact-Driven'],
    isNew: true
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    description: 'Results-focused template for sales and marketing professionals',
    category: 'Professional',
    difficulty: 'Beginner',
    preview: '/templates/sales-marketing-preview.png',
    thumbnail: '/templates/sales-marketing-thumb.png',
    colors: {
      primary: '#27ae60',
      secondary: '#229954',
      accent: '#f1c40f',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Results-Oriented', 'Metrics Focus', 'Professional Layout', 'Achievement-Based']
  },
  {
    id: 'healthcare-medical',
    name: 'Healthcare Professional',
    description: 'Professional template for healthcare workers and medical professionals',
    category: 'Professional',
    difficulty: 'Intermediate',
    preview: '/templates/healthcare-medical-preview.png',
    thumbnail: '/templates/healthcare-medical-thumb.png',
    colors: {
      primary: '#3498db',
      secondary: '#2980b9',
      accent: '#e74c3c',
      text: '#2c3e50',
      background: '#ffffff'
    },
    features: ['Medical Format', 'Certification Focus', 'Professional Standards', 'Clean Design']
  },
  {
    id: 'finance-banking',
    name: 'Finance & Banking',
    description: 'Conservative and professional template for finance and banking professionals',
    category: 'Professional',
    difficulty: 'Beginner',
    preview: '/templates/finance-banking-preview.png',
    thumbnail: '/templates/finance-banking-thumb.png',
    colors: {
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#059669',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Conservative Design', 'Financial Focus', 'Professional Layout', 'Trust-Building'],
    isPopular: true
  },
  {
    id: 'consulting-strategy',
    name: 'Consulting & Strategy',
    description: 'Analytical template perfect for consultants and strategic professionals',
    category: 'Professional',
    difficulty: 'Intermediate',
    preview: '/templates/consulting-strategy-preview.png',
    thumbnail: '/templates/consulting-strategy-thumb.png',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#f59e0b',
      text: '#111827',
      background: '#ffffff'
    },
    features: ['Analytical Layout', 'Case Study Focus', 'Strategic Thinking', 'Problem-Solving']
  },
  {
    id: 'legal-attorney',
    name: 'Legal Professional',
    description: 'Formal and authoritative template for lawyers and legal professionals',
    category: 'Professional',
    difficulty: 'Intermediate',
    preview: '/templates/legal-attorney-preview.png',
    thumbnail: '/templates/legal-attorney-thumb.png',
    colors: {
      primary: '#7c2d12',
      secondary: '#92400e',
      accent: '#d97706',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Formal Design', 'Legal Format', 'Authority Building', 'Professional Standards']
  },
  {
    id: 'education-teacher',
    name: 'Education Professional',
    description: 'Warm and approachable template for educators and teaching professionals',
    category: 'Professional',
    difficulty: 'Beginner',
    preview: '/templates/education-teacher-preview.png',
    thumbnail: '/templates/education-teacher-thumb.png',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Educational Focus', 'Warm Design', 'Teaching Experience', 'Student-Centered']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Technical template showcasing analytical skills and data expertise',
    category: 'Technical',
    difficulty: 'Advanced',
    preview: '/templates/data-scientist-preview.png',
    thumbnail: '/templates/data-scientist-thumb.png',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Data Visualization', 'Technical Skills', 'Analytics Focus', 'Research-Oriented'],
    isNew: true
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Strategic template for product managers and product development professionals',
    category: 'Modern',
    difficulty: 'Intermediate',
    preview: '/templates/product-manager-preview.png',
    thumbnail: '/templates/product-manager-thumb.png',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#f97316',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Product Focus', 'Strategic Thinking', 'User-Centered', 'Innovation-Driven']
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Visually striking template perfect for graphic designers and visual artists',
    category: 'Creative',
    difficulty: 'Advanced',
    preview: '/templates/graphic-designer-preview.png',
    thumbnail: '/templates/graphic-designer-thumb.png',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#8b5cf6',
      text: '#1f2937',
      background: '#f9fafb'
    },
    features: ['Visual Portfolio', 'Creative Layout', 'Design Showcase', 'Artistic Expression'],
    isPremium: true
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    description: 'Code-focused template for software developers and programmers',
    category: 'Technical',
    difficulty: 'Intermediate',
    preview: '/templates/software-developer-preview.png',
    thumbnail: '/templates/software-developer-thumb.png',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#10b981',
      text: '#111827',
      background: '#ffffff'
    },
    features: ['Code Portfolio', 'Technical Projects', 'GitHub Integration', 'Development Focus'],
    isPopular: true
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Organized template highlighting project management skills and achievements',
    category: 'Professional',
    difficulty: 'Beginner',
    preview: '/templates/project-manager-preview.png',
    thumbnail: '/templates/project-manager-thumb.png',
    colors: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Project Highlights', 'Leadership Focus', 'Organizational Skills', 'Results-Driven']
  }
];

export const templateCategories = [
  'All',
  'Modern',
  'Classic',
  'Creative',
  'Professional',
  'Minimalist',
  'Executive',
  'Technical',
  'Academic'
] as const;

export const templateFeatures = [
  'ATS-Friendly',
  'Color Customizable',
  'Modern Typography',
  'Clean Layout',
  'Creative Layout',
  'Professional',
  'Minimal Design',
  'Premium Design',
  'Technical Skills Focus',
  'Publications Section',
  'Results-Oriented'
] as const;
