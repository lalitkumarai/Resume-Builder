import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Resume, FormStep } from '../types/resume';
import { resumeAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Types
interface ResumeState {
  currentResume: Resume | null;
  resumes: Resume[];
  currentStep: number;
  formSteps: FormStep[];
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: string | null;
}

interface ResumeContextType extends ResumeState {
  createResume: (title: string) => Promise<void>;
  loadResume: (resumeId: string) => Promise<void>;
  saveResume: (resume: Partial<Resume>) => Promise<void>;
  deleteResume: (resumeId: string) => Promise<void>;
  updateCurrentResume: (updates: Partial<Resume>) => void;
  setCurrentStep: (step: number) => void;
  markStepCompleted: (stepId: string) => void;
  duplicateResume: (resumeId: string) => Promise<void>;
  exportResume: (format: 'pdf' | 'docx' | 'json') => Promise<void>;
  resetResume: () => void;
}

// Action types
type ResumeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_CURRENT_RESUME'; payload: Resume | null }
  | { type: 'SET_RESUMES'; payload: Resume[] }
  | { type: 'ADD_RESUME'; payload: Resume }
  | { type: 'UPDATE_RESUME'; payload: Resume }
  | { type: 'DELETE_RESUME'; payload: string }
  | { type: 'UPDATE_CURRENT_RESUME'; payload: Partial<Resume> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'MARK_STEP_COMPLETED'; payload: string }
  | { type: 'SET_LAST_SAVED'; payload: string }
  | { type: 'RESET_RESUME' };

// Form steps configuration
const defaultFormSteps: FormStep[] = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Add your contact details and basic information',
    component: 'PersonalInfoForm',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: 'professional-summary',
    title: 'Professional Summary',
    description: 'Write a compelling summary of your experience',
    component: 'ProfessionalSummaryForm',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: 'work-experience',
    title: 'Work Experience',
    description: 'Add your work history and achievements',
    component: 'WorkExperienceForm',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Add your educational background',
    component: 'EducationForm',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'List your technical and soft skills',
    component: 'SkillsForm',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Showcase your key projects',
    component: 'ProjectsForm',
    isCompleted: false,
    isRequired: false,
  },
  {
    id: 'certifications',
    title: 'Certifications',
    description: 'Add your professional certifications',
    component: 'CertificationsForm',
    isCompleted: false,
    isRequired: false,
  },
  {
    id: 'additional',
    title: 'Additional Information',
    description: 'Languages, awards, and volunteer experience',
    component: 'AdditionalInfoForm',
    isCompleted: false,
    isRequired: false,
  },
];

// Initial state
const initialState: ResumeState = {
  currentResume: null,
  resumes: [],
  currentStep: 0,
  formSteps: defaultFormSteps,
  isLoading: false,
  isSaving: false,
  lastSaved: null,
};

// Reducer
const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SAVING':
      return { ...state, isSaving: action.payload };
    case 'SET_CURRENT_RESUME':
      return { ...state, currentResume: action.payload };
    case 'SET_RESUMES':
      return { ...state, resumes: action.payload };
    case 'ADD_RESUME':
      return { ...state, resumes: [...state.resumes, action.payload] };
    case 'UPDATE_RESUME':
      return {
        ...state,
        resumes: state.resumes.map(resume =>
          resume.id === action.payload.id ? action.payload : resume
        ),
        currentResume: state.currentResume?.id === action.payload.id ? action.payload : state.currentResume,
      };
    case 'DELETE_RESUME':
      return {
        ...state,
        resumes: state.resumes.filter(resume => resume.id !== action.payload),
        currentResume: state.currentResume?.id === action.payload ? null : state.currentResume,
      };
    case 'UPDATE_CURRENT_RESUME':
      return {
        ...state,
        currentResume: state.currentResume ? { ...state.currentResume, ...action.payload } : null,
      };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'MARK_STEP_COMPLETED':
      return {
        ...state,
        formSteps: state.formSteps.map(step =>
          step.id === action.payload ? { ...step, isCompleted: true } : step
        ),
      };
    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.payload };
    case 'RESET_RESUME':
      return {
        ...initialState,
        resumes: state.resumes,
      };
    default:
      return state;
  }
};

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Load user's resumes when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserResumes();
    }
  }, [isAuthenticated, user]);

  // Auto-save functionality
  useEffect(() => {
    if (state.currentResume && !state.isSaving) {
      const autoSaveTimer = setTimeout(() => {
        saveResume(state.currentResume);
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [state.currentResume]);

  const loadUserResumes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await resumeAPI.getUserResumes();
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_RESUMES', payload: response.data });
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createResume = async (title: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await resumeAPI.createResume({ title });
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_RESUME', payload: response.data });
        dispatch({ type: 'SET_CURRENT_RESUME', payload: response.data });
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadResume = async (resumeId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await resumeAPI.getResume(resumeId);
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CURRENT_RESUME', payload: response.data });
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveResume = async (resume: Partial<Resume>) => {
    try {
      dispatch({ type: 'SET_SAVING', payload: true });
      const response = await resumeAPI.updateResume(resume.id!, resume);
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_RESUME', payload: response.data });
        dispatch({ type: 'SET_LAST_SAVED', payload: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  };

  const deleteResume = async (resumeId: string) => {
    try {
      const response = await resumeAPI.deleteResume(resumeId);
      
      if (response.success) {
        dispatch({ type: 'DELETE_RESUME', payload: resumeId });
      }
    } catch (error) {
      throw error;
    }
  };

  const updateCurrentResume = (updates: Partial<Resume>) => {
    dispatch({ type: 'UPDATE_CURRENT_RESUME', payload: updates });
  };

  const setCurrentStep = (step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const markStepCompleted = (stepId: string) => {
    dispatch({ type: 'MARK_STEP_COMPLETED', payload: stepId });
  };

  const duplicateResume = async (resumeId: string) => {
    try {
      const response = await resumeAPI.duplicateResume(resumeId);
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_RESUME', payload: response.data });
      }
    } catch (error) {
      throw error;
    }
  };

  const exportResume = async (format: 'pdf' | 'docx' | 'json') => {
    try {
      if (!state.currentResume) throw new Error('No resume selected');
      
      const response = await resumeAPI.exportResume(state.currentResume.id, format);
      
      if (response.success) {
        // Handle file download
        const blob = new Blob([response.data], { 
          type: format === 'pdf' ? 'application/pdf' : 
                format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                'application/json'
        });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${state.currentResume.title}.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      throw error;
    }
  };

  const resetResume = () => {
    dispatch({ type: 'RESET_RESUME' });
  };

  const value: ResumeContextType = {
    ...state,
    createResume,
    loadResume,
    saveResume,
    deleteResume,
    updateCurrentResume,
    setCurrentStep,
    markStepCompleted,
    duplicateResume,
    exportResume,
    resetResume,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use resume context
export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
