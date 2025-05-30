import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaUsers, FaCheckCircle, FaArrowRight, FaEye, FaCrown, FaEnvelope, FaRobot } from 'react-icons/fa';
import styled from 'styled-components';

import { resumeTemplates } from '../data/templates';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const HeroSection = styled.section`
  padding: 100px 20px;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ff6b6b;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #f0f0f0;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 80px 20px;
  background: #f8f9fa;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-weight: 500;
`;

const TemplatesSection = styled.section`
  padding: 80px 20px;
  background: white;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const TemplatePreview = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PreviewPlaceholder = styled.div<{ colors: any }>`
  width: 70%;
  height: 80%;
  background: ${props => props.colors.background};
  border: 1px solid #e9ecef;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 16px;
    background: ${props => props.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 22px;
    left: 12px;
    right: 12px;
    height: 60%;
    background: linear-gradient(
      to bottom,
      ${props => props.colors.text}22 1px,
      transparent 1px,
      transparent 8px,
      ${props => props.colors.text}11 8px,
      transparent 8px
    );
    background-size: 100% 10px;
  }
`;

const TemplateBadges = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
`;

const Badge = styled.span<{ type: 'popular' | 'new' | 'premium' }>`
  padding: 3px 6px;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 600;
  color: white;
  background: ${props =>
    props.type === 'popular' ? '#ff6b6b' :
    props.type === 'new' ? '#4ecdc4' :
    '#f39c12'
  };
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h3`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin: 0 auto;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ViewAllContainer = styled.div`
  text-align: center;
`;

const Home: React.FC = () => {
  const features = [
    {
      icon: <FaFileAlt />,
      title: 'Professional Resume Templates',
      description: 'Choose from a variety of ATS-friendly resume templates designed by professionals to help you stand out.',
    },
    {
      icon: <FaEnvelope />,
      title: 'Cover Letter Builder',
      description: 'Create compelling cover letters that complement your resume and make a great first impression.',
    },
    {
      icon: <FaRobot />,
      title: 'ATS Optimization',
      description: 'All our templates are optimized for Applicant Tracking Systems to ensure your documents get noticed.',
    },
    {
      icon: <FaDownload />,
      title: 'Multiple Export Formats',
      description: 'Export your resume and cover letter in PDF, DOCX, or other formats. Perfect for any application.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Resumes Created' },
    { number: '95%', label: 'Success Rate' },
    { number: '20+', label: 'Templates' },
    { number: '24/7', label: 'Support' },
  ];

  // Get featured templates (popular and new ones)
  const featuredTemplates = resumeTemplates
    .filter(template => template.isPopular || template.isNew)
    .slice(0, 3);

  return (
    <HomeContainer>
      <HeroSection>
        <div>
          <HeroTitle>Build Your Perfect Resume & Cover Letter</HeroTitle>
          <HeroSubtitle>
            Create professional, ATS-friendly resumes and compelling cover letters in minutes with our easy-to-use builders.
            Stand out from the crowd and land your dream job.
          </HeroSubtitle>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton to="/register">
              Get Started Free <FaArrowRight />
            </CTAButton>
            <CTAButton to="/create-resume" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
              <FaFileAlt /> How to Create Resume
            </CTAButton>
          </div>
        </div>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose Our Resume & Cover Letter Builder?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <TemplatesSection>
        <Container>
          <SectionTitle>Professional Resume Templates</SectionTitle>
          <TemplatesGrid>
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id}>
                <TemplatePreview>
                  <PreviewPlaceholder colors={template.colors} />
                  <TemplateBadges>
                    {template.isPopular && <Badge type="popular">Popular</Badge>}
                    {template.isNew && <Badge type="new">New</Badge>}
                    {template.isPremium && <Badge type="premium"><FaCrown /></Badge>}
                  </TemplateBadges>
                </TemplatePreview>
                <TemplateInfo>
                  <TemplateName>{template.name}</TemplateName>
                  <TemplateDescription>{template.description}</TemplateDescription>
                </TemplateInfo>
              </TemplateCard>
            ))}
          </TemplatesGrid>
          <ViewAllContainer>
            <ViewAllButton to="/templates">
              <FaEye /> View All Templates
            </ViewAllButton>
          </ViewAllContainer>
        </Container>
      </TemplatesSection>

      <StatsSection>
        <Container>
          <SectionTitle>Trusted by Thousands</SectionTitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <div key={index}>
                <StatCard>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </div>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
