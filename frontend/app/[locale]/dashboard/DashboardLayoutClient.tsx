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

      // Check for checkout redirect after OAuth
      const checkoutPlan = searchParams.get('plan');
      const checkoutBilling = searchParams.get('billing');
      const shouldCheckout = searchParams.get('checkout');

      // Clean up URL params (remove tokens from URL for security)
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('oauth');
      cleanUrl.searchParams.delete('accessToken');
      cleanUrl.searchParams.delete('refreshToken');
      cleanUrl.searchParams.delete('checkout');
      cleanUrl.searchParams.delete('plan');
      cleanUrl.searchParams.delete('billing');
      window.history.replaceState({}, '', cleanUrl.toString());

      // If checkout was requested, redirect to checkout
      if (shouldCheckout === 'true' && checkoutPlan && (checkoutPlan === 'core' || checkoutPlan === 'full')) {
        const locale = pathname.split('/')[1] || 'en';
        const billingInterval = checkoutBilling === 'yearly' ? 'yearly' : 'monthly';
        const baseUrl = window.location.origin;
        const successUrl = `${baseUrl}/${locale}/dashboard/billing?success=true`;
        const cancelUrl = `${baseUrl}/${locale}/pricing?cancelled=true`;

        fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            tier: checkoutPlan.toUpperCase(),
            billingInterval,
            locale,
            successUrl,
            cancelUrl,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.url) {
              window.location.href = data.url;
            } else {
              setIsLoading(false);
            }
          })
          .catch(err => {
            console.error('Checkout error:', err);
            setIsLoading(false);
          });
        return;
      }

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
