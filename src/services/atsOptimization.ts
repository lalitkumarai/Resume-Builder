// ATS Optimization Service
// Helps optimize resumes for Applicant Tracking Systems

export interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    structure: number;
    content: number;
  };
  suggestions: ATSSuggestion[];
  keywordAnalysis: KeywordAnalysis;
}

export interface ATSSuggestion {
  type: 'critical' | 'warning' | 'improvement';
  category: 'keywords' | 'formatting' | 'structure' | 'content';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  fix?: string;
}

export interface KeywordAnalysis {
  found: string[];
  missing: string[];
  density: { [key: string]: number };
  recommendations: string[];
}

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  keywords: string[];
}

// Common ATS-friendly keywords by industry
export const industryKeywords = {
  technology: [
    'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'Agile', 'Scrum', 'Git', 'CI/CD', 'API', 'Database', 'SQL', 'NoSQL',
    'Machine Learning', 'AI', 'Cloud Computing', 'DevOps', 'Microservices'
  ],
  marketing: [
    'Digital Marketing', 'SEO', 'SEM', 'Google Analytics', 'Social Media',
    'Content Marketing', 'Email Marketing', 'PPC', 'Brand Management',
    'Campaign Management', 'Lead Generation', 'Conversion Optimization'
  ],
  finance: [
    'Financial Analysis', 'Excel', 'Financial Modeling', 'Budgeting',
    'Forecasting', 'Risk Management', 'Compliance', 'Audit', 'Accounting',
    'Investment Analysis', 'Portfolio Management', 'Financial Reporting'
  ],
  sales: [
    'Sales Management', 'Lead Generation', 'CRM', 'Salesforce', 'B2B Sales',
    'B2C Sales', 'Account Management', 'Business Development', 'Negotiation',
    'Pipeline Management', 'Revenue Growth', 'Client Relations'
  ],
  healthcare: [
    'Patient Care', 'Medical Records', 'HIPAA', 'Clinical Research',
    'Healthcare Administration', 'Medical Terminology', 'EMR', 'EHR',
    'Quality Assurance', 'Regulatory Compliance', 'Patient Safety'
  ]
};

// ATS-friendly formatting rules
export const atsFormattingRules = {
  fonts: ['Arial', 'Calibri', 'Times New Roman', 'Helvetica'],
  avoidElements: ['tables', 'text boxes', 'headers', 'footers', 'graphics'],
  preferredSections: [
    'Contact Information',
    'Professional Summary',
    'Work Experience',
    'Education',
    'Skills',
    'Certifications'
  ],
  fileFormats: ['PDF', 'DOCX'],
  maxFileSize: '2MB'
};

export class ATSOptimizer {
  
  // Analyze resume for ATS compatibility
  static analyzeResume(resumeData: any, jobDescription?: JobDescription): ATSScore {
    const suggestions: ATSSuggestion[] = [];
    let keywordAnalysis: KeywordAnalysis = {
      found: [],
      missing: [],
      density: {},
      recommendations: []
    };

    // Analyze keywords
    const keywordScore = this.analyzeKeywords(resumeData, suggestions, jobDescription);
    if (jobDescription) {
      keywordAnalysis = this.performKeywordAnalysis(resumeData, jobDescription);
    }

    // Analyze formatting
    const formattingScore = this.analyzeFormatting(resumeData, suggestions);

    // Analyze structure
    const structureScore = this.analyzeStructure(resumeData, suggestions);

    // Analyze content
    const contentScore = this.analyzeContent(resumeData, suggestions);

    // Calculate overall score
    const overall = Math.round(
      (keywordScore * 0.3 + formattingScore * 0.25 + structureScore * 0.25 + contentScore * 0.2)
    );

    return {
      overall,
      breakdown: {
        keywords: keywordScore,
        formatting: formattingScore,
        structure: structureScore,
        content: contentScore
      },
      suggestions: suggestions.sort((a, b) => {
        const impactOrder = { high: 3, medium: 2, low: 1 };
        return impactOrder[b.impact] - impactOrder[a.impact];
      }),
      keywordAnalysis
    };
  }

  // Analyze keyword optimization
  private static analyzeKeywords(resumeData: any, suggestions: ATSSuggestion[], jobDescription?: JobDescription): number {
    let score = 70; // Base score

    const resumeText = this.extractTextFromResume(resumeData).toLowerCase();
    
    if (jobDescription) {
      const jobKeywords = jobDescription.keywords.map(k => k.toLowerCase());
      const foundKeywords = jobKeywords.filter(keyword => 
        resumeText.includes(keyword.toLowerCase())
      );
      
      const keywordMatchRate = foundKeywords.length / jobKeywords.length;
      score = Math.round(keywordMatchRate * 100);

      if (keywordMatchRate < 0.3) {
        suggestions.push({
          type: 'critical',
          category: 'keywords',
          title: 'Low Keyword Match',
          description: `Only ${Math.round(keywordMatchRate * 100)}% of job keywords found in resume`,
          impact: 'high',
          fix: 'Add more relevant keywords from the job description'
        });
      }
    } else {
      // Check for industry-standard keywords
      const skills = resumeData.skills || [];
      if (skills.length < 5) {
        suggestions.push({
          type: 'warning',
          category: 'keywords',
          title: 'Few Technical Skills',
          description: 'Add more relevant technical skills and keywords',
          impact: 'medium'
        });
        score -= 15;
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  // Analyze formatting for ATS compatibility
  private static analyzeFormatting(resumeData: any, suggestions: ATSSuggestion[]): number {
    let score = 85; // Start with good score

    // Check for ATS-friendly sections
    const requiredSections = ['personalInfo', 'experience', 'education', 'skills'];
    const missingSections = requiredSections.filter(section => !resumeData[section]);
    
    if (missingSections.length > 0) {
      suggestions.push({
        type: 'warning',
        category: 'formatting',
        title: 'Missing Standard Sections',
        description: `Missing: ${missingSections.join(', ')}`,
        impact: 'medium'
      });
      score -= missingSections.length * 10;
    }

    // Check contact information
    if (!resumeData.personalInfo?.email) {
      suggestions.push({
        type: 'critical',
        category: 'formatting',
        title: 'Missing Email',
        description: 'Email address is required for ATS systems',
        impact: 'high'
      });
      score -= 20;
    }

    if (!resumeData.personalInfo?.phone) {
      suggestions.push({
        type: 'warning',
        category: 'formatting',
        title: 'Missing Phone Number',
        description: 'Phone number helps with contact',
        impact: 'medium'
      });
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Analyze resume structure
  private static analyzeStructure(resumeData: any, suggestions: ATSSuggestion[]): number {
    let score = 80;

    // Check experience section
    const experience = resumeData.experience || [];
    if (experience.length === 0) {
      suggestions.push({
        type: 'critical',
        category: 'structure',
        title: 'No Work Experience',
        description: 'Add work experience to improve ATS ranking',
        impact: 'high'
      });
      score -= 30;
    } else {
      // Check for proper date formatting
      const hasProperDates = experience.every((exp: any) => exp.startDate && exp.endDate);
      if (!hasProperDates) {
        suggestions.push({
          type: 'warning',
          category: 'structure',
          title: 'Incomplete Date Information',
          description: 'Ensure all positions have start and end dates',
          impact: 'medium'
        });
        score -= 15;
      }
    }

    // Check education section
    const education = resumeData.education || [];
    if (education.length === 0) {
      suggestions.push({
        type: 'warning',
        category: 'structure',
        title: 'No Education Information',
        description: 'Add education details for better ATS compatibility',
        impact: 'medium'
      });
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Analyze content quality
  private static analyzeContent(resumeData: any, suggestions: ATSSuggestion[]): number {
    let score = 75;

    // Check professional summary
    const summary = resumeData.summary || '';
    if (summary.length < 50) {
      suggestions.push({
        type: 'improvement',
        category: 'content',
        title: 'Short Professional Summary',
        description: 'Add a compelling professional summary (100-200 words)',
        impact: 'medium'
      });
      score -= 15;
    }

    // Check experience descriptions
    const experience = resumeData.experience || [];
    const hasDetailedDescriptions = experience.some((exp: any) => 
      exp.description && exp.description.length > 100
    );

    if (!hasDetailedDescriptions) {
      suggestions.push({
        type: 'improvement',
        category: 'content',
        title: 'Lack of Detailed Experience',
        description: 'Add detailed descriptions with achievements and metrics',
        impact: 'high'
      });
      score -= 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Perform detailed keyword analysis
  private static performKeywordAnalysis(resumeData: any, jobDescription: JobDescription): KeywordAnalysis {
    const resumeText = this.extractTextFromResume(resumeData).toLowerCase();
    const jobKeywords = jobDescription.keywords.map(k => k.toLowerCase());
    
    const found: string[] = [];
    const missing: string[] = [];
    const density: { [key: string]: number } = {};

    jobKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = resumeText.match(regex);
      const count = matches ? matches.length : 0;
      
      if (count > 0) {
        found.push(keyword);
        density[keyword] = count;
      } else {
        missing.push(keyword);
      }
    });

    const recommendations = this.generateKeywordRecommendations(missing, found);

    return { found, missing, density, recommendations };
  }

  // Extract text from resume data
  private static extractTextFromResume(resumeData: any): string {
    let text = '';
    
    // Add personal info
    if (resumeData.personalInfo) {
      text += Object.values(resumeData.personalInfo).join(' ') + ' ';
    }
    
    // Add summary
    if (resumeData.summary) {
      text += resumeData.summary + ' ';
    }
    
    // Add experience
    if (resumeData.experience) {
      resumeData.experience.forEach((exp: any) => {
        text += `${exp.position} ${exp.company} ${exp.description || ''} `;
      });
    }
    
    // Add education
    if (resumeData.education) {
      resumeData.education.forEach((edu: any) => {
        text += `${edu.degree} ${edu.field} ${edu.institution} `;
      });
    }
    
    // Add skills
    if (resumeData.skills) {
      text += resumeData.skills.join(' ') + ' ';
    }
    
    return text;
  }

  // Generate keyword recommendations
  private static generateKeywordRecommendations(missing: string[], found: string[]): string[] {
    const recommendations: string[] = [];
    
    if (missing.length > 0) {
      recommendations.push(`Add these missing keywords: ${missing.slice(0, 5).join(', ')}`);
    }
    
    if (found.length > 0) {
      recommendations.push(`Great! You're using these relevant keywords: ${found.slice(0, 3).join(', ')}`);
    }
    
    recommendations.push('Use keywords naturally in context, not just in a skills list');
    recommendations.push('Include variations and synonyms of key terms');
    
    return recommendations;
  }

  // Get ATS optimization tips
  static getOptimizationTips(): string[] {
    return [
      'Use standard section headings like "Work Experience" and "Education"',
      'Include relevant keywords from the job description naturally',
      'Use simple, clean formatting without graphics or tables',
      'Save resume as PDF or DOCX format',
      'Include contact information at the top',
      'Use bullet points for easy scanning',
      'Quantify achievements with numbers and metrics',
      'Keep file size under 2MB',
      'Use standard fonts like Arial or Calibri',
      'Avoid headers, footers, and text boxes'
    ];
  }
}

export default ATSOptimizer;
