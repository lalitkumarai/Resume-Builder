import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const ProfessionalSummaryForm: React.FC = () => {
  return (
    <FormContainer>
      <Title>Professional Summary</Title>
      <p>Professional summary form coming soon...</p>
    </FormContainer>
  );
};

export default ProfessionalSummaryForm;
