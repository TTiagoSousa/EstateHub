// src/Contexts/Auth_Context.tsx

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { End_Points } from '../Service/endPoints';
import http from '../Service/httpService';

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);

    try {
      
      const response = await http.get(End_Points.User_Endpoint(), {
        withCredentials: true,
      });

      const user = response.data;

      if (user) {
        setAuthenticated(true);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        // console.log('ℹ️ [AuthProvider] Utilizador não autenticado (401 Unauthorized).');
      } else {
        // console.error('❌ [AuthProvider] Erro na verificação de autenticação:', error);
      }

      setAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}