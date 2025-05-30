import { SocialProvider } from '../context/AuthContext';

export interface SocialProviderConfig {
  id: SocialProvider;
  name: string;
  displayName: string;
  color: string;
  hoverColor: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
  lightHoverColor: string;
  icon: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export const socialProviders: SocialProviderConfig[] = [
  {
    id: 'google',
    name: 'Google',
    displayName: 'Google',
    color: '#4285f4',
    hoverColor: '#3367d6',
    borderColor: '#4285f4',
    textColor: 'white',
    shadowColor: 'rgba(66, 133, 244, 0.3)',
    lightHoverColor: '#f8f9ff',
    icon: 'FaGoogle',
    description: 'Sign in with your Google account',
    features: ['Fast & Secure', 'Auto-fill Profile', 'Gmail Integration'],
    isPopular: true,
    isRecommended: true
  },
  {
    id: 'github',
    name: 'GitHub',
    displayName: 'GitHub',
    color: '#333333',
    hoverColor: '#24292e',
    borderColor: '#333333',
    textColor: 'white',
    shadowColor: 'rgba(51, 51, 51, 0.3)',
    lightHoverColor: '#f6f8fa',
    icon: 'FaGithub',
    description: 'Connect with your GitHub profile',
    features: ['Developer Profile', 'Project Import', 'Tech Skills'],
    isPopular: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    displayName: 'LinkedIn',
    color: '#0077b5',
    hoverColor: '#005885',
    borderColor: '#0077b5',
    textColor: 'white',
    shadowColor: 'rgba(0, 119, 181, 0.3)',
    lightHoverColor: '#f0f8ff',
    icon: 'FaLinkedin',
    description: 'Import your professional profile',
    features: ['Professional Data', 'Work History', 'Network Import']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    displayName: 'Microsoft',
    color: '#00a1f1',
    hoverColor: '#0078d4',
    borderColor: '#00a1f1',
    textColor: 'white',
    shadowColor: 'rgba(0, 161, 241, 0.3)',
    lightHoverColor: '#f0f8ff',
    icon: 'FaMicrosoft',
    description: 'Use your Microsoft account',
    features: ['Office Integration', 'OneDrive Sync', 'Enterprise Ready']
  }
];

export const getSocialProvider = (id: SocialProvider): SocialProviderConfig | undefined => {
  return socialProviders.find(provider => provider.id === id);
};

export const getPopularProviders = (): SocialProviderConfig[] => {
  return socialProviders.filter(provider => provider.isPopular);
};

export const getRecommendedProviders = (): SocialProviderConfig[] => {
  return socialProviders.filter(provider => provider.isRecommended);
};

// OAuth URLs for real implementation
export const getOAuthURL = (provider: SocialProvider, mode: 'login' | 'register'): string => {
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const redirectURI = encodeURIComponent(`${window.location.origin}/auth/callback`);
  
  const oauthURLs = {
    google: `${baseURL}/auth/google?redirect_uri=${redirectURI}&mode=${mode}`,
    github: `${baseURL}/auth/github?redirect_uri=${redirectURI}&mode=${mode}`,
    linkedin: `${baseURL}/auth/linkedin?redirect_uri=${redirectURI}&mode=${mode}`,
    microsoft: `${baseURL}/auth/microsoft?redirect_uri=${redirectURI}&mode=${mode}`
  };

  return oauthURLs[provider];
};

// Social login benefits for marketing
export const socialLoginBenefits = {
  speed: {
    title: 'Lightning Fast',
    description: 'Sign up in seconds with your existing account',
    icon: '⚡'
  },
  security: {
    title: 'Bank-Level Security',
    description: 'OAuth 2.0 secure authentication',
    icon: '🔒'
  },
  convenience: {
    title: 'Auto-Fill Profile',
    description: 'Import your professional information automatically',
    icon: '✨'
  },
  sync: {
    title: 'Stay Synced',
    description: 'Keep your resume updated with your latest info',
    icon: '🔄'
  }
};

export default socialProviders;
