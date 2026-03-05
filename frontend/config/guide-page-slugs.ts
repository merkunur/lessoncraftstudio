/**
 * Guide Page Slug Configuration
 *
 * This file maps each guide to its language-specific SEO slugs for /guides/ pages.
 * Covers 65 "Create X" guides across 3 subcategories:
 * Platform Guides (20), Product Creation Guides (25), Business Strategy Guides (20).
 *
 * Example:
 * - English: /en/guides/create-addition-worksheets
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface GuideSlugConfig {
  guideId: string;  // Internal guide identifier (= English slug)
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
 * Guide page slug configuration for all 65 guides.
 * Add language-specific slugs as guide pages are created for each language.
 */
export const guidePageSlugs: GuideSlugConfig[] = [
  // === Platform Guides (20) ===
  { guideId: 'sell-math-worksheets-etsy', slugs: { en: 'sell-math-worksheets-etsy' } },
  { guideId: 'sell-word-search-etsy', slugs: { en: 'sell-word-search-etsy' } },
  { guideId: 'start-etsy-printable-shop', slugs: { en: 'start-etsy-printable-shop' } },
  { guideId: 'create-etsy-coloring-pages', slugs: { en: 'create-etsy-coloring-pages' } },
  { guideId: 'sell-educational-printables-etsy', slugs: { en: 'sell-educational-printables-etsy' } },
  { guideId: 'price-etsy-printables', slugs: { en: 'price-etsy-printables' } },
  { guideId: 'etsy-seo-educational-printables', slugs: { en: 'etsy-seo-educational-printables' } },
  { guideId: 'create-etsy-worksheet-bundles', slugs: { en: 'create-etsy-worksheet-bundles' } },
  { guideId: 'math-activity-books-kdp', slugs: { en: 'math-activity-books-kdp' } },
  { guideId: 'publish-puzzle-books-kdp', slugs: { en: 'publish-puzzle-books-kdp' } },
  { guideId: 'word-search-books-kdp', slugs: { en: 'word-search-books-kdp' } },
  { guideId: 'make-money-kdp-activity-books', slugs: { en: 'make-money-kdp-activity-books' } },
  { guideId: 'kdp-formatting-worksheets', slugs: { en: 'kdp-formatting-worksheets' } },
  { guideId: 'best-kdp-activity-book-niches', slugs: { en: 'best-kdp-activity-book-niches' } },
  { guideId: 'sudoku-books-kdp', slugs: { en: 'sudoku-books-kdp' } },
  { guideId: 'kdp-vs-etsy-printables', slugs: { en: 'kdp-vs-etsy-printables' } },
  { guideId: 'create-sell-tpt-resources', slugs: { en: 'create-sell-tpt-resources' } },
  { guideId: 'tpt-store-optimization', slugs: { en: 'tpt-store-optimization' } },
  { guideId: 'sell-printables-gumroad', slugs: { en: 'sell-printables-gumroad' } },
  { guideId: 'sell-creative-fabrica', slugs: { en: 'sell-creative-fabrica' } },

  // === Product Creation Guides (25) ===
  { guideId: 'create-addition-worksheets', slugs: { en: 'create-addition-worksheets' } },
  { guideId: 'create-subtraction-worksheets', slugs: { en: 'create-subtraction-worksheets' } },
  { guideId: 'create-word-search-puzzles', slugs: { en: 'create-word-search-puzzles' } },
  { guideId: 'create-crossword-puzzles', slugs: { en: 'create-crossword-puzzles' } },
  { guideId: 'create-math-puzzle-worksheets', slugs: { en: 'create-math-puzzle-worksheets' } },
  { guideId: 'create-handwriting-sheets', slugs: { en: 'create-handwriting-sheets' } },
  { guideId: 'create-coloring-pages', slugs: { en: 'create-coloring-pages' } },
  { guideId: 'create-bingo-cards', slugs: { en: 'create-bingo-cards' } },
  { guideId: 'create-matching-worksheets', slugs: { en: 'create-matching-worksheets' } },
  { guideId: 'create-pattern-worksheets', slugs: { en: 'create-pattern-worksheets' } },
  { guideId: 'create-picture-sudoku', slugs: { en: 'create-picture-sudoku' } },
  { guideId: 'create-maze-worksheets', slugs: { en: 'create-maze-worksheets' } },
  { guideId: 'create-hidden-object-worksheets', slugs: { en: 'create-hidden-object-worksheets' } },
  { guideId: 'create-size-comparison-worksheets', slugs: { en: 'create-size-comparison-worksheets' } },
  { guideId: 'create-counting-worksheets', slugs: { en: 'create-counting-worksheets' } },
  { guideId: 'create-drawing-worksheets', slugs: { en: 'create-drawing-worksheets' } },
  { guideId: 'create-sorting-worksheets', slugs: { en: 'create-sorting-worksheets' } },
  { guideId: 'create-shadow-matching-worksheets', slugs: { en: 'create-shadow-matching-worksheets' } },
  { guideId: 'create-odd-one-out-puzzles', slugs: { en: 'create-odd-one-out-puzzles' } },
  { guideId: 'create-missing-pieces-puzzles', slugs: { en: 'create-missing-pieces-puzzles' } },
  { guideId: 'create-treasure-hunt-worksheets', slugs: { en: 'create-treasure-hunt-worksheets' } },
  { guideId: 'create-alphabet-worksheets', slugs: { en: 'create-alphabet-worksheets' } },
  { guideId: 'create-preposition-worksheets', slugs: { en: 'create-preposition-worksheets' } },
  { guideId: 'create-cryptogram-puzzles', slugs: { en: 'create-cryptogram-puzzles' } },
  { guideId: 'create-chart-count-worksheets', slugs: { en: 'create-chart-count-worksheets' } },

  // === Business Strategy Guides (20) ===
  { guideId: 'create-worksheet-bundles', slugs: { en: 'create-worksheet-bundles' } },
  { guideId: 'niche-selection-printables', slugs: { en: 'niche-selection-printables' } },
  { guideId: 'create-printable-product-line', slugs: { en: 'create-printable-product-line' } },
  { guideId: 'pricing-educational-printables', slugs: { en: 'pricing-educational-printables' } },
  { guideId: 'scale-printable-business-guide', slugs: { en: 'scale-printable-business-guide' } },
  { guideId: 'passive-income-worksheets', slugs: { en: 'passive-income-worksheets' } },
  { guideId: 'understanding-commercial-licenses', slugs: { en: 'understanding-commercial-licenses' } },
  { guideId: 'research-profitable-niches', slugs: { en: 'research-profitable-niches' } },
  { guideId: 'multilingual-printable-business', slugs: { en: 'multilingual-printable-business' } },
  { guideId: 'worksheets-multiple-languages', slugs: { en: 'worksheets-multiple-languages' } },
  { guideId: 'copyright-printable-sellers', slugs: { en: 'copyright-printable-sellers' } },
  { guideId: 'customer-support-digital-products', slugs: { en: 'customer-support-digital-products' } },
  { guideId: 'automate-printable-business', slugs: { en: 'automate-printable-business' } },
  { guideId: 'social-media-printable-marketing', slugs: { en: 'social-media-printable-marketing' } },
  { guideId: 'pinterest-marketing-worksheets', slugs: { en: 'pinterest-marketing-worksheets' } },
  { guideId: 'email-marketing-printables', slugs: { en: 'email-marketing-printables' } },
  { guideId: 'get-reviews-printable-products', slugs: { en: 'get-reviews-printable-products' } },
  { guideId: 'seasonal-marketing-printables', slugs: { en: 'seasonal-marketing-printables' } },
  { guideId: 'digital-vs-physical-printables', slugs: { en: 'digital-vs-physical-printables' } },
  { guideId: 'quality-standards-worksheets', slugs: { en: 'quality-standards-worksheets' } },
];

/**
 * Get the slug for a specific guide and locale
 */
export function getGuideSlugForLocale(guideId: string, locale: SupportedLocale): string | undefined {
  const config = guidePageSlugs.find(c => c.guideId === guideId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the guide config from any slug (in any language)
 */
export function getGuideConfigBySlug(slug: string): { guideId: string; locale: SupportedLocale } | undefined {
  for (const config of guidePageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { guideId: config.guideId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllGuidePageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of guidePageSlugs) {
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
export function getGuideAlternateUrls(guideId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = guidePageSlugs.find(c => c.guideId === guideId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/guides/${slug}`;
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
export function hasGuidePage(slug: string, locale: SupportedLocale): boolean {
  const config = getGuideConfigBySlug(slug);
  if (!config) return false;

  const guideConfig = guidePageSlugs.find(c => c.guideId === config.guideId);
  return guideConfig?.slugs[locale] === slug;
}
