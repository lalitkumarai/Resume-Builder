export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  preview: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

export type TemplateCategory = 
  | 'Modern' 
  | 'Classic' 
  | 'Creative' 
  | 'Professional' 
  | 'Minimalist' 
  | 'Executive' 
  | 'Technical' 
  | 'Academic';

export interface TemplateFilter {
  category?: TemplateCategory;
  difficulty?: string;
  features?: string[];
  isPremium?: boolean;
}

export interface TemplatePreviewProps {
  template: ResumeTemplate;
  onSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}
