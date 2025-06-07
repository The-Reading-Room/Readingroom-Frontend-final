// Types
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

// API Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/users/login/',
  REGISTER: '/api/users/register/',
  LOGOUT: '/api/users/logout/',
  REFRESH: '/api/users/refresh/',
  ME: '/api/users/me/',
  GOOGLE_LOGIN: '/api/users/google/login/',
} as const;

// Helper function for Google OAuth redirect
export const getGoogleOAuthUrl = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
  return `${backendUrl}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
}; 