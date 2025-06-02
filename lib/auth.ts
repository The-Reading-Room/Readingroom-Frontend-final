import api from './api';
import axios, { AxiosError } from 'axios';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    bio?: string | null;
  };
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('Login attempt with credentials:', { ...credentials, password: '[REDACTED]' });
  try {
    const res = await api.post('/api/users/login/', credentials);
    console.log('Login response data:', res.data);
    
    if (!res.data.access) {
      console.error('No access token in response:', res.data);
      throw new Error('No access token received');
    }

    // Store tokens
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    
    // Set default authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
    
    // Try to get user data
    try {
      const userResponse = await api.get('/api/users/me/');
      return {
        access: res.data.access,
        refresh: res.data.refresh,
        user: userResponse.data
      };
    } catch (userError) {
      console.error('Error fetching user data:', userError);
      return {
        access: res.data.access,
        refresh: res.data.refresh,
        user: res.data.user || null
      };
    }
  } catch (error: unknown) {
    console.error('Login error:', error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || 'Failed to login. Please check your credentials.';
      throw new Error(message);
    }
    throw error;
  }
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  console.log('Attempting to register with:', { ...credentials, password: '[REDACTED]' });
  try {
    const res = await api.post<AuthResponse>('/api/users/register/', credentials);
    console.log('Registration response:', res.data);
    
    if (res.data.access) {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
    }
    
    return res.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || 'Failed to register. Please try again.';
      throw new Error(message);
    }
    throw error;
  }
};

export const logoutUser = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) return;

  try {
    // Set authorization header for logout request
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await api.post('/api/users/logout/');
  } catch (error: unknown) {
    console.error('Logout error:', error);
    // Continue with local logout even if API call fails
  } finally {
    // Clear tokens and headers
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common["Authorization"];
  }
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  
  try {
    const res = await api.post<{ access: string }>('/api/users/refresh/', { refresh });
    const newAccessToken = res.data.access;
    localStorage.setItem('access_token', newAccessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common["Authorization"];
    throw error;
  }
};

export const redirectToGoogleOAuth = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
  window.location.href = `${backendUrl}/api/users/google/login/`;
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
}; 