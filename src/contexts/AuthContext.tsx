import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '@/lib/api';

// Updated User interface to match backend response
interface User {
  id: number;
  email: string;
  name: string | null;
  display_name: string;
  role: 'admin' | 'seller' | 'buyer';
  avatar_url: string | null;
  balance: number;
  is_verified: boolean;
  bio?: string | null;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<User>;
}

interface SignupData {
  email: string;
  password: string;
  name?: string;
  display_name?: string;
  role?: 'buyer' | 'seller';
  avatar_url?: string;
}

interface ProfileUpdateData {
  name?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, try to restore session from token
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        try {
          // Validate token by fetching current user profile
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          // Token is invalid or expired, clean up
          console.error("Session expired or invalid", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user: userData } = response.data;

    // Store the token and user data
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  /**
   * Signup and auto-login
   * Backend signup doesn't return a token, so we login after successful registration
   */
  const signup = async (data: SignupData): Promise<void> => {
    // First, register the user
    await api.post('/auth/signup', data);

    // Then, automatically login
    await login(data.email, data.password);
  };

  /**
   * Logout - clear all stored auth data
   */
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  /**
   * Refresh user data from server (e.g., after profile update elsewhere)
   */
  const refreshUser = async (): Promise<void> => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to refresh user", error);
      // If refresh fails, user might be logged out
      logout();
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (data: ProfileUpdateData): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    const updatedUser = response.data;
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      refreshUser,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
