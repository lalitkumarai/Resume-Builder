import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';

const TemplateWrapper = styled.div<{ colors: any }>`
  padding: 2.5rem;
  background: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: 'Georgia', 'Times New Roman', serif;
`;

const Header = styled.div<{ colors: any }>`
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.colors.primary};
`;

const Name = styled.h1<{ colors: any }>`
  font-size: 2.8rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: ${props => props.colors.primary};
  letter-spacing: 2px;
  font-family: 'Georgia', serif;
`;

const Title = styled.h2<{ colors: any }>`
  font-size: 1.1rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: ${props => props.colors.secondary};
  font-style: italic;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 0.95rem;
`;

const ContactItem = styled.div<{ colors: any }>`
  color: ${props => props.colors.text};
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3<{ colors: any }>`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1.5rem 0;
  color: ${props => props.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: ${props => props.colors.primary};
  }
`;

const Summary = styled.p<{ colors: any }>`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${props => props.colors.text};
  margin: 0;
  text-align: justify;
  font-style: italic;
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dotted #ccc;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const JobLeft = styled.div`
  flex: 1;
`;

const JobTitle = styled.h4<{ colors: any }>`
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: ${props => props.colors.primary};
`;

const Company = styled.div<{ colors: any }>`
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.colors.secondary};
  font-style: italic;
`;

const Duration = styled.div<{ colors: any }>`
  font-size: 0.95rem;
  color: ${props => props.colors.text};
  opacity: 0.8;
  text-align: right;
  font-weight: 300;
`;

const Description = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EducationItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const Degree = styled.h4<{ colors: any }>`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${props => props.colors.primary};
`;

const School = styled.div<{ colors: any }>`
  font-size: 1rem;
  color: ${props => props.colors.secondary};
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const Year = styled.div<{ colors: any }>`
  font-size: 0.9rem;
  color: ${props => props.colors.text};
  opacity: 0.8;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillCategory = styled.div`
  text-align: center;
`;

const SkillCategoryTitle = styled.h5<{ colors: any }>`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: ${props => props.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const SkillItem = styled.span<{ colors: any }>`
  background: ${props => props.colors.primary}10;
  color: ${props => props.colors.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid ${props => props.colors.primary}30;
`;

interface ClassicElegantTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const ClassicElegantTemplate: React.FC<ClassicElegantTemplateProps> = ({ 
  template, 
  resume, 
  isPreview 
}) => {
  const { colors } = template;

  // Group skills by category for better presentation
  const groupedSkills = resume.skills?.reduce((acc, skill) => {
    const category = skill.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, any[]>) || {};

  return (
    <TemplateWrapper colors={colors}>
      <Header colors={colors}>
        <Name colors={colors}>
          {resume.personalInfo.firstName} {resume.personalInfo.lastName}
        </Name>
        <Title colors={colors}>
          {resume.personalInfo.title || 'Professional Title'}
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
            <ContactItem colors={colors}>LinkedIn Profile</ContactItem>
          )}
        </ContactInfo>
      </Header>

      {/* Summary Section */}
      {resume.summary && (
        <Section>
          <SectionTitle colors={colors}>Professional Summary</SectionTitle>
          <Summary colors={colors}>{resume.summary}</Summary>
        </Section>
      )}

      {/* Experience Section */}
      {resume.experience && resume.experience.length > 0 && (
        <Section>
          <SectionTitle colors={colors}>Professional Experience</SectionTitle>
          {resume.experience.map((exp, index) => (
            <ExperienceItem key={index}>
              <JobHeader>
                <JobLeft>
                  <JobTitle colors={colors}>{exp.position}</JobTitle>
                  <Company colors={colors}>{exp.company}</Company>
                </JobLeft>
                <Duration colors={colors}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </Duration>
              </JobHeader>
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
          <EducationGrid>
            {resume.education.map((edu, index) => (
              <EducationItem key={index}>
                <Degree colors={colors}>{edu.degree}</Degree>
                <School colors={colors}>{edu.institution}</School>
                <Year colors={colors}>{edu.graduationYear}</Year>
              </EducationItem>
            ))}
          </EducationGrid>
        </Section>
      )}

      {/* Skills Section */}
      {resume.skills && resume.skills.length > 0 && (
        <Section>
          <SectionTitle colors={colors}>Core Competencies</SectionTitle>
          <SkillsContainer>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <SkillCategory key={category}>
                <SkillCategoryTitle colors={colors}>{category}</SkillCategoryTitle>
                <SkillList>
                  {skills.map((skill, index) => (
                    <SkillItem key={index} colors={colors}>
                      {skill.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsContainer>
        </Section>
      )}
    </TemplateWrapper>
  );
};

export default ClassicElegantTemplate;
