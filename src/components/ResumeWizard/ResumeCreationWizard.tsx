import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaFileAlt, FaBriefcase, FaGraduationCap, FaCogs, FaArrowLeft, FaArrowRight, FaCheckCircle, FaLightbulb, FaSave } from 'react-icons/fa';

const WizardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const WizardHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const WizardTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 8px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, #667eea, #764ba2);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => 
    props.completed ? '#28a745' : 
    props.active ? '#667eea' : '#e9ecef'
  };
  color: ${props => props.active || props.completed ? 'white' : '#666'};
  font-weight: 600;
  transition: all 0.3s ease;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
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
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const HelpText = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
`;

const TipBox = styled.div`
  background: #e8f5e8;
  border-left: 4px solid #28a745;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const ExampleBox = styled.div`
  background: #f8f9ff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

interface WizardStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const wizardSteps: WizardStep[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    icon: <FaUser />,
    description: 'Your contact information and professional identity'
  },
  {
    id: 'summary',
    title: 'Summary',
    icon: <FaFileAlt />,
    description: 'A compelling overview of your experience'
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: <FaBriefcase />,
    description: 'Your work history and achievements'
  },
  {
    id: 'education',
    title: 'Education',
    icon: <FaGraduationCap />,
    description: 'Your educational background'
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <FaCogs />,
    description: 'Your technical and soft skills'
  }
];

interface ResumeCreationWizardProps {
  onComplete?: (data: any) => void;
}

const ResumeCreationWizard: React.FC<ResumeCreationWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    personal: {},
    summary: '',
    experience: [{}],
    education: [{}],
    skills: []
  });

  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setFormData((prev: any) => {
      if (index !== undefined) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (section === 'skills') {
        return { ...prev, [section]: value.split(',').map((s: string) => s.trim()) };
      } else if (typeof prev[section] === 'object') {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const addExperienceEntry = () => {
    setFormData((prev: any) => ({
      ...prev,
      experience: [...prev.experience, {}]
    }));
  };

  const addEducationEntry = () => {
    setFormData((prev: any) => ({
      ...prev,
      education: [...prev.education, {}]
    }));
  };

  const renderPersonalInfoStep = () => (
    <FormCard>
      <SectionTitle>
        <FaUser />
        Personal Information
      </SectionTitle>
      <SectionDescription>
        Start with your basic contact information. This helps employers reach you.
      </SectionDescription>
      
      <FormGrid>
        <FormGroup>
          <Label>First Name *</Label>
          <Input
            type="text"
            placeholder="John"
            value={formData.personal.firstName || ''}
            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Last Name *</Label>
          <Input
            type="text"
            placeholder="Doe"
            value={formData.personal.lastName || ''}
            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Email Address *</Label>
          <Input
            type="email"
            placeholder="john.doe@email.com"
            value={formData.personal.email || ''}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
          />
          <HelpText>Use a professional email address</HelpText>
        </FormGroup>
        
        <FormGroup>
          <Label>Phone Number *</Label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.personal.phone || ''}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Location *</Label>
          <Input
            type="text"
            placeholder="New York, NY"
            value={formData.personal.location || ''}
            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
          />
          <HelpText>City, State or City, Country</HelpText>
        </FormGroup>
        
        <FormGroup>
          <Label>Professional Title *</Label>
          <Input
            type="text"
            placeholder="Senior Software Engineer"
            value={formData.personal.title || ''}
            onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
          />
          <HelpText>Your current or desired job title</HelpText>
        </FormGroup>
      </FormGrid>

      <TipBox>
        <FaLightbulb style={{ color: '#28a745', fontSize: '1.2rem', marginTop: '0.1rem' }} />
        <div>
          <strong>Pro Tip:</strong> Use a professional email format like firstname.lastname@email.com. 
          Avoid nicknames or unprofessional addresses.
        </div>
      </TipBox>
    </FormCard>
  );

  const renderSummaryStep = () => (
    <FormCard>
      <SectionTitle>
        <FaFileAlt />
        Professional Summary
      </SectionTitle>
      <SectionDescription>
        Write a compelling 2-4 sentence overview of your experience and what you bring to employers.
      </SectionDescription>
      
      <FormGroup>
        <Label>Professional Summary *</Label>
        <TextArea
          placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
          value={formData.summary || ''}
          onChange={(e) => handleInputChange('summary', '', e.target.value)}
        />
        <HelpText>2-4 sentences highlighting your experience, skills, and career goals</HelpText>
      </FormGroup>

      <TipBox>
        <FaLightbulb style={{ color: '#28a745', fontSize: '1.2rem', marginTop: '0.1rem' }} />
        <div>
          <strong>Writing Tips:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
            <li>Start with your years of experience</li>
            <li>Include 2-3 key skills or achievements</li>
            <li>Mention what you bring to employers</li>
            <li>Use numbers when possible (5+ years, 20% increase, etc.)</li>
          </ul>
        </div>
      </TipBox>

      <ExampleBox>
        <strong>Example:</strong><br />
        "Experienced software engineer with 8+ years of expertise in full-stack development and cloud architecture. 
        Led development of microservices platform serving 1M+ users and increased system performance by 40%. 
        Passionate about mentoring junior developers and implementing scalable solutions that drive business growth."
      </ExampleBox>
    </FormCard>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfoStep();
      case 1:
        return renderSummaryStep();
      case 2:
        return <div>Experience Step (Coming Soon)</div>;
      case 3:
        return <div>Education Step (Coming Soon)</div>;
      case 4:
        return <div>Skills Step (Coming Soon)</div>;
      default:
        return <div>Step not found</div>;
    }
  };

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <WizardContainer>
      <WizardHeader>
        <WizardTitle>Create Your Resume</WizardTitle>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <div style={{ color: '#666', fontSize: '0.9rem' }}>
          Step {currentStep + 1} of {wizardSteps.length}
        </div>
      </WizardHeader>

      <StepIndicator>
        {wizardSteps.map((step, index) => (
          <StepDot
            key={step.id}
            active={index === currentStep}
            completed={index < currentStep}
          >
            {index < currentStep ? <FaCheckCircle /> : index + 1}
          </StepDot>
        ))}
      </StepIndicator>

      {renderCurrentStep()}

      <NavigationButtons>
        <NavButton onClick={handlePrev} disabled={currentStep === 0}>
          <FaArrowLeft /> Previous
        </NavButton>
        
        <NavButton onClick={handleNext} primary>
          {currentStep === wizardSteps.length - 1 ? (
            <>
              <FaSave /> Complete Resume
            </>
          ) : (
            <>
              Next <FaArrowRight />
            </>
          )}
        </NavButton>
      </NavigationButtons>
    </WizardContainer>
  );
};

export default ResumeCreationWizard;
