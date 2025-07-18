import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaStar, FaCrown, FaEye, FaCheck, FaTimes, FaLightbulb } from 'react-icons/fa';

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
  color: #6366f1;
  font-size: 2.8rem;
  margin-bottom: 1rem;
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
    display: block;
    width: 120px;
    height: 5px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    margin: 1.5rem auto 0;
    border-radius: 3px;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 600;
  position: relative;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%);
  border-radius: 15px;
  border: 1px solid rgba(99, 102, 241, 0.1);

  &::before {
    content: '✨';
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
  }
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
  padding: 15px 20px 15px 50px;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
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

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #6366f1;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  ${SearchInput}:focus + & {
    color: #4f46e5;
    transform: translateY(-50%) scale(1.1);
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#6366f1' : '#e9ecef'};
  background: ${props => props.active ? '#6366f1' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #6366f1;
    background: ${props => props.active ? '#4f46e5' : '#f1f5f9'};
    color: ${props => props.active ? 'white' : '#6366f1'};
    transform: translateY(-1px);
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ResultsCount = styled.p`
  color: #64748b;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
  border-radius: 10px;
  border: 1px solid rgba(99, 102, 241, 0.2);

  strong {
    color: #6366f1;
    font-weight: 800;
    text-shadow: 0 1px 3px rgba(99, 102, 241, 0.3);
  }
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
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 800;
  color: white;
  background: ${props =>
    props.type === 'popular' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' :
    props.type === 'new' ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' :
    'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
  };
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
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

  &:hover::before {
    left: 100%;
  }
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h3`
  color: #1e293b;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
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
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;

  ${TemplateCard}:hover & {
    color: #475569;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%);
    padding: 0.5rem;
    border-radius: 8px;
    border-left: 3px solid #6366f1;
  }
`;

const TemplateFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FeatureTag = styled.span`
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%);
  color: #6366f1;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.3s ease;
  border: 1px solid rgba(99, 102, 241, 0.2);
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
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${props => props.primary ? '#6366f1' : '#e9ecef'};
  background: ${props => props.primary ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#64748b'};
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : '#f1f5f9'};
    border-color: #6366f1;
    color: ${props => props.primary ? 'white' : '#6366f1'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
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
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link
            to="/choose-template"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#667eea',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <FaLightbulb /> Detailed Template Selection Guide
          </Link>
        </div>
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
          <strong>{filteredTemplates.length}</strong> template{filteredTemplates.length !== 1 ? 's' : ''} found
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
