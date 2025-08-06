"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Define types for our auth system
interface User {
  id: string
  email: string
}

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  subscription_plan: "free" | "thinker" | "pro"
  subscription_status: "active" | "inactive" | "cancelled"
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  isAuthenticated: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user data for preview mode
const DEMO_USER: User = {
  id: "demo-user-id",
  email: "demo@nicepod.com",
}

const DEMO_PROFILE: Profile = {
  id: "demo-user-id",
  email: "demo@nicepod.com",
  full_name: "Demo User",
  avatar_url: "/images/authors/james-liu.jpg",
  bio: "This is a demo account for testing the NicePod platform.",
  location: "Demo City",
  subscription_plan: "free",
  subscription_status: "active",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock storage for demo mode
const mockStorage = {
  getItem: (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Check if we're in preview mode (no Supabase credentials)
  const isPreviewMode = true // Always use preview mode for v0 preview

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        // Check if user is logged in from local storage in preview mode
        if (isPreviewMode) {
          const isLoggedIn = mockStorage.getItem("nicepod_auth") === "true"
          if (isLoggedIn) {
            setUser(DEMO_USER)
            setProfile(DEMO_PROFILE)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [isPreviewMode])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Demo mode authentication
      if (isPreviewMode) {
        // Demo credentials check
        if (email === "demo@nicepod.com" && password === "demo123") {
          setUser(DEMO_USER)
          setProfile(DEMO_PROFILE)
          setIsAuthenticated(true)
          mockStorage.setItem("nicepod_auth", "true")

          toast({
            title: "Signed in successfully",
            description: "Welcome back to NicePod!",
          })

          return { error: null }
        } else {
          // For demo purposes, allow any email/password with minimum validation
          if (email && password && password.length >= 6) {
            const newUser = {
              id: `user-${Date.now()}`,
              email,
            }

            const newProfile = {
              id: newUser.id,
              email,
              full_name: email.split("@")[0],
              avatar_url: null,
              bio: null,
              location: null,
              subscription_plan: "free",
              subscription_status: "active",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }

            setUser(newUser)
            setProfile(newProfile)
            setIsAuthenticated(true)
            mockStorage.setItem("nicepod_auth", "true")

            toast({
              title: "Signed in successfully",
              description: "Welcome to NicePod!",
            })

            return { error: null }
          }

          return {
            error: { message: "Invalid email or password" },
          }
        }
      }

      // This would be replaced with actual Supabase auth in production
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      setLoading(true)

      // Demo mode sign up
      if (isPreviewMode) {
        // Basic validation
        if (!email || !password || password.length < 6) {
          return {
            error: { message: "Invalid email or password (must be at least 6 characters)" },
          }
        }

        const newUser = {
          id: `user-${Date.now()}`,
          email,
        }

        const newProfile = {
          id: newUser.id,
          email,
          full_name: metadata.full_name || email.split("@")[0],
          avatar_url: null,
          bio: null,
          location: null,
          subscription_plan: "free",
          subscription_status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setUser(newUser)
        setProfile(newProfile)
        setIsAuthenticated(true)
        mockStorage.setItem("nicepod_auth", "true")

        toast({
          title: "Account created successfully",
          description: "Welcome to NicePod!",
        })

        return { error: null }
      }

      // This would be replaced with actual Supabase auth in production
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)

      // Demo mode sign out
      if (isPreviewMode) {
        setUser(null)
        setProfile(null)
        setIsAuthenticated(false)
        mockStorage.removeItem("nicepod_auth")

        toast({
          title: "Signed out successfully",
          description: "You have been signed out of NicePod",
        })

        router.push("/")
        return
      }

      // This would be replaced with actual Supabase auth in production
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      setLoading(true)

      // Demo mode password reset
      if (isPreviewMode) {
        if (!email) {
          return { error: { message: "Email is required" } }
        }

        toast({
          title: "Password reset email sent",
          description: `If ${email} is associated with an account, you will receive a password reset link.`,
        })

        return { error: null }
      }

      // This would be replaced with actual Supabase auth in production
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setLoading(true)

      // Demo mode profile update
      if (isPreviewMode) {
        if (!user) {
          return { error: new Error("No user logged in") }
        }

        const updatedProfile = {
          ...profile,
          ...updates,
          updated_at: new Date().toISOString(),
        }

        setProfile(updatedProfile as Profile)

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        })

        return { error: null }
      }

      // This would be replaced with actual Supabase profile update in production
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Context value
  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
