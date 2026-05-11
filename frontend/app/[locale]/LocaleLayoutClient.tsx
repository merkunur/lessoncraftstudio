'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export function LocaleLayoutClient({
  children,
  locale,
  footerAvailableExerciseTypes = [],
  footerAvailableThemes = [],
  footerAvailableLevels = []
}: {
  children: React.ReactNode;
  locale: string;
  footerAvailableExerciseTypes?: string[];
  footerAvailableThemes?: string[];
  footerAvailableLevels?: string[];
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

  // Other routes: Normal document flow with Footer (content-gated per §16.6.1)
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer
        availableExerciseTypes={footerAvailableExerciseTypes}
        availableThemes={footerAvailableThemes}
        availableLevels={footerAvailableLevels}
      />
    </>
  );
}
