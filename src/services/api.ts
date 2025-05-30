import axios, { AxiosResponse } from 'axios';
import { Resume, User, ApiResponse, PaginatedResponse } from '../types/resume';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  verifyToken: async (token: string): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },
};

// Resume API
export const resumeAPI = {
  getUserResumes: async (): Promise<ApiResponse<Resume[]>> => {
    try {
      const response = await api.get('/resumes');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch resumes');
    }
  },

  getResume: async (resumeId: string): Promise<ApiResponse<Resume>> => {
    try {
      const response = await api.get(`/resumes/${resumeId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch resume');
    }
  },

  createResume: async (resumeData: { title: string }): Promise<ApiResponse<Resume>> => {
    try {
      const response = await api.post('/resumes', resumeData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create resume');
    }
  },

  updateResume: async (resumeId: string, resumeData: Partial<Resume>): Promise<ApiResponse<Resume>> => {
    try {
      const response = await api.put(`/resumes/${resumeId}`, resumeData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update resume');
    }
  },

  deleteResume: async (resumeId: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/resumes/${resumeId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete resume');
    }
  },

  duplicateResume: async (resumeId: string): Promise<ApiResponse<Resume>> => {
    try {
      const response = await api.post(`/resumes/${resumeId}/duplicate`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to duplicate resume');
    }
  },

  exportResume: async (resumeId: string, format: 'pdf' | 'docx' | 'json'): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(`/resumes/${resumeId}/export/${format}`, {
        responseType: format === 'json' ? 'json' : 'blob',
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to export resume');
    }
  },

  shareResume: async (resumeId: string, isPublic: boolean): Promise<ApiResponse<{ shareUrl: string }>> => {
    try {
      const response = await api.put(`/resumes/${resumeId}/share`, { isPublic });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to share resume');
    }
  },
};

// Templates API
export const templatesAPI = {
  getTemplates: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await api.get('/templates');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch templates');
    }
  },

  getTemplate: async (templateId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(`/templates/${templateId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch template');
    }
  },
};

export default api;
