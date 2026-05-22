'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export function LocaleLayoutClient({
  children,
  locale,
  footerAvailableExerciseTypes = [],
  footerAvailableThemes = [],
  footerAvailableLevels = [],
  availableActivities = []
}: {
  children: React.ReactNode;
  locale: string;
  footerAvailableExerciseTypes?: string[];
  /** Per-locale non-empty theme axis-keys. Threaded to Navigation/CategoryNav
   *  in addition to Footer; powers the new Topics dropdown sub-items. */
  footerAvailableThemes?: string[];
  footerAvailableLevels?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
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
        <Navigation
          availableExerciseTypes={footerAvailableExerciseTypes}
          availableActivities={availableActivities}
          availableThemes={footerAvailableThemes}
        />
        <main>
          {children}
        </main>
      </>
    );
  }

  // Other routes: Normal document flow with Footer (content-gated per §16.6.1).
  // Pass footerAvailableExerciseTypes to Navigation too — CategoryNav uses it
  // for per-locale sub-item filtering so dropdown items don't 404.
  return (
    <>
      <Navigation
        availableExerciseTypes={footerAvailableExerciseTypes}
        availableActivities={availableActivities}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
