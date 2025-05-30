import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaClock, FaUser, FaTag, FaArrowLeft, FaArrowRight, FaShare, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';


import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';

const BlogPostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #5a6fd8;
  }
`;

const ArticleHeader = styled.div`
  margin-bottom: 3rem;
`;

const Category = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #666;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 3rem;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  margin-bottom: 3rem;
`;

const AuthorAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const AuthorBio = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.5;
`;

const ContentWrapper = styled.div`
  line-height: 1.8;
  color: #333;

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin: 2rem 0 1rem 0;
  }

  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.4rem;
    color: #667eea;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
  }

  code {
    background: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }

  pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  strong {
    font-weight: 600;
    color: #333;
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
`;

const ShareLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.linkedin {
    background: #0077b5;
  }

  &.twitter {
    background: #1da1f2;
  }

  &.facebook {
    background: #1877f2;
  }
`;

const TagsSection = styled.div`
  margin: 3rem 0;
`;

const TagsLabel = styled.h4`
  color: #333;
  margin-bottom: 1rem;
`;

const TagsList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.5rem 1rem;
  background: #e9ecef;
  color: #666;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const RelatedSection = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid #f0f0f0;
`;

const RelatedTitle = styled.h3`
  color: #333;
  margin-bottom: 2rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const RelatedCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const RelatedImage = styled.div<{ image: string }>`
  height: 150px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const RelatedContent = styled.div`
  padding: 1rem;
`;

const RelatedCardTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const RelatedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post);
  const currentUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const shareUrls = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
  };

  return (
    <BlogPostContainer>
      <BackButton to="/blog">
        <FaArrowLeft /> Back to Blog
      </BackButton>

      <ArticleHeader>
        <Category>{post.category}</Category>
        <Title>{post.title}</Title>
        <Meta>
          <MetaItem>
            <FaClock />
            {post.readTime} min read
          </MetaItem>
          <MetaItem>
            <FaUser />
            {post.author.name}
          </MetaItem>
          <MetaItem>
            <FaTag />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </MetaItem>
        </Meta>
      </ArticleHeader>

      <FeaturedImage src={post.image} alt={post.title} />

      <AuthorSection>
        <AuthorAvatar src={post.author.avatar} alt={post.author.name} />
        <AuthorInfo>
          <AuthorName>{post.author.name}</AuthorName>
          <AuthorBio>{post.author.bio}</AuthorBio>
        </AuthorInfo>
      </AuthorSection>

      <ContentWrapper>
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
      </ContentWrapper>

      <ShareSection>
        <ShareLabel>
          <FaShare /> Share this article:
        </ShareLabel>
        <ShareButton
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <FaLinkedin />
        </ShareButton>
        <ShareButton
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <FaTwitter />
        </ShareButton>
        <ShareButton
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="facebook"
        >
          <FaFacebook />
        </ShareButton>
      </ShareSection>

      <TagsSection>
        <TagsLabel>Tags</TagsLabel>
        <TagsList>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsList>
      </TagsSection>

      {relatedPosts.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Related Articles</RelatedTitle>
          <RelatedGrid>
            {relatedPosts.map(relatedPost => (
              <RelatedCard key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                <RelatedImage image={relatedPost.image} />
                <RelatedContent>
                  <RelatedCardTitle>{relatedPost.title}</RelatedCardTitle>
                  <RelatedMeta>
                    <MetaItem>
                      <FaClock />
                      {relatedPost.readTime} min
                    </MetaItem>
                    <MetaItem>
                      <FaTag />
                      {relatedPost.category}
                    </MetaItem>
                  </RelatedMeta>
                </RelatedContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedSection>
      )}
    </BlogPostContainer>
  );
};

export default BlogPost;
