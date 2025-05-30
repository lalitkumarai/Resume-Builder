import React from 'react';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import ClassicElegantTemplate from './ClassicElegantTemplate';

interface FinanceBankingTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const FinanceBankingTemplate: React.FC<FinanceBankingTemplateProps> = (props) => {
  // For now, use the Classic Elegant template as a base
  // This can be customized later with finance-specific styling
  return <ClassicElegantTemplate {...props} />;
};

export default FinanceBankingTemplate;
