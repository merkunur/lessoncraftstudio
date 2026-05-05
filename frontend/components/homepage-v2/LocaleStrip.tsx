'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SUPPORTED_LOCALES, LOCALE_NAMES, type SupportedLocale } from '@/config/locales';

/**
 * LocaleStrip — Alt A above-the-fold structural-axis surface per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Renders all 11 platform locales (§6) as a flag-strip in the navigation
 * area or hero-adjacent slot. Each entry = locale code/flag/name; click →
 * navigates to the same surface in that locale (preserves path; swaps
 * locale segment).
 *
 * Magnitude communication: visible 11-locale presence is the multilingual
 * differentiator framing per §1 SEO+embed-virality + §6 11-language
 * commitment. Only Twinkl among Phase-3-benchmarked competitors has any
 * locale switcher; LCS's 11-language single-site surface is structurally
 * distinct.
 *
 * Arc 1 substrate: scaffold-only. Final flag SVGs + visual-design polish
 * land in Arc 2. This component renders functional locale-code labels as
 * placeholders so the structural surface exists for layout testing.
 *
 * Client component because locale-switch behavior reads pathname + dispatches
 * navigation; the Navigation.tsx existing LanguageSelector follows the same
 * 'use client' pattern.
 */
export default function LocaleStrip() {
  const pathname = usePathname();
  const t = useTranslations('homepage.localeStrip');

  // Strip the existing locale segment + replace with each candidate locale
  // when the link is clicked. Path "/en/topic/foo" → "/de/topic/foo" etc.
  function pathInLocale(targetLocale: SupportedLocale): string {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    // First segment is current locale; replace it.
    const isFirstSegmentLocale = (SUPPORTED_LOCALES as readonly string[]).includes(segments[0]);
    if (isFirstSegmentLocale) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return '/' + segments.join('/');
  }

  const currentLocale: SupportedLocale = (() => {
    if (!pathname) return 'en';
    const first = pathname.split('/').filter(Boolean)[0];
    return (SUPPORTED_LOCALES as readonly string[]).includes(first ?? '') ? (first as SupportedLocale) : 'en';
  })();

  return (
    <nav
      id="locale-strip"
      className="container mx-auto px-4 max-w-6xl py-4 flex flex-wrap gap-2 items-center"
      aria-label={t('listLabel')}
    >
      <span className="text-sm font-medium text-ink-600 mr-2">
        {t('heading')}
      </span>
      {SUPPORTED_LOCALES.map((locale) => {
        const isCurrent = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={pathInLocale(locale)}
            hrefLang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isCurrent
                ? 'bg-ink-900 text-cream-50 cursor-default'
                : 'bg-cream-100 text-ink-700 hover:bg-cream-200 hover:text-ink-900'
            }`}
          >
            {/* Arc 1 substrate: locale-code placeholder. Arc 2 replaces with
                flag SVG + native-language display name. */}
            <span className="font-bold uppercase">{locale}</span>
            <span className="hidden sm:inline">{LOCALE_NAMES[locale]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
