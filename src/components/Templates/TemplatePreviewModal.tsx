import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaCheck, FaEye, FaCrown } from 'react-icons/fa';

import { ResumeTemplate } from '../../types/templates';
import { Resume } from '../../types/resume';
import TemplateRenderer from './TemplateRenderer';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const TemplateName = styled.h2`
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  font-size: 1.6rem;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 2px;
  }
`;

const TemplateDescription = styled.p`
  color: #64748b;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  font-weight: 500;
`;

const TemplateMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%);
  color: #6366f1;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid rgba(99, 102, 241, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  }
`;

const Badge = styled.span<{ type: 'popular' | 'new' | 'premium' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: ${props =>
    props.type === 'popular' ? '#ff6b6b' :
    props.type === 'new' ? '#4ecdc4' :
    '#f39c12'
  };
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const PreviewSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const TemplatePreview = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  transform: scale(0.4);
  transform-origin: center;
  width: 8.5in;
  height: 11in;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 10px;
  border-left: 4px solid #667eea;
`;

const FeatureTitle = styled.h4`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
`;

const ModalFooter = styled.div`
  padding: 2rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${props => props.primary ? '#667eea' : '#e9ecef'};
  background: ${props => props.primary ? '#667eea' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#f8f9ff'};
    border-color: #667eea;
    transform: translateY(-1px);
  }
`;

interface TemplatePreviewModalProps {
  template: ResumeTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  // Sample resume data for preview
  const sampleResume: Resume = {
    id: 'sample',
    userId: 'sample',
    title: 'Sample Resume',
    personalInfo: {
      id: 'personal-1',
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      title: 'Senior Software Engineer',
      linkedIn: 'linkedin.com/in/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    skills: [
      { id: '1', name: 'JavaScript', level: 'Expert', category: 'technical' },
      { id: '2', name: 'React', level: 'Expert', category: 'technical' },
      { id: '3', name: 'Node.js', level: 'Advanced', category: 'technical' },
      { id: '4', name: 'AWS', level: 'Advanced', category: 'technical' },
      { id: '5', name: 'Docker', level: 'Intermediate', category: 'technical' },
      { id: '6', name: 'Python', level: 'Intermediate', category: 'technical' }
    ],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteerExperience: [],
    publications: [],
    references: [],
    professionalSummary: {
      id: 'summary-1',
      summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers.'
    },
    workExperience: [
      {
        id: '1',
        jobTitle: 'Senior Software Engineer',
        position: 'Senior Software Engineer',
        companyName: 'Tech Solutions Inc.',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        startDate: '2020-01',
        endDate: '2024-01',
        isCurrentJob: false,
        responsibilities: ['Led development team', 'Architected solutions'],
        achievements: ['Improved performance by 40%'],
        description: 'Led development of scalable web applications\nArchitected cloud-based solutions\nMentored junior developers'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'MIT',
        location: 'Boston, MA',
        graduationYear: '2018',
        gpa: '3.8'
      }
    ],
    template: template.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false
  };

  const featureDescriptions: Record<string, string> = {
    'ATS-Friendly': 'Optimized for Applicant Tracking Systems',
    'Clean Layout': 'Simple and professional design',
    'Modern Typography': 'Contemporary fonts and styling',
    'Color Customizable': 'Easily change colors to match your brand',
    'Creative Layout': 'Unique design for creative professionals',
    'Professional': 'Perfect for corporate environments',
    'Minimal Design': 'Clean and distraction-free layout',
    'Premium Design': 'High-end professional appearance',
    'Technical Skills Focus': 'Emphasizes technical abilities',
    'Publications Section': 'Dedicated space for research publications',
    'Results-Oriented': 'Highlights achievements and metrics'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <HeaderInfo>
            <TemplateName>{template.name}</TemplateName>
            <TemplateDescription>{template.description}</TemplateDescription>
            <TemplateMeta>
              <MetaItem>{template.category}</MetaItem>
              <MetaItem>{template.difficulty}</MetaItem>
              {template.isPopular && <Badge type="popular">Popular</Badge>}
              {template.isNew && <Badge type="new">New</Badge>}
              {template.isPremium && <Badge type="premium"><FaCrown /> Premium</Badge>}
            </TemplateMeta>
          </HeaderInfo>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <PreviewSection>
            <SectionTitle>Template Preview</SectionTitle>
            <TemplatePreview>
              <PreviewContainer>
                <TemplateRenderer
                  template={template}
                  resume={sampleResume}
                  isPreview={true}
                />
              </PreviewContainer>
            </TemplatePreview>
          </PreviewSection>

          <PreviewSection>
            <SectionTitle>Features & Benefits</SectionTitle>
            <FeaturesGrid>
              {template.features.map(feature => (
                <FeatureCard key={feature}>
                  <FeatureTitle>{feature}</FeatureTitle>
                  <FeatureDescription>
                    {featureDescriptions[feature] || 'Professional feature for your resume'}
                  </FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </PreviewSection>
        </ModalBody>

        <ModalFooter>
          <ActionButton onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton primary onClick={() => onSelect(template.id)}>
            <FaCheck /> Use This Template
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TemplatePreviewModal;
