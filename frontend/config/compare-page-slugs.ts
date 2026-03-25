/**
 * Compare Page Slug Configuration
 *
 * Maps each comparison page to its language-specific SEO slugs for /compare/ pages.
 * Targets high-intent "alternative" and comparison keywords.
 *
 * Example:
 * - English: /en/compare/lessoncraftstudio-vs-book-bolt
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface CompareSlugConfig {
  compareId: string;  // Internal identifier
  slugs: {
    en: string;
    de?: string;
    fr?: string;
    es?: string;
    it?: string;
    pt?: string;
    nl?: string;
    da?: string;
    sv?: string;
    no?: string;
    fi?: string;
  };
}

/**
 * Compare page slug configuration.
 * English-only for now; add localized slugs as translations are created.
 */
export const comparePageSlugs: CompareSlugConfig[] = [
  { compareId: 'lcs-vs-book-bolt', slugs: { en: "lessoncraftstudio-vs-book-bolt" } },
  { compareId: 'best-puzzle-book-software', slugs: { en: "best-puzzle-book-software-2026" } },
  { compareId: 'lcs-vs-canva', slugs: { en: "lessoncraftstudio-vs-canva-printables" } },
];

/**
 * Get the slug for a specific comparison and locale
 */
export function getCompareSlugForLocale(compareId: string, locale: SupportedLocale): string | undefined {
  const config = comparePageSlugs.find(c => c.compareId === compareId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en;
}

/**
 * Get the compare config from any slug (in any language)
 */
export function getCompareConfigBySlug(slug: string): { compareId: string; locale: SupportedLocale } | undefined {
  for (const config of comparePageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { compareId: config.compareId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllComparePageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of comparePageSlugs) {
    for (const [locale, slug] of Object.entries(config.slugs)) {
      if (slug) {
        result.push({ locale: locale as SupportedLocale, slug });
      }
    }
  }

  return result;
}

/**
 * Get alternate language URLs for hreflang tags
 */
export function getCompareAlternateUrls(compareId: string, baseUrl: string = "https://www.lessoncraftstudio.com"): Record<string, string> {
  const config = comparePageSlugs.find(c => c.compareId === compareId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/compare/${slug}`;
    }
  }

  if (alternates['en']) {
    alternates['x-default'] = alternates['en'];
  }

  return alternates;
}

/**
 * Check if a compare page exists for a specific slug
 */
export function hasComparePage(slug: string, locale: SupportedLocale): boolean {
  const config = getCompareConfigBySlug(slug);
  if (!config) return false;
  const compareConfig = comparePageSlugs.find(c => c.compareId === config.compareId);
  return compareConfig?.slugs[locale] === slug;
}
