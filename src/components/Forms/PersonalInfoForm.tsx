import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
// import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

import { useResume } from '../../context/ResumeContext';
import { PersonalInfo } from '../../types/resume';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const FormDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: #667eea;
    font-size: 0.9rem;
  }

  .required {
    color: #dc3545;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #dc3545;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
`;

const HelpText = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const SaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #28a745;
  font-size: 0.875rem;
  margin-top: 1rem;

  &.saving {
    color: #ffc107;
  }
`;

const PersonalInfoForm: React.FC = () => {
  const { currentResume, updateCurrentResume, markStepCompleted, isSaving } = useResume();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<PersonalInfo>({
    defaultValues: currentResume?.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: '',
      profileImage: '',
    },
  });

  const watchedValues = watch();

  // Auto-save when form values change
  React.useEffect(() => {
    if (isDirty && currentResume) {
      const timeoutId = setTimeout(() => {
        updateCurrentResume({
          personalInfo: watchedValues,
        });
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, isDirty, currentResume, updateCurrentResume]);

  const onSubmit = (data: PersonalInfo) => {
    if (currentResume) {
      updateCurrentResume({
        personalInfo: data,
      });
      markStepCompleted('personal-info');
    }
  };

  // Check if required fields are filled
  const isFormValid = watchedValues.fullName && watchedValues.email && watchedValues.phone && watchedValues.location;

  React.useEffect(() => {
    if (isFormValid) {
      markStepCompleted('personal-info');
    }
  }, [isFormValid, markStepCompleted]);

  return (
    <FormContainer>
      <FormTitle>Personal Information</FormTitle>
      <FormDescription>
        Let's start with your basic contact information. This will appear at the top of your resume
        and help employers reach out to you.
      </FormDescription>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <FormGroup>
            <Label>
              <FaUser className="icon" />
              Full Name <span className="required">*</span>
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              className={errors.fullName ? 'error' : ''}
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaEnvelope className="icon" />
              Email Address <span className="required">*</span>
            </Label>
            <Input
              type="email"
              placeholder="john.doe@email.com"
              className={errors.email ? 'error' : ''}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaPhone className="icon" />
              Phone Number <span className="required">*</span>
            </Label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? 'error' : ''}
              {...register('phone', {
                required: 'Phone number is required',
                minLength: {
                  value: 10,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaMapMarkerAlt className="icon" />
              Location <span className="required">*</span>
            </Label>
            <Input
              type="text"
              placeholder="New York, NY"
              className={errors.location ? 'error' : ''}
              {...register('location', {
                required: 'Location is required',
              })}
            />
            {errors.location && <ErrorMessage>{errors.location.message}</ErrorMessage>}
            <HelpText>City, State or City, Country</HelpText>
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLinkedin className="icon" />
              LinkedIn Profile
            </Label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              {...register('linkedIn', {
                pattern: {
                  value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                  message: 'Please enter a valid LinkedIn URL',
                },
              })}
            />
            {errors.linkedIn && <ErrorMessage>{errors.linkedIn.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaGithub className="icon" />
              GitHub Profile
            </Label>
            <Input
              type="url"
              placeholder="https://github.com/johndoe"
              {...register('github', {
                pattern: {
                  value: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
                  message: 'Please enter a valid GitHub URL',
                },
              })}
            />
            {errors.github && <ErrorMessage>{errors.github.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>
              <FaGlobe className="icon" />
              Portfolio Website
            </Label>
            <Input
              type="url"
              placeholder="https://johndoe.com"
              {...register('portfolio', {
                pattern: {
                  value: /^https?:\/\/.+\..+/,
                  message: 'Please enter a valid URL',
                },
              })}
            />
            {errors.portfolio && <ErrorMessage>{errors.portfolio.message}</ErrorMessage>}
            <HelpText>Your personal website or online portfolio</HelpText>
          </FormGroup>
        </FormGrid>

        {(isDirty || isSaving) && (
          <SaveIndicator className={isSaving ? 'saving' : ''}>
            {isSaving ? '💾 Saving...' : '✅ Changes saved automatically'}
          </SaveIndicator>
        )}
      </form>
    </FormContainer>
  );
};

export default PersonalInfoForm;
