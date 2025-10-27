'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is the root page that redirects to the default locale
// Required for next-intl with localePrefix: 'always'
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to default locale on client side
    router.replace('/en');
  }, [router]);

  // Return null while redirecting
  return null;
}
