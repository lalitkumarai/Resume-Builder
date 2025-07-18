import React, { useState, useEffect } from 'react';
import SmoothScrollButton from './SmoothScrollButton';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen for scroll events
    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SmoothScrollButton
      target={0}
      variant="floating"
      duration={1.5}
      className={isVisible ? 'visible' : ''}
    />
  );
};

export default ScrollToTop;
