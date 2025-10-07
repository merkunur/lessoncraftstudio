'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

/**
 * Client-side authentication hook
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isAdmin: session?.user?.isAdmin || false,
    signIn,
    signOut,
  };
}

/**
 * Require authentication on client side
 */
export function useRequireAuth() {
  const auth = useAuth();

  if (!auth.isLoading && !auth.isAuthenticated) {
    signIn();
  }

  return auth;
}
