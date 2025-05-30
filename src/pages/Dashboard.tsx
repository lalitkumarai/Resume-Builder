import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaDownload,
  FaEye,
  FaCopy,
  FaCalendar,
  FaFileAlt
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Resume } from '../types/resume';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin: 0;
`;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-weight: 500;
`;

const ResumesSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }
`;

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

const ResumeCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ResumePreview = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 3rem;
`;

const ResumeInfo = styled.div`
  padding: 1rem;
`;

const ResumeTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
`;

const ResumeDate = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResumeActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: white;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }

  &.primary {
    background: #667eea;
    color: white;
    border-color: #667eea;

    &:hover {
      background: #5a6fd8;
    }
  }

  &.danger {
    color: #dc3545;
    border-color: #dc3545;

    &:hover {
      background: #dc3545;
      color: white;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    resumes,
    isLoading,
    createResume,
    deleteResume,
    duplicateResume,
    exportResume
  } = useResume();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalResumes: 0,
    totalViews: 0,
    totalDownloads: 0,
    completedResumes: 0,
  });

  useEffect(() => {
    // Calculate stats from resumes
    const totalResumes = resumes.length;
    const totalViews = resumes.reduce((sum, resume) => sum + (resume.analytics?.views || 0), 0);
    const totalDownloads = resumes.reduce((sum, resume) => sum + (resume.analytics?.downloads || 0), 0);
    const completedResumes = resumes.filter(resume =>
      (resume.metadata?.completionPercentage || 0) >= 80
    ).length;

    setStats({
      totalResumes,
      totalViews,
      totalDownloads,
      completedResumes,
    });
  }, [resumes]);

  const handleCreateResume = async () => {
    try {
      const title = `Resume ${new Date().toLocaleDateString()}`;
      await createResume(title);
      navigate('/builder');
    } catch (error: any) {
      console.error(error.message || 'Failed to create resume');
    }
  };

  const handleEditResume = (resumeId: string) => {
    navigate(`/builder/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteResume(resumeId);
        console.log('Resume deleted successfully');
      } catch (error: any) {
        console.error(error.message || 'Failed to delete resume');
      }
    }
  };

  const handleDuplicateResume = async (resumeId: string) => {
    try {
      await duplicateResume(resumeId);
      console.log('Resume duplicated successfully');
    } catch (error: any) {
      console.error(error.message || 'Failed to duplicate resume');
    }
  };

  const handleExportResume = async (resumeId: string, format: 'pdf' | 'docx' | 'json') => {
    try {
      await exportResume(format);
      console.log(`Resume exported as ${format.toUpperCase()}`);
    } catch (error: any) {
      console.error(error.message || 'Failed to export resume');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading your dashboard...
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <div>
          <Title>Welcome back, {user?.firstName}!</Title>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
            Manage your resumes and track your progress
          </p>
        </div>
        <CreateButton onClick={handleCreateResume}>
          <FaPlus /> Create New Resume
        </CreateButton>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalResumes}</StatNumber>
          <StatLabel>Total Resumes</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{stats.completedResumes}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{stats.totalViews}</StatNumber>
          <StatLabel>Total Views</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{stats.totalDownloads}</StatNumber>
          <StatLabel>Downloads</StatLabel>
        </StatCard>
      </StatsGrid>

      <ResumesSection>
        <SectionHeader>
          <h2>Your Resumes</h2>
        </SectionHeader>

        {resumes.length === 0 ? (
          <EmptyState>
            <div className="icon">
              <FaFileAlt />
            </div>
            <h3>No resumes yet</h3>
            <p>Create your first professional resume to get started</p>
            <CreateButton onClick={handleCreateResume}>
              <FaPlus /> Create Your First Resume
            </CreateButton>
          </EmptyState>
        ) : (
          <ResumeGrid>
            {resumes.map((resume, index) => (
              <ResumeCard key={resume.id}>
                <ResumePreview>
                  <FaFileAlt />
                </ResumePreview>

                <ResumeInfo>
                  <ResumeTitle>{resume.title}</ResumeTitle>
                  <ResumeDate>
                    <FaCalendar />
                    Updated {formatDate(resume.updatedAt)}
                  </ResumeDate>

                  <ResumeActions>
                    <ActionButton
                      className="primary"
                      onClick={() => handleEditResume(resume.id)}
                    >
                      <FaEdit /> Edit
                    </ActionButton>

                    <ActionButton onClick={() => handleExportResume(resume.id, 'pdf')}>
                      <FaDownload /> PDF
                    </ActionButton>

                    <ActionButton onClick={() => handleDuplicateResume(resume.id)}>
                      <FaCopy /> Duplicate
                    </ActionButton>

                    <ActionButton
                      className="danger"
                      onClick={() => handleDeleteResume(resume.id, resume.title)}
                    >
                      <FaTrash /> Delete
                    </ActionButton>
                  </ResumeActions>
                </ResumeInfo>
              </ResumeCard>
            ))}
          </ResumeGrid>
        )}
      </ResumesSection>
    </DashboardContainer>
  );
};

export default Dashboard;
