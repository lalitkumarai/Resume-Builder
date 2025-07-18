import React from 'react';
import styled from 'styled-components';

interface LogoIconProps {
  size?: number;
  className?: string;
}

const LogoContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoSVG = styled.svg<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.5));
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 4px 15px rgba(99, 102, 241, 0.7));
    transform: scale(1.05);
  }
`;

const LogoIcon: React.FC<LogoIconProps> = ({ size = 32, className }) => {
  return (
    <LogoContainer size={size} className={className}>
      <LogoSVG size={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="documentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#logoGradient)" 
          stroke="rgba(255, 255, 255, 0.3)" 
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        {/* Document Base */}
        <rect 
          x="25" 
          y="20" 
          width="35" 
          height="50" 
          rx="3" 
          fill="url(#documentGradient)" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="1"
        />
        
        {/* Document Corner Fold */}
        <path 
          d="M 52 20 L 60 20 L 60 28 Z" 
          fill="rgba(255, 255, 255, 0.3)"
        />
        <path 
          d="M 52 20 L 52 28 L 60 28" 
          stroke="rgba(255, 255, 255, 0.4)" 
          strokeWidth="1" 
          fill="none"
        />
        
        {/* Text Lines */}
        <rect x="30" y="32" width="20" height="2" rx="1" fill="rgba(255, 255, 255, 0.8)" />
        <rect x="30" y="37" width="25" height="2" rx="1" fill="rgba(255, 255, 255, 0.7)" />
        <rect x="30" y="42" width="18" height="2" rx="1" fill="rgba(255, 255, 255, 0.6)" />
        <rect x="30" y="47" width="22" height="2" rx="1" fill="rgba(255, 255, 255, 0.7)" />
        <rect x="30" y="52" width="15" height="2" rx="1" fill="rgba(255, 255, 255, 0.6)" />
        <rect x="30" y="57" width="20" height="2" rx="1" fill="rgba(255, 255, 255, 0.7)" />
        
        {/* Star Accent */}
        <path 
          d="M 70 65 L 72 70 L 77 70 L 73 73 L 75 78 L 70 75 L 65 78 L 67 73 L 63 70 L 68 70 Z" 
          fill="rgba(255, 255, 255, 0.9)"
          filter="url(#glow)"
        />
        
        {/* Sparkle Effects */}
        <circle cx="35" cy="15" r="1.5" fill="rgba(255, 255, 255, 0.8)" />
        <circle cx="75" cy="25" r="1" fill="rgba(255, 255, 255, 0.7)" />
        <circle cx="20" cy="35" r="1" fill="rgba(255, 255, 255, 0.6)" />
        <circle cx="80" cy="45" r="1.5" fill="rgba(255, 255, 255, 0.8)" />
        <circle cx="15" cy="65" r="1" fill="rgba(255, 255, 255, 0.7)" />
        <circle cx="85" cy="75" r="1" fill="rgba(255, 255, 255, 0.6)" />
      </LogoSVG>
    </LogoContainer>
  );
};

export default LogoIcon;
