import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { FormStep } from '../../types/resume';

const NavigationContainer = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StepItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isActive ? '#667eea' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.isActive ? '#667eea' : '#e9ecef'};
  }
`;

const StepIcon = styled.div<{ isCompleted: boolean; isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => 
    props.isCompleted ? '#28a745' : 
    props.isActive ? 'white' : '#dee2e6'
  };
  color: ${props => 
    props.isCompleted ? 'white' : 
    props.isActive ? '#667eea' : '#666'
  };
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`;

const StepDescription = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.25rem;
`;

interface StepNavigationProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <NavigationContainer>
      <Title>Resume Sections</Title>
      <StepList>
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            isActive={index === currentStep}
            isCompleted={step.isCompleted}
            onClick={() => onStepClick(index)}
          >
            <StepIcon isCompleted={step.isCompleted} isActive={index === currentStep}>
              {step.isCompleted ? <FaCheck /> : index + 1}
            </StepIcon>
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </StepItem>
        ))}
      </StepList>
    </NavigationContainer>
  );
};

export default StepNavigation;
