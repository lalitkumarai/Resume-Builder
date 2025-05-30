import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../../types/resume';
import { ResumeTemplate } from '../../../types/templates';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaPalette, FaLightbulb } from 'react-icons/fa';

const TemplateWrapper = styled.div<{ colors: any }>`
  background: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: 'Poppins', 'Arial', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, ${props => props.colors.primary}, ${props => props.colors.secondary});
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
    z-index: 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
`;

const Header = styled.div<{ colors: any }>`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled.div<{ colors: any }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.colors.accent}, ${props => props.colors.primary});
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  
  svg {
    font-size: 3rem;
    color: white;
  }
`;

const Name = styled.h1<{ colors: any }>`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2<{ colors: any }>`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: white;
  opacity: 0.95;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContactItem = styled.div<{ colors: any }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);

  svg {
    font-size: 0.9rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3<{ colors: any }>`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${props => props.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.colors.primary}, transparent);
  }
`;

const CreativeCard = styled.div<{ colors: any }>`
  background: linear-gradient(135deg, ${props => props.colors.primary}10, ${props => props.colors.accent}10);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${props => props.colors.primary};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100px;
    height: 100px;
    background: ${props => props.colors.accent}20;
    border-radius: 50%;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const Summary = styled.p<{ colors: any }>`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.colors.text};
  margin: 0;
`;

const ExperienceItem = styled(CreativeCard)`
  margin-bottom: 1.5rem;
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
  font-style: italic;
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
`;

const SkillItem = styled.div<{ colors: any }>`
  background: linear-gradient(135deg, ${props => props.colors.primary}, ${props => props.colors.secondary});
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: perspective(1000px) rotateX(5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: perspective(1000px) rotateX(0deg) translateY(-2px);
  }
`;

const EducationItem = styled(CreativeCard)`
  text-align: center;
`;

const Degree = styled.h4<{ colors: any }>`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
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

interface CreativeDesignerTemplateProps {
  template: ResumeTemplate;
  resume: Resume;
  isPreview?: boolean;
}

const CreativeDesignerTemplate: React.FC<CreativeDesignerTemplateProps> = ({ 
  template, 
  resume, 
  isPreview 
}) => {
  const { colors } = template;

  return (
    <TemplateWrapper colors={colors}>
      <Content>
        <Header colors={colors}>
          <HeaderLeft>
            <Name colors={colors}>
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </Name>
            <Title colors={colors}>
              {resume.personalInfo.title || 'Creative Professional'}
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
          </HeaderLeft>
          
          <HeaderRight colors={colors}>
            <FaPalette />
          </HeaderRight>
        </Header>

        <MainContent>
          <LeftColumn>
            {/* Skills Section */}
            {resume.skills && resume.skills.length > 0 && (
              <Section>
                <SectionTitle colors={colors}>
                  <FaLightbulb />
                  Creative Skills
                </SectionTitle>
                <SkillsGrid>
                  {resume.skills.slice(0, 8).map((skill, index) => (
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
                  <EducationItem key={index} colors={colors}>
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
                <SectionTitle colors={colors}>Creative Vision</SectionTitle>
                <CreativeCard colors={colors}>
                  <Summary colors={colors}>{resume.summary}</Summary>
                </CreativeCard>
              </Section>
            )}

            {/* Experience Section */}
            {resume.experience && resume.experience.length > 0 && (
              <Section>
                <SectionTitle colors={colors}>Creative Journey</SectionTitle>
                {resume.experience.map((exp, index) => (
                  <ExperienceItem key={index} colors={colors}>
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
      </Content>
    </TemplateWrapper>
  );
};

export default CreativeDesignerTemplate;
