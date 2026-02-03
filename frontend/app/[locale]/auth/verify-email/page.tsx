import { Suspense } from 'react';
import { Metadata } from 'next';
import VerifyEmailPageContent from '@/app/auth/verify-email/client';

export const dynamic = 'force-dynamic';

// SEO: Auth pages should not be indexed
export const metadata: Metadata = {
  title: 'Verify Email | LessonCraftStudio',
  robots: {
    index: false,
    follow: false,
  },
};

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
