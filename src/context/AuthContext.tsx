import { createContext, useContext, useEffect, useState } from 'react';
import { UserPreferences } from '../types/types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {
      lastVisitedMenu: 'dashboard',
      selectedGraphType: 'bar'
    };
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const login = (username: string, password: string) => {
    // validation
    if (username && password) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      preferences,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 