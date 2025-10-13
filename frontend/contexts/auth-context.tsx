'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  emailVerified: boolean;
  subscriptionTier: string;
  stripeCustomerId?: string;
  isAdmin: boolean;
  language: string;
  avatar?: string;
  newsletter?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
  subscription?: {
    id: string;
    planName: string;
    status: string;
    currentPeriodEnd: string;
    currentPeriodStart: string;
    cancelAtPeriodEnd: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  plan?: 'free' | 'core' | 'full';
  newsletter?: boolean;
  language?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to generate device ID (same as content-manager-v2.html)
function getDeviceId(): string {
  // Check if we already have a device ID stored
  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    // Generate a unique device ID based on browser characteristics
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    const renderer = debugInfo ? gl!.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL) : '';

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      renderer,
      (navigator as any).hardwareConcurrency || '',
      (navigator as any).deviceMemory || ''
    ].join('|');

    // Create hash of fingerprint
    deviceId = 'device_' + btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);

    // Store for future use
    localStorage.setItem('deviceId', deviceId);
  }

  return deviceId;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Store tokens in memory for security
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Helper function to make authenticated requests
  const authenticatedFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!accessToken) {
      throw new Error('No access token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }, [accessToken]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      
      // Try to get user from stored token
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setAccessToken(storedToken);
      
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else if (response.status === 401) {
        // Token expired, try to refresh
        await refreshToken();
      } else {
        // Clear invalid token
        localStorage.removeItem('accessToken');
        setAccessToken(null);
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function with device fingerprinting and conflict handling
  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setError(null);
      setLoading(true);

      // Get device ID for authentication
      const deviceId = getDeviceId();

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceId, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - store tokens and user
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);

        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }

        setUser(data.user);
        toast.success('Welcome back!');

        // Redirect based on user role
        if (data.user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else if (response.status === 409) {
        // Device conflict - user is signed in on another device
        const confirmMessage =
          `You're already signed in on another device:\n\n` +
          `Device: ${data.currentSession?.deviceName || 'Unknown'}\n` +
          `Last active: ${data.currentSession?.lastActive ? new Date(data.currentSession.lastActive).toLocaleString() : 'Unknown'}\n\n` +
          `Do you want to sign out from that device and sign in here?`;

        if (confirm(confirmMessage)) {
          // User wants to force sign-in - call force-signin endpoint
          const forceResponse = await fetch('/api/auth/force-signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, deviceId, rememberMe }),
          });

          const forceData = await forceResponse.json();

          if (forceResponse.ok) {
            setAccessToken(forceData.accessToken);
            localStorage.setItem('accessToken', forceData.accessToken);

            if (forceData.refreshToken) {
              localStorage.setItem('refreshToken', forceData.refreshToken);
            }

            setUser(forceData.user);
            toast.success('Welcome back!');

            // Redirect based on user role
            if (forceData.user.isAdmin) {
              router.push('/admin');
            } else {
              router.push('/dashboard');
            }
          } else {
            throw new Error(forceData.error || 'Force sign-in failed');
          }
        } else {
          // User cancelled - don't proceed with login
          throw new Error('Login cancelled');
        }
      } else {
        // Other error
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      if (message !== 'Login cancelled') {
        toast.error(message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function with device fingerprinting
  const signup = async (signupData: SignupData) => {
    try {
      setError(null);
      setLoading(true);

      // Get device ID for authentication
      const deviceId = getDeviceId();

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signupData, deviceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);

      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      setUser(data.user);
      toast.success('Account created successfully! Please check your email to verify your account.');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);

      if (accessToken) {
        await authenticatedFetch('/api/auth/signout', {
          method: 'POST',
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear everything regardless of API call success
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLoading(false);
      router.push('/');
      toast.success('Logged out successfully');
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Token refresh failed');
      }

      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      setUser(data.user);
    } catch (err) {
      // Clear tokens on refresh failure
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw err;
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authenticatedFetch('/api/auth/me', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      setUser(data.user);
      toast.success('Profile updated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profile update failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: user?.language || 'en' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset request failed');
      }

      toast.success('If an account exists with this email, you will receive a password reset link.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset request failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      toast.success('Password reset successfully. Please login with your new password.');
      router.push('/auth/signin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (token: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Email verification failed');
      }

      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      setUser(data.user);
      toast.success('Email verified successfully! Welcome to LessonCraftStudio.');
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Email verification failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!user?.id) {
        throw new Error('User not found');
      }

      const response = await fetch(`/api/auth/verify-email?userId=${user.id}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      toast.success('Verification email sent. Please check your inbox.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resend verification email';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set up token refresh interval
  useEffect(() => {
    if (!accessToken) return;

    // Refresh token every 6 days (before 7-day expiry)
    const interval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 6 * 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  const isAuthenticated = !!user && !loading;

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    refreshToken,
    updateProfile,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}