import { Suspense } from 'react';
import { Metadata } from 'next';
import SignUpPageContent from './client';

export const dynamic = 'force-dynamic';

// SEO: Auth pages should not be indexed - they serve no SEO purpose
export const metadata: Metadata = {
  title: 'Sign Up | LessonCraftStudio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <SignUpPageContent />
    </Suspense>
  );
}
