"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_CREDENTIALS = {
  email: "admin",
  password: "admin",
}

const STORAGE_KEY = "grc_auth_user"
const AUTH_COOKIE_NAME = "grc_auth_token"

const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null
  const storedUser = localStorage.getItem(STORAGE_KEY)
  if (!storedUser) return null
  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration of auth state from localStorage
      setUser(storedUser)
    } else {
      deleteCookie(AUTH_COOKIE_NAME)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const userData: User = {
        email,
        name: "Administrator",
      }
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      // Set cookie for middleware authentication
      setCookie(AUTH_COOKIE_NAME, "authenticated", 7)
      return true
    }
    return false
  }, [])

  const logout = useCallback((): void => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    deleteCookie(AUTH_COOKIE_NAME)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
