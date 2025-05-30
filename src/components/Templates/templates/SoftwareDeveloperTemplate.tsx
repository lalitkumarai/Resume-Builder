import React from 'react';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import ModernProfessionalTemplate from './ModernProfessionalTemplate';

interface SoftwareDeveloperTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const SoftwareDeveloperTemplate: React.FC<SoftwareDeveloperTemplateProps> = (props) => {
  // For now, use the Modern Professional template as a base
  // This can be customized later with developer-specific styling
  return <ModernProfessionalTemplate {...props} />;
};

export default SoftwareDeveloperTemplate;
