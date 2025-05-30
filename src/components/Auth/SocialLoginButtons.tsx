import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle, FaGithub, FaLinkedin, FaMicrosoft, FaSpinner } from 'react-icons/fa';

import { useAuth, SocialProvider } from '../../context/AuthContext';

const SocialContainer = styled.div`
  margin: 1.5rem 0;
`;

const PromoSection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%);
  border: 1px solid #e1e8f0;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
`;

const DemoNotice = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #ffc107;
  border-radius: 10px;
  padding: 0.75rem;
  margin-top: 1rem;
  text-align: center;
`;

const PromoTitle = styled.h4`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PromoText = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
`;

const DemoText = styled.p`
  color: #856404;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PromoHighlight = styled.span`
  color: #0077b5;
  font-weight: 600;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #666;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e9ecef;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const SocialButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AllProvidersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SocialButton = styled.button<{ provider: SocialProvider; variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: ${props => props.variant === 'secondary' ? '10px 14px' : '14px 18px'};
  border: 2px solid ${props => getSocialColor(props.provider, 'border')};
  background: ${props => getSocialColor(props.provider, 'background')};
  color: ${props => getSocialColor(props.provider, 'text')};
  border-radius: 12px;
  font-size: ${props => props.variant === 'secondary' ? '0.85rem' : '0.95rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 48px;

  &:hover:not(:disabled) {
    background: ${props => getSocialColor(props.provider, 'hover')};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => getSocialColor(props.provider, 'shadow')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const SocialIcon = styled.div`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ProviderBadge = styled.div<{ type: 'popular' | 'recommended' | 'professional' }>`
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  background: ${props =>
    props.type === 'popular' ? '#ff6b6b' :
    props.type === 'recommended' ? '#4ecdc4' :
    '#f39c12'
  };
  z-index: 1;
`;

const ButtonContainer = styled.div<{ isHighlighted?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  ${props => props.isHighlighted && `
    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
      background-size: 400% 400%;
      border-radius: 15px;
      z-index: -1;
      animation: gradientShift 3s ease infinite;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}
`;

// Helper function to get social provider colors
function getSocialColor(provider: SocialProvider, type: string): string {
  const colors = {
    google: {
      background: 'linear-gradient(135deg, #4285f4 0%, #3367d6 100%)',
      hover: 'linear-gradient(135deg, #3367d6 0%, #2851a3 100%)',
      border: '#4285f4',
      text: 'white',
      shadow: 'rgba(66, 133, 244, 0.4)',
      lightHover: '#f8f9ff'
    },
    github: {
      background: 'linear-gradient(135deg, #333333 0%, #24292e 100%)',
      hover: 'linear-gradient(135deg, #24292e 0%, #1b1f23 100%)',
      border: '#333333',
      text: 'white',
      shadow: 'rgba(51, 51, 51, 0.4)',
      lightHover: '#f6f8fa'
    },
    linkedin: {
      background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
      hover: 'linear-gradient(135deg, #005885 0%, #004066 100%)',
      border: '#0077b5',
      text: 'white',
      shadow: 'rgba(0, 119, 181, 0.4)',
      lightHover: '#f0f8ff'
    },
    microsoft: {
      background: 'linear-gradient(135deg, #00a1f1 0%, #0078d4 100%)',
      hover: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)',
      border: '#00a1f1',
      text: 'white',
      shadow: 'rgba(0, 161, 241, 0.4)',
      lightHover: '#f0f8ff'
    }
  };

  return colors[provider][type] || '#666';
}

// Helper function to get social provider icons
function getSocialIcon(provider: SocialProvider) {
  const icons = {
    google: <FaGoogle />,
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    microsoft: <FaMicrosoft />
  };
  return icons[provider];
}

// Helper function to get social provider names
function getSocialName(provider: SocialProvider): string {
  const names = {
    google: 'Google',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    microsoft: 'Microsoft'
  };
  return names[provider];
}

interface SocialLoginButtonsProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  mode,
  onSuccess,
  onError
}) => {
  const { socialLogin } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoadingProvider(provider);

    try {
      // Demo OAuth implementation - simulates real OAuth flow
      console.log(`Starting ${getSocialName(provider)} ${mode}...`);

      // Simulate OAuth redirect and processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock user data based on provider
      const mockUserData = {
        google: {
          email: 'user@gmail.com',
          firstName: 'Google',
          lastName: 'User',
          profilePicture: 'https://via.placeholder.com/150/4285f4/white?text=G'
        },
        linkedin: {
          email: 'professional@linkedin.com',
          firstName: 'LinkedIn',
          lastName: 'Professional',
          profilePicture: 'https://via.placeholder.com/150/0077b5/white?text=L'
        }
      };

      // Simulate successful OAuth login
      const mockToken = `${provider}_demo_token_${Date.now()}`;
      await socialLogin(provider, mockToken);

      console.log(`${getSocialName(provider)} ${mode} successful!`);
      onSuccess?.();

    } catch (error: any) {
      console.error(`${getSocialName(provider)} ${mode} failed:`, error.message);
      onError?.(error.message || `${getSocialName(provider)} ${mode} failed`);
    } finally {
      setLoadingProvider(null);
    }
  };

  // Generate OAuth URLs for real providers
  const getOAuthURL = (provider: SocialProvider, mode: 'login' | 'register'): string => {
    const baseURL = window.location.origin;
    const redirectURI = encodeURIComponent(`${baseURL}/auth/callback`);
    const state = encodeURIComponent(JSON.stringify({ provider, mode }));

    switch (provider) {
      case 'google':
        const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
        const googleScope = encodeURIComponent('openid profile email');
        return `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${googleClientId}&` +
          `redirect_uri=${redirectURI}&` +
          `response_type=code&` +
          `scope=${googleScope}&` +
          `state=${state}&` +
          `access_type=offline&` +
          `prompt=consent`;

      case 'linkedin':
        const linkedinClientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID || 'your-linkedin-client-id';
        const linkedinScope = encodeURIComponent('r_liteprofile r_emailaddress');
        return `https://www.linkedin.com/oauth/v2/authorization?` +
          `client_id=${linkedinClientId}&` +
          `redirect_uri=${redirectURI}&` +
          `response_type=code&` +
          `scope=${linkedinScope}&` +
          `state=${state}`;

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  };

  const allProviders: SocialProvider[] = ['google', 'linkedin'];

  const getProviderBadge = (provider: SocialProvider) => {
    switch (provider) {
      case 'google':
        return 'recommended';
      case 'linkedin':
        return 'professional';
      default:
        return null;
    }
  };

  const getBadgeText = (provider: SocialProvider) => {
    switch (provider) {
      case 'google':
        return 'Recommended';
      case 'linkedin':
        return 'Professional';
      default:
        return '';
    }
  };

  return (
    <SocialContainer>
      <Divider>
        Or continue with
      </Divider>

      <AllProvidersGrid>
        {allProviders.map(provider => {
          const badge = getProviderBadge(provider);
          const isHighlighted = provider === 'linkedin';
          return (
            <ButtonContainer key={provider} isHighlighted={isHighlighted}>
              <SocialButton
                provider={provider}
                onClick={() => handleSocialLogin(provider)}
                disabled={loadingProvider !== null}
              >
                <SocialIcon>
                  {loadingProvider === provider ? (
                    <LoadingSpinner />
                  ) : (
                    getSocialIcon(provider)
                  )}
                </SocialIcon>
                {loadingProvider === provider ? 'Connecting...' : getSocialName(provider)}
              </SocialButton>
              {badge && (
                <ProviderBadge type={badge as 'popular' | 'recommended' | 'professional'}>
                  {getBadgeText(provider)}
                </ProviderBadge>
              )}
            </ButtonContainer>
          );
        })}
      </AllProvidersGrid>

      <PromoSection>
        <PromoTitle>💼 Professional Advantage</PromoTitle>
        <PromoText>
          <PromoHighlight>LinkedIn</PromoHighlight> users get automatic profile import,
          work history sync, and professional network integration for faster resume building.
        </PromoText>
      </PromoSection>

      <DemoNotice>
        <DemoText>
          🎭 <strong>Demo Mode:</strong> Social login is simulated for demonstration.
          Click any button to experience the authentication flow!
        </DemoText>
      </DemoNotice>
    </SocialContainer>
  );
};

export default SocialLoginButtons;
