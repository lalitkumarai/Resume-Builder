import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaSave, FaDownload, FaEye, FaBars, FaTimes, FaFileAlt, FaUser, FaBuilding, FaEdit } from 'react-icons/fa';

import { CoverLetterFormData, CoverLetterTemplate, coverLetterTemplates } from '../types/coverLetter';

const BuilderContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background: #f8f9fa;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 350px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 1000;
    height: 100vh;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StepNavigation = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const StepItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isActive ? '#667eea' : props.isCompleted ? '#e8f5e8' : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.isCompleted ? '#28a745' : '#666'};

  &:hover {
    background: ${props => props.isActive ? '#667eea' : '#f8f9fa'};
  }
`;

const StepNumber = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.isActive ? 'white' : props.isCompleted ? '#28a745' : '#e9ecef'};
  color: ${props => props.isActive ? '#667eea' : props.isCompleted ? 'white' : '#666'};
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const PreviewContainer = styled.div`
  width: 400px;
  background: white;
  border-left: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const PreviewHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PreviewContent = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: white;
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 100px;
  left: 20px;
  z-index: 1001;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? '#667eea' : '#6c757d'};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#5a6268'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
`;

const CoverLetterBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate>(coverLetterTemplates[0]);
  const [formData, setFormData] = useState<CoverLetterFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      },
      linkedin: '',
      website: ''
    },
    recipientInfo: {
      companyName: '',
      hiringManagerName: '',
      hiringManagerTitle: '',
      jobTitle: '',
      jobReference: '',
      department: ''
    },
    letterContent: {
      opening: 'Dear Hiring Manager,',
      introduction: '',
      bodyParagraphs: ['', ''],
      conclusion: '',
      closingPhrase: 'Sincerely,'
    }
  });

  const steps = [
    { id: 'template', title: 'Choose Template', icon: <FaFileAlt /> },
    { id: 'personal', title: 'Personal Info', icon: <FaUser /> },
    { id: 'recipient', title: 'Recipient Info', icon: <FaBuilding /> },
    { id: 'content', title: 'Letter Content', icon: <FaEdit /> },
    { id: 'review', title: 'Review & Export', icon: <FaEye /> }
  ];

  const handleInputChange = (section: keyof CoverLetterFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: keyof CoverLetterFormData, parentField: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section] as any)[parentField],
          [field]: value
        }
      }
    }));
  };

  const handleArrayInputChange = (section: keyof CoverLetterFormData, field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    }));
  };

  const addBodyParagraph = () => {
    setFormData(prev => ({
      ...prev,
      letterContent: {
        ...prev.letterContent,
        bodyParagraphs: [...prev.letterContent.bodyParagraphs, '']
      }
    }));
  };

  const removeBodyParagraph = (index: number) => {
    if (formData.letterContent.bodyParagraphs.length > 1) {
      setFormData(prev => ({
        ...prev,
        letterContent: {
          ...prev.letterContent,
          bodyParagraphs: prev.letterContent.bodyParagraphs.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    // Implement save functionality
    console.log('Saving cover letter...', formData);
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    // Implement export functionality
    console.log(`Exporting as ${format}...`, formData);
  };

  return (
    <BuilderContainer>
      <MobileToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Cover Letter Builder</SidebarTitle>
        </SidebarHeader>

        <StepNavigation>
          {steps.map((step, index) => (
            <StepItem
              key={step.id}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              onClick={() => setCurrentStep(index)}
            >
              <StepNumber isActive={currentStep === index} isCompleted={currentStep > index}>
                {currentStep > index ? '✓' : index + 1}
              </StepNumber>
              <div>
                <div style={{ fontWeight: '600' }}>{step.title}</div>
              </div>
            </StepItem>
          ))}
        </StepNavigation>
      </Sidebar>

      <FormContainer>
        <ActionButtons>
          <ActionButton onClick={handleSave}>
            <FaSave /> Save Draft
          </ActionButton>
          <ActionButton onClick={() => handleExport('pdf')} primary>
            <FaDownload /> Export PDF
          </ActionButton>
        </ActionButtons>

        {/* Step content will be rendered here based on currentStep */}
        {currentStep === 0 && (
          <FormSection>
            <SectionTitle>
              <FaFileAlt /> Choose Template
            </SectionTitle>
            {/* Template selection content */}
          </FormSection>
        )}

        {currentStep === 1 && (
          <FormSection>
            <SectionTitle>
              <FaUser /> Personal Information
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>First Name *</Label>
                <Input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name *</Label>
                <Input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone *</Label>
                <Input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </FormGroup>
            </FormGrid>
          </FormSection>
        )}

        <NavigationButtons>
          <ActionButton onClick={handlePrevStep} disabled={currentStep === 0}>
            <FaArrowLeft /> Previous
          </ActionButton>
          <ActionButton onClick={handleNextStep} disabled={currentStep === steps.length - 1} primary>
            Next <FaArrowRight />
          </ActionButton>
        </NavigationButtons>
      </FormContainer>

      <PreviewContainer>
        <PreviewHeader>
          <h4>Live Preview</h4>
          <ActionButton onClick={() => handleExport('pdf')}>
            <FaEye /> Preview
          </ActionButton>
        </PreviewHeader>
        <PreviewContent>
          {/* Live preview of the cover letter will be rendered here */}
          <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100%' }}>
            <p>Cover letter preview will appear here...</p>
          </div>
        </PreviewContent>
      </PreviewContainer>
    </BuilderContainer>
  );
};

export default CoverLetterBuilder;
