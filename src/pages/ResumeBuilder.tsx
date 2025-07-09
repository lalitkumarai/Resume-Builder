import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-toastify';

import { resumeTemplates } from '../data/templates';

// Components
import StepNavigation from '../components/ResumeBuilder/StepNavigation';
import PersonalInfoForm from '../components/Forms/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/Forms/ProfessionalSummaryForm';
import WorkExperienceForm from '../components/Forms/WorkExperienceForm';
import EducationForm from '../components/Forms/EducationForm';
import SkillsForm from '../components/Forms/SkillsForm';
import ProjectsForm from '../components/Forms/ProjectsForm';
import CertificationsForm from '../components/Forms/CertificationsForm';
import AdditionalInfoForm from '../components/Forms/AdditionalInfoForm';
import ResumePreview from '../components/ResumeBuilder/ResumePreview';
import SaveIndicator from '../components/ResumeBuilder/SaveIndicator';

// Context
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

// Icons
import { FaSave, FaDownload, FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Styled component prop interfaces
interface SidebarProps {
  isOpen: boolean;
}

interface ActionButtonProps {
  primary?: boolean;
}

const BuilderContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Sidebar = styled.div<SidebarProps>`
  width: 350px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Header = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: between;
  align-items: center;
  gap: 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const ResumeTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? '#667eea' : '#6c757d'};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

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

const FormContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  border-top: 1px solid #e9ecef;
`;

const MobileToggle = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    background: white;
    color: #333;
    cursor: pointer;
  }
`;

const ResumeBuilder: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentResume,
    currentStep,
    formSteps,
    isLoading,
    isSaving,
    loadResume,
    createResume,
    saveResume,
    setCurrentStep,
    exportResume,
  } = useResume();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    // Check for template selection from URL
    const templateId = searchParams.get('template');
    if (templateId) {
      const template = resumeTemplates.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(templateId);
        console.log('Selected template:', template.name);
      }
    }

    if (resumeId) {
      loadResume(resumeId).catch((error) => {
        console.error('Failed to load resume');
        navigate('/dashboard');
      });
    } else {
      // Create new resume
      const title = templateId
        ? `Resume - ${resumeTemplates.find(t => t.id === templateId)?.name || 'Custom'}`
        : `Resume ${new Date().toLocaleDateString()}`;
      createResume(title).catch((error) => {
        console.error('Failed to create resume');
        navigate('/dashboard');
      });
    }
  }, [resumeId, searchParams]);

  const handleSave = async () => {
    if (currentResume) {
      try {
        await saveResume(currentResume);
        console.log('Resume saved successfully!');
      } catch (error) {
        console.error('Failed to save resume');
      }
    }
  };

  const handleExport = async (format: 'pdf' | 'docx' | 'json') => {
    try {
      await exportResume(format);
      console.log(`Resume exported as ${format.toUpperCase()}!`);
    } catch (error) {
      console.error('Failed to export resume');
    }
  };

  const handleNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentForm = () => {
    const currentFormStep = formSteps[currentStep];

    switch (currentFormStep?.component) {
      case 'PersonalInfoForm':
        return <PersonalInfoForm />;
      case 'ProfessionalSummaryForm':
        return <ProfessionalSummaryForm />;
      case 'WorkExperienceForm':
        return <WorkExperienceForm />;
      case 'EducationForm':
        return <EducationForm />;
      case 'SkillsForm':
        return <SkillsForm />;
      case 'ProjectsForm':
        return <ProjectsForm />;
      case 'CertificationsForm':
        return <CertificationsForm />;
      case 'AdditionalInfoForm':
        return <AdditionalInfoForm />;
      default:
        return <div>Form not found</div>;
    }
  };

  if (isLoading) {
    return (
      <BuilderContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div>Loading...</div>
        </div>
      </BuilderContainer>
    );
  }

  return (
    <BuilderContainer>
      <Sidebar isOpen={sidebarOpen}>
        <StepNavigation
          steps={formSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderLeft>
            <MobileToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰ Steps
            </MobileToggle>
            <ResumeTitle>
              {currentResume?.title || 'New Resume'}
            </ResumeTitle>
            <SaveIndicator isSaving={isSaving} />
          </HeaderLeft>

          <HeaderRight>
            <ActionButton onClick={handleSave} disabled={isSaving}>
              <FaSave /> Save
            </ActionButton>

            <ActionButton onClick={() => setPreviewMode(!previewMode)}>
              <FaEye /> {previewMode ? 'Edit' : 'Preview'}
            </ActionButton>

            <ActionButton onClick={() => handleExport('pdf')} primary>
              <FaDownload /> Export PDF
            </ActionButton>
          </HeaderRight>
        </Header>

        {previewMode ? (
          <div style={{ flex: 1 }}>
            <ResumePreview resume={currentResume} />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <FormContainer>
              {renderCurrentForm()}
            </FormContainer>

            <NavigationButtons>
              <ActionButton
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                <FaArrowLeft /> Previous
              </ActionButton>

              <ActionButton
                onClick={handleNextStep}
                disabled={currentStep === formSteps.length - 1}
                primary
              >
                Next <FaArrowRight />
              </ActionButton>
            </NavigationButtons>
          </div>
        )}
      </MainContent>
    </BuilderContainer>
  );
};

export default ResumeBuilder;
