const mongoose = require('mongoose');

// Sub-schemas for resume sections
const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  linkedIn: { type: String, trim: true },
  github: { type: String, trim: true },
  portfolio: { type: String, trim: true },
  profileImage: { type: String },
}, { _id: false });

const professionalSummarySchema = new mongoose.Schema({
  summary: { type: String, required: true, maxlength: 500 },
}, { _id: false });

const workExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  isCurrentJob: { type: Boolean, default: false },
  responsibilities: [{ type: String, trim: true }],
  achievements: [{ type: String, trim: true }],
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  institution: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  graduationYear: { type: String, required: true },
  gpa: { type: String, trim: true },
  relevantCoursework: [{ type: String, trim: true }],
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'soft', 'language'],
  },
  proficiency: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, maxlength: 300 },
  technologies: [{ type: String, trim: true }],
  startDate: { type: String, required: true },
  endDate: { type: String },
  projectUrl: { type: String, trim: true },
  githubUrl: { type: String, trim: true },
  keyOutcomes: [{ type: String, trim: true }],
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  issuingOrganization: { type: String, required: true, trim: true },
  dateCompleted: { type: String, required: true },
  expirationDate: { type: String },
  credentialId: { type: String, trim: true },
  credentialUrl: { type: String, trim: true },
});

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true, trim: true },
  proficiency: {
    type: String,
    required: true,
    enum: ['basic', 'conversational', 'fluent', 'native'],
  },
});

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  description: { type: String, maxlength: 200 },
});

const volunteerExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String, required: true, maxlength: 300 },
  isCurrentRole: { type: Boolean, default: false },
});

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  publisher: { type: String, required: true, trim: true },
  publicationDate: { type: String, required: true },
  url: { type: String, trim: true },
  description: { type: String, maxlength: 200 },
});

const referenceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  relationship: { type: String, required: true, trim: true },
});

// Main resume schema
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  personalInfo: {
    type: personalInfoSchema,
    required: true,
  },
  professionalSummary: professionalSummarySchema,
  workExperience: [workExperienceSchema],
  education: [educationSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  certifications: [certificationSchema],
  languages: [languageSchema],
  awards: [awardSchema],
  volunteerExperience: [volunteerExperienceSchema],
  publications: [publicationSchema],
  references: [referenceSchema],
  template: {
    type: String,
    required: true,
    default: 'modern-classic',
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  shareUrl: {
    type: String,
    unique: true,
    sparse: true,
  },
  analytics: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    lastViewed: { type: Date },
    lastDownloaded: { type: Date },
  },
  metadata: {
    version: { type: Number, default: 1 },
    wordCount: { type: Number, default: 0 },
    completionPercentage: { type: Number, default: 0 },
    atsScore: { type: Number, default: 0 },
    lastOptimized: { type: Date },
  },
  settings: {
    fontSize: { type: Number, default: 12 },
    margins: {
      top: { type: Number, default: 20 },
      bottom: { type: Number, default: 20 },
      left: { type: Number, default: 20 },
      right: { type: Number, default: 20 },
    },
    colorScheme: {
      primary: { type: String, default: '#333333' },
      secondary: { type: String, default: '#666666' },
      accent: { type: String, default: '#007bff' },
    },
    sectionOrder: [{
      type: String,
      enum: [
        'personalInfo',
        'professionalSummary',
        'workExperience',
        'education',
        'skills',
        'projects',
        'certifications',
        'languages',
        'awards',
        'volunteerExperience',
        'publications',
        'references'
      ],
    }],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for better query performance (shareUrl index is already created by unique: true)
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ isPublic: 1 });
resumeSchema.index({ 'analytics.views': -1 });
resumeSchema.index({ updatedAt: -1 });

// Virtual for user
resumeSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Pre-save middleware to calculate completion percentage
resumeSchema.pre('save', function(next) {
  const requiredSections = ['personalInfo', 'professionalSummary'];
  const optionalSections = ['workExperience', 'education', 'skills'];

  let completedSections = 0;
  let totalSections = requiredSections.length + optionalSections.length;

  // Check required sections
  requiredSections.forEach(section => {
    if (this[section] && Object.keys(this[section]).length > 0) {
      completedSections++;
    }
  });

  // Check optional sections
  optionalSections.forEach(section => {
    if (this[section] && this[section].length > 0) {
      completedSections++;
    }
  });

  this.metadata.completionPercentage = Math.round((completedSections / totalSections) * 100);

  // Calculate word count
  let wordCount = 0;
  if (this.professionalSummary?.summary) {
    wordCount += this.professionalSummary.summary.split(' ').length;
  }

  this.workExperience.forEach(exp => {
    exp.responsibilities.forEach(resp => {
      wordCount += resp.split(' ').length;
    });
    exp.achievements.forEach(ach => {
      wordCount += ach.split(' ').length;
    });
  });

  this.metadata.wordCount = wordCount;

  next();
});

// Pre-save middleware to generate share URL
resumeSchema.pre('save', function(next) {
  if (this.isPublic && !this.shareUrl) {
    this.shareUrl = require('crypto').randomBytes(16).toString('hex');
  } else if (!this.isPublic) {
    this.shareUrl = undefined;
  }
  next();
});

// Instance method to increment view count
resumeSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  this.analytics.lastViewed = new Date();
  return this.save();
};

// Instance method to increment download count
resumeSchema.methods.incrementDownloads = function() {
  this.analytics.downloads += 1;
  this.analytics.lastDownloaded = new Date();
  return this.save();
};

// Static method to get user's resume stats
resumeSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalResumes: { $sum: 1 },
        totalViews: { $sum: '$analytics.views' },
        totalDownloads: { $sum: '$analytics.downloads' },
        averageCompletion: { $avg: '$metadata.completionPercentage' },
        publicResumes: {
          $sum: { $cond: [{ $eq: ['$isPublic', true] }, 1, 0] }
        },
      }
    }
  ]);

  return stats[0] || {
    totalResumes: 0,
    totalViews: 0,
    totalDownloads: 0,
    averageCompletion: 0,
    publicResumes: 0,
  };
};

// Static method to get popular templates
resumeSchema.statics.getPopularTemplates = async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$template',
        count: { $sum: 1 },
        avgViews: { $avg: '$analytics.views' },
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};

module.exports = mongoose.model('Resume', resumeSchema);
