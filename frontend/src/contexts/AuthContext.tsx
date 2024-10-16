import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authApi.get('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.post('/login', { email, password });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await authApi.post('/register', { email, password, username });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.get('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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