import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaSearch, FaRobot, FaChartLine, FaBullseye, FaLightbulb } from 'react-icons/fa';

import { ATSOptimizer, ATSScore, ATSSuggestion, JobDescription } from '../../services/atsOptimization';
import { useResume } from '../../context/ResumeContext';

const OptimizerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ScoreCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ScoreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const OverallScore = styled.div<{ score: number }>`
  text-align: center;
`;

const ScoreCircle = styled.div<{ score: number }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    ${props => props.score >= 80 ? '#28a745' : props.score >= 60 ? '#ffc107' : '#dc3545'} ${props => props.score * 3.6}deg,
    #e9ecef 0deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  position: relative;

  &::before {
    content: '';
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
    position: absolute;
  }
`;

const ScoreNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  z-index: 1;
`;

const ScoreLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const BreakdownItem = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  background: #f8f9fa;
`;

const BreakdownScore = styled.div<{ score: number }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.score >= 80 ? '#28a745' : props.score >= 60 ? '#ffc107' : '#dc3545'};
  margin-bottom: 0.5rem;
`;

const BreakdownLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const SuggestionsSection = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuggestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SuggestionItem = styled.div<{ type: 'critical' | 'warning' | 'improvement' }>`
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid ${props => 
    props.type === 'critical' ? '#dc3545' :
    props.type === 'warning' ? '#ffc107' :
    '#17a2b8'
  };
  background: ${props => 
    props.type === 'critical' ? '#fff5f5' :
    props.type === 'warning' ? '#fffbf0' :
    '#f0f9ff'
  };
`;

const SuggestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SuggestionIcon = styled.div<{ type: 'critical' | 'warning' | 'improvement' }>`
  color: ${props => 
    props.type === 'critical' ? '#dc3545' :
    props.type === 'warning' ? '#ffc107' :
    '#17a2b8'
  };
`;

const SuggestionTitle = styled.h4`
  margin: 0;
  color: #333;
`;

const SuggestionDescription = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.5;
`;

const JobAnalysisSection = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const JobInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const AnalyzeButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const KeywordAnalysis = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KeywordList = styled.div`
  h4 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const KeywordTag = styled.span<{ found?: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.25rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background: ${props => props.found ? '#d4edda' : '#f8d7da'};
  color: ${props => props.found ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.found ? '#c3e6cb' : '#f5c6cb'};
`;

const ATSOptimizerComponent: React.FC = () => {
  const { currentResume } = useResume();
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (currentResume) {
      analyzeResume();
    }
  }, [currentResume]);

  const analyzeResume = async (jobDesc?: string) => {
    if (!currentResume) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    let jobData: JobDescription | undefined;
    if (jobDesc) {
      jobData = {
        title: 'Target Position',
        company: 'Target Company',
        description: jobDesc,
        requirements: [],
        keywords: extractKeywordsFromText(jobDesc)
      };
    }

    const score = ATSOptimizer.analyzeResume(currentResume, jobData);
    setAtsScore(score);
    setIsAnalyzing(false);
  };

  const extractKeywordsFromText = (text: string): string[] => {
    // Simple keyword extraction - in a real app, you'd use NLP
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const uniqueWords = [...new Set(words)];
    return uniqueWords.slice(0, 20); // Top 20 keywords
  };

  const handleJobAnalysis = () => {
    if (jobDescription.trim()) {
      analyzeResume(jobDescription);
    }
  };

  const getSuggestionIcon = (type: ATSSuggestion['type']) => {
    switch (type) {
      case 'critical':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaInfoCircle />;
      case 'improvement':
        return <FaLightbulb />;
      default:
        return <FaInfoCircle />;
    }
  };

  if (!currentResume) {
    return (
      <OptimizerContainer>
        <Header>
          <Title>
            <FaRobot /> ATS Optimizer
          </Title>
          <Subtitle>
            Please create or select a resume to analyze for ATS optimization.
          </Subtitle>
        </Header>
      </OptimizerContainer>
    );
  }

  return (
    <OptimizerContainer>
      <Header>
        <Title>
          <FaRobot /> ATS Optimizer
        </Title>
        <Subtitle>
          Optimize your resume for Applicant Tracking Systems and increase your chances of getting noticed by recruiters.
        </Subtitle>
      </Header>

      {/* Job Description Analysis */}
      <JobAnalysisSection>
        <SectionTitle>
          <FaBullseye /> Job-Specific Analysis
        </SectionTitle>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Paste a job description to get targeted optimization suggestions:
        </p>
        <JobInput
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to get specific keyword recommendations and optimization tips..."
        />
        <AnalyzeButton 
          onClick={handleJobAnalysis}
          disabled={isAnalyzing || !jobDescription.trim()}
        >
          <FaSearch /> {isAnalyzing ? 'Analyzing...' : 'Analyze Against Job'}
        </AnalyzeButton>
      </JobAnalysisSection>

      {/* ATS Score */}
      {atsScore && (
        <ScoreCard>
          <ScoreHeader>
            <div>
              <h2 style={{ margin: 0, color: '#333' }}>ATS Compatibility Score</h2>
              <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
                How well your resume performs with Applicant Tracking Systems
              </p>
            </div>
            <OverallScore score={atsScore.overall}>
              <ScoreCircle score={atsScore.overall}>
                <ScoreNumber>{atsScore.overall}</ScoreNumber>
              </ScoreCircle>
              <ScoreLabel>
                {atsScore.overall >= 80 ? 'Excellent' : 
                 atsScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
              </ScoreLabel>
            </OverallScore>
          </ScoreHeader>

          <BreakdownGrid>
            <BreakdownItem>
              <BreakdownScore score={atsScore.breakdown.keywords}>
                {atsScore.breakdown.keywords}%
              </BreakdownScore>
              <BreakdownLabel>Keywords</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownScore score={atsScore.breakdown.formatting}>
                {atsScore.breakdown.formatting}%
              </BreakdownScore>
              <BreakdownLabel>Formatting</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownScore score={atsScore.breakdown.structure}>
                {atsScore.breakdown.structure}%
              </BreakdownScore>
              <BreakdownLabel>Structure</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownScore score={atsScore.breakdown.content}>
                {atsScore.breakdown.content}%
              </BreakdownScore>
              <BreakdownLabel>Content</BreakdownLabel>
            </BreakdownItem>
          </BreakdownGrid>
        </ScoreCard>
      )}

      {/* Keyword Analysis */}
      {atsScore?.keywordAnalysis && (atsScore.keywordAnalysis.found.length > 0 || atsScore.keywordAnalysis.missing.length > 0) && (
        <SuggestionsSection>
          <SectionTitle>
            <FaChartLine /> Keyword Analysis
          </SectionTitle>
          <KeywordAnalysis>
            <KeywordGrid>
              <KeywordList>
                <h4 style={{ color: '#28a745' }}>✓ Found Keywords</h4>
                {atsScore.keywordAnalysis.found.map((keyword, index) => (
                  <KeywordTag key={index} found>
                    {keyword}
                  </KeywordTag>
                ))}
              </KeywordList>
              <KeywordList>
                <h4 style={{ color: '#dc3545' }}>✗ Missing Keywords</h4>
                {atsScore.keywordAnalysis.missing.map((keyword, index) => (
                  <KeywordTag key={index}>
                    {keyword}
                  </KeywordTag>
                ))}
              </KeywordList>
            </KeywordGrid>
          </KeywordAnalysis>
        </SuggestionsSection>
      )}

      {/* Suggestions */}
      {atsScore && atsScore.suggestions.length > 0 && (
        <SuggestionsSection>
          <SectionTitle>
            <FaLightbulb /> Optimization Suggestions
          </SectionTitle>
          <SuggestionsList>
            {atsScore.suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} type={suggestion.type}>
                <SuggestionHeader>
                  <SuggestionIcon type={suggestion.type}>
                    {getSuggestionIcon(suggestion.type)}
                  </SuggestionIcon>
                  <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                </SuggestionHeader>
                <SuggestionDescription>
                  {suggestion.description}
                  {suggestion.fix && (
                    <><br /><strong>Fix:</strong> {suggestion.fix}</>
                  )}
                </SuggestionDescription>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        </SuggestionsSection>
      )}
    </OptimizerContainer>
  );
};

export default ATSOptimizerComponent;
