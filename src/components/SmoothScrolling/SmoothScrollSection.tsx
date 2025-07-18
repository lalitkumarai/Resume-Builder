import React, { useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';

interface SmoothScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  offset?: number;
}

const SectionContainer = styled.section`
  scroll-margin-top: 100px; /* Account for fixed header */
  position: relative;
  
  /* Smooth element transitions */
  * {
    transition: transform 0.1s ease-out;
    will-change: transform;
  }
  
  /* Optimize images and media for smooth scrolling */
  img, video, iframe {
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  /* Optimize text rendering */
  p, h1, h2, h3, h4, h5, h6 {
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const SmoothScrollSection: React.FC<SmoothScrollSectionProps> = ({
  children,
  id,
  className,
  delay = 0,
  offset = 0
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Add smooth scroll optimization attributes
    section.style.scrollBehavior = 'auto';
    
    // Intersection Observer for performance optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add active class for animations when in view
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: `${offset}px 0px`
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [offset]);

  return (
    <SectionContainer
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </SectionContainer>
  );
};

export default SmoothScrollSection;
