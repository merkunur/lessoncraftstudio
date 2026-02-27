'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export function LocaleLayoutClient({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();

  // Sales/funnel pages: 100% standalone — no Navigation, no Footer
  const isGetRoute = pathname?.startsWith(`/${locale}/get/`) || pathname?.includes('/get/');
  if (isGetRoute) {
    return <>{children}</>;
  }

  // Check if we're on an apps route - no footer for better scrolling
  const isAppsRoute = pathname?.includes('/apps/');

  if (isAppsRoute) {
    return (
      <>
        <Navigation />
        <main>
          {children}
        </main>
      </>
    );
  }

  // Other routes: Normal document flow with Footer
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
