/* SERVER COMPONENT (was 'use client' until 2026-08-02).
   It only needed the client for `usePathname()`, and only to derive the locale
   — which the layout already knows. Measured on /en/pricing: the footer is 90
   DOM nodes and 31 links, and React was hydrating all of them on EVERY page to
   render nothing interactive. The one genuinely interactive part,
   FooterCategoryDropdowns, stays a Client Component and is the only thing here
   that now hydrates.

   ⚠ Because a Client Component cannot render a Server Component as a child,
   this is rendered in app/[locale]/layout.tsx and passed INTO
   LocaleLayoutClient as the `footerSlot` prop. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { FooterCategoryDropdowns } from './FooterCategoryDropdowns';
import type { AxisLabelMap } from '@/lib/category-nav-data';

// 3-row compact footer per the v5 activity-page redesign:
//   Row 1: FooterCategoryDropdowns — 3 compact dropdown buttons
//          (byLanguage / byTopic / byExerciseType) that pop UP on click.
//   Row 2: utility links (Contact · Terms · Privacy).
//   Row 3: logo + wordmark + copyright.
//
// The dropdown row REUSES CategoryNav's data via `buildCategories()` for
// byTopic + byExerciseType (single SoT in frontend/lib/category-nav-data.ts),
// so the link sets stay in sync across header + footer surfaces.
// byLanguage is a small hardcoded 11-locale list (mirrors LanguageSelector).
//
// Substrate-honesty filtering for byTopic + byExerciseType runs via the
// `availableExerciseTypes` + `availableThemes` props (sourced server-side
// in `frontend/app/[locale]/layout.tsx`, threaded through LocaleLayoutClient).
//
// mt-0 (was mt-8 in v4) because the root layout body is now flex-col +
// main flex-1 — the footer sticks to viewport bottom on short pages and
// no longer needs a manual top margin to push it away from content.

interface FooterProps {
  /** Supplied by the layout — was previously derived from usePathname(). */
  locale: string;
  availableExerciseTypes?: string[];
  availableThemes?: string[];
  /** Server-resolved axis name+slug map; see category-nav-taxonomy.ts. */
  axisLabels?: AxisLabelMap;
}

export async function Footer({
  locale,
  availableExerciseTypes = [],
  availableThemes = [],
  axisLabels = {},
}: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  // Pricing link is flip-gated (subscription launch 2026-07); reuses the
  // existing navigation.pricing key ×11.
  const tNav = await getTranslations({ locale, namespace: 'navigation' });

  return (
    <footer id="footer" className="bg-cream-50 border-t border-cream-300 py-5 md:py-6 mt-0">
      <div className="container mx-auto px-4 max-w-7xl space-y-3">
        {/* Row 1: 3 compact dropdown buttons. Each opens an UPWARD panel
            with the localized link items. */}
        <FooterCategoryDropdowns
          locale={locale}
          availableExerciseTypes={availableExerciseTypes}
          availableThemes={availableThemes}
          axisLabels={axisLabels}
        />

        {/* Row 2: utility links, single horizontal row, centered. */}
        {/* flex-wrap: long-locale link rows (es at 360px) must wrap, not
            overflow the viewport. */}
        <ul className="flex flex-wrap items-center justify-center gap-3 text-sm text-ink-600">
          <li>
            <Link href={`/${locale}/about`} className="hover:text-ink-900 transition-colors">
              {t('about')}
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">·</li>
          <li>
            <Link href={`/${locale}/contact`} className="hover:text-ink-900 transition-colors">
              {t('contact')}
            </Link>
          </li>
          {PRICING_PUBLIC && (
            <>
              <li aria-hidden="true" className="text-ink-300">·</li>
              <li>
                <Link href={`/${locale}/pricing`} className="hover:text-ink-900 transition-colors">
                  {tNav('pricing')}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true" className="text-ink-300">·</li>
          <li>
            <Link href={`/${locale}/terms`} className="hover:text-ink-900 transition-colors">
              {t('terms')}
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">·</li>
          <li>
            <Link href={`/${locale}/privacy`} className="hover:text-ink-900 transition-colors">
              {t('privacy')}
            </Link>
          </li>
        </ul>

        {/* Row 3: small brand strip — logo + wordmark + copyright. */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3 text-xs text-ink-500">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 hover:text-ink-900 transition-colors">
            <picture>
              <source srcSet="/logo-lcs.webp" type="image/webp" />
              <img
                src="/logo-lcs-optimized.png"
                alt="LessonCraftStudio"
                width={242}
                height={313}
                className="h-6 w-auto object-contain"
                loading="lazy"
              />
            </picture>
            <span className="font-display font-semibold text-ink-700">LessonCraftStudio</span>
          </Link>
          <span aria-hidden="true" className="hidden sm:inline text-ink-300">·</span>
          <span>{t('copyright')}</span>
        </div>
      </div>
    </footer>
  );
}
