'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Check for OAuth callback tokens in URL params
    const oauthSuccess = searchParams.get('oauth');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (oauthSuccess === 'success' && accessToken && refreshToken) {
      // Store OAuth tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Fetch user info using the token
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        })
        .catch(err => console.error('Failed to fetch user info:', err));

      // Clean up URL params (remove tokens from URL for security)
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('oauth');
      cleanUrl.searchParams.delete('accessToken');
      cleanUrl.searchParams.delete('refreshToken');
      window.history.replaceState({}, '', cleanUrl.toString());

      setIsLoading(false);
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/auth/signin');
      return;
    }

    setIsLoading(false);
  }, [router, searchParams, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
