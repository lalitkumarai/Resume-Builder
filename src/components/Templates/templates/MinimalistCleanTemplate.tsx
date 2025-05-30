import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';

const TemplateWrapper = styled.div<{ colors: any }>`
  padding: 3rem;
  background: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
`;

const Header = styled.div<{ colors: any }>`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.colors.primary}40;
`;

const Name = styled.h1<{ colors: any }>`
  font-size: 2.2rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  color: ${props => props.colors.primary};
  letter-spacing: -0.5px;
`;

const Title = styled.h2<{ colors: any }>`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 1.5rem 0;
  color: ${props => props.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const ContactItem = styled.div<{ colors: any }>`
  color: ${props => props.colors.text};
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3<{ colors: any }>`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: ${props => props.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Summary = styled.p<{ colors: any }>`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.colors.text};
  margin: 0;
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const JobTitle = styled.h4<{ colors: any }>`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: ${props => props.colors.primary};
`;

const Company = styled.div<{ colors: any }>`
  font-size: 0.9rem;
  color: ${props => props.colors.secondary};
  margin-bottom: 0.25rem;
`;

const Duration = styled.div<{ colors: any }>`
  font-size: 0.85rem;
  color: ${props => props.colors.text};
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  
  ul {
    margin: 0;
    padding-left: 1rem;
    list-style: none;
    
    li {
      margin-bottom: 0.5rem;
      position: relative;
      
      &::before {
        content: '—';
        position: absolute;
        left: -1rem;
        color: #ccc;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillItem = styled.span<{ colors: any }>`
  font-size: 0.85rem;
  color: ${props => props.colors.text};
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${props => props.colors.primary}40;
`;

const EducationItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Degree = styled.h4<{ colors: any }>`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: ${props => props.colors.primary};
`;

const School = styled.div<{ colors: any }>`
  font-size: 0.9rem;
  color: ${props => props.colors.secondary};
  margin-bottom: 0.25rem;
`;

const Year = styled.div<{ colors: any }>`
  font-size: 0.85rem;
  color: ${props => props.colors.text};
  opacity: 0.7;
`;

interface MinimalistCleanTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const MinimalistCleanTemplate: React.FC<MinimalistCleanTemplateProps> = ({ 
  template, 
  resume, 
  isPreview 
}) => {
  const { colors } = template;

  return (
    <TemplateWrapper colors={colors}>
      <Header colors={colors}>
        <Name colors={colors}>
          {resume.personalInfo.firstName} {resume.personalInfo.lastName}
        </Name>
        <Title colors={colors}>
          {resume.personalInfo.title || 'Professional'}
        </Title>
        
        <ContactInfo>
          {resume.personalInfo.email && (
            <ContactItem colors={colors}>{resume.personalInfo.email}</ContactItem>
          )}
          {resume.personalInfo.phone && (
            <ContactItem colors={colors}>{resume.personalInfo.phone}</ContactItem>
          )}
          {resume.personalInfo.location && (
            <ContactItem colors={colors}>{resume.personalInfo.location}</ContactItem>
          )}
          {resume.personalInfo.linkedin && (
            <ContactItem colors={colors}>LinkedIn</ContactItem>
          )}
          {resume.personalInfo.website && (
            <ContactItem colors={colors}>Portfolio</ContactItem>
          )}
        </ContactInfo>
      </Header>

      {/* Summary Section */}
      {resume.summary && (
        <Section>
          <SectionTitle colors={colors}>Summary</SectionTitle>
          <Summary colors={colors}>{resume.summary}</Summary>
        </Section>
      )}

      {/* Experience Section */}
      {resume.experience && resume.experience.length > 0 && (
        <Section>
          <SectionTitle colors={colors}>Experience</SectionTitle>
          {resume.experience.map((exp, index) => (
            <ExperienceItem key={index}>
              <JobTitle colors={colors}>{exp.position}</JobTitle>
              <Company colors={colors}>{exp.company}</Company>
              <Duration colors={colors}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </Duration>
              {exp.description && (
                <Description>
                  <ul>
                    {exp.description.split('\n').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Description>
              )}
            </ExperienceItem>
          ))}
        </Section>
      )}

      {/* Education Section */}
      {resume.education && resume.education.length > 0 && (
        <Section>
          <SectionTitle colors={colors}>Education</SectionTitle>
          {resume.education.map((edu, index) => (
            <EducationItem key={index}>
              <Degree colors={colors}>{edu.degree}</Degree>
              <School colors={colors}>{edu.institution}</School>
              <Year colors={colors}>{edu.graduationYear}</Year>
            </EducationItem>
          ))}
        </Section>
      )}

      {/* Skills Section */}
      {resume.skills && resume.skills.length > 0 && (
        <Section>
          <SectionTitle colors={colors}>Skills</SectionTitle>
          <SkillsContainer>
            {resume.skills.map((skill, index) => (
              <SkillItem key={index} colors={colors}>
                {skill.name}
              </SkillItem>
            ))}
          </SkillsContainer>
        </Section>
      )}
    </TemplateWrapper>
  );
};

export default MinimalistCleanTemplate;
