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

const CertificationsForm: React.FC = () => {
  return (
    <FormContainer>
      <Title>Certifications</Title>
      <p>Certifications form coming soon...</p>
    </FormContainer>
  );
};

export default CertificationsForm;
