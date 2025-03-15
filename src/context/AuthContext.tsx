'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// For the prototype, we'll use a simple hardcoded admin user
const ADMIN_USER = {
  id: 1,
  username: 'admin',
  password: 'admin123', // In a real app, we would NEVER store passwords in plain text
  isAdmin: true
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check if user is logged in on mount - only runs on client side
  useEffect(() => {
    // This code will only run on the client after hydration
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = !!user?.isAdmin;

  const login = async (username: string, password: string): Promise<boolean> => {
    // For prototype, just check against the admin credentials
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const userData = {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        isAdmin: ADMIN_USER.isAdmin
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    // For regular users in the prototype, just accept any username/password
    if (username && password) {
      const userData = {
        id: Math.floor(Math.random() * 1000) + 2, // Deterministic ID better than Date.now()
        username,
        isAdmin: false
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
