import React from 'react';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import ModernProfessionalTemplate from './ModernProfessionalTemplate';

interface TechnicalEngineerTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const TechnicalEngineerTemplate: React.FC<TechnicalEngineerTemplateProps> = (props) => {
  // For now, use the Modern Professional template as a base
  // This can be customized later with technical-specific styling
  return <ModernProfessionalTemplate {...props} />;
};

export default TechnicalEngineerTemplate;
