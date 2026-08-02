'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import type { ToolLabel, AxisLabelMap } from '@/lib/category-nav-data';

export function LocaleLayoutClient({
  children,
  locale,
  footerAvailableExerciseTypes = [],
  footerAvailableThemes = [],
  footerAvailableLevels = [],
  availableActivities = [],
  availableTargets = [],
  toolSlugs = {},
  toolLabels = [],
  axisLabels = {},
  makerSlugs = {}
}: {
  children: React.ReactNode;
  locale: string;
  footerAvailableExerciseTypes?: string[];
  /** Per-locale non-empty theme axis-keys. Threaded to Navigation/CategoryNav
   *  in addition to Footer; powers the new Topics dropdown sub-items. */
  footerAvailableThemes?: string[];
  footerAvailableLevels?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableTargets?: Array<{ iso: string; slug: string; name: string; count: number }>;
  /** toolKey → native tool slug for this locale; gives every tool in the
   *  Manipulatives dropdown its own href instead of the shared index link. */
  toolSlugs?: Record<string, string>;
  toolLabels?: ToolLabel[];
  axisLabels?: AxisLabelMap;
  makerSlugs?: Record<string, string>;
}) {
  const pathname = usePathname();

  // Sales/funnel pages: 100% standalone — no Navigation, no Footer
  const isGetRoute = pathname?.startsWith(`/${locale}/get/`) || pathname?.includes('/get/');
  // Story Studio EDITOR (/studio/<storyId>): the canvas owns the whole
  // document — no Navigation, no Footer. The site nav is `relative z-50` and
  // out-stacked the editor's fixed overlay (z-40), burying the studio toolbar
  // under ~230px of site chrome. The dashboard (/studio, no story segment)
  // keeps normal site chrome.
  const isStudioEditor = pathname?.startsWith(`/${locale}/studio/`);
  if (isGetRoute || isStudioEditor) {
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
          availableTargets={availableTargets}
          toolSlugs={toolSlugs}
            toolLabels={toolLabels}
            axisLabels={axisLabels}
          makerSlugs={makerSlugs}
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
        availableThemes={footerAvailableThemes}
        availableTargets={availableTargets}
        toolSlugs={toolSlugs}
            toolLabels={toolLabels}
            axisLabels={axisLabels}
        makerSlugs={makerSlugs}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer
        availableExerciseTypes={footerAvailableExerciseTypes}
        availableThemes={footerAvailableThemes}
        axisLabels={axisLabels}
      />
    </>
  );
}
