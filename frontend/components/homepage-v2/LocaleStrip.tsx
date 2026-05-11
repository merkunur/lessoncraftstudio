'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SUPPORTED_LOCALES, LOCALE_NAMES, type SupportedLocale } from '@/config/locales';

// Locale code → hreflang code per Next.js Metadata API emission (matches
// getHreflangCode at frontend/lib/schema-generator.ts). `pt` emits as `pt-BR`
// (Brazilian Portuguese canonical per §6); other locales map 1:1.
const HREFLANG_CODE_MAP: Record<string, string> = {
  da: 'da', de: 'de', en: 'en', es: 'es', fi: 'fi',
  fr: 'fr', it: 'it', nl: 'nl', no: 'no', pt: 'pt-BR', sv: 'sv',
};

// Locale → ISO 3166-1 alpha-2 country code for flag asset lookup.
// Operator-locked at Arc 2 A1 adjudication (2026-05-06):
// - en→gb (UK), pt→pt (Portugal — unsuffixed locale code defaults to PT per
//   ISO/CLDR; reversible if K-3 audience proves Brazil-weighted).
// - sv→se (Sweden), da→dk; locale-code-vs-country-code distinction kept in
//   the asset namespace so future locale additions sharing a flag don't
//   collide.
const LOCALE_FLAG_ISO2: Record<SupportedLocale, string> = {
  en: 'gb',
  de: 'de',
  es: 'es',
  nl: 'nl',
  fr: 'fr',
  it: 'it',
  pt: 'pt',
  sv: 'se',
  da: 'dk',
  no: 'no',
  fi: 'fi',
};

/**
 * LocaleStrip — Alt A above-the-fold structural-axis surface per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Renders all 11 platform locales (§6) as a flag-strip in the navigation
 * area or hero-adjacent slot. Each entry = flag SVG + native-language
 * display name; click → navigates to the same surface in that locale
 * (preserves path; swaps locale segment).
 *
 * Magnitude communication: visible 11-locale presence is the multilingual
 * differentiator framing per §1 SEO+embed-virality + §6 11-language
 * commitment. Only Twinkl among Phase-3-benchmarked competitors has any
 * locale switcher; LCS's 11-language single-site surface is structurally
 * distinct.
 *
 * Arc 2 (this revision): real flag SVGs from `/flags/<iso2>.svg` (sourced
 * from lipis/flag-icons MIT-licensed library, simplified for strip-render
 * size). Active-state ring + non-active hover-to-full opacity per Arc 2
 * A1 visual spec.
 *
 * Client component because locale-switch behavior reads pathname + dispatches
 * navigation; the Navigation.tsx existing LanguageSelector follows the same
 * 'use client' pattern.
 */
export default function LocaleStrip() {
  const pathname = usePathname();
  const t = useTranslations('homepage.localeStrip');
  const [hreflangUrls, setHreflangUrls] = useState<Record<string, string>>({});

  // Per-locale URL resolution: consume Next.js Metadata API's hreflang
  // alternates as source-of-truth for cross-locale URL equivalents
  // (already emitted on topic pages per §17.4 hreflang doctrine). Falls
  // back to path-segment swap for pages without alternates (homepage,
  // static pages). Path-segment swap is correct for homepage/static
  // pages since `/<locale>` is the locale-invariant route shape; it
  // FAILS for topic pages where the slug differs per locale
  // (§17.4 native-language slug — e.g., /es/topic/suma/ vs /de/topic/addition/).
  useEffect(() => {
    const map: Record<string, string> = {};
    for (const locale of SUPPORTED_LOCALES) {
      const code = HREFLANG_CODE_MAP[locale] || locale;
      const link = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
      if (link) {
        const href = link.getAttribute('href');
        if (href) {
          try {
            map[locale] = new URL(href).pathname;
          } catch {
            // malformed href; fall through to path-segment-swap fallback
          }
        }
      }
    }
    setHreflangUrls(map);
  }, [pathname]);

  // Strip the existing locale segment + replace with each candidate locale
  // when the link is clicked. Path "/en/topic/foo" → "/de/topic/foo" etc.
  // PREFERRED PATH: hreflangUrls (from DOM, populated by useEffect). Falls
  // back to path-segment swap when no alternate exists (homepage / static
  // pages). Deck pages have no cross-locale siblings per §17.8.7 → fall
  // back to /${targetLocale} home.
  function pathInLocale(targetLocale: SupportedLocale): string {
    if (hreflangUrls[targetLocale]) return hreflangUrls[targetLocale];
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[1] === 'decks') return `/${targetLocale}`;
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
        const iso2 = LOCALE_FLAG_ISO2[locale];
        const nativeName = LOCALE_NAMES[locale];
        return (
          <Link
            key={locale}
            href={pathInLocale(locale)}
            hrefLang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isCurrent
                ? 'bg-ink-900 text-cream-50 ring-2 ring-ink-900 ring-offset-2 ring-offset-cream-50 cursor-default'
                : 'bg-cream-100 text-ink-700 opacity-80 hover:opacity-100 hover:bg-cream-200 hover:text-ink-900'
            }`}
          >
            {/* Flag SVG rendered as static image. 24×18 (4:3) gives recognizable
                detail at strip render size; ring-1 ring-ink-900/10 adds subtle
                edge so light flags (Finland, Italy white stripe) read against
                the cream background. aria-hidden because nativeName below is
                the accessible label. */}
            <img
              src={`/flags/${iso2}.svg`}
              alt=""
              aria-hidden="true"
              width={24}
              height={18}
              className="block w-6 h-[18px] rounded-[2px] ring-1 ring-ink-900/10 flex-shrink-0"
            />
            <span className="hidden sm:inline">{nativeName}</span>
            <span className="sm:hidden font-bold uppercase text-xs">{locale}</span>
          </Link>
        );
      })}
    </nav>
  );
}
