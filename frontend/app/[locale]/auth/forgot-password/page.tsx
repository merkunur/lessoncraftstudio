import { Metadata } from 'next';
import ForgotPasswordPage from '@/app/auth/forgot-password/page';

export const dynamic = 'force-dynamic';

// SEO: Auth pages should not be indexed
export const metadata: Metadata = {
  title: 'Forgot Password | LessonCraftStudio',
  robots: {
    index: false,
    follow: false,
  },
};

export default ForgotPasswordPage;
