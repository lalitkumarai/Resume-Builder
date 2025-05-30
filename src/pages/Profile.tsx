import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe, FaCamera, FaSave, FaEdit, FaPlus, FaTimes, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  text-align: center;
  color: white;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.div<{ hasImage: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${props => !props.hasImage && `
    background: rgba(255, 255, 255, 0.2);
  `}
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageUploadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: #5a6fd8;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ImageUploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
  color: white;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;

  ${ProfileImageContainer}:hover & {
    opacity: 1;
  }
`;

const ProfileName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
`;

const ProfileTitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.active ? '#667eea' : 'transparent'};

  &:hover {
    background: ${props => props.active ? 'white' : '#f0f0f0'};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
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
`;

const Label = styled.label`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SaveButton = styled.button`
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

const DynamicSection = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
`;

const DynamicHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #218838;
  }
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

interface ProfileData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Professional Information
  currentTitle: string;
  summary: string;
  yearsOfExperience: string;

  // Social Links
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;

  // Skills
  skills: string[];

  // Experience
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;

  // Education
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState<ProfileData['experience']>([]);
  const [education, setEducation] = useState<ProfileData['education']>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      currentTitle: '',
      summary: '',
      yearsOfExperience: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolioUrl: '',
      skills: [],
      experience: [],
      education: [],
    },
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'professional', label: 'Professional', icon: <FaBriefcase /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'skills', label: 'Skills & Links', icon: <FaGlobe /> },
  ];

  const onSubmit = async (data: ProfileData) => {
    setIsLoading(true);
    try {
      // Combine form data with dynamic sections and profile image
      const profileData = {
        ...data,
        skills,
        experience,
        education,
        profileImage: profileImage,
        imageFile: imageFile,
      };

      console.log('Saving profile data:', profileData);

      // In a real application, you would:
      // 1. Upload the image file to your server/cloud storage
      // 2. Get the uploaded image URL
      // 3. Save the profile data with the image URL

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Profile saved successfully!');
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setExperience([...experience, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperience(experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setEducation(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    const input = document.getElementById('profile-image-input') as HTMLInputElement;
    input?.click();
  };

  return (
    <ProfileContainer>
      <Header>
        <Title>My Profile</Title>
        <Subtitle>Complete your profile to build better resumes</Subtitle>
      </Header>

      <ProfileCard>
        <ProfileHeader>
          <ProfileImageContainer>
            <ProfileImage hasImage={!!profileImage}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <FaUser />
              )}
              {profileImage && (
                <ImageUploadOverlay onClick={triggerImageUpload}>
                  <div>
                    <FaCamera style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} />
                    <br />
                    Change Photo
                  </div>
                </ImageUploadOverlay>
              )}
            </ProfileImage>
            <ImageUploadButton onClick={triggerImageUpload}>
              <FaCamera />
            </ImageUploadButton>
            <HiddenFileInput
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ProfileImageContainer>
          <ProfileName>{user?.firstName} {user?.lastName}</ProfileName>
          <ProfileTitle>{watch('currentTitle') || 'Professional Title'}</ProfileTitle>
        </ProfileHeader>

        <TabsContainer>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </Tab>
          ))}
        </TabsContainer>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabContent>
            {activeTab === 'personal' && (
              <Section>
                <SectionTitle>
                  <FaUser /> Personal Information
                </SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>
                      <FaUser /> First Name
                    </Label>
                    <Input
                      {...register('firstName', { required: 'First name is required' })}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.firstName.message}</span>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaUser /> Last Name
                    </Label>
                    <Input
                      {...register('lastName', { required: 'Last name is required' })}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.lastName.message}</span>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaEnvelope /> Email Address
                    </Label>
                    <Input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.email.message}</span>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaPhone /> Phone Number
                    </Label>
                    <Input
                      {...register('phone')}
                      placeholder="Enter your phone number"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaMapMarkerAlt /> Address
                    </Label>
                    <Input
                      {...register('address')}
                      placeholder="Enter your street address"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      {...register('city')}
                      placeholder="Enter your city"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>State/Province</Label>
                    <Input
                      {...register('state')}
                      placeholder="Enter your state"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>ZIP/Postal Code</Label>
                    <Input
                      {...register('zipCode')}
                      placeholder="Enter your ZIP code"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Country</Label>
                    <Select {...register('country')}>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormGroup>
                </FormGrid>
              </Section>
            )}

            {activeTab === 'professional' && (
              <Section>
                <SectionTitle>
                  <FaBriefcase /> Professional Information
                </SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>Current Job Title</Label>
                    <Input
                      {...register('currentTitle')}
                      placeholder="e.g., Software Engineer, Marketing Manager"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Years of Experience</Label>
                    <Select {...register('yearsOfExperience')}>
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years (Entry Level)</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-6">4-6 years</option>
                      <option value="7-10">7-10 years</option>
                      <option value="10+">10+ years (Senior Level)</option>
                    </Select>
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Professional Summary</Label>
                  <TextArea
                    {...register('summary')}
                    placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
                    rows={6}
                  />
                </FormGroup>
              </Section>
            )}

            {activeTab === 'experience' && (
              <Section>
                <SectionTitle>
                  <FaBriefcase /> Work Experience
                </SectionTitle>

                {experience.map((exp, index) => (
                  <DynamicSection key={exp.id}>
                    <DynamicHeader>
                      <h4>Experience #{index + 1}</h4>
                      <RemoveButton onClick={() => removeExperience(exp.id)}>
                        <FaTimes /> Remove
                      </RemoveButton>
                    </DynamicHeader>

                    <FormGrid>
                      <FormGroup>
                        <Label>Company Name</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Enter company name"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Job Title</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="Enter your job title"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                        />
                        <label style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            style={{ marginRight: '0.5rem' }}
                          />
                          I currently work here
                        </label>
                      </FormGroup>
                    </FormGrid>

                    <FormGroup>
                      <Label>Job Description</Label>
                      <TextArea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Describe your responsibilities, achievements, and key contributions..."
                        rows={4}
                      />
                    </FormGroup>
                  </DynamicSection>
                ))}

                <AddButton onClick={addExperience}>
                  <FaPlus /> Add Work Experience
                </AddButton>
              </Section>
            )}

            {activeTab === 'education' && (
              <Section>
                <SectionTitle>
                  <FaGraduationCap /> Education
                </SectionTitle>

                {education.map((edu, index) => (
                  <DynamicSection key={edu.id}>
                    <DynamicHeader>
                      <h4>Education #{index + 1}</h4>
                      <RemoveButton onClick={() => removeEducation(edu.id)}>
                        <FaTimes /> Remove
                      </RemoveButton>
                    </DynamicHeader>

                    <FormGrid>
                      <FormGroup>
                        <Label>Institution Name</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="Enter school/university name"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="e.g., Bachelor's, Master's, PhD"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Field of Study</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="e.g., Computer Science, Business"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="e.g., 3.8/4.0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        />
                      </FormGroup>
                    </FormGrid>
                  </DynamicSection>
                ))}

                <AddButton onClick={addEducation}>
                  <FaPlus /> Add Education
                </AddButton>
              </Section>
            )}

            {activeTab === 'skills' && (
              <Section>
                <SectionTitle>
                  <FaGlobe /> Skills & Social Links
                </SectionTitle>

                {/* Skills Section */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Technical Skills</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          background: '#667eea',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0',
                            fontSize: '0.8rem'
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript, Python, Marketing)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      style={{ flex: 1 }}
                    />
                    <AddButton onClick={addSkill}>
                      <FaPlus /> Add Skill
                    </AddButton>
                  </div>
                </div>

                {/* Social Links Section */}
                <FormGrid>
                  <FormGroup>
                    <Label>
                      <FaLinkedin /> LinkedIn Profile
                    </Label>
                    <Input
                      {...register('linkedinUrl')}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaGithub /> GitHub Profile
                    </Label>
                    <Input
                      {...register('githubUrl')}
                      placeholder="https://github.com/yourusername"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaGlobe /> Portfolio Website
                    </Label>
                    <Input
                      {...register('portfolioUrl')}
                      placeholder="https://yourportfolio.com"
                    />
                  </FormGroup>
                </FormGrid>
              </Section>
            )}

            <SaveButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : <><FaSave /> Save Profile</>}
            </SaveButton>
          </TabContent>
        </form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
