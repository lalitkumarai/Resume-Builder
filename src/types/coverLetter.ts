export interface CoverLetter {
  id: string;
  title: string;
  content: CoverLetterContent;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CoverLetterContent {
  personalInfo: PersonalInfo;
  recipientInfo: RecipientInfo;
  letterBody: LetterBody;
  closing: Closing;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  linkedin?: string;
  website?: string;
}

export interface RecipientInfo {
  companyName: string;
  hiringManagerName?: string;
  hiringManagerTitle?: string;
  companyAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  jobTitle: string;
  jobReference?: string;
  department?: string;
}

export interface LetterBody {
  opening: string;
  introduction: string;
  bodyParagraphs: BodyParagraph[];
  conclusion: string;
}

export interface BodyParagraph {
  id: string;
  content: string;
  type: 'experience' | 'skills' | 'achievements' | 'motivation' | 'custom';
}

export interface Closing {
  closingPhrase: string;
  signature: string;
  enclosures?: string[];
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'modern' | 'traditional' | 'executive';
  preview: string;
  structure: {
    headerStyle: 'standard' | 'modern' | 'minimal' | 'executive';
    bodyStyle: 'formal' | 'conversational' | 'direct' | 'storytelling';
    layout: 'single-column' | 'two-column' | 'header-footer';
  };
  styling: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    margins: string;
    colors: {
      primary: string;
      secondary: string;
      text: string;
      accent: string;
    };
  };
}

export interface CoverLetterFormData {
  personalInfo: PersonalInfo;
  recipientInfo: RecipientInfo;
  letterContent: {
    opening: string;
    introduction: string;
    bodyParagraphs: string[];
    conclusion: string;
    closingPhrase: string;
  };
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'professional-standard',
    name: 'Professional Standard',
    description: 'Clean, traditional format perfect for corporate positions',
    category: 'professional',
    preview: '/templates/cover-letter/professional-standard.png',
    structure: {
      headerStyle: 'standard',
      bodyStyle: 'formal',
      layout: 'single-column'
    },
    styling: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.5',
      margins: '1in',
      colors: {
        primary: '#000000',
        secondary: '#333333',
        text: '#000000',
        accent: '#0066cc'
      }
    }
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    description: 'Contemporary design with subtle color accents',
    category: 'modern',
    preview: '/templates/cover-letter/modern-creative.png',
    structure: {
      headerStyle: 'modern',
      bodyStyle: 'conversational',
      layout: 'single-column'
    },
    styling: {
      fontFamily: 'Calibri, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.4',
      margins: '0.8in',
      colors: {
        primary: '#2c3e50',
        secondary: '#34495e',
        text: '#2c3e50',
        accent: '#3498db'
      }
    }
  },
  {
    id: 'executive-formal',
    name: 'Executive Formal',
    description: 'Sophisticated design for senior-level positions',
    category: 'executive',
    preview: '/templates/cover-letter/executive-formal.png',
    structure: {
      headerStyle: 'executive',
      bodyStyle: 'formal',
      layout: 'single-column'
    },
    styling: {
      fontFamily: 'Times New Roman, serif',
      fontSize: '12pt',
      lineHeight: '1.6',
      margins: '1.2in',
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a4a4a',
        text: '#1a1a1a',
        accent: '#8b0000'
      }
    }
  },
  {
    id: 'creative-design',
    name: 'Creative Design',
    description: 'Bold, innovative layout for creative industries',
    category: 'creative',
    preview: '/templates/cover-letter/creative-design.png',
    structure: {
      headerStyle: 'modern',
      bodyStyle: 'storytelling',
      layout: 'two-column'
    },
    styling: {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.3',
      margins: '0.75in',
      colors: {
        primary: '#2c3e50',
        secondary: '#e74c3c',
        text: '#2c3e50',
        accent: '#f39c12'
      }
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Simple, elegant design focusing on content',
    category: 'modern',
    preview: '/templates/cover-letter/minimal-clean.png',
    structure: {
      headerStyle: 'minimal',
      bodyStyle: 'direct',
      layout: 'single-column'
    },
    styling: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.5',
      margins: '1in',
      colors: {
        primary: '#333333',
        secondary: '#666666',
        text: '#333333',
        accent: '#007acc'
      }
    }
  }
];

export const coverLetterSampleContent = {
  openings: [
    "Dear Hiring Manager,",
    "Dear [Hiring Manager Name],",
    "To Whom It May Concern:",
    "Dear [Department] Team,",
    "Dear Recruitment Team,"
  ],
  introductions: [
    "I am writing to express my strong interest in the [Job Title] position at [Company Name]. With my background in [relevant field/experience], I am excited about the opportunity to contribute to your team.",
    "I was thrilled to discover the [Job Title] opening at [Company Name] through [where you found the job]. My [number] years of experience in [relevant field] make me an ideal candidate for this role.",
    "As a passionate [profession/field] professional with [specific qualification], I am excited to apply for the [Job Title] position at [Company Name]. Your company's commitment to [company value/mission] aligns perfectly with my career goals."
  ],
  closings: [
    "Sincerely,",
    "Best regards,",
    "Thank you for your consideration,",
    "Respectfully,",
    "Kind regards,"
  ]
};
