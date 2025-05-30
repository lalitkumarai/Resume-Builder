import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const TemplateWrapper = styled.div<{ colors: any }>`
  padding: 2rem;
  background: ${props => props.colors.background};
  color: ${props => props.colors.text};
`;

const Header = styled.div<{ colors: any }>`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 3px solid ${props => props.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.colors.primary}, ${props => props.colors.secondary});
  }
`;

const Name = styled.h1<{ colors: any }>`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${props => props.colors.primary};
  letter-spacing: -0.5px;
`;

const Title = styled.h2<{ colors: any }>`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  color: ${props => props.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ContactItem = styled.div<{ colors: any }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.colors.text};

  svg {
    color: ${props => props.colors.primary};
    font-size: 1rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3<{ colors: any }>`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${props => props.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${props => props.colors.secondary};
  }
`;

const Summary = styled.p<{ colors: any }>`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.colors.text};
  margin: 0;
`;

const ExperienceItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const JobTitle = styled.h4<{ colors: any }>`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: ${props => props.colors.primary};
`;

const Company = styled.div<{ colors: any }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.colors.secondary};
  margin-bottom: 0.25rem;
`;

const Duration = styled.div<{ colors: any }>`
  font-size: 0.9rem;
  color: ${props => props.colors.text};
  opacity: 0.8;
  margin-bottom: 0.75rem;
`;

const Description = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const SkillItem = styled.div<{ colors: any }>`
  background: linear-gradient(135deg, ${props => props.colors.primary}15, ${props => props.colors.secondary}15);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid ${props => props.colors.primary}30;
`;

const EducationItem = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Degree = styled.h4<{ colors: any }>`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: ${props => props.colors.primary};
`;

const School = styled.div<{ colors: any }>`
  font-size: 0.95rem;
  color: ${props => props.colors.secondary};
  margin-bottom: 0.25rem;
`;

const Year = styled.div<{ colors: any }>`
  font-size: 0.9rem;
  color: ${props => props.colors.text};
  opacity: 0.8;
`;

interface ModernProfessionalTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const ModernProfessionalTemplate: React.FC<ModernProfessionalTemplateProps> = ({ 
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
          {resume.personalInfo.title || 'Professional Title'}
        </Title>
        
        <ContactInfo>
          {resume.personalInfo.email && (
            <ContactItem colors={colors}>
              <FaEnvelope />
              {resume.personalInfo.email}
            </ContactItem>
          )}
          {resume.personalInfo.phone && (
            <ContactItem colors={colors}>
              <FaPhone />
              {resume.personalInfo.phone}
            </ContactItem>
          )}
          {resume.personalInfo.location && (
            <ContactItem colors={colors}>
              <FaMapMarkerAlt />
              {resume.personalInfo.location}
            </ContactItem>
          )}
          {resume.personalInfo.linkedin && (
            <ContactItem colors={colors}>
              <FaLinkedin />
              LinkedIn
            </ContactItem>
          )}
          {resume.personalInfo.website && (
            <ContactItem colors={colors}>
              <FaGlobe />
              Portfolio
            </ContactItem>
          )}
        </ContactInfo>
      </Header>

      <MainContent>
        <LeftColumn>
          {/* Skills Section */}
          {resume.skills && resume.skills.length > 0 && (
            <Section>
              <SectionTitle colors={colors}>Skills</SectionTitle>
              <SkillsGrid>
                {resume.skills.map((skill, index) => (
                  <SkillItem key={index} colors={colors}>
                    {skill.name}
                  </SkillItem>
                ))}
              </SkillsGrid>
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
        </LeftColumn>

        <RightColumn>
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
                  <JobTitle colors={colors}>{exp.position}</JobTitle>
                  <Company colors={colors}>{exp.company}</Company>
                  <Duration colors={colors}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Duration>
                  {exp.description && (
                    <Description>
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </Description>
                  )}
                </ExperienceItem>
              ))}
            </Section>
          )}
        </RightColumn>
      </MainContent>
    </TemplateWrapper>
  );
};

export default ModernProfessionalTemplate;
