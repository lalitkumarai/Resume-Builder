import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileAlt, FaEye, FaArrowRight, FaCheckCircle, FaLightbulb, FaUsers, FaCog, FaPalette, FaGraduationCap, FaBuilding, FaCode, FaChartLine, FaHeart, FaFilter, FaSearch } from 'react-icons/fa';

import { resumeTemplates, templateCategories } from '../data/templates';
import TemplatePreviewModal from '../components/Templates/TemplatePreviewModal';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 900;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.5);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 110%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    border-radius: 15px;
    z-index: -1;
    filter: blur(10px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  max-width: 900px;
  margin: 0 auto 2rem auto;
  line-height: 1.7;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);

  &::before {
    content: '✨';
    position: absolute;
    left: 1rem;
    top: 1rem;
    font-size: 1.5rem;
    animation: sparkle 2s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const GuidanceSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const GuidanceTitle = styled.h2`
  color: #1e293b;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
  }
`;

const GuidanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const GuidanceCard = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%);
  border-radius: 15px;
  padding: 2rem;
  border-left: 5px solid #6366f1;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.2);
    border-left-color: #4f46e5;

    &::before {
      opacity: 1;
    }
  }
`;

const GuidanceCardTitle = styled.h3`
  color: #6366f1;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 1px;
  }
`;

const GuidanceList = styled.ul`
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

const FilterSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const FilterTitle = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 300px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 8px 25px rgba(99, 102, 241, 0.2);
    background: white;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 500;
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 1rem 1.5rem;
  border: 2px solid ${props => props.active ? '#6366f1' : '#e9ecef'};
  background: ${props => props.active ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
    border-color: #6366f1;
    background: ${props => props.active ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : '#f1f5f9'};
    color: ${props => props.active ? 'white' : '#6366f1'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const TemplatePreview = styled.div<{ colors: any }>`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.colors.primary}20, ${props => props.colors.secondary}20);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: ${props => props.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 50px;
    left: 20px;
    right: 20px;
    height: 60%;
    background: linear-gradient(
      to bottom,
      ${props => props.colors.text}22 2px,
      transparent 2px,
      transparent 12px,
      ${props => props.colors.text}11 12px,
      transparent 12px
    );
    background-size: 100% 16px;
  }
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h3`
  color: #1e293b;
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  ${TemplateCard}:hover & {
    color: #6366f1;
    text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);

    &::before {
      width: 100%;
    }
  }
`;

const TemplateDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  font-weight: 600;
  transition: all 0.3s ease;

  ${TemplateCard}:hover & {
    color: #475569;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%);
    padding: 0.75rem;
    border-radius: 8px;
    border-left: 3px solid #6366f1;
  }
`;

const TemplateFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTag = styled.span<{ type: string }>`
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: ${props =>
    props.type === 'ats' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)' :
    props.type === 'popular' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)' :
    props.type === 'premium' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.25) 100%)' :
    'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)'
  };
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);

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
    color: white;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.primary ? '#6366f1' : '#e9ecef'};
  background: ${props => props.primary ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#64748b'};
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
    background: ${props => props.primary ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : '#f1f5f9'};
    border-color: #6366f1;
    color: ${props => props.primary ? 'white' : '#6366f1'};
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const IndustryGuide = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
`;

const IndustryTitle = styled.h2`
  color: #1e293b;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
  }
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const IndustryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const IndustryIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1rem auto;
`;

const IndustryName = styled.h4`
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const IndustryDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const industryGuides = [
  {
    name: 'Technology',
    icon: <FaCode />,
    description: 'Modern, clean designs that highlight technical skills and projects',
    templates: ['Modern Professional', 'Software Developer', 'Technical Engineer']
  },
  {
    name: 'Finance & Banking',
    icon: <FaBuilding />,
    description: 'Conservative, professional layouts that build trust and credibility',
    templates: ['Classic Elegant', 'Finance & Banking', 'Executive Premium']
  },
  {
    name: 'Creative Industries',
    icon: <FaPalette />,
    description: 'Bold, visually striking designs that showcase creativity',
    templates: ['Creative Designer', 'Graphic Designer', 'Portfolio Focused']
  },
  {
    name: 'Healthcare',
    icon: <FaHeart />,
    description: 'Clean, trustworthy designs emphasizing care and professionalism',
    templates: ['Classic Elegant', 'Healthcare Professional', 'Academic']
  },
  {
    name: 'Education',
    icon: <FaGraduationCap />,
    description: 'Academic-focused layouts highlighting education and research',
    templates: ['Academic', 'Education Professional', 'Research Focused']
  },
  {
    name: 'Sales & Marketing',
    icon: <FaChartLine />,
    description: 'Results-driven designs that emphasize achievements and metrics',
    templates: ['Modern Professional', 'Sales Executive', 'Marketing Specialist']
  }
];

const ChooseYourTemplate: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const navigate = useNavigate();

  const filteredTemplates = resumeTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (template: any) => {
    navigate(`/builder?template=${template.id}`);
  };

  return (
    <PageContainer>
      <Header>
        <Title>
          <FaFileAlt />
          Choose Your Perfect Resume Template
        </Title>
        <Subtitle>
          Select from our collection of professional, ATS-optimized resume templates designed by experts. 
          Each template is crafted to help you stand out and get noticed by employers in your industry.
        </Subtitle>
        
        <StatsContainer>
          <StatItem>
            <StatNumber>13+</StatNumber>
            <StatLabel>Professional Templates</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>ATS Compatible</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>6</StatNumber>
            <StatLabel>Industry Categories</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>95%</StatNumber>
            <StatLabel>Success Rate</StatLabel>
          </StatItem>
        </StatsContainer>
      </Header>

      <GuidanceSection>
        <GuidanceTitle>
          <FaLightbulb />
          How to Choose the Right Template
        </GuidanceTitle>
        
        <GuidanceGrid>
          <GuidanceCard>
            <GuidanceCardTitle>
              <FaUsers />
              Consider Your Industry
            </GuidanceCardTitle>
            <GuidanceList>
              <li>Conservative industries (finance, law) prefer traditional designs</li>
              <li>Creative fields welcome bold, innovative layouts</li>
              <li>Tech companies appreciate clean, modern aesthetics</li>
              <li>Healthcare values trustworthy, professional appearance</li>
            </GuidanceList>
          </GuidanceCard>

          <GuidanceCard>
            <GuidanceCardTitle>
              <FaCog />
              Match Your Experience Level
            </GuidanceCardTitle>
            <GuidanceList>
              <li>Entry-level: Focus on education and skills sections</li>
              <li>Mid-career: Emphasize work experience and achievements</li>
              <li>Senior-level: Highlight leadership and strategic impact</li>
              <li>Career changers: Showcase transferable skills prominently</li>
            </GuidanceList>
          </GuidanceCard>

          <GuidanceCard>
            <GuidanceCardTitle>
              <FaCheckCircle />
              Ensure ATS Compatibility
            </GuidanceCardTitle>
            <GuidanceList>
              <li>All our templates pass Applicant Tracking Systems</li>
              <li>Clean formatting with standard section headings</li>
              <li>Proper text hierarchy and keyword optimization</li>
              <li>No complex graphics that confuse ATS software</li>
            </GuidanceList>
          </GuidanceCard>
        </GuidanceGrid>
      </GuidanceSection>

      <FilterSection>
        <FilterTitle>
          <FaFilter />
          Find Your Perfect Template
        </FilterTitle>
        
        <FilterControls>
          <SearchInput
            type="text"
            placeholder="Search templates by name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <FilterButton
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >
            All Templates
          </FilterButton>
          
          {templateCategories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterControls>
      </FilterSection>

      <TemplatesGrid>
        {filteredTemplates.map(template => (
          <TemplateCard key={template.id}>
            <TemplatePreview colors={template.colors} />
            
            <TemplateInfo>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
              
              <TemplateFeatures>
                {template.features.includes('ATS-Friendly') && (
                  <FeatureTag type="ats">ATS-Friendly</FeatureTag>
                )}
                {template.features.includes('Most Popular') && (
                  <FeatureTag type="popular">Most Popular</FeatureTag>
                )}
                {template.features.includes('Premium') && (
                  <FeatureTag type="premium">Premium</FeatureTag>
                )}
                <FeatureTag type="category">{template.category}</FeatureTag>
              </TemplateFeatures>
              
              <TemplateActions>
                <ActionButton onClick={() => setPreviewTemplate(template)}>
                  <FaEye /> Preview
                </ActionButton>
                <ActionButton primary onClick={() => handleSelectTemplate(template)}>
                  <FaArrowRight /> Use Template
                </ActionButton>
              </TemplateActions>
            </TemplateInfo>
          </TemplateCard>
        ))}
      </TemplatesGrid>

      <IndustryGuide>
        <IndustryTitle>Templates by Industry</IndustryTitle>
        <IndustryGrid>
          {industryGuides.map((industry, index) => (
            <IndustryCard key={index}>
              <IndustryIcon>{industry.icon}</IndustryIcon>
              <IndustryName>{industry.name}</IndustryName>
              <IndustryDescription>{industry.description}</IndustryDescription>
            </IndustryCard>
          ))}
        </IndustryGrid>
      </IndustryGuide>

      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => handleSelectTemplate(previewTemplate)}
        />
      )}
    </PageContainer>
  );
};

export default ChooseYourTemplate;
