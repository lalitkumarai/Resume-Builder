import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaPlus, FaTrash, FaEye } from 'react-icons/fa';

import { resumeSections, resumeWritingTips, ResumeSection } from '../../data/resumeTemplateGuide';

const BuilderContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  background: #f8f9fa;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #667eea;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RequiredBadge = styled.span`
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const SectionDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e9ecef'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e9ecef'};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
  }

  &::placeholder {
    color: #999;
  }
`;

const HelpText = styled.div`
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorText = styled.div`
  font-size: 0.85rem;
  color: #e74c3c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipsSection = styled.div`
  background: linear-gradient(135deg, #667eea15, #764ba215);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const TipsTitle = styled.h3`
  color: #667eea;
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: #555;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ExamplesSection = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid #667eea;
`;

const ExamplesTitle = styled.h4`
  color: #333;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExampleItem = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #e9ecef;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, #667eea, #764ba2);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: #666;
  font-weight: 500;
`;

interface DetailedResumeBuilderProps {
  onDataChange?: (data: any) => void;
}

const DetailedResumeBuilder: React.FC<DetailedResumeBuilderProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const calculateProgress = () => {
    const totalSections = resumeSections.filter(section => section.isRequired).length;
    const completed = Array.from(completedSections).filter(sectionId => 
      resumeSections.find(s => s.id === sectionId)?.isRequired
    ).length;
    return Math.round((completed / totalSections) * 100);
  };

  const validateField = (sectionId: string, fieldId: string, value: string) => {
    const section = resumeSections.find(s => s.id === sectionId);
    const field = section?.fields.find(f => f.id === fieldId);
    
    if (!field) return null;

    if (field.isRequired && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { minLength, maxLength, pattern, message } = field.validation;
      
      if (minLength && value.length < minLength) {
        return message || `${field.label} must be at least ${minLength} characters`;
      }
      
      if (maxLength && value.length > maxLength) {
        return message || `${field.label} must be no more than ${maxLength} characters`;
      }
      
      if (pattern && !new RegExp(pattern).test(value)) {
        return message || `${field.label} format is invalid`;
      }
    }

    return null;
  };

  const handleFieldChange = (sectionId: string, fieldId: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));

    // Validate field
    const error = validateField(sectionId, fieldId, value);
    setErrors((prev: any) => ({
      ...prev,
      [`${sectionId}.${fieldId}`]: error
    }));

    // Check if section is completed
    const section = resumeSections.find(s => s.id === sectionId);
    if (section) {
      const sectionData = { ...formData[sectionId], [fieldId]: value };
      const isComplete = section.fields
        .filter(f => f.isRequired)
        .every(f => sectionData[f.id]?.trim());
      
      if (isComplete) {
        setCompletedSections(prev => new Set([...prev, sectionId]));
      } else {
        setCompletedSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(sectionId);
          return newSet;
        });
      }
    }

    // Notify parent component
    if (onDataChange) {
      onDataChange({ ...formData, [sectionId]: { ...formData[sectionId], [fieldId]: value } });
    }
  };

  const renderField = (sectionId: string, field: any) => {
    const value = formData[sectionId]?.[field.id] || '';
    const error = errors[`${sectionId}.${field.id}`];

    return (
      <FormGroup key={field.id}>
        <Label>
          {field.label}
          {field.isRequired && <RequiredBadge>Required</RequiredBadge>}
        </Label>
        
        {field.type === 'textarea' ? (
          <TextArea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
            hasError={!!error}
          />
        ) : (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
            hasError={!!error}
          />
        )}
        
        {error && (
          <ErrorText>
            <FaExclamationTriangle />
            {error}
          </ErrorText>
        )}
        
        {field.helpText && !error && (
          <HelpText>
            <FaInfoCircle />
            {field.helpText}
          </HelpText>
        )}
      </FormGroup>
    );
  };

  const renderSection = (section: ResumeSection) => {
    const isCompleted = completedSections.has(section.id);

    return (
      <SectionCard key={section.id}>
        <SectionHeader>
          <SectionTitle>
            {isCompleted ? <FaCheckCircle color="#28a745" /> : <FaInfoCircle color="#667eea" />}
            {section.title}
            {section.isRequired && <RequiredBadge>Required</RequiredBadge>}
          </SectionTitle>
        </SectionHeader>
        
        <SectionDescription>{section.description}</SectionDescription>
        
        <FormGrid>
          {section.fields.map(field => renderField(section.id, field))}
        </FormGrid>
        
        {section.tips.length > 0 && (
          <TipsSection>
            <TipsTitle>
              <FaLightbulb />
              Writing Tips
            </TipsTitle>
            <TipsList>
              {section.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </TipsSection>
        )}
        
        {section.examples.length > 0 && (
          <ExamplesSection>
            <ExamplesTitle>
              <FaEye />
              Examples
            </ExamplesTitle>
            {section.examples.map((example, index) => (
              <ExampleItem key={index}>{example}</ExampleItem>
            ))}
          </ExamplesSection>
        )}
      </SectionCard>
    );
  };

  return (
    <BuilderContainer>
      <MainContent>
        <ProgressText>Resume Completion: {calculateProgress()}%</ProgressText>
        <ProgressBar>
          <ProgressFill progress={calculateProgress()} />
        </ProgressBar>
        
        {resumeSections
          .sort((a, b) => a.order - b.order)
          .map(section => renderSection(section))}
      </MainContent>
    </BuilderContainer>
  );
};

export default DetailedResumeBuilder;
