export interface ResumeSection {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  order: number;
  fields: ResumeSectionField[];
  tips: string[];
  examples: string[];
}

export interface ResumeSectionField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'email' | 'phone' | 'url' | 'select' | 'multiselect';
  placeholder: string;
  isRequired: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
  options?: string[];
  helpText?: string;
}

export const resumeSections: ResumeSection[] = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Your contact details and basic information',
    isRequired: true,
    order: 1,
    fields: [
      {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'John',
        isRequired: true,
        validation: {
          minLength: 2,
          maxLength: 50,
          message: 'First name must be between 2-50 characters'
        }
      },
      {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Doe',
        isRequired: true,
        validation: {
          minLength: 2,
          maxLength: 50,
          message: 'Last name must be between 2-50 characters'
        }
      },
      {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'john.doe@email.com',
        isRequired: true,
        validation: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          message: 'Please enter a valid email address'
        }
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: 'phone',
        placeholder: '(555) 123-4567',
        isRequired: true,
        helpText: 'Include country code if applying internationally'
      },
      {
        id: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'New York, NY',
        isRequired: true,
        helpText: 'City, State or City, Country'
      },
      {
        id: 'title',
        label: 'Professional Title',
        type: 'text',
        placeholder: 'Senior Software Engineer',
        isRequired: true,
        helpText: 'Your current or desired job title'
      },
      {
        id: 'linkedin',
        label: 'LinkedIn Profile',
        type: 'url',
        placeholder: 'https://linkedin.com/in/johndoe',
        isRequired: false,
        helpText: 'Your LinkedIn profile URL'
      },
      {
        id: 'website',
        label: 'Portfolio/Website',
        type: 'url',
        placeholder: 'https://johndoe.dev',
        isRequired: false,
        helpText: 'Your personal website or portfolio'
      }
    ],
    tips: [
      'Use a professional email address',
      'Include your full name as it appears on official documents',
      'Make sure your phone number is current and professional',
      'Use a location that matches where you want to work',
      'Your professional title should match your target role'
    ],
    examples: [
      'Email: firstname.lastname@gmail.com (professional)',
      'Phone: (555) 123-4567 (US format)',
      'Location: San Francisco, CA (for local jobs)',
      'Title: Senior Data Scientist (specific and clear)'
    ]
  },
  {
    id: 'professional-summary',
    title: 'Professional Summary',
    description: 'A brief overview of your experience and key qualifications',
    isRequired: true,
    order: 2,
    fields: [
      {
        id: 'summary',
        label: 'Professional Summary',
        type: 'textarea',
        placeholder: 'Experienced software engineer with 5+ years of expertise in full-stack development...',
        isRequired: true,
        validation: {
          minLength: 100,
          maxLength: 500,
          message: 'Summary should be between 100-500 characters'
        },
        helpText: '2-4 sentences highlighting your experience, skills, and career goals'
      }
    ],
    tips: [
      'Start with your years of experience and main expertise',
      'Include 2-3 key skills or achievements',
      'Mention your career goals or what you bring to employers',
      'Use action words and quantify achievements when possible',
      'Tailor it to the specific job you\'re applying for'
    ],
    examples: [
      'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions that serve 1M+ users and mentoring junior developers.',
      'Results-driven marketing professional with 6+ years of experience in digital marketing and brand management. Successfully increased brand awareness by 150% and generated $2M+ in revenue through innovative campaigns.',
      'Dedicated healthcare professional with 10+ years of experience in patient care and clinical operations. Committed to improving patient outcomes through evidence-based practices and collaborative care approaches.'
    ]
  },
  {
    id: 'work-experience',
    title: 'Work Experience',
    description: 'Your professional work history and achievements',
    isRequired: true,
    order: 3,
    fields: [
      {
        id: 'position',
        label: 'Job Title',
        type: 'text',
        placeholder: 'Senior Software Engineer',
        isRequired: true,
        helpText: 'Your official job title'
      },
      {
        id: 'company',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Tech Solutions Inc.',
        isRequired: true,
        helpText: 'Full company name'
      },
      {
        id: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'New York, NY',
        isRequired: true,
        helpText: 'City, State where you worked'
      },
      {
        id: 'startDate',
        label: 'Start Date',
        type: 'date',
        placeholder: 'MM/YYYY',
        isRequired: true,
        helpText: 'Month and year you started'
      },
      {
        id: 'endDate',
        label: 'End Date',
        type: 'date',
        placeholder: 'MM/YYYY or Present',
        isRequired: false,
        helpText: 'Leave blank if current position'
      },
      {
        id: 'description',
        label: 'Job Description & Achievements',
        type: 'textarea',
        placeholder: '• Led development of microservices architecture serving 1M+ users\n• Implemented CI/CD pipelines reducing deployment time by 60%\n• Mentored team of 5 junior developers',
        isRequired: true,
        validation: {
          minLength: 50,
          message: 'Please provide detailed job description'
        },
        helpText: 'Use bullet points to describe your responsibilities and achievements'
      }
    ],
    tips: [
      'List experiences in reverse chronological order (most recent first)',
      'Use bullet points for easy reading',
      'Start each bullet with an action verb (Led, Developed, Managed, etc.)',
      'Quantify achievements with numbers, percentages, or dollar amounts',
      'Focus on accomplishments, not just job duties',
      'Include 3-5 bullet points per position',
      'Tailor descriptions to match the job you\'re applying for'
    ],
    examples: [
      '• Led development of microservices architecture serving 1M+ users',
      '• Increased sales revenue by 35% through strategic client relationship management',
      '• Reduced operational costs by $500K annually through process optimization',
      '• Managed cross-functional team of 12 members across 3 departments',
      '• Implemented new training program resulting in 40% improvement in employee retention'
    ]
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Your educational background and qualifications',
    isRequired: true,
    order: 4,
    fields: [
      {
        id: 'degree',
        label: 'Degree',
        type: 'text',
        placeholder: 'Bachelor of Science in Computer Science',
        isRequired: true,
        helpText: 'Full degree name and field of study'
      },
      {
        id: 'institution',
        label: 'Institution',
        type: 'text',
        placeholder: 'University of Technology',
        isRequired: true,
        helpText: 'Full name of school or university'
      },
      {
        id: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'Boston, MA',
        isRequired: false,
        helpText: 'City, State of institution'
      },
      {
        id: 'graduationYear',
        label: 'Graduation Year',
        type: 'text',
        placeholder: '2020',
        isRequired: true,
        helpText: 'Year you graduated or expected graduation'
      },
      {
        id: 'gpa',
        label: 'GPA',
        type: 'text',
        placeholder: '3.8/4.0',
        isRequired: false,
        helpText: 'Include if 3.5 or higher'
      },
      {
        id: 'honors',
        label: 'Honors & Awards',
        type: 'text',
        placeholder: 'Magna Cum Laude, Dean\'s List',
        isRequired: false,
        helpText: 'Academic honors, scholarships, or awards'
      }
    ],
    tips: [
      'List education in reverse chronological order',
      'Include GPA only if it\'s 3.5 or higher',
      'Mention relevant coursework for entry-level positions',
      'Include academic honors and awards',
      'For recent graduates, education can come before experience',
      'Include certifications and professional development'
    ],
    examples: [
      'Bachelor of Science in Computer Science, MIT, Cambridge, MA, 2020, GPA: 3.9/4.0',
      'Master of Business Administration, Harvard Business School, Boston, MA, 2018',
      'Associate Degree in Nursing, Community College of Denver, Denver, CO, 2019, Summa Cum Laude'
    ]
  }
];

export const resumeWritingTips = {
  general: [
    'Keep your resume to 1-2 pages maximum',
    'Use a clean, professional font (Arial, Calibri, or Times New Roman)',
    'Maintain consistent formatting throughout',
    'Use bullet points for easy scanning',
    'Include keywords from the job description',
    'Proofread carefully for spelling and grammar errors',
    'Save as PDF to preserve formatting',
    'Use action verbs to start bullet points',
    'Quantify achievements with specific numbers',
    'Tailor your resume for each job application'
  ],
  ats: [
    'Use standard section headings (Experience, Education, Skills)',
    'Avoid images, graphics, and complex formatting',
    'Use standard fonts and avoid fancy styling',
    'Include keywords from the job posting',
    'Use both acronyms and full terms (e.g., "AI" and "Artificial Intelligence")',
    'Save in both PDF and Word formats',
    'Avoid headers and footers',
    'Use simple bullet points (• or -)',
    'Don\'t use tables or columns for important information',
    'Test your resume through an ATS checker'
  ],
  formatting: [
    'Use 10-12 point font size',
    'Maintain 0.5-1 inch margins',
    'Use consistent spacing between sections',
    'Bold section headings and job titles',
    'Use reverse chronological order',
    'Align text consistently (left-aligned is safest)',
    'Use white or off-white background',
    'Ensure good contrast between text and background',
    'Use consistent date formats (MM/YYYY)',
    'Keep line spacing at 1.0 or 1.15'
  ]
};
