import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaChevronDown,
  FaTachometerAlt,
  FaClipboard,
  FaEnvelope,
  FaPlus,
  FaLightbulb,
  FaCog,
  FaQuestionCircle
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import { useLenis } from '../../hooks/useLenis';
import Logo from '../Logo/Logo';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 70px;
    gap: 1rem;
  }
`;

const LogoLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    box-shadow: 0 8px 30px rgba(129, 140, 248, 0.4);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.5rem 0.75rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(129, 140, 248, 0.4);
  }

  .nav-icon {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuickActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);

    &::before {
      left: 100%;
    }
  }

  .action-icon {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Removed SearchButton and NotificationButton to reduce clutter

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }

  .chevron {
    transition: transform 0.3s ease;
    font-size: 0.8rem;
    color: #ffffff;
  }

  &.open .chevron {
    transform: rotate(180deg);
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  overflow: hidden;
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
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
  }

  .user-email {
    font-size: 0.8rem;
    color: #6366f1;
    font-weight: 500;
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #475569;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
  border-radius: 8px;
  margin: 0 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: #ffffff;
    transform: translateX(4px) scale(1.02);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  }

  .dropdown-icon {
    width: 18px;
    text-align: center;
    color: #6366f1;
    transition: all 0.3s ease;
  }

  &:hover .dropdown-icon {
    color: #ffffff;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  width: calc(100% - 1rem);
  border: none;
  background: none;
  color: #dc2626;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  border-radius: 8px;
  margin: 0 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #dc2626, #ef4444);
    color: #ffffff;
    transform: translateX(4px) scale(1.02);
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  }

  .dropdown-icon {
    width: 18px;
    text-align: center;
    transition: opacity 0.3s ease;
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

// Removed DropdownSectionTitle as it's no longer used

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  width: 48px;
  height: 48px;
  font-size: 1.1rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: flex;
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
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
  }

  &:focus-visible {
    outline: 2px solid rgba(129, 140, 248, 0.8);
    outline-offset: 2px;
  }

  &.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(79, 70, 229, 0.4));
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
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
  const { scrollToTop } = useLenis();
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToTop({ duration: 1.5 });
    }
  };

  const handleNavClick = () => {
    // Smooth scroll to top when navigating to new pages
    scrollToTop({ duration: 0.8 });
  };

  return (
    <HeaderContainer>
      <Nav>
        <LogoLink to="/" onClick={handleLogoClick}>
          <Logo size="medium" showText={true} />
        </LogoLink>

        <NavLinks>
          <NavLink
            to="/templates"
            className={isActiveLink('/templates') ? 'active' : ''}
            onClick={handleNavClick}
          >
            <FaClipboard className="nav-icon" />
            Templates
          </NavLink>
          <NavLink
            to="/resume-guide"
            className={isActiveLink('/resume-guide') ? 'active' : ''}
            onClick={handleNavClick}
          >
            <FaLightbulb className="nav-icon" />
            Guide
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
                onClick={handleNavClick}
              >
                <FaTachometerAlt className="nav-icon" />
                Dashboard
              </NavLink>
              <NavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
                onClick={handleNavClick}
              >
                <FaFileAlt className="nav-icon" />
                Builder
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
                  <DropdownItem to="/dashboard" onClick={() => setDropdownOpen(false)}>
                    <FaTachometerAlt className="dropdown-icon" /> Dashboard
                  </DropdownItem>
                  <DropdownItem to="/builder" onClick={() => setDropdownOpen(false)}>
                    <FaPlus className="dropdown-icon" /> Create Resume
                  </DropdownItem>
                  <DropdownItem to="/templates" onClick={() => setDropdownOpen(false)}>
                    <FaClipboard className="dropdown-icon" /> Templates
                  </DropdownItem>
                </DropdownSection>

                <DropdownDivider />

                <DropdownSection>
                  <DropdownItem to="/profile" onClick={() => setDropdownOpen(false)}>
                    <FaUser className="dropdown-icon" /> Profile
                  </DropdownItem>
                  <DropdownItem to="/help" onClick={() => setDropdownOpen(false)}>
                    <FaQuestionCircle className="dropdown-icon" /> Help
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
            <FaClipboard /> Templates
          </MobileNavLink>
          <MobileNavLink
            to="/resume-guide"
            className={isActiveLink('/resume-guide') ? 'active' : ''}
            onClick={closeMobileMenu}
          >
            <FaLightbulb /> Guide
          </MobileNavLink>

          {isAuthenticated ? (
            <>
              <MobileNavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
                onClick={closeMobileMenu}
                style={{
                  background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                  color: '#ffffff',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <FaPlus /> Create Resume
              </MobileNavLink>
              <MobileNavLink
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaTachometerAlt /> Dashboard
              </MobileNavLink>
              <MobileNavLink
                to="/profile"
                className={isActiveLink('/profile') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaUser /> Profile
              </MobileNavLink>
              <MobileNavLink
                to="/help"
                onClick={closeMobileMenu}
              >
                <FaQuestionCircle /> Help
              </MobileNavLink>
              <MobileNavLink as="button" onClick={handleLogout} style={{
                border: '1px solid rgba(220, 38, 38, 0.5)',
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.2))',
                cursor: 'pointer',
                color: '#ffffff'
              }}>
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
