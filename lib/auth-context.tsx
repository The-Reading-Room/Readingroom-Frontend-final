"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";
import api from "./api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  loginUser as apiLogin,
  registerUser as apiRegister,
  logoutUser as apiLogout,
  refreshToken,
  isAuthenticated,
  redirectToGoogleOAuth,
} from "./auth";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Extend the axios request config type to include our custom _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface AuthContextType {
  user: AuthResponse["user"] | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Add debug logging for user state changes
  useEffect(() => {
    console.log("Auth Context - User state updated:", user);
  }, [user]);

  // Check authentication status and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Auth Context - Checking authentication status...");
      try {
        const token = localStorage.getItem("access_token");
        console.log("Auth Context - Token exists:", !!token);

        if (!token) {
          console.log("Auth Context - No token found");
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Set default authorization header
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          // Fetch user data from the backend
          const response = await api.get("/api/users/me/");
          console.log("Auth Context - User data fetched:", response.data);

          if (response.data) {
            setUser(response.data);
          } else {
            console.log("Auth Context - No user data in response");
            setUser(null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        } catch (error) {
          console.error("Auth Context - Auth check failed:", error);
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log(
                "Auth Context - 401 received, attempting token refresh"
              );
              try {
                const newToken = await refreshToken();
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${newToken}`;
                const retryResponse = await api.get("/api/users/me/");
                setUser(retryResponse.data);
              } catch (refreshError) {
                console.log("Auth Context - Token refresh failed");
                setUser(null);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
              }
            } else {
              console.log("Auth Context - Other error, clearing user state");
              setUser(null);
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
            }
          }
        }
      } catch (error) {
        console.error("Auth Context - Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Add axios interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest?._retry) {
          console.log("Auth Context - 401 received, attempting token refresh");
          if (originalRequest) {
            originalRequest._retry = true;

            try {
              // Try to refresh the token
              const newAccessToken = await refreshToken();
              console.log("Auth Context - Token refreshed successfully");

              // Update the authorization header for the original request
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              // Retry the original request
              return api(originalRequest);
            } catch (refreshError) {
              console.log("Auth Context - Token refresh failed, logging out");
              setUser(null);
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              router.push("/auth/login");
              return Promise.reject(refreshError);
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [router]);

  const login = async (credentials: LoginCredentials) => {
    console.log("Login function called with credentials:", {
      ...credentials,
      password: "[REDACTED]",
    });
    try {
      setIsLoading(true);
      const data = await apiLogin(credentials);
      console.log("Login successful, received data:", data);

      if (data.user) {
        console.log("Setting user state with:", data.user);
        setUser(data.user);
      } else {
        console.log("No user data in login response, fetching user data...");
        try {
          const userResponse = await api.get("/api/users/me/");
          console.log("User data fetched:", userResponse.data);
          setUser(userResponse.data);
        } catch (userError) {
          console.error("Failed to fetch user data:", userError);
          setUser(null);
        }
      }

      router.push("/");
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error: unknown) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const data = await apiRegister(credentials);
      setUser(data.user || null);
      router.push("/");
      toast({
        title: "Success",
        description: "Successfully registered",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiLogout();
      setUser(null);
      // Clear any other application state if needed

      // Show success message
      toast({
        title: "Success",
        description: "Successfully logged out",
      });

      // Redirect to login page
      router.push("/auth/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error);
      // Even if the API call fails, we should still clear the local state
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }

      toast({
        title: "Error",
        description: "Failed to logout properly. Please try again.",
        variant: "destructive",
      });

      // Still redirect to login page even if there was an error
      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    redirectToGoogleOAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
