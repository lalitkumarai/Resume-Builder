import React from 'react';
import styled from 'styled-components';
import { Resume } from '../../types/resume';

const PreviewContainer = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  height: 100%;
  overflow-y: auto;
`;

const PreviewCard = styled.div`
  background: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 1000px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #667eea;
`;

const Name = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const ContactInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #667eea;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
`;

const PlaceholderText = styled.div`
  color: #999;
  font-style: italic;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
`;

interface ResumePreviewProps {
  resume: Resume | null;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  if (!resume) {
    return (
      <PreviewContainer>
        <PreviewCard>
          <PlaceholderText>
            Start building your resume to see a preview here
          </PlaceholderText>
        </PreviewCard>
      </PreviewContainer>
    );
  }

  const { personalInfo, professionalSummary, workExperience, education, skills } = resume;

  return (
    <PreviewContainer>
      <PreviewCard>
        <Header>
          <Name>{personalInfo?.fullName || 'Your Name'}</Name>
          <ContactInfo>
            {personalInfo?.email && <div>{personalInfo.email}</div>}
            {personalInfo?.phone && <div>{personalInfo.phone}</div>}
            {personalInfo?.location && <div>{personalInfo.location}</div>}
            {personalInfo?.linkedIn && (
              <div>
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            )}
          </ContactInfo>
        </Header>

        {professionalSummary?.summary && (
          <Section>
            <SectionTitle>Professional Summary</SectionTitle>
            <p>{professionalSummary.summary}</p>
          </Section>
        )}

        {workExperience && workExperience.length > 0 && (
          <Section>
            <SectionTitle>Work Experience</SectionTitle>
            {workExperience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>
                  {exp.jobTitle} at {exp.companyName}
                </h3>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate} | {exp.location}
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul style={{ marginLeft: '1rem' }}>
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {education && education.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>
                  {edu.degree}
                </h3>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  {edu.institution} | {edu.graduationYear}
                </div>
                {edu.gpa && (
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {skills && skills.length > 0 && (
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: '#e9ecef',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    color: '#333',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </Section>
        )}

        {(!personalInfo?.fullName && !professionalSummary?.summary && 
          (!workExperience || workExperience.length === 0) &&
          (!education || education.length === 0) &&
          (!skills || skills.length === 0)) && (
          <PlaceholderText>
            Fill out the form sections to see your resume preview
          </PlaceholderText>
        )}
      </PreviewCard>
    </PreviewContainer>
  );
};

export default ResumePreview;
