'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
  requiredSubscriptionTier?: 'free' | 'core' | 'full';
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireEmailVerification = false,
  requiredSubscriptionTier,
  requireAdmin = false,
  redirectTo = '/auth/signin',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated
      if (!user) {
        router.push(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // Check email verification requirement
      if (requireEmailVerification && !user.emailVerified) {
        router.push('/auth/verify-email-notice');
        return;
      }

      // Check admin requirement
      if (requireAdmin && !user.isAdmin) {
        router.push('/unauthorized');
        return;
      }

      // Check subscription tier requirement
      if (requiredSubscriptionTier) {
        const tierHierarchy = {
          free: 0,
          core: 1,
          full: 2,
        };

        const userTierLevel = tierHierarchy[user.subscriptionTier as keyof typeof tierHierarchy] || 0;
        const requiredTierLevel = tierHierarchy[requiredSubscriptionTier];

        if (userTierLevel < requiredTierLevel) {
          router.push(`/pricing?upgrade=${requiredSubscriptionTier}`);
          return;
        }
      }
    }
  }, [user, loading, router, requireEmailVerification, requireAdmin, requiredSubscriptionTier, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children until we've confirmed access
  if (!user) {
    return null;
  }

  // Check all requirements before rendering
  if (requireEmailVerification && !user.emailVerified) {
    return null;
  }

  if (requireAdmin && !user.isAdmin) {
    return null;
  }

  if (requiredSubscriptionTier) {
    const tierHierarchy = {
      free: 0,
      core: 1,
      full: 2,
    };

    const userTierLevel = tierHierarchy[user.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredTierLevel = tierHierarchy[requiredSubscriptionTier];

    if (userTierLevel < requiredTierLevel) {
      return null;
    }
  }

  // All checks passed, render children
  return <>{children}</>;
}

// HOC version for pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}