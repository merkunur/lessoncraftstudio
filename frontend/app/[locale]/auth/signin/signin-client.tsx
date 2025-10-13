'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import DeviceConflictModal from '@/components/auth/DeviceConflictModal';

// Simple device fingerprinting
function getDeviceFingerprint() {
  const navigator = window.navigator;
  const screen = window.screen;

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ];

  const fingerprint = components.join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
}

export default function SignInClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize deviceId synchronously to avoid race condition
  // This ensures deviceId is ALWAYS available before form submission
  const [deviceId] = useState(() => {
    // Only run on client side
    if (typeof window === 'undefined') return '';
    return getDeviceFingerprint();
  });

  // Device conflict modal state
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictSession, setConflictSession] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan'); // Get plan from URL parameter (core or full)
  const billing = searchParams.get('billing'); // Get billing interval from URL parameter (monthly or yearly)
  const redirect = searchParams.get('redirect'); // Get redirect URL from parameter
  const t = useTranslations('auth.signIn');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate deviceId is present (should never be empty with synchronous init)
    if (!deviceId) {
      setError('Device identification failed. Please refresh and try again.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          deviceId,
          rememberMe
        }),
      });

      const data = await response.json();

      // Check for device conflict (409 status)
      if (response.status === 409 && data.conflict) {
        setConflictSession(data.currentSession);
        setShowConflictModal(true);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Store user info
      localStorage.setItem('user', JSON.stringify(data.user));

      // If there's a plan parameter, create checkout session
      if (plan && (plan === 'core' || plan === 'full')) {
        const billingInterval = billing === 'yearly' ? 'yearly' : 'monthly'; // Default to monthly if not specified
        const locale = window.location.pathname.split('/')[1] || 'en';
        const baseUrl = window.location.origin;
        const successUrl = `${baseUrl}/${locale}/dashboard/billing?success=true`;
        const cancelUrl = `${baseUrl}/${locale}/pricing?cancelled=true`;

        console.log('=== PLAN PARAMETER DETECTED ===');
        console.log('Plan:', plan);
        console.log('Billing interval:', billingInterval);
        console.log('User email:', data.user.email);
        console.log('User subscription tier:', data.user.subscriptionTier);
        console.log('Creating checkout session...');

        try {
          const checkoutResponse = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({
              tier: plan.toUpperCase(),
              billingInterval: billingInterval,
              successUrl,
              cancelUrl,
            }),
          });

          console.log('Checkout response status:', checkoutResponse.status);
          const checkoutData = await checkoutResponse.json();
          console.log('Checkout response data:', checkoutData);

          if (checkoutResponse.ok && checkoutData.url) {
            console.log('✅ SUCCESS! Redirecting to Stripe Checkout:', checkoutData.url);
            // Redirect to Stripe Checkout
            window.location.href = checkoutData.url;
            return;
          } else {
            console.error('❌ CHECKOUT FAILED:', checkoutData);
            const errorMsg = checkoutData.error || 'Failed to create checkout session';
            toast.error(errorMsg, { duration: 5000 });
            // Don't redirect to dashboard, stay on signin page so user can see error
            setIsLoading(false);
            return;
          }
        } catch (checkoutError) {
          console.error('❌ CHECKOUT ERROR:', checkoutError);
          toast.error('Network error while creating checkout session', { duration: 5000 });
          setIsLoading(false);
          return;
        }
      } else {
        console.log('No plan parameter detected (plan =', plan, '), redirecting to', redirect || 'dashboard');
      }

      // Redirect to specified URL or default to dashboard
      router.push(redirect || '/en/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handleForceSignin = async () => {
    try {
      const response = await fetch('/api/auth/force-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          deviceId,
          rememberMe
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Store user info
      localStorage.setItem('user', JSON.stringify(data.user));

      // Close modal
      setShowConflictModal(false);

      // If there's a plan parameter, create checkout session
      if (plan && (plan === 'core' || plan === 'full')) {
        const billingInterval = billing === 'yearly' ? 'yearly' : 'monthly'; // Default to monthly if not specified
        const locale = window.location.pathname.split('/')[1] || 'en';
        const baseUrl = window.location.origin;
        const successUrl = `${baseUrl}/${locale}/dashboard/billing?success=true`;
        const cancelUrl = `${baseUrl}/${locale}/pricing?cancelled=true`;

        console.log('[Force Signin] === PLAN PARAMETER DETECTED ===');
        console.log('[Force Signin] Plan:', plan);
        console.log('[Force Signin] Billing interval:', billingInterval);
        console.log('[Force Signin] User email:', data.user.email);
        console.log('[Force Signin] User subscription tier:', data.user.subscriptionTier);
        console.log('[Force Signin] Creating checkout session...');

        try {
          const checkoutResponse = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({
              tier: plan.toUpperCase(),
              billingInterval: billingInterval,
              successUrl,
              cancelUrl,
            }),
          });

          console.log('[Force Signin] Checkout response status:', checkoutResponse.status);
          const checkoutData = await checkoutResponse.json();
          console.log('[Force Signin] Checkout response data:', checkoutData);

          if (checkoutResponse.ok && checkoutData.url) {
            console.log('[Force Signin] ✅ SUCCESS! Redirecting to Stripe Checkout:', checkoutData.url);
            // Redirect to Stripe Checkout
            window.location.href = checkoutData.url;
            return;
          } else {
            console.error('[Force Signin] ❌ CHECKOUT FAILED:', checkoutData);
            const errorMsg = checkoutData.error || 'Failed to create checkout session';
            toast.error(errorMsg, { duration: 5000 });
            return;
          }
        } catch (checkoutError) {
          console.error('[Force Signin] ❌ CHECKOUT ERROR:', checkoutError);
          toast.error('Network error while creating checkout session', { duration: 5000 });
          return;
        }
      } else {
        console.log('[Force Signin] No plan parameter detected (plan =', plan, '), redirecting to', redirect || 'dashboard');
      }

      // Redirect to specified URL or default to dashboard
      router.push(redirect || '/en/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during force sign in');
      setShowConflictModal(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('title')}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t('noAccount')}{' '}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                {t('signUp')}
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  {t('email')}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {t('password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {t('rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('forgotPassword')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  t('submit')
                )}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">{t('orContinueWith')}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Device Conflict Modal */}
      {conflictSession && (
        <DeviceConflictModal
          isOpen={showConflictModal}
          onClose={() => setShowConflictModal(false)}
          currentSession={conflictSession}
          onContinue={handleForceSignin}
          onCancel={() => {
            setShowConflictModal(false);
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
}
