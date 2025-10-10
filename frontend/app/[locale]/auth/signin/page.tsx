import { Suspense } from 'react';
import SignInClient from './signin-client';

export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <SignInClient />
    </Suspense>
  );
}
