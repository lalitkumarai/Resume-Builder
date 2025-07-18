import React from 'react';
import styled from 'styled-components';
import LogoIcon from './LogoIcon';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const LogoContainer = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  gap: ${props => 
    props.size === 'small' ? '0.5rem' :
    props.size === 'medium' ? '0.75rem' :
    '1rem'
  };
  transition: all 0.3s ease;
`;

const LogoText = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const BrandName = styled.span<{ size: string }>`
  font-size: ${props => 
    props.size === 'small' ? '1.2rem' :
    props.size === 'medium' ? '1.5rem' :
    '1.8rem'
  };
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${LogoContainer}:hover &::after {
    opacity: 1;
  }
`;

const BrandTagline = styled.span<{ size: string }>`
  font-size: ${props => 
    props.size === 'small' ? '0.6rem' :
    props.size === 'medium' ? '0.7rem' :
    '0.8rem'
  };
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  className 
}) => {
  const iconSize = size === 'small' ? 28 : size === 'medium' ? 36 : 44;
  
  return (
    <LogoContainer size={size} className={className}>
      <LogoIcon size={iconSize} />
      {showText && (
        <LogoText size={size}>
          <BrandName size={size}>ResumeBuilder</BrandName>
          <BrandTagline size={size}>Professional • Modern • ATS-Ready</BrandTagline>
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default Logo;
