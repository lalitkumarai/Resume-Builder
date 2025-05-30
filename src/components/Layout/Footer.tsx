import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #3498db;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: #3498db;
        }
      }
    }
  }
  
  p {
    color: #bdc3c7;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    color: #bdc3c7;
    font-size: 1.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #3498db;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
  
  p {
    margin: 0;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Resume Builder</h3>
            <p>
              Create professional, ATS-friendly resumes in minutes. 
              Perfect for students, professionals, and career changers.
            </p>
            <SocialLinks>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:support@resumebuilder.com">
                <FaEnvelope />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Features</h3>
            <ul>
              <li><Link to="/templates">Resume Templates</Link></li>
              <li><Link to="/builder">Resume Builder</Link></li>
              <li><a href="#export">PDF Export</a></li>
              <li><a href="#ats">ATS Optimization</a></li>
              <li><a href="#tips">Resume Tips</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Resources</h3>
            <ul>
              <li><a href="#blog">Career Blog</a></li>
              <li><a href="#guides">Resume Guides</a></li>
              <li><a href="#examples">Resume Examples</a></li>
              <li><a href="#cover-letter">Cover Letter Builder</a></li>
              <li><a href="#interview">Interview Tips</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>
            © {currentYear} Resume Builder. All rights reserved. 
            Built with ❤️ for job seekers worldwide.
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
