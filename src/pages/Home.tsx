import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaUsers, FaCheckCircle, FaArrowRight, FaEye, FaCrown, FaEnvelope, FaRobot } from 'react-icons/fa';
import styled from 'styled-components';

import { resumeTemplates } from '../data/templates';
import SmoothScrollSection from '../components/SmoothScrolling/SmoothScrollSection';
import SmoothScrollButton from '../components/SmoothScrolling/SmoothScrollButton';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(165, 180, 252, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroSection = styled.section`
  padding: 120px 20px;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.7;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #6366f1;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.2);

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
  border: 1px solid #f0f0f0;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #6366f1;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3));
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    color: #4f46e5;
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 700;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    color: #6366f1;
  }
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
  font-weight: 500;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    color: #475569;
  }
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
  padding: 100px 20px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }

  ${SectionTitle} {
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(99, 102, 241, 0.5);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
      border-radius: 2px;
    }
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;

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
  color: #1e293b;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  transition: all 0.3s ease;

  ${TemplateCard}:hover & {
    color: #6366f1;
  }
`;

const TemplateDescription = styled.p`
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  ${TemplateCard}:hover & {
    color: #475569;
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  color: white;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);

    &::before {
      left: 100%;
    }
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
      <SmoothScrollSection id="hero">
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
              <SmoothScrollButton
                target="#features"
                variant="secondary"
                duration={1.5}
                style={{ background: 'transparent', border: '2px solid white', color: 'white' }}
              >
                <FaEye /> Explore Features
              </SmoothScrollButton>
            </div>
          </div>
        </HeroSection>
      </SmoothScrollSection>

      <SmoothScrollSection id="features" delay={200}>
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
      </SmoothScrollSection>

      <SmoothScrollSection id="templates" delay={400}>
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
      </SmoothScrollSection>

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
