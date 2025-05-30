import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaUser, FaBriefcase, FaGraduationCap, FaCogs, FaAward, FaLightbulb, FaCheckCircle, FaTimesCircle, FaChevronDown, FaChevronUp, FaQuoteLeft, FaStar, FaDownload, FaEye, FaClock, FaUsers } from 'react-icons/fa';

const TipsContainer = styled.div`
  max-width: 1200px;
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
  max-width: 700px;
  margin: 0 auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #f0f0f0;
  overflow-x: auto;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  border: none;
  background: none;
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#667eea' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #667eea;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const TipCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #667eea;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TipTitle = styled.h4`
  color: #333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const ExampleSection = styled.div`
  background: #f8f9ff;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #e1e8f0;
`;

const ExampleTitle = styled.h4`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GoodExample = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 1rem;
`;

const BadExample = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 1rem;
`;

const ExampleLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExampleText = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
`;

const AccordionItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 10px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: #f8f9fa;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #333;
  transition: background 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '1.5rem' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
`;

const QuoteCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  position: relative;
`;

const QuoteIcon = styled.div`
  font-size: 2rem;
  opacity: 0.3;
  margin-bottom: 1rem;
`;

const QuoteText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const QuoteAuthor = styled.div`
  font-weight: 600;
  opacity: 0.9;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const CheckIcon = styled.div`
  color: #28a745;
  margin-top: 0.2rem;
`;

const CheckText = styled.div`
  color: #333;
  line-height: 1.5;
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin: 3rem 0;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem 1rem;
  backdrop-filter: blur(10px);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const ResumeTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaFileAlt /> },
    { id: 'sections', label: 'Resume Sections', icon: <FaUser /> },
    { id: 'writing', label: 'Writing Tips', icon: <FaLightbulb /> },
    { id: 'examples', label: 'Examples', icon: <FaStar /> },
    { id: 'checklist', label: 'Final Checklist', icon: <FaCheckCircle /> }
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const resumeStats = [
    {
      number: '6-10',
      label: 'Seconds recruiters spend on initial resume review',
      icon: <FaClock />
    },
    {
      number: '75%',
      label: 'Of resumes never seen by human recruiters (filtered by ATS)',
      icon: <FaEye />
    },
    {
      number: '2x',
      label: 'More likely to get interview with quantified achievements',
      icon: <FaUsers />
    },
    {
      number: '1-2',
      label: 'Ideal number of pages for most professionals',
      icon: <FaFileAlt />
    }
  ];

  const overviewTips = [
    {
      title: 'Keep It Concise',
      description: 'Limit your resume to 1-2 pages. Recruiters spend only 6-10 seconds on initial screening.',
      icon: <FaFileAlt />
    },
    {
      title: 'Tailor for Each Job',
      description: 'Customize your resume for each application. Use keywords from the job description.',
      icon: <FaBriefcase />
    },
    {
      title: 'Use Action Verbs',
      description: 'Start bullet points with strong action verbs like "Led," "Developed," "Increased."',
      icon: <FaCogs />
    },
    {
      title: 'Quantify Achievements',
      description: 'Include numbers, percentages, and metrics to demonstrate your impact.',
      icon: <FaAward />
    }
  ];

  const sectionTips = [
    {
      section: 'Contact Information',
      tips: [
        'Include full name, phone number, email, and LinkedIn profile',
        'Use a professional email address',
        'Add your city and state (full address not necessary)',
        'Include portfolio website if relevant'
      ]
    },
    {
      section: 'Professional Summary',
      tips: [
        'Write 2-3 sentences highlighting your key qualifications',
        'Include years of experience and main skills',
        'Mention your career goals or target role',
        'Use keywords from the job description'
      ]
    },
    {
      section: 'Work Experience',
      tips: [
        'List positions in reverse chronological order',
        'Include company name, job title, and dates',
        'Use 3-5 bullet points per position',
        'Focus on achievements, not just responsibilities'
      ]
    },
    {
      section: 'Education',
      tips: [
        'Include degree, institution, and graduation year',
        'Add GPA if 3.5 or higher (recent graduates)',
        'List relevant coursework, honors, or activities',
        'Include certifications and professional development'
      ]
    },
    {
      section: 'Skills',
      tips: [
        'Separate technical and soft skills',
        'Be specific about proficiency levels',
        'Include industry-relevant tools and software',
        'Match skills to job requirements'
      ]
    }
  ];

  const writingTips = [
    {
      title: 'Use the STAR Method',
      description: 'Structure achievements using Situation, Task, Action, Result format.',
      example: 'Led a team of 5 developers (Situation) to redesign the company website (Task) by implementing agile methodologies (Action), resulting in 40% faster load times and 25% increase in user engagement (Result).'
    },
    {
      title: 'Avoid Personal Pronouns',
      description: 'Skip "I," "me," "my" - start directly with action verbs.',
      example: '"Managed social media campaigns" instead of "I managed social media campaigns"'
    },
    {
      title: 'Use Industry Keywords',
      description: 'Include relevant buzzwords and technical terms from your field.',
      example: 'For marketing: SEO, Google Analytics, conversion optimization, lead generation'
    },
    {
      title: 'Show Progression',
      description: 'Demonstrate career growth and increasing responsibilities.',
      example: 'Promoted from Junior Developer to Senior Developer within 18 months'
    }
  ];

  return (
    <TipsContainer>
      <Header>
        <Title>
          <FaLightbulb /> Resume Making Tips
        </Title>
        <Subtitle>
          Master the art of creating compelling resumes that get you noticed by recruiters and land you interviews.
        </Subtitle>
      </Header>

      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </Tab>
        ))}
      </TabsContainer>

      <ContentSection>
        {activeTab === 'overview' && (
          <>
            <StatsSection>
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                Resume Statistics That Matter
              </h2>
              <StatsGrid>
                {resumeStats.map((stat, index) => (
                  <StatCard key={index}>
                    <StatIcon>{stat.icon}</StatIcon>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </StatsSection>

            <SectionCard>
              <SectionTitle>
                <FaFileAlt /> Resume Fundamentals
              </SectionTitle>
              <TipsGrid>
                {overviewTips.map((tip, index) => (
                  <TipCard key={index}>
                    <TipTitle>
                      {tip.icon} {tip.title}
                    </TipTitle>
                    <TipDescription>{tip.description}</TipDescription>
                  </TipCard>
                ))}
              </TipsGrid>
            </SectionCard>

            <QuoteCard>
              <QuoteIcon>
                <FaQuoteLeft />
              </QuoteIcon>
              <QuoteText>
                "Your resume is your first impression. Make it count by showcasing your unique value proposition and quantifiable achievements."
              </QuoteText>
              <QuoteAuthor>— Career Expert</QuoteAuthor>
            </QuoteCard>

            <SectionCard>
              <SectionTitle>
                <FaStar /> Key Success Factors
              </SectionTitle>
              <ExampleSection>
                <ExampleTitle>
                  <FaCheckCircle /> What Makes a Great Resume
                </ExampleTitle>
                <TipsGrid>
                  <div>
                    <h4>Content Quality</h4>
                    <ul>
                      <li>Relevant experience and skills</li>
                      <li>Quantified achievements</li>
                      <li>Industry-specific keywords</li>
                      <li>Clear career progression</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Professional Presentation</h4>
                    <ul>
                      <li>Clean, readable formatting</li>
                      <li>Consistent styling</li>
                      <li>Error-free writing</li>
                      <li>Appropriate length</li>
                    </ul>
                  </div>
                </TipsGrid>
              </ExampleSection>
            </SectionCard>
          </>
        )}

        {activeTab === 'sections' && (
          <SectionCard>
            <SectionTitle>
              <FaUser /> Resume Sections Guide
            </SectionTitle>
            {sectionTips.map((section, index) => (
              <AccordionItem key={index}>
                <AccordionHeader onClick={() => toggleAccordion(`section-${index}`)}>
                  {section.section}
                  {openAccordion === `section-${index}` ? <FaChevronUp /> : <FaChevronDown />}
                </AccordionHeader>
                <AccordionContent isOpen={openAccordion === `section-${index}`}>
                  {section.tips.map((tip, tipIndex) => (
                    <ChecklistItem key={tipIndex}>
                      <CheckIcon>
                        <FaCheckCircle />
                      </CheckIcon>
                      <CheckText>{tip}</CheckText>
                    </ChecklistItem>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </SectionCard>
        )}

        {activeTab === 'writing' && (
          <SectionCard>
            <SectionTitle>
              <FaLightbulb /> Writing Excellence
            </SectionTitle>
            {writingTips.map((tip, index) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <TipCard>
                  <TipTitle>
                    <FaLightbulb /> {tip.title}
                  </TipTitle>
                  <TipDescription>{tip.description}</TipDescription>
                </TipCard>
                <ExampleSection>
                  <ExampleTitle>Example:</ExampleTitle>
                  <ExampleText style={{ fontStyle: 'italic', color: '#667eea' }}>
                    "{tip.example}"
                  </ExampleText>
                </ExampleSection>
              </div>
            ))}
          </SectionCard>
        )}

        {activeTab === 'examples' && (
          <SectionCard>
            <SectionTitle>
              <FaStar /> Good vs Bad Examples
            </SectionTitle>

            <ExampleSection>
              <ExampleTitle>Work Experience Descriptions</ExampleTitle>
              <ExampleGrid>
                <GoodExample>
                  <ExampleLabel>
                    <FaCheckCircle style={{ color: '#28a745' }} /> Good Example
                  </ExampleLabel>
                  <ExampleText>
                    • Led cross-functional team of 8 members to launch new product feature, resulting in 35% increase in user engagement and $2M additional revenue<br/>
                    • Implemented automated testing framework that reduced bug reports by 60% and improved deployment speed by 3x<br/>
                    • Mentored 3 junior developers, with 100% promotion rate within 12 months
                  </ExampleText>
                </GoodExample>
                <BadExample>
                  <ExampleLabel>
                    <FaTimesCircle style={{ color: '#dc3545' }} /> Bad Example
                  </ExampleLabel>
                  <ExampleText>
                    • Worked on team projects<br/>
                    • Responsible for testing<br/>
                    • Helped other developers<br/>
                    • Did various programming tasks
                  </ExampleText>
                </BadExample>
              </ExampleGrid>
            </ExampleSection>

            <ExampleSection>
              <ExampleTitle>Professional Summary</ExampleTitle>
              <ExampleGrid>
                <GoodExample>
                  <ExampleLabel>
                    <FaCheckCircle style={{ color: '#28a745' }} /> Good Example
                  </ExampleLabel>
                  <ExampleText>
                    "Results-driven Software Engineer with 5+ years of experience developing scalable web applications using React, Node.js, and AWS. Proven track record of leading teams and delivering projects 20% ahead of schedule while maintaining 99.9% uptime."
                  </ExampleText>
                </GoodExample>
                <BadExample>
                  <ExampleLabel>
                    <FaTimesCircle style={{ color: '#dc3545' }} /> Bad Example
                  </ExampleLabel>
                  <ExampleText>
                    "I am a hardworking person who likes to code. I have experience with computers and want to work at your company. I am a team player and quick learner."
                  </ExampleText>
                </BadExample>
              </ExampleGrid>
            </ExampleSection>
          </SectionCard>
        )}

        {activeTab === 'checklist' && (
          <SectionCard>
            <SectionTitle>
              <FaCheckCircle /> Final Resume Checklist
            </SectionTitle>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Before Submitting</h3>
              {[
                'Proofread for spelling and grammar errors',
                'Ensure consistent formatting throughout',
                'Verify all contact information is current',
                'Check that file is saved in correct format (PDF preferred)',
                'Confirm resume is tailored to the specific job',
                'Include relevant keywords from job description',
                'Quantify achievements with specific numbers',
                'Remove any outdated or irrelevant information',
                'Ensure resume is 1-2 pages maximum',
                'Test that resume is ATS-friendly'
              ].map((item, index) => (
                <ChecklistItem key={index}>
                  <CheckIcon>
                    <FaCheckCircle />
                  </CheckIcon>
                  <CheckText>{item}</CheckText>
                </ChecklistItem>
              ))}
            </div>

            <QuoteCard>
              <QuoteIcon>
                <FaQuoteLeft />
              </QuoteIcon>
              <QuoteText>
                "A well-crafted resume opens doors. Take the time to perfect it, and it will serve you throughout your career."
              </QuoteText>
              <QuoteAuthor>— HR Professional</QuoteAuthor>
            </QuoteCard>
          </SectionCard>
        )}
      </ContentSection>
    </TipsContainer>
  );
};

export default ResumeTips;
