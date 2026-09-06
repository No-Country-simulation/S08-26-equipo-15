/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'
import { authService } from '../services/auth-service'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

// Contexto global para compartir el estado de autenticación.
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

// Proporciona el estado y las acciones de autenticación a la aplicación.
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Autentica al usuario mediante el servicio de autenticación.
  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true)

    try {
      const authenticatedUser = await authService.login(email, password)
      setUser(authenticatedUser)
    } finally {
      setIsLoading(false)
    }
  }

  // Elimina el usuario actual del estado de autenticación.
  function logout(): void {
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}