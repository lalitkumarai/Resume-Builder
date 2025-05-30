import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../types/resume';
import { ResumeTemplate } from '../../types/templates';

// Template Components
import ModernProfessionalTemplate from './templates/ModernProfessionalTemplate';
import ClassicElegantTemplate from './templates/ClassicElegantTemplate';
import CreativeDesignerTemplate from './templates/CreativeDesignerTemplate';
import MinimalistCleanTemplate from './templates/MinimalistCleanTemplate';
import ExecutivePremiumTemplate from './templates/ExecutivePremiumTemplate';
import TechnicalEngineerTemplate from './templates/TechnicalEngineerTemplate';
import SoftwareDeveloperTemplate from './templates/SoftwareDeveloperTemplate';
import FinanceBankingTemplate from './templates/FinanceBankingTemplate';

const TemplateContainer = styled.div<{ template: ResumeTemplate }>`
  width: 100%;
  max-width: 8.5in;
  min-height: 11in;
  margin: 0 auto;
  background: ${props => props.template.colors.background};
  color: ${props => props.template.colors.text};
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  
  @media print {
    box-shadow: none;
    border-radius: 0;
    max-width: none;
    width: 100%;
    margin: 0;
  }
`;

interface TemplateRendererProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  template, 
  resume, 
  isPreview = false 
}) => {
  const renderTemplate = () => {
    switch (template.id) {
      case 'modern-professional':
        return <ModernProfessionalTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'classic-elegant':
        return <ClassicElegantTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'creative-designer':
        return <CreativeDesignerTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'minimalist-clean':
        return <MinimalistCleanTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'executive-premium':
        return <ExecutivePremiumTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'technical-engineer':
        return <TechnicalEngineerTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'software-developer':
        return <SoftwareDeveloperTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      case 'finance-banking':
        return <FinanceBankingTemplate template={template} resume={resume} isPreview={isPreview} />;
      
      // Add more template cases as needed
      default:
        return <ModernProfessionalTemplate template={template} resume={resume} isPreview={isPreview} />;
    }
  };

  return (
    <TemplateContainer template={template}>
      {renderTemplate()}
    </TemplateContainer>
  );
};

export default TemplateRenderer;
