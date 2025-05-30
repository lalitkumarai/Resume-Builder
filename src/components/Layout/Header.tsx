import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt, FaCog, FaBars, FaTimes, FaRobot, FaLightbulb, FaBlog, FaFileAlt, FaChevronDown, FaBell, FaSearch, FaTachometerAlt, FaClipboard, FaBookOpen, FaEnvelope, FaPlus, FaHistory, FaDownload, FaStar, FaQuestionCircle, FaHeadset } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    * {
      transition: none !important;
      animation: none !important;
    }
  }
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: clamp(75px, 10vw, 85px);
  position: relative;
  isolation: isolate;
  gap: clamp(1rem, 3vw, 2rem);

  @media (max-width: 768px) {
    height: 75px;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.25rem;
    height: 70px;
    gap: 0.75rem;
  }
`;

const Logo = styled(Link)`
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  font-weight: 800;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  will-change: transform;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px) scale(1.02);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 3px;
  }

  .logo-icon {
    font-size: clamp(1.6rem, 5vw, 2.2rem);
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2));
    flex-shrink: 0;
    background: linear-gradient(135deg, #ffffff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  padding: clamp(0.875rem, 2vw, 1.125rem);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(48px, 10vw, 56px);
  height: clamp(48px, 10vw, 56px);
  backdrop-filter: blur(15px);
  will-change: transform, background-color;
  border: 1px solid transparent;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    color: white;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 3px;
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  .nav-icon {
    font-size: clamp(1.1rem, 3vw, 1.3rem);
    opacity: 0.9;
    flex-shrink: 0;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  padding: 0.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const QuickActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #218838, #1ea085);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 24px rgba(40, 167, 69, 0.4);

    &::before {
      opacity: 1;
    }
  }

  .action-icon {
    font-size: 0.9rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  svg {
    font-size: 1.1rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  svg {
    font-size: 1.1rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  .notification-badge {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #ff4757, #ff3742);
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(255, 71, 87, 0.4);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  .chevron {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.85rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  &.open .chevron {
    transform: rotate(180deg);
  }
`;

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    opacity: 0.5;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  animation: dropdownFadeIn 0.3s ease;

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const DropdownUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .user-details {
    flex: 1;
  }

  .user-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }

  .user-email {
    font-size: 0.85rem;
    color: #666;
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: translateX(4px);
  }

  .dropdown-icon {
    width: 18px;
    text-align: center;
    opacity: 0.7;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  width: 100%;
  border: none;
  background: none;
  color: #333;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    color: white;
    transform: translateX(4px);
  }

  .dropdown-icon {
    width: 18px;
    text-align: center;
    opacity: 0.7;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 0.5rem 0;
`;

const DropdownSection = styled.div`
  padding: 0.5rem 0;
`;

const DropdownSectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  width: clamp(48px, 10vw, 52px);
  height: clamp(48px, 10vw, 52px);
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  will-change: transform, background-color;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 1200px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;



const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1200px) {
    display: block;
  }
`;

const MobileMenuContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.2);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &.active {
    background: rgba(102, 126, 234, 0.3);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);

  @media (max-width: 1200px) {
    display: none;
  }
`;

const AuthButton = styled(Link)`
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  white-space: nowrap;
  will-change: transform, background-color;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &.login {
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);

    &:hover,
    &:focus-visible {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  &.register {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover,
    &:focus-visible {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown and mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <FaFileAlt className="logo-icon" />
          ResumeBuilder
        </Logo>

        <NavLinks>
          <NavLink
            to="/templates"
            className={isActiveLink('/templates') ? 'active' : ''}
            title="Resume Templates"
          >
            <FaClipboard className="nav-icon" />
          </NavLink>
          <NavLink
            to="/cover-letter-templates"
            className={isActiveLink('/cover-letter-templates') ? 'active' : ''}
            title="Cover Letters"
          >
            <FaEnvelope className="nav-icon" />
          </NavLink>
          <NavLink
            to="/resume-guide"
            className={isActiveLink('/resume-guide') ? 'active' : ''}
            title="Resume Guide"
          >
            <FaLightbulb className="nav-icon" />
          </NavLink>
          <NavLink
            to="/blog"
            className={isActiveLink('/blog') ? 'active' : ''}
            title="Career Blog"
          >
            <FaBlog className="nav-icon" />
          </NavLink>
          <NavLink
            to="/ats-tips"
            className={isActiveLink('/ats-tips') ? 'active' : ''}
            title="ATS Tips"
          >
            <FaRobot className="nav-icon" />
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
                title="Dashboard"
              >
                <FaTachometerAlt className="nav-icon" />
              </NavLink>
              <NavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
                title="Resume Builder"
              >
                <FaFileAlt className="nav-icon" />
              </NavLink>
              <NavLink
                to="/cover-letter-builder"
                className={isActiveLink('/cover-letter-builder') ? 'active' : ''}
                title="Cover Letter Builder"
              >
                <FaEnvelope className="nav-icon" />
              </NavLink>
              <NavLink
                to="/ats-optimizer"
                className={isActiveLink('/ats-optimizer') ? 'active' : ''}
                title="ATS Optimizer"
              >
                <FaRobot className="nav-icon" />
              </NavLink>
            </>
          )}
        </NavLinks>

        {isAuthenticated ? (
          <UserMenu ref={dropdownRef}>
            <QuickActionButton to="/builder">
              <FaPlus className="action-icon" />
              New Resume
            </QuickActionButton>

            <SearchButton title="Search">
              <FaSearch />
            </SearchButton>

            <NotificationButton title="Notifications">
              <FaBell />
              <div className="notification-badge"></div>
            </NotificationButton>

            <UserButton
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={dropdownOpen ? 'open' : ''}
            >
              <UserAvatar>{getUserInitials()}</UserAvatar>
              {getUserDisplayName()}
              <FaChevronDown className="chevron" />
            </UserButton>

            {dropdownOpen && (
              <DropdownMenu>
                <DropdownHeader>
                  <DropdownUserInfo>
                    <UserAvatar>{getUserInitials()}</UserAvatar>
                    <div className="user-details">
                      <div className="user-name">{user?.firstName} {user?.lastName}</div>
                      <div className="user-email">{user?.email}</div>
                    </div>
                  </DropdownUserInfo>
                </DropdownHeader>

                <DropdownSection>
                  <DropdownSectionTitle>Quick Actions</DropdownSectionTitle>
                  <DropdownItem to="/builder" onClick={() => setDropdownOpen(false)}>
                    <FaPlus className="dropdown-icon" /> Create New Resume
                  </DropdownItem>
                  <DropdownItem to="/dashboard" onClick={() => setDropdownOpen(false)}>
                    <FaTachometerAlt className="dropdown-icon" /> Dashboard
                  </DropdownItem>
                  <DropdownItem to="/dashboard?tab=resumes" onClick={() => setDropdownOpen(false)}>
                    <FaHistory className="dropdown-icon" /> My Resumes
                  </DropdownItem>
                </DropdownSection>

                <DropdownDivider />

                <DropdownSection>
                  <DropdownSectionTitle>Tools & Features</DropdownSectionTitle>
                  <DropdownItem to="/cover-letter-builder" onClick={() => setDropdownOpen(false)}>
                    <FaEnvelope className="dropdown-icon" /> Cover Letter Builder
                  </DropdownItem>
                  <DropdownItem to="/ats-optimizer" onClick={() => setDropdownOpen(false)}>
                    <FaRobot className="dropdown-icon" /> ATS Optimizer
                  </DropdownItem>
                  <DropdownItem to="/templates" onClick={() => setDropdownOpen(false)}>
                    <FaStar className="dropdown-icon" /> Browse Templates
                  </DropdownItem>
                </DropdownSection>

                <DropdownDivider />

                <DropdownSection>
                  <DropdownSectionTitle>Account & Support</DropdownSectionTitle>
                  <DropdownItem to="/profile" onClick={() => setDropdownOpen(false)}>
                    <FaUser className="dropdown-icon" /> Profile Settings
                  </DropdownItem>
                  <DropdownItem to="/help" onClick={() => setDropdownOpen(false)}>
                    <FaQuestionCircle className="dropdown-icon" /> Help Center
                  </DropdownItem>
                  <DropdownItem to="/support" onClick={() => setDropdownOpen(false)}>
                    <FaHeadset className="dropdown-icon" /> Contact Support
                  </DropdownItem>
                </DropdownSection>

                <DropdownDivider />

                <DropdownButton onClick={handleLogout}>
                  <FaSignOutAlt className="dropdown-icon" /> Sign Out
                </DropdownButton>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <AuthButtons>
            <AuthButton to="/login" className="login">
              Sign In
            </AuthButton>
            <AuthButton to="/register" className="register">
              Get Started
            </AuthButton>
          </AuthButtons>
        )}

        <MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

      </Nav>

      <MobileMenu isOpen={mobileMenuOpen} id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <MobileMenuContent>
          <MobileNavLink
            to="/templates"
            className={isActiveLink('/templates') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaClipboard /> Resume Templates
          </MobileNavLink>
          <MobileNavLink
            to="/cover-letter-templates"
            className={isActiveLink('/cover-letter-templates') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaEnvelope /> Cover Letters
          </MobileNavLink>
          <MobileNavLink
            to="/resume-guide"
            className={isActiveLink('/resume-guide') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaLightbulb /> Resume Guide
          </MobileNavLink>
          <MobileNavLink
            to="/blog"
            className={isActiveLink('/blog') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaBlog /> Blog
          </MobileNavLink>
          <MobileNavLink
            to="/ats-tips"
            className={isActiveLink('/ats-tips') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaRobot /> ATS Tips
          </MobileNavLink>

          {isAuthenticated ? (
            <>
              <MobileNavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
                onClick={closeMobileMenu}
                style={{ background: 'linear-gradient(135deg, #28a745, #20c997)', color: 'white', fontWeight: '600' }}
              >
                <FaPlus /> Create New Resume
              </MobileNavLink>
              <MobileNavLink
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaTachometerAlt /> Dashboard
              </MobileNavLink>
              <MobileNavLink
                to="/dashboard?tab=resumes"
                onClick={closeMobileMenu}
              >
                <FaHistory /> My Resumes
              </MobileNavLink>
              <MobileNavLink
                to="/cover-letter-builder"
                className={isActiveLink('/cover-letter-builder') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaEnvelope /> Cover Letter Builder
              </MobileNavLink>
              <MobileNavLink
                to="/ats-optimizer"
                className={isActiveLink('/ats-optimizer') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaRobot /> ATS Optimizer
              </MobileNavLink>
              <MobileNavLink
                to="/profile"
                className={isActiveLink('/profile') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaUser /> Profile Settings
              </MobileNavLink>
              <MobileNavLink
                to="/help"
                onClick={closeMobileMenu}
              >
                <FaQuestionCircle /> Help Center
              </MobileNavLink>
              <MobileNavLink as="button" onClick={handleLogout} style={{ border: 'none', background: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}>
                <FaSignOutAlt /> Sign Out
              </MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" onClick={closeMobileMenu}>
                <FaUser /> Sign In
              </MobileNavLink>
              <MobileNavLink to="/register" onClick={closeMobileMenu}>
                <FaUser /> Get Started
              </MobileNavLink>
            </>
          )}
        </MobileMenuContent>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
