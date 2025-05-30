// TypeScript interfaces for Resume Builder application

export interface PersonalInfo {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  profileImage?: string;
}

export interface ProfessionalSummary {
  id: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  relevantCoursework?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  projectUrl?: string;
  githubUrl?: string;
  keyOutcomes: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  dateCompleted: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface VolunteerExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentRole: boolean;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  publicationDate: string;
  url?: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  volunteerExperience: VolunteerExperience[];
  publications: Publication[];
  references: Reference[];
  template: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  resumes: string[]; // Array of resume IDs
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'ats-friendly';
  previewImage: string;
  isATSFriendly: boolean;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  component: string;
  isCompleted: boolean;
  isRequired: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isValid: boolean;
  errors: ValidationError[];
  isDirty: boolean;
  isSubmitting: boolean;
}

// Export/Import types
export interface ExportOptions {
  format: 'pdf' | 'docx' | 'json';
  template: string;
  includeReferences: boolean;
  fontSize: number;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
