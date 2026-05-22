'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// One-line utility footer per the activity-page redesign commission
// (operator decision: this REPLACES the prior multi-column SEO footer).
//
// The browse-by-language / browse-by-topic / browse-by-exercise-type link
// surfaces that used to live here have not been deleted from the site —
// they're already in the top-nav CategoryNav dropdowns + the
// LanguageSelector, per CLAUDE.md §16.5 + §16.6:
//   - Worksheets dropdown  → /[locale]/topic/<exercise-type-slug>/
//   - Topics dropdown      → /[locale]/topic/<theme-slug>/
//   - LanguageSelector     → swaps locale prefix in current URL
// No crawl paths lost. Substrate-honesty filtering still runs inside
// CategoryNav per its `availableExerciseTypes` / `availableThemes` props
// from the LocaleLayout server component.
//
// `footer.byLanguage` / `byTopic` / `byExerciseType` / `moreLanguagesSoon`
// / `moreTopicsSoon` i18n keys are intentionally left in messages/*.json
// (dormant; deletion is a cross-locale change with no benefit).

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  return (
    <footer id="footer" className="bg-cream-50 border-t border-cream-300 py-6 md:py-8 mt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Row 1: utility links, single horizontal row, centered. */}
        <ul className="flex items-center justify-center gap-3 text-sm text-ink-600">
          <li>
            <Link href={`/${locale}/contact`} className="hover:text-ink-900 transition-colors">
              {t('contact')}
            </Link>
          </li>
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

        {/* Row 2: small brand strip — logo + wordmark + copyright. */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3 text-xs text-ink-500">
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
