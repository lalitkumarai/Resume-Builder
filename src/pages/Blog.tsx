import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaClock, FaUser, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';

import { blogPosts, blogCategories, getFeaturedPosts, getPostsByCategory } from '../data/blogPosts';

const BlogContainer = styled.div`
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
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
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

const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedPost = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeaturedImage = styled.div<{ image: string }>`
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem;
`;

const FeaturedTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const FeaturedExcerpt = styled.p`
  opacity: 0.9;
  line-height: 1.5;
`;

const FeaturedSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarPost = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SidebarImage = styled.div<{ image: string }>`
  width: 80px;
  height: 80px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`;

const SidebarContent = styled.div`
  flex: 1;
`;

const SidebarTitle = styled.h4`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div<{ image: string }>`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardCategory = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const CardExcerpt = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const AuthorName = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPosts = getFeaturedPosts();
  const mainFeatured = featuredPosts[0];
  const sidebarFeatured = featuredPosts.slice(1);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch && !post.featured;
  });

  return (
    <BlogContainer>
      <Header>
        <Title>Career Blog</Title>
        <Subtitle>
          Expert insights, tips, and strategies to accelerate your career growth and land your dream job.
        </Subtitle>
      </Header>

      <FilterSection>
        <CategoryFilter>
          <CategoryButton
            active={selectedCategory === 'All'}
            onClick={() => setSelectedCategory('All')}
          >
            All Posts
          </CategoryButton>
          {blogCategories.map(category => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <SearchBox>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </FilterSection>

      {!searchTerm && selectedCategory === 'All' && (
        <FeaturedSection>
          <SectionTitle>Featured Articles</SectionTitle>
          <FeaturedGrid>
            {mainFeatured && (
              <FeaturedPost to={`/blog/${mainFeatured.slug}`}>
                <FeaturedImage image={mainFeatured.image}>
                  <FeaturedOverlay>
                    <FeaturedTitle>{mainFeatured.title}</FeaturedTitle>
                    <FeaturedExcerpt>{mainFeatured.excerpt}</FeaturedExcerpt>
                  </FeaturedOverlay>
                </FeaturedImage>
              </FeaturedPost>
            )}

            <FeaturedSidebar>
              {sidebarFeatured.map(post => (
                <SidebarPost key={post.id} to={`/blog/${post.slug}`}>
                  <SidebarImage image={post.image} />
                  <SidebarContent>
                    <PostMeta>
                      <MetaItem>
                        <FaClock />
                        {post.readTime} min read
                      </MetaItem>
                      <MetaItem>
                        <FaTag />
                        {post.category}
                      </MetaItem>
                    </PostMeta>
                    <SidebarTitle>{post.title}</SidebarTitle>
                  </SidebarContent>
                </SidebarPost>
              ))}
            </FeaturedSidebar>
          </FeaturedGrid>
        </FeaturedSection>
      )}

      <SectionTitle>
        {searchTerm ? `Search Results for "${searchTerm}"` : 
         selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
      </SectionTitle>

      <BlogGrid>
        {filteredPosts.map(post => (
          <BlogCard key={post.id} to={`/blog/${post.slug}`}>
            <CardImage image={post.image} />
            <CardContent>
              <CardCategory>{post.category}</CardCategory>
              <CardTitle>{post.title}</CardTitle>
              <CardExcerpt>{post.excerpt}</CardExcerpt>
              <PostMeta>
                <MetaItem>
                  <FaClock />
                  {post.readTime} min read
                </MetaItem>
                <MetaItem>
                  <FaUser />
                  {post.author.name}
                </MetaItem>
              </PostMeta>
              <CardFooter>
                <AuthorInfo>
                  <AuthorAvatar src={post.author.avatar} alt={post.author.name} />
                  <AuthorName>{post.author.name}</AuthorName>
                </AuthorInfo>
                <ReadMore>
                  Read More <FaArrowRight />
                </ReadMore>
              </CardFooter>
            </CardContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <h3>No articles found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </BlogContainer>
  );
};

export default Blog;
