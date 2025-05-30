import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaLightbulb, FaRobot, FaFileAlt, FaKeyboard, FaChartLine } from 'react-icons/fa';

const TipsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TipCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TipIcon = styled.div`
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const TipTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const TipDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DosDontsSection = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const DosDontsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DosColumn = styled.div`
  h3 {
    color: #28a745;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DontsColumn = styled.div`
  h3 {
    color: #dc3545;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8fff9;
  border-radius: 8px;
  border-left: 3px solid #28a745;
`;

const DontItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #fff8f8;
  border-radius: 8px;
  border-left: 3px solid #dc3545;
`;

const ItemIcon = styled.div<{ type: 'do' | 'dont' }>`
  color: ${props => props.type === 'do' ? '#28a745' : '#dc3545'};
  margin-top: 0.2rem;
`;

const ItemText = styled.div`
  color: #333;
  line-height: 1.5;
`;

const KeywordSection = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const IndustryCard = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
`;

const IndustryTitle = styled.h4`
  color: #333;
  margin-bottom: 1rem;
`;

const KeywordTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.25rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background: #667eea;
  color: white;
`;

const ATSTips: React.FC = () => {
  const tips = [
    {
      icon: <FaFileAlt />,
      title: 'Use Standard Formatting',
      description: 'Stick to simple, clean layouts with standard fonts like Arial or Calibri. Avoid graphics, tables, and complex formatting that ATS systems cannot read.'
    },
    {
      icon: <FaKeyboard />,
      title: 'Include Relevant Keywords',
      description: 'Use keywords from the job description naturally throughout your resume. Include both the full terms and common abbreviations.'
    },
    {
      icon: <FaChartLine />,
      title: 'Quantify Achievements',
      description: 'Use numbers, percentages, and metrics to demonstrate your impact. ATS systems and recruiters love quantifiable results.'
    },
    {
      icon: <FaRobot />,
      title: 'Standard Section Headers',
      description: 'Use conventional section names like "Work Experience," "Education," and "Skills" that ATS systems recognize.'
    }
  ];

  const dos = [
    'Use standard section headings (Work Experience, Education, Skills)',
    'Include your contact information at the top',
    'Use bullet points for easy scanning',
    'Save as PDF or DOCX format',
    'Include relevant keywords naturally in context',
    'Use simple, clean fonts (Arial, Calibri, Times New Roman)',
    'Keep file size under 2MB',
    'Include both full terms and abbreviations (e.g., "Search Engine Optimization (SEO)")',
    'Use chronological or hybrid resume format',
    'Include your LinkedIn profile URL'
  ];

  const donts = [
    'Use headers, footers, or text boxes',
    'Include graphics, images, or charts',
    'Use tables for layout',
    'Submit as an image file (JPG, PNG)',
    'Use creative fonts or excessive formatting',
    'Include personal information like age or photo',
    'Use abbreviations without spelling them out first',
    'Submit a resume longer than 2 pages (unless senior level)',
    'Use colored text or backgrounds',
    'Include references or "References available upon request"'
  ];

  const industryKeywords = {
    'Technology': [
      'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Agile', 'API', 'Database', 'Git'
    ],
    'Marketing': [
      'Digital Marketing', 'SEO', 'Google Analytics', 'Social Media', 'Content Marketing', 'PPC', 'Lead Generation'
    ],
    'Finance': [
      'Financial Analysis', 'Excel', 'Financial Modeling', 'Budgeting', 'Risk Management', 'Compliance', 'Audit'
    ],
    'Sales': [
      'Sales Management', 'CRM', 'Salesforce', 'B2B Sales', 'Lead Generation', 'Account Management', 'Revenue Growth'
    ],
    'Healthcare': [
      'Patient Care', 'Medical Records', 'HIPAA', 'Clinical Research', 'EMR', 'Quality Assurance', 'Patient Safety'
    ]
  };

  return (
    <TipsContainer>
      <Header>
        <Title>
          <FaLightbulb /> ATS Optimization Tips
        </Title>
        <Subtitle>
          Master the art of creating ATS-friendly resumes that get past automated screening and into human hands.
        </Subtitle>
      </Header>

      {/* Key Tips */}
      <TipsGrid>
        {tips.map((tip, index) => (
          <TipCard key={index}>
            <TipIcon>{tip.icon}</TipIcon>
            <TipTitle>{tip.title}</TipTitle>
            <TipDescription>{tip.description}</TipDescription>
          </TipCard>
        ))}
      </TipsGrid>

      {/* Dos and Don'ts */}
      <DosDontsSection>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          ATS Resume Dos and Don'ts
        </h2>
        <DosDontsGrid>
          <DosColumn>
            <h3>
              <FaCheckCircle /> DO
            </h3>
            {dos.map((item, index) => (
              <DoItem key={index}>
                <ItemIcon type="do">
                  <FaCheckCircle />
                </ItemIcon>
                <ItemText>{item}</ItemText>
              </DoItem>
            ))}
          </DosColumn>

          <DontsColumn>
            <h3>
              <FaTimesCircle /> DON'T
            </h3>
            {donts.map((item, index) => (
              <DontItem key={index}>
                <ItemIcon type="dont">
                  <FaTimesCircle />
                </ItemIcon>
                <ItemText>{item}</ItemText>
              </DontItem>
            ))}
          </DontsColumn>
        </DosDontsGrid>
      </DosDontsSection>

      {/* Industry Keywords */}
      <KeywordSection>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
          Industry-Specific Keywords
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Include relevant keywords from your industry to improve ATS compatibility
        </p>
        <KeywordGrid>
          {Object.entries(industryKeywords).map(([industry, keywords]) => (
            <IndustryCard key={industry}>
              <IndustryTitle>{industry}</IndustryTitle>
              {keywords.map((keyword, index) => (
                <KeywordTag key={index}>{keyword}</KeywordTag>
              ))}
            </IndustryCard>
          ))}
        </KeywordGrid>
      </KeywordSection>
    </TipsContainer>
  );
};

export default ATSTips;
