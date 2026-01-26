'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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

// Helper to get current locale from URL path
function getCurrentLocale(): string {
  if (typeof window === 'undefined') return 'en';
  const pathParts = window.location.pathname.split('/');
  const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'fi'];
  const pathLocale = pathParts[1];
  return locales.includes(pathLocale) ? pathLocale : 'en';
}

// Retry configuration for network resilience
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
};

// Helper function to generate stable device ID
// Uses localStorage-first approach with random UUID instead of fingerprinting
// This prevents false "different device" conflicts from browser/display changes
function getDeviceId(): string {
  const STORAGE_KEY = 'lcs_device_id_v2';

  // Priority 1: Use stored ID (stable across browser updates, display changes, etc.)
  let deviceId = localStorage.getItem(STORAGE_KEY);
  if (deviceId) return deviceId;

  // Priority 2: Migrate from old key if exists (backward compatibility)
  const oldDeviceId = localStorage.getItem('deviceId');
  if (oldDeviceId) {
    localStorage.setItem(STORAGE_KEY, oldDeviceId);
    return oldDeviceId;
  }

  // Priority 3: Generate random UUID (not fingerprint-based - much more stable)
  deviceId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? `device_${crypto.randomUUID().replace(/-/g, '').substring(0, 24)}`
    : `device_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;

  localStorage.setItem(STORAGE_KEY, deviceId);
  return deviceId;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Store tokens in memory for security
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Lock to prevent concurrent refresh attempts (race condition prevention)
  const refreshLockRef = useRef<Promise<void> | null>(null);

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

  // Check authentication status with retry logic for network resilience
  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setAccessToken(storedToken);
    setLoading(true);

    // Load cached user immediately (provides instant UI feedback)
    const storedUser = localStorage.getItem('user');
    let cachedUser: User | null = null;
    if (storedUser) {
      try {
        cachedUser = JSON.parse(storedUser);
        console.log('[AuthContext] checkAuth - loaded cached user:', cachedUser?.email);
        setUser(cachedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }

    // Verify with API - with retry on network/server errors
    for (let attempt = 0; attempt < RETRY_CONFIG.maxRetries; attempt++) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const updatedUser = {
            ...data.user,
            subscription: data.subscription
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setLoading(false);
          return;
        } else if (response.status === 401) {
          // Token expired, try to refresh
          try {
            await refreshToken();
            setLoading(false);
            return;
          } catch (refreshErr) {
            // Refresh failed - clear tokens and logout
            console.error('Token refresh failed:', refreshErr);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setAccessToken(null);
            setUser(null);
            setLoading(false);
            return;
          }
        } else if (response.status >= 500) {
          // Server error - retry with backoff
          console.warn(`[AuthContext] Server error (${response.status}), attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries}`);
          if (attempt < RETRY_CONFIG.maxRetries - 1) {
            await new Promise(r => setTimeout(r, RETRY_CONFIG.baseDelay * (attempt + 1)));
            continue;
          }
          // All retries failed - keep cached user, don't force logout
          console.error('[AuthContext] All server retries failed, using cached data');
          setLoading(false);
          return;
        } else {
          // 4xx error (except 401) - likely invalid session, but keep cached user for now
          console.warn(`[AuthContext] Client error (${response.status}), keeping cached user`);
          setLoading(false);
          return;
        }
      } catch (networkError) {
        // Network error - retry with backoff
        console.warn(`[AuthContext] Network error, attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries}:`, networkError);
        if (attempt < RETRY_CONFIG.maxRetries - 1) {
          await new Promise(r => setTimeout(r, RETRY_CONFIG.baseDelay * (attempt + 1)));
          continue;
        }
        // All retries failed - keep cached user instead of forcing logout
        console.error('[AuthContext] All network retries failed, using cached data');
        setLoading(false);
        return;
      }
    }

    setLoading(false);
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

        // Merge subscription into user object
        const userWithSubscription = {
          ...data.user,
          subscription: data.subscription
        };
        setUser(userWithSubscription);
        localStorage.setItem('user', JSON.stringify(userWithSubscription));
        toast.success('Welcome back!');

        // Redirect based on user role (preserving locale)
        const locale = getCurrentLocale();
        if (data.user.isAdmin) {
          router.push(`/${locale}/admin`);
        } else {
          router.push(`/${locale}/dashboard`);
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

            // Merge subscription into user object
            const userWithSubscription = {
              ...forceData.user,
              subscription: forceData.subscription
            };
            setUser(userWithSubscription);
            localStorage.setItem('user', JSON.stringify(userWithSubscription));
            toast.success('Welcome back!');

            // Redirect based on user role (preserving locale)
            const locale = getCurrentLocale();
            if (forceData.user.isAdmin) {
              router.push(`/${locale}/admin`);
            } else {
              router.push(`/${locale}/dashboard`);
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

      // Merge subscription into user object
      const userWithSubscription = {
        ...data.user,
        subscription: data.subscription
      };
      setUser(userWithSubscription);
      localStorage.setItem('user', JSON.stringify(userWithSubscription));
      toast.success('Account created successfully! Please check your email to verify your account.');

      // Redirect to dashboard (preserving locale)
      router.push(`/${getCurrentLocale()}/dashboard`);
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
      localStorage.removeItem('user'); // Clear cached user data
      setLoading(false);
      router.push('/');
      toast.success('Logged out successfully');
    }
  };

  // Actual refresh implementation (private)
  const performRefresh = async (): Promise<void> => {
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

    // Merge subscription into user object
    const userWithSubscription = {
      ...data.user,
      subscription: data.subscription
    };
    setUser(userWithSubscription);
    localStorage.setItem('user', JSON.stringify(userWithSubscription));
  };

  // Refresh token function with lock to prevent concurrent refreshes (race condition prevention)
  const refreshToken = async () => {
    // If already refreshing, wait for that to complete instead of starting a new refresh
    if (refreshLockRef.current) {
      console.log('[AuthContext] Refresh already in progress, waiting...');
      return refreshLockRef.current;
    }

    // Start the refresh and store the promise
    refreshLockRef.current = performRefresh()
      .catch((err) => {
        // Clear tokens on refresh failure
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        throw err;
      })
      .finally(() => {
        // Release the lock
        refreshLockRef.current = null;
      });

    return refreshLockRef.current;
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
      router.push(`/${getCurrentLocale()}/auth/signin`);
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

      // Merge subscription into user object
      const userWithSubscription = {
        ...data.user,
        subscription: data.subscription
      };
      setUser(userWithSubscription);
      localStorage.setItem('user', JSON.stringify(userWithSubscription));
      toast.success('Email verified successfully! Welcome to LessonCraftStudio.');
      router.push(`/${getCurrentLocale()}/dashboard`);
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

  // Set up token refresh interval (daily instead of 6 days for better reliability)
  useEffect(() => {
    if (!accessToken) return;

    // Refresh token daily (more frequent than before to prevent expiry issues)
    const interval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 24 * 60 * 60 * 1000); // 1 day

    return () => clearInterval(interval);
  }, [accessToken]);

  // Helper to check token expiry and refresh if needed
  const checkTokenAndRefresh = useCallback(async () => {
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken) return;

    try {
      // Decode JWT to check expiry (without verification - just for timing)
      const parts = storedToken.split('.');
      if (parts.length !== 3) return;

      const payload = JSON.parse(atob(parts[1]));
      const expiresAt = payload.exp * 1000; // Convert to milliseconds
      const fiveMinutes = 5 * 60 * 1000;

      // Refresh if token expires within 5 minutes
      if (Date.now() > expiresAt - fiveMinutes) {
        console.log('[AuthContext] Token expiring soon, refreshing...');
        await refreshToken();
      }
    } catch (err) {
      console.error('[AuthContext] Token check failed:', err);
    }
  }, []);

  // Refresh token when app regains focus (user returns to tab/window)
  useEffect(() => {
    if (!accessToken) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('[AuthContext] Tab became visible, checking token...');
        checkTokenAndRefresh();
      }
    };

    const handleFocus = () => {
      console.log('[AuthContext] Window focused, checking token...');
      checkTokenAndRefresh();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [accessToken, checkTokenAndRefresh]);

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

  // Debug logging
  useEffect(() => {
    console.log('[AuthContext] State changed:', {
      user: user ? { email: user.email, tier: user.subscriptionTier } : null,
      loading,
      isAuthenticated
    });
  }, [user, loading, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}