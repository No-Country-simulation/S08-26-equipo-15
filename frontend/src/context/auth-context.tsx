/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { User } from "../types/user";
import { authService } from "../services/auth-service";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = "meetcore_user";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true);

    try {
      const authenticatedUser = await authService.login(email, password);
      setUser(authenticatedUser);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    setIsLoading(true);

    try {
      const registeredUser = await authService.register(name, email, password);

      setUser(registeredUser);
    } finally {
      setIsLoading(false);
    }
  }

  async function forgotPassword(email: string): Promise<void> {
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
    } finally {
      setIsLoading(false);
    }
  }

  function logout(): void {
    setUser(null);
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    forgotPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
