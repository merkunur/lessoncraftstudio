'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState , Suspense} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailPageContent() {
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <VerifyEmailPageContent />
    </Suspense>
  );
}
