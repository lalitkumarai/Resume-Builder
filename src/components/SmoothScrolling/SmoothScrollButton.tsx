import React from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import { useLenis } from '../../hooks/useLenis';

interface SmoothScrollButtonProps {
  target?: string | number | HTMLElement;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'floating';
  size?: 'small' | 'medium' | 'large';
  duration?: number;
  offset?: number;
  style?: React.CSSProperties;
}

const ButtonBase = styled.button<{ variant: string; size: string }>`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);

          &:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

          &:hover {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 25px rgba(129, 140, 248, 0.3);
          }
        `;
      case 'floating':
        return `
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          backdrop-filter: blur(10px);
          
          &.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          
          &:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
          }
          
          @media (max-width: 768px) {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
          }
        `;
      default:
        return '';
    }
  }}
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        `;
      case 'large':
        return `
          font-size: 1.125rem;
          padding: 1rem 2rem;
        `;
      default:
        return `
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
        `;
    }
  }}
`;

const SmoothScrollButton: React.FC<SmoothScrollButtonProps> = ({
  target = 0,
  children,
  className,
  variant = 'primary',
  size = 'medium',
  duration = 1.2,
  offset = 0,
  style
}) => {
  const { scrollTo } = useLenis();

  const handleClick = () => {
    scrollTo(target, {
      duration,
      offset,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  return (
    <ButtonBase
      variant={variant}
      size={size}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children || (variant === 'floating' ? <FaArrowUp /> : 'Scroll')}
    </ButtonBase>
  );
};

export default SmoothScrollButton;
