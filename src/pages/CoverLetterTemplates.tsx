import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileAlt, FaEye, FaEdit, FaFilter, FaSearch, FaStar, FaDownload } from 'react-icons/fa';

import { coverLetterTemplates, CoverLetterTemplate } from '../types/coverLetter';

const TemplatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #6366f1;
  font-size: 2.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  position: relative;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 100%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
    border-radius: 20px;
    z-index: -1;
    filter: blur(20px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 3px;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 500;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #667eea;
    color: ${props => props.active ? 'white' : '#667eea'};
  }
`;

const SearchBox = styled.div`
  position: relative;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TemplatePreview = styled.div`
  height: 250px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const PreviewIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  z-index: 1;
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const TemplateDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TemplateCategory = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &.primary {
    background: #667eea;
    color: white;

    &:hover {
      background: #5a6fd8;
    }
  }

  &.secondary {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #e9ecef;

    &:hover {
      background: #e9ecef;
    }
  }
`;

const ActionLink = styled(Link)`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  background: #667eea;
  color: white;

  &:hover {
    background: #5a6fd8;
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin: 3rem 0;
  color: white;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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

const CoverLetterTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'professional', 'creative', 'modern', 'traditional', 'executive'];

  const filteredTemplates = coverLetterTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (template: CoverLetterTemplate) => {
    // Implement preview functionality
    console.log('Previewing template:', template.name);
  };

  return (
    <TemplatesContainer>
      <Header>
        <Title>
          <FaFileAlt /> Cover Letter Templates
        </Title>
        <Subtitle>
          Professional cover letter templates designed to help you make a great first impression and land your dream job.
        </Subtitle>
      </Header>

      <StatsSection>
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
          Professional Cover Letter Templates
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '0' }}>
          Crafted by HR experts and hiring managers to help you stand out from the competition
        </p>
        <StatsGrid>
          <StatCard>
            <StatNumber>5+</StatNumber>
            <StatLabel>Professional Templates</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100%</StatNumber>
            <StatLabel>ATS Compatible</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>3x</StatNumber>
            <StatLabel>Higher Response Rate</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FilterSection>
        <CategoryFilter>
          {categories.map(category => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Templates' : category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <SearchBox>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </FilterSection>

      <TemplatesGrid>
        {filteredTemplates.map(template => (
          <TemplateCard key={template.id}>
            <TemplatePreview>
              <PreviewIcon>
                <FaFileAlt />
              </PreviewIcon>
            </TemplatePreview>
            <TemplateInfo>
              <TemplateCategory>{template.category}</TemplateCategory>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
              <TemplateActions>
                <ActionButton 
                  className="secondary"
                  onClick={() => handlePreview(template)}
                >
                  <FaEye /> Preview
                </ActionButton>
                <ActionLink to={`/cover-letter-builder?template=${template.id}`}>
                  <FaEdit /> Use Template
                </ActionLink>
              </TemplateActions>
            </TemplateInfo>
          </TemplateCard>
        ))}
      </TemplatesGrid>

      {filteredTemplates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <h3>No templates found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </TemplatesContainer>
  );
};

export default CoverLetterTemplates;
