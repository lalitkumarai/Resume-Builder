import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileAlt, FaCheckCircle, FaLightbulb, FaRobot, FaPalette, FaDownload, FaEye, FaArrowRight } from 'react-icons/fa';

import { resumeWritingTips } from '../data/resumeTemplateGuide';

const GuideContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #667eea;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FieldsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    color: #555;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TipsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const TipsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TipsTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin: 0;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TipCategory = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #667eea;
`;

const TipCategoryTitle = styled.h3`
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
    margin-bottom: 0.75rem;
    line-height: 1.5;
    color: #555;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TemplateShowcase = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const ShowcaseTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ShowcaseDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ShowcaseButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ShowcaseButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &.primary {
    background: #667eea;
    color: white;

    &:hover {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;

    &:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const resumeSectionData = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Essential contact details and professional identity',
    icon: <FaFileAlt />,
    fields: ['Full Name', 'Email Address', 'Phone Number', 'Location', 'Professional Title', 'LinkedIn Profile', 'Portfolio Website']
  },
  {
    id: 'summary',
    title: 'Professional Summary',
    description: 'Compelling overview of your experience and value proposition',
    icon: <FaLightbulb />,
    fields: ['2-4 sentence summary', 'Key achievements', 'Years of experience', 'Core competencies', 'Career objectives']
  },
  {
    id: 'experience',
    title: 'Work Experience',
    description: 'Detailed professional history with quantified achievements',
    icon: <FaCheckCircle />,
    fields: ['Job titles and companies', 'Employment dates', 'Key responsibilities', 'Quantified achievements', 'Skills demonstrated']
  },
  {
    id: 'education',
    title: 'Education & Certifications',
    description: 'Academic background and professional qualifications',
    icon: <FaRobot />,
    fields: ['Degrees and institutions', 'Graduation dates', 'Relevant coursework', 'Academic honors', 'Professional certifications']
  },
  {
    id: 'skills',
    title: 'Skills & Competencies',
    description: 'Technical and soft skills relevant to your target role',
    icon: <FaPalette />,
    fields: ['Technical skills', 'Software proficiency', 'Programming languages', 'Soft skills', 'Industry knowledge']
  }
];

const ResumeTemplateGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <GuideContainer>
      <Header>
        <Title>
          <FaFileAlt />
          Complete Resume Building Guide
        </Title>
        <Subtitle>
          Learn how to create a professional, ATS-friendly resume that gets you noticed by employers. 
          Follow our comprehensive guide with detailed templates and expert tips.
        </Subtitle>
        <CTAButton to="/builder">
          <FaArrowRight />
          Start Building Your Resume
        </CTAButton>
      </Header>

      <SectionsGrid>
        {resumeSectionData.map(section => (
          <SectionCard key={section.id}>
            <SectionIcon>{section.icon}</SectionIcon>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionDescription>{section.description}</SectionDescription>
            <FieldsList>
              {section.fields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </FieldsList>
          </SectionCard>
        ))}
      </SectionsGrid>

      <TipsSection>
        <TipsHeader>
          <FaLightbulb style={{ color: '#667eea', fontSize: '2rem' }} />
          <TipsTitle>Professional Resume Writing Tips</TipsTitle>
        </TipsHeader>
        
        <TipsGrid>
          <TipCategory>
            <TipCategoryTitle>
              <FaCheckCircle />
              General Guidelines
            </TipCategoryTitle>
            <TipsList>
              {resumeWritingTips.general.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </TipCategory>

          <TipCategory>
            <TipCategoryTitle>
              <FaRobot />
              ATS Optimization
            </TipCategoryTitle>
            <TipsList>
              {resumeWritingTips.ats.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </TipCategory>

          <TipCategory>
            <TipCategoryTitle>
              <FaPalette />
              Formatting Best Practices
            </TipCategoryTitle>
            <TipsList>
              {resumeWritingTips.formatting.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </TipCategory>
        </TipsGrid>
      </TipsSection>

      <TemplateShowcase>
        <ShowcaseTitle>Ready to Create Your Professional Resume?</ShowcaseTitle>
        <ShowcaseDescription>
          Choose from our collection of professional templates and start building your resume with our guided builder. 
          Each template is designed to pass ATS systems and impress hiring managers.
        </ShowcaseDescription>
        <ShowcaseButtons>
          <ShowcaseButton to="/templates" className="secondary">
            <FaEye />
            Browse Templates
          </ShowcaseButton>
          <ShowcaseButton to="/builder" className="primary">
            <FaFileAlt />
            Start Building
          </ShowcaseButton>
        </ShowcaseButtons>
      </TemplateShowcase>
    </GuideContainer>
  );
};

export default ResumeTemplateGuide;
