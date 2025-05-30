import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #667eea;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  color: #666;
  line-height: 1.6;
  margin-left: 1.5rem;
`;

const Terms: React.FC = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      
      <Section>
        <Text>Last updated: {new Date().toLocaleDateString()}</Text>
      </Section>

      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Text>
          By accessing and using Resume Builder, you accept and agree to be bound by the terms 
          and provision of this agreement.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Use License</SectionTitle>
        <Text>
          Permission is granted to temporarily use Resume Builder for personal, 
          non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </Text>
        <List>
          <li>modify or copy the materials</li>
          <li>use the materials for any commercial purpose or for any public display</li>
          <li>attempt to reverse engineer any software contained on the website</li>
          <li>remove any copyright or other proprietary notations from the materials</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. User Data</SectionTitle>
        <Text>
          You retain ownership of all content you create using our service. We will not share, 
          sell, or distribute your personal information or resume data without your explicit consent.
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Service Availability</SectionTitle>
        <Text>
          We strive to maintain high availability but cannot guarantee uninterrupted service. 
          We reserve the right to modify or discontinue the service at any time.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Limitation of Liability</SectionTitle>
        <Text>
          Resume Builder shall not be liable for any damages arising from the use or inability 
          to use this service, even if we have been notified of the possibility of such damages.
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Contact Information</SectionTitle>
        <Text>
          If you have any questions about these Terms of Service, please contact us at 
          support@resumebuilder.com
        </Text>
      </Section>
    </Container>
  );
};

export default Terms;
