/**
 * Start Page Slug Configuration
 *
 * This file maps each cornerstone guide to its language-specific SEO slugs for /start/ pages.
 * Covers 12 Business Cornerstone Guides covering the complete printable business journey.
 *
 * Example:
 * - English: /en/start/complete-guide-printable-business
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface StartSlugConfig {
  startId: string;  // Internal start guide identifier (= English slug)
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
 * Start page slug configuration for all 12 cornerstone guides.
 * Add language-specific slugs as start pages are created for each language.
 */
export const startPageSlugs: StartSlugConfig[] = [
  { startId: 'complete-guide-printable-business', slugs: { en: 'complete-guide-printable-business' } },
  { startId: 'create-worksheets-that-sell', slugs: { en: 'create-worksheets-that-sell' } },
  { startId: 'printable-business-blueprint', slugs: { en: 'printable-business-blueprint' } },
  { startId: 'etsy-printable-business', slugs: { en: 'etsy-printable-business' } },
  { startId: 'amazon-kdp-activity-books', slugs: { en: 'amazon-kdp-activity-books' } },
  { startId: 'create-multilingual-worksheets', slugs: { en: 'create-multilingual-worksheets' } },
  { startId: 'commercial-license-guide', slugs: { en: 'commercial-license-guide' } },
  { startId: 'printable-business-income', slugs: { en: 'printable-business-income' } },
  { startId: 'tools-for-printable-business', slugs: { en: 'tools-for-printable-business' } },
  { startId: 'marketing-printable-business', slugs: { en: 'marketing-printable-business' } },
  { startId: 'scaling-printable-business', slugs: { en: 'scaling-printable-business' } },
  { startId: 'printable-business-legal', slugs: { en: 'printable-business-legal' } },
];

/**
 * Get the slug for a specific start guide and locale
 */
export function getStartSlugForLocale(startId: string, locale: SupportedLocale): string | undefined {
  const config = startPageSlugs.find(c => c.startId === startId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the start config from any slug (in any language)
 */
export function getStartConfigBySlug(slug: string): { startId: string; locale: SupportedLocale } | undefined {
  for (const config of startPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { startId: config.startId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllStartPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of startPageSlugs) {
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
export function getStartAlternateUrls(startId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = startPageSlugs.find(c => c.startId === startId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/start/${slug}`;
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
export function hasStartPage(slug: string, locale: SupportedLocale): boolean {
  const config = getStartConfigBySlug(slug);
  if (!config) return false;

  const startConfig = startPageSlugs.find(c => c.startId === config.startId);
  return startConfig?.slugs[locale] === slug;
}
