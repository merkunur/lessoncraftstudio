'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail } = useAuth();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerification();
    } else {
      setStatus('error');
      setMessage('No verification token provided');
    }
  }, [token]);

  const handleVerification = async () => {
    if (!token) return;
    
    try {
      setStatus('loading');
      await verifyEmail(token);
      setStatus('success');
      setMessage('Your email has been verified successfully!');
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to verify email. The link may have expired.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Verifying your email...
              </h2>
              <p className="mt-2 text-gray-600">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Email verified!
              </h2>
              <p className="mt-2 text-gray-600">{message}</p>
              <p className="mt-4 text-sm text-gray-500">
                Redirecting to your dashboard...
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Verification failed
              </h2>
              <p className="mt-2 text-gray-600">{message}</p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/auth/verify-email-notice"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Request New Verification Email
                </Link>
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Notice page for users who need to verify their email
export function VerifyEmailNoticePage() {
  const { user, resendVerificationEmail } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    try {
      setIsSending(true);
      setError('');
      await resendVerificationEmail();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to resend verification email'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <Mail className="h-16 w-16 text-blue-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Verify your email
            </h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification email to:
            </p>
            <p className="font-medium text-gray-900">{user?.email}</p>
            
            <p className="mt-4 text-sm text-gray-600">
              Please check your email and click the verification link to activate your account.
            </p>

            <div className="mt-6 space-y-3">
              {!sent ? (
                <button
                  onClick={handleResend}
                  disabled={isSending}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Resend Verification Email'
                  )}
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-sm text-green-700">
                    Verification email sent! Please check your inbox.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Link
                href="/auth/signout"
                className="block px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Sign Out
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or make sure{' '}
                <span className="font-medium">{user?.email}</span> is correct.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}