import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaUserTie } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import SocialLoginButtons from '../../components/Auth/SocialLoginButtons';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

const StrengthBar = styled.div<{ strength: number }>`
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  margin-top: 0.25rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.strength}%;
    background: ${props =>
      props.strength < 30 ? '#dc3545' :
      props.strength < 60 ? '#ffc107' :
      props.strength < 80 ? '#fd7e14' : '#28a745'
    };
    transition: all 0.3s ease;
  }
`;

const StrengthText = styled.span<{ strength: number }>`
  color: ${props =>
    props.strength < 30 ? '#dc3545' :
    props.strength < 60 ? '#ffc107' :
    props.strength < 80 ? '#fd7e14' : '#28a745'
  };
  font-weight: 500;
`;

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  // Calculate password strength
  React.useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Registration failed',
      });
      console.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSuccess = () => {
    navigate('/dashboard');
  };

  const handleSocialError = (error: string) => {
    setError('root', {
      type: 'manual',
      message: error,
    });
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Create Account</Title>
        <Subtitle>Join thousands of professionals building amazing resumes</Subtitle>

        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputRow>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                placeholder="First name"
                className={errors.firstName ? 'error' : ''}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaUserTie />
              </InputIcon>
              <Input
                type="text"
                placeholder="Last name"
                className={errors.lastName ? 'error' : ''}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
            </InputGroup>
          </InputRow>

          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email address"
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
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={errors.password ? 'error' : ''}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain uppercase, lowercase, and number',
                },
              })}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

            {password && (
              <PasswordStrength>
                <StrengthBar strength={passwordStrength} />
                <StrengthText strength={passwordStrength}>
                  Password strength: {getPasswordStrengthText()}
                </StrengthText>
              </PasswordStrength>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className={errors.confirmPassword ? 'error' : ''}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
          </InputGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="agreeToTerms"
              {...register('agreeToTerms', {
                required: 'You must agree to the terms and conditions',
              })}
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </CheckboxLabel>
          </CheckboxGroup>
          {errors.agreeToTerms && <ErrorMessage>{errors.agreeToTerms.message}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>

        <SocialLoginButtons
          mode="register"
          onSuccess={handleSocialSuccess}
          onError={handleSocialError}
        />

        <LoginLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
