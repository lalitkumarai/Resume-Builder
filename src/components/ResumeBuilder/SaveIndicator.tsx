import React from 'react';
import styled from 'styled-components';
import { FaSpinner, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const IndicatorContainer = styled.div<{ status: 'saving' | 'saved' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => 
    props.status === 'saving' ? '#ffc107' :
    props.status === 'saved' ? '#28a745' :
    '#dc3545'
  };
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

interface SaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: string | null;
  error?: string | null;
}

const SaveIndicator: React.FC<SaveIndicatorProps> = ({ 
  isSaving, 
  lastSaved, 
  error 
}) => {
  if (error) {
    return (
      <IndicatorContainer status="error">
        <FaExclamationTriangle />
        Save failed
      </IndicatorContainer>
    );
  }

  if (isSaving) {
    return (
      <IndicatorContainer status="saving">
        <SpinnerIcon />
        Saving...
      </IndicatorContainer>
    );
  }

  if (lastSaved) {
    const savedTime = new Date(lastSaved);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - savedTime.getTime()) / 1000);
    
    let timeText = 'just now';
    if (diffInSeconds > 60) {
      const minutes = Math.floor(diffInSeconds / 60);
      timeText = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds > 5) {
      timeText = `${diffInSeconds} seconds ago`;
    }

    return (
      <IndicatorContainer status="saved">
        <FaCheck />
        Saved {timeText}
      </IndicatorContainer>
    );
  }

  return null;
};

export default SaveIndicator;
