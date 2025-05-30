import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt, FaCog, FaBars, FaTimes, FaRobot, FaLightbulb, FaBlog, FaFileAlt, FaChevronDown, FaBell, FaSearch, FaTachometerAlt, FaClipboard, FaBookOpen, FaEnvelope } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    z-index: -1;
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
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: clamp(70px, 10vw, 80px);
  position: relative;
  isolation: isolate;

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    height: 65px;
  }
`;

const Logo = styled(Link)`
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  font-weight: 800;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  will-change: transform;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .logo-icon {
    font-size: clamp(1.4rem, 5vw, 2rem);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
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
  gap: clamp(0.25rem, 1vw, 0.5rem);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

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
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1.25rem);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  will-change: transform, background-color;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-icon {
    font-size: 0.9rem;
    opacity: 0.8;
    flex-shrink: 0;
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
  gap: 1rem;
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .notification-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #ff4757;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .chevron {
    transition: transform 0.3s ease;
    font-size: 0.8rem;
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
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  min-width: 240px;
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

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  width: clamp(40px, 10vw, 44px);
  height: clamp(40px, 10vw, 44px);
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  will-change: transform, background-color;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
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
          >
            <FaClipboard className="nav-icon" />
            Resume Templates
          </NavLink>
          <NavLink
            to="/cover-letter-templates"
            className={isActiveLink('/cover-letter-templates') ? 'active' : ''}
          >
            <FaEnvelope className="nav-icon" />
            Cover Letters
          </NavLink>
          <NavLink
            to="/resume-guide"
            className={isActiveLink('/resume-guide') ? 'active' : ''}
          >
            <FaLightbulb className="nav-icon" />
            Resume Guide
          </NavLink>
          <NavLink
            to="/blog"
            className={isActiveLink('/blog') ? 'active' : ''}
          >
            <FaBlog className="nav-icon" />
            Blog
          </NavLink>
          <NavLink
            to="/ats-tips"
            className={isActiveLink('/ats-tips') ? 'active' : ''}
          >
            <FaRobot className="nav-icon" />
            ATS Tips
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
              >
                <FaTachometerAlt className="nav-icon" />
                Dashboard
              </NavLink>
              <NavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
              >
                <FaFileAlt className="nav-icon" />
                Resume Builder
              </NavLink>
              <NavLink
                to="/cover-letter-builder"
                className={isActiveLink('/cover-letter-builder') ? 'active' : ''}
              >
                <FaEnvelope className="nav-icon" />
                Cover Letter Builder
              </NavLink>
              <NavLink
                to="/ats-optimizer"
                className={isActiveLink('/ats-optimizer') ? 'active' : ''}
              >
                <FaRobot className="nav-icon" />
                ATS Optimizer
              </NavLink>
            </>
          )}
        </NavLinks>

        {isAuthenticated ? (
          <UserMenu ref={dropdownRef}>
            <NotificationButton>
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

                <DropdownItem to="/profile" onClick={() => setDropdownOpen(false)}>
                  <FaUser className="dropdown-icon" /> Profile Settings
                </DropdownItem>
                <DropdownItem to="/dashboard" onClick={() => setDropdownOpen(false)}>
                  <FaTachometerAlt className="dropdown-icon" /> Dashboard
                </DropdownItem>
                <DropdownItem to="/ats-optimizer" onClick={() => setDropdownOpen(false)}>
                  <FaRobot className="dropdown-icon" /> ATS Optimizer
                </DropdownItem>
                <DropdownItem to="/builder" onClick={() => setDropdownOpen(false)}>
                  <FaFileAlt className="dropdown-icon" /> Resume Builder
                </DropdownItem>
                <DropdownItem to="/cover-letter-builder" onClick={() => setDropdownOpen(false)}>
                  <FaEnvelope className="dropdown-icon" /> Cover Letter Builder
                </DropdownItem>
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
                to="/dashboard"
                className={isActiveLink('/dashboard') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaTachometerAlt /> Dashboard
              </MobileNavLink>
              <MobileNavLink
                to="/builder"
                className={isActiveLink('/builder') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                <FaFileAlt /> Resume Builder
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
                <FaUser /> Profile
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
