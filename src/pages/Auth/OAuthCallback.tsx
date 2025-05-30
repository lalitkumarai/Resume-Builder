import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

const CallbackContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const CallbackCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const StatusIcon = styled.div<{ status: 'loading' | 'success' | 'error' }>`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: ${props => 
    props.status === 'loading' ? '#667eea' :
    props.status === 'success' ? '#28a745' :
    '#dc3545'
  };

  svg {
    ${props => props.status === 'loading' && `
      animation: spin 1s linear infinite;
    `}
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing your login...');
  const navigate = useNavigate();
  const { socialLogin } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get parameters from URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Handle OAuth errors
        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        // Parse state to get provider and mode
        const stateData = JSON.parse(decodeURIComponent(state));
        const { provider, mode } = stateData;

        setMessage(`Completing ${provider} ${mode}...`);

        // In a real implementation, you would:
        // 1. Send the authorization code to your backend
        // 2. Backend exchanges code for access token with OAuth provider
        // 3. Backend gets user info from OAuth provider
        // 4. Backend creates/updates user in your database
        // 5. Backend returns JWT token for your app

        // For demo purposes, simulate the backend processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate successful OAuth login
        const mockToken = `${provider}_oauth_${Date.now()}`;
        await socialLogin(provider, mockToken);

        setStatus('success');
        setMessage(`Successfully logged in with ${provider}!`);

        // Redirect to dashboard after success
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (error: any) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(error.message || 'Authentication failed. Please try again.');
      }
    };

    handleCallback();
  }, [searchParams, socialLogin, navigate]);

  const handleRetry = () => {
    navigate('/login');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <FaSpinner />;
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      default:
        return <FaSpinner />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Authenticating...';
      case 'success':
        return 'Login Successful!';
      case 'error':
        return 'Authentication Failed';
      default:
        return 'Processing...';
    }
  };

  return (
    <CallbackContainer>
      <CallbackCard>
        <StatusIcon status={status}>
          {getStatusIcon()}
        </StatusIcon>
        
        <Title>{getTitle()}</Title>
        <Message>{message}</Message>

        {status === 'error' && (
          <RetryButton onClick={handleRetry}>
            Try Again
          </RetryButton>
        )}

        {status === 'success' && (
          <Message style={{ color: '#28a745', fontWeight: 600 }}>
            Redirecting to dashboard...
          </Message>
        )}
      </CallbackCard>
    </CallbackContainer>
  );
};

export default OAuthCallback;
