import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaBriefcase, FaGraduationCap, FaCogs, FaFileAlt, FaArrowRight, FaCheckCircle, FaLightbulb, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa';

const PageContainer = styled.div`
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
  margin: 0 auto 2rem auto;
`;

const QuickStartButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StepCard = styled.div`
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

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DetailsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.75rem;
    color: #555;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TipBox = styled.div<{ type: 'tip' | 'warning' | 'info' }>`
  background: ${props => 
    props.type === 'tip' ? '#e8f5e8' :
    props.type === 'warning' ? '#fff3cd' :
    '#e3f2fd'
  };
  border-left: 4px solid ${props => 
    props.type === 'tip' ? '#28a745' :
    props.type === 'warning' ? '#ffc107' :
    '#2196f3'
  };
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const TipIcon = styled.div<{ type: 'tip' | 'warning' | 'info' }>`
  color: ${props => 
    props.type === 'tip' ? '#28a745' :
    props.type === 'warning' ? '#ffc107' :
    '#2196f3'
  };
  font-size: 1.2rem;
  margin-top: 0.1rem;
`;

const TipText = styled.div`
  color: #333;
  line-height: 1.5;
`;

const ExampleSection = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
`;

const ExampleTitle = styled.h4`
  color: #667eea;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExampleText = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
`;

const ActionSection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  margin-top: 3rem;
`;

const ActionTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ActionDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
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

const resumeSteps = [
  {
    number: 1,
    title: 'Personal Information',
    icon: <FaUser />,
    description: 'Start with your basic contact information and professional identity.',
    details: [
      'Full name (as it appears on official documents)',
      'Professional email address (firstname.lastname@email.com)',
      'Phone number with area code',
      'City, State (or City, Country for international)',
      'LinkedIn profile URL',
      'Portfolio website (if applicable)',
      'Professional title or desired position'
    ],
    tips: [
      { type: 'tip' as const, text: 'Use a professional email address. Avoid nicknames or unprofessional handles.' },
      { type: 'warning' as const, text: 'Never include personal information like age, marital status, or photo (unless required).' },
      { type: 'info' as const, text: 'Your professional title should match the role you\'re targeting.' }
    ],
    example: `John Smith
Senior Software Engineer
Email: john.smith@email.com
Phone: (555) 123-4567
Location: San Francisco, CA
LinkedIn: linkedin.com/in/johnsmith
Portfolio: johnsmith.dev`
  },
  {
    number: 2,
    title: 'Professional Summary',
    icon: <FaFileAlt />,
    description: 'Write a compelling 2-4 sentence overview of your experience and value.',
    details: [
      'Start with years of experience in your field',
      'Mention your key expertise and specializations',
      'Include 1-2 major achievements with numbers',
      'State your career goals or what you bring to employers',
      'Use keywords from the job description',
      'Keep it concise but impactful (100-150 words)'
    ],
    tips: [
      { type: 'tip' as const, text: 'Start with your strongest selling point - years of experience or key expertise.' },
      { type: 'info' as const, text: 'Quantify achievements whenever possible (increased sales by 30%, managed team of 15, etc.).' },
      { type: 'warning' as const, text: 'Avoid generic statements like "hard-working" or "team player" without context.' }
    ],
    example: `Experienced software engineer with 8+ years of expertise in full-stack development and cloud architecture. Led development of microservices platform serving 1M+ users and increased system performance by 40%. Passionate about mentoring junior developers and implementing scalable solutions that drive business growth.`
  },
  {
    number: 3,
    title: 'Work Experience',
    icon: <FaBriefcase />,
    description: 'Detail your professional history with quantified achievements.',
    details: [
      'List positions in reverse chronological order',
      'Include job title, company name, location, and dates',
      'Use 3-5 bullet points per position',
      'Start each bullet with an action verb',
      'Quantify achievements with numbers, percentages, or dollar amounts',
      'Focus on accomplishments, not just job duties',
      'Tailor descriptions to match target job requirements'
    ],
    tips: [
      { type: 'tip' as const, text: 'Use the STAR method: Situation, Task, Action, Result to structure your achievements.' },
      { type: 'info' as const, text: 'Include relevant internships, freelance work, or volunteer experience if you\'re entry-level.' },
      { type: 'warning' as const, text: 'Don\'t leave unexplained gaps in employment. Address them briefly if necessary.' }
    ],
    example: `Senior Software Engineer | Tech Solutions Inc. | San Francisco, CA | 2020 - Present
• Led development of microservices architecture serving 1M+ active users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored team of 5 junior developers, improving code quality by 35%
• Collaborated with product team to deliver 15+ features ahead of schedule`
  },
  {
    number: 4,
    title: 'Education & Skills',
    icon: <FaGraduationCap />,
    description: 'Showcase your educational background and relevant competencies.',
    details: [
      'List degrees in reverse chronological order',
      'Include degree type, major, institution, and graduation year',
      'Add GPA if 3.5 or higher',
      'Include relevant coursework for entry-level positions',
      'List technical skills, software proficiency, and certifications',
      'Organize skills by category (Technical, Languages, etc.)',
      'Include both hard and soft skills relevant to the role'
    ],
    tips: [
      { type: 'tip' as const, text: 'For experienced professionals, education can be brief. For recent graduates, include more detail.' },
      { type: 'info' as const, text: 'List skills in order of proficiency and relevance to the target job.' },
      { type: 'warning' as const, text: 'Only include skills you can confidently discuss in an interview.' }
    ],
    example: `Education:
Bachelor of Science in Computer Science
University of California, Berkeley | 2018 | GPA: 3.8/4.0

Technical Skills:
• Programming: JavaScript, Python, Java, TypeScript
• Frameworks: React, Node.js, Express, Django
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, JIRA, Figma`
  }
];

const CreateYourResume: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <Title>
          <FaFileAlt />
          Create Your Professional Resume
        </Title>
        <Subtitle>
          Follow our step-by-step guide to build a compelling resume that gets you noticed by employers. 
          Learn what to include, how to format it, and see real examples.
        </Subtitle>
        <QuickStartButton to="/builder">
          <FaArrowRight />
          Start Building Now
        </QuickStartButton>
      </Header>

      <StepsContainer>
        {resumeSteps.map((step) => (
          <StepCard key={step.number}>
            <StepNumber>{step.number}</StepNumber>
            <StepTitle>
              {step.icon}
              {step.title}
            </StepTitle>
            <StepDescription>{step.description}</StepDescription>
            
            <DetailsList>
              {step.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </DetailsList>

            {step.tips.map((tip, index) => (
              <TipBox key={index} type={tip.type}>
                <TipIcon type={tip.type}>
                  {tip.type === 'tip' ? <FaLightbulb /> : 
                   tip.type === 'warning' ? <FaExclamationTriangle /> : 
                   <FaQuestionCircle />}
                </TipIcon>
                <TipText>{tip.text}</TipText>
              </TipBox>
            ))}

            <ExampleSection>
              <ExampleTitle>
                <FaCheckCircle />
                Example
              </ExampleTitle>
              <ExampleText>{step.example}</ExampleText>
            </ExampleSection>
          </StepCard>
        ))}
      </StepsContainer>

      <ActionSection>
        <ActionTitle>Ready to Create Your Resume?</ActionTitle>
        <ActionDescription>
          Use our professional resume builder with guided templates and expert tips. 
          Create a polished, ATS-friendly resume in minutes.
        </ActionDescription>
        <ActionButtons>
          <ActionButton to="/templates" className="secondary">
            <FaFileAlt />
            Browse Templates
          </ActionButton>
          <ActionButton to="/builder" className="primary">
            <FaCogs />
            Start Building
          </ActionButton>
        </ActionButtons>
      </ActionSection>
    </PageContainer>
  );
};

export default CreateYourResume;
