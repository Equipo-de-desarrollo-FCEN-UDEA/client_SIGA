'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthProviderProps } from '../interfaces/auth';
import User from '../interfaces/user';
import { fetchCurrentUser } from '../services/api/userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await fetch('http://localhost:8003/api/v1/auth/access-token', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        await checkAuth(); // Refresh user data after login
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8003/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const hasRole = (roleName: string, academicUnitId?: string): boolean => {
    if (!user || !user.user_roles_academic_units) return false;
    
    return user.user_roles_academic_units.some(roleUnit => {
      const matchesRole = roleUnit.rol.name.toLowerCase().includes(roleName.toLowerCase());
      if (academicUnitId) {
        return matchesRole && roleUnit.academic_unit.id === academicUnitId;
      }
      return matchesRole;
    });
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    hasRole,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};