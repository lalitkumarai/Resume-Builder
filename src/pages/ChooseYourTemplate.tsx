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
  max-width: 800px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
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
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const GuidanceSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const GuidanceTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const GuidanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const GuidanceCard = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #667eea;
`;

const GuidanceCardTitle = styled.h3`
  color: #667eea;
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 250px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a6fd8' : '#f8f9ff'};
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
  color: #333;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const TemplateFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTag = styled.span<{ type: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => 
    props.type === 'ats' ? '#e8f5e8' :
    props.type === 'popular' ? '#fff3cd' :
    props.type === 'premium' ? '#f8d7da' :
    '#e3f2fd'
  };
  color: ${props => 
    props.type === 'ats' ? '#28a745' :
    props.type === 'popular' ? '#856404' :
    props.type === 'premium' ? '#721c24' :
    '#1976d2'
  };
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid ${props => props.primary ? '#667eea' : '#e9ecef'};
  background: ${props => props.primary ? '#667eea' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#f8f9ff'};
    border-color: #667eea;
    transform: translateY(-1px);
  }
`;

const IndustryGuide = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
`;

const IndustryTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
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
