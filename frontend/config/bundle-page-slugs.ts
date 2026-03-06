/**
 * Bundle Page Slug Configuration
 *
 * This file maps each bundle to its language-specific SEO slugs for /bundles/ pages.
 * Each bundle corresponds to one of the 6 app categories.
 *
 * Example:
 * - English: /en/bundles/math-mastery-bundle
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface BundleSlugConfig {
  bundleId: string;  // Internal bundle identifier (matches category bundle naming)
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
 * Bundle page slug configuration for all 6 category bundles.
 * Add language-specific slugs as bundle pages are created for each language.
 */
export const bundlePageSlugs: BundleSlugConfig[] = [
  {
    bundleId: 'math-bundle',
    slugs: {
      en: 'math-mastery-bundle',
      de: 'mathematik-meister-paket',
    },
  },
  {
    bundleId: 'literacy-bundle',
    slugs: {
      en: 'literacy-language-bundle',
      de: 'lese-sprach-paket',
    },
  },
  {
    bundleId: 'visual-bundle',
    slugs: {
      en: 'visual-learning-bundle',
      de: 'visuelles-lernen-paket',
    },
  },
  {
    bundleId: 'matching-bundle',
    slugs: {
      en: 'matching-sorting-bundle',
      de: 'zuordnung-sortierung-paket',
    },
  },
  {
    bundleId: 'puzzle-bundle',
    slugs: {
      en: 'puzzles-logic-bundle',
      de: 'raetsel-logik-paket',
    },
  },
  {
    bundleId: 'search-bundle',
    slugs: {
      en: 'search-find-bundle',
      de: 'suchen-finden-paket',
    },
  },
];

/**
 * Get the slug for a specific bundle and locale
 */
export function getBundleSlugForLocale(bundleId: string, locale: SupportedLocale): string | undefined {
  const config = bundlePageSlugs.find(c => c.bundleId === bundleId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the bundle config from any slug (in any language)
 */
export function getBundleConfigBySlug(slug: string): { bundleId: string; locale: SupportedLocale } | undefined {
  for (const config of bundlePageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { bundleId: config.bundleId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllBundlePageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of bundlePageSlugs) {
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
 * Uses regional hreflang codes for pt-BR and es-MX
 */
export function getBundleAlternateUrls(bundleId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = bundlePageSlugs.find(c => c.bundleId === bundleId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/bundles/${slug}`;
    }
  }

  // Add x-default pointing to English version for unspecified regions
  if (alternates['en']) {
    alternates['x-default'] = alternates['en'];
  }

  return alternates;
}

/**
 * Check if a slug exists for a specific locale
 */
export function hasBundlePage(slug: string, locale: SupportedLocale): boolean {
  const config = getBundleConfigBySlug(slug);
  if (!config) return false;

  const bundleConfig = bundlePageSlugs.find(c => c.bundleId === config.bundleId);
  return bundleConfig?.slugs[locale] === slug;
}
