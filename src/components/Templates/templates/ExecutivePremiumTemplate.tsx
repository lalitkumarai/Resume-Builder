import React from 'react';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import ModernProfessionalTemplate from './ModernProfessionalTemplate';

interface ExecutivePremiumTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const ExecutivePremiumTemplate: React.FC<ExecutivePremiumTemplateProps> = (props) => {
  // For now, use the Modern Professional template as a base
  // This can be customized later with executive-specific styling
  return <ModernProfessionalTemplate {...props} />;
};

export default ExecutivePremiumTemplate;
