import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaStar, FaCrown, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

import { resumeTemplates, templateCategories } from '../data/templates';
import { ResumeTemplate, TemplateCategory } from '../types/templates';
import TemplatePreviewModal from '../components/Templates/TemplatePreviewModal';

const TemplatesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
`;

const FilterRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a6fd8' : '#f8f9ff'};
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ResultsCount = styled.p`
  color: #666;
  font-size: 1rem;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TemplatePreview = styled.div`
  position: relative;
  height: 240px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PreviewPlaceholder = styled.div<{ colors: any }>`
  width: 80%;
  height: 85%;
  background: ${props => props.colors.background};
  border: 1px solid #e9ecef;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background: ${props => props.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 15px;
    right: 15px;
    height: 60%;
    background: linear-gradient(
      to bottom,
      ${props => props.colors.text}22 2px,
      transparent 2px,
      transparent 8px,
      ${props => props.colors.text}11 8px,
      transparent 8px
    );
    background-size: 100% 12px;
  }
`;

const TemplateBadges = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
`;

const Badge = styled.span<{ type: 'popular' | 'new' | 'premium' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const TemplateFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FeatureTag = styled.span`
  padding: 3px 8px;
  background: #f8f9ff;
  color: #667eea;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 10px;
  border: 2px solid ${props => props.primary ? '#667eea' : '#e9ecef'};
  background: ${props => props.primary ? '#667eea' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#f8f9ff'};
    border-color: #667eea;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
`;

interface TemplatesProps {}

const Templates: React.FC<TemplatesProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState('popular');
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  const navigate = useNavigate();

  const filteredTemplates = useMemo(() => {
    let filtered = resumeTemplates;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.features.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template =>
        template.category === selectedCategory
      );
    }

    // Sort templates
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleTemplateSelect = (templateId: string) => {
    // Navigate to resume builder with selected template
    navigate(`/builder?template=${templateId}`);
  };

  const handleTemplatePreview = (templateId: string) => {
    const template = resumeTemplates.find(t => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
    }
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <TemplatesContainer>
      <Header>
        <Title>Choose Your Perfect Resume Template</Title>
        <Subtitle>
          Select from our collection of professionally designed, ATS-friendly resume templates.
          Each template is crafted to help you stand out and land your dream job.
        </Subtitle>
      </Header>

      <FilterSection>
        <FilterRow>
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

          <CategoryFilter>
            {templateCategories.map(category => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryFilter>
        </FilterRow>
      </FilterSection>

      <ResultsHeader>
        <ResultsCount>
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
        </ResultsCount>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="name">Name A-Z</option>
        </SortSelect>
      </ResultsHeader>

      {filteredTemplates.length > 0 ? (
        <TemplatesGrid>
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id}>
              <TemplatePreview>
                <PreviewPlaceholder colors={template.colors} />
                <TemplateBadges>
                  {template.isPopular && <Badge type="popular">Popular</Badge>}
                  {template.isNew && <Badge type="new">New</Badge>}
                  {template.isPremium && <Badge type="premium"><FaCrown /> Premium</Badge>}
                </TemplateBadges>
              </TemplatePreview>

              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>

                <TemplateFeatures>
                  {template.features.slice(0, 3).map(feature => (
                    <FeatureTag key={feature}>{feature}</FeatureTag>
                  ))}
                  {template.features.length > 3 && (
                    <FeatureTag>+{template.features.length - 3} more</FeatureTag>
                  )}
                </TemplateFeatures>

                <TemplateActions>
                  <ActionButton onClick={() => handleTemplatePreview(template.id)}>
                    <FaEye /> Preview
                  </ActionButton>
                  <ActionButton
                    primary
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <FaCheck /> Use Template
                  </ActionButton>
                </TemplateActions>
              </TemplateInfo>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <FaTimes />
          </EmptyIcon>
          <h3>No templates found</h3>
          <p>Try adjusting your search criteria or browse all templates.</p>
        </EmptyState>
      )}

      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={handleClosePreview}
          onSelect={handleTemplateSelect}
        />
      )}
    </TemplatesContainer>
  );
};

export default Templates;
