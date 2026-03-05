/**
 * Idea Page Slug Configuration
 *
 * This file maps each niche/theme idea page to its language-specific SEO slugs for /ideas/ pages.
 * Covers 45 idea pages across 5 subcategories:
 * Animals & Nature (8), Seasons & Holidays (10), Interests & Activities (10),
 * Educational Focus (10), Business Models (7).
 *
 * Example:
 * - English: /en/ideas/farm-animals-printable-ideas
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface IdeaSlugConfig {
  ideaId: string;  // Internal idea identifier (= English slug)
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
 * Idea page slug configuration for all 45 idea pages.
 * Add language-specific slugs as idea pages are created for each language.
 */
export const ideaPageSlugs: IdeaSlugConfig[] = [
  // === Animals & Nature (8) ===
  { ideaId: 'farm-animals-printable-ideas', slugs: { en: 'farm-animals-printable-ideas' } },
  { ideaId: 'ocean-animals-printable-ideas', slugs: { en: 'ocean-animals-printable-ideas' } },
  { ideaId: 'safari-animals-printable-ideas', slugs: { en: 'safari-animals-printable-ideas' } },
  { ideaId: 'pets-printable-ideas', slugs: { en: 'pets-printable-ideas' } },
  { ideaId: 'dinosaur-printable-ideas', slugs: { en: 'dinosaur-printable-ideas' } },
  { ideaId: 'birds-printable-ideas', slugs: { en: 'birds-printable-ideas' } },
  { ideaId: 'insects-printable-ideas', slugs: { en: 'insects-printable-ideas' } },
  { ideaId: 'forest-animals-printable-ideas', slugs: { en: 'forest-animals-printable-ideas' } },

  // === Seasons & Holidays (10) ===
  { ideaId: 'christmas-printable-ideas', slugs: { en: 'christmas-printable-ideas' } },
  { ideaId: 'halloween-printable-ideas', slugs: { en: 'halloween-printable-ideas' } },
  { ideaId: 'easter-printable-ideas', slugs: { en: 'easter-printable-ideas' } },
  { ideaId: 'valentines-day-printable-ideas', slugs: { en: 'valentines-day-printable-ideas' } },
  { ideaId: 'back-to-school-printable-ideas', slugs: { en: 'back-to-school-printable-ideas' } },
  { ideaId: 'summer-printable-ideas', slugs: { en: 'summer-printable-ideas' } },
  { ideaId: 'winter-printable-ideas', slugs: { en: 'winter-printable-ideas' } },
  { ideaId: 'spring-printable-ideas', slugs: { en: 'spring-printable-ideas' } },
  { ideaId: 'thanksgiving-printable-ideas', slugs: { en: 'thanksgiving-printable-ideas' } },
  { ideaId: 'parents-day-printable-ideas', slugs: { en: 'parents-day-printable-ideas' } },

  // === Interests & Activities (10) ===
  { ideaId: 'space-printable-ideas', slugs: { en: 'space-printable-ideas' } },
  { ideaId: 'transportation-printable-ideas', slugs: { en: 'transportation-printable-ideas' } },
  { ideaId: 'food-cooking-printable-ideas', slugs: { en: 'food-cooking-printable-ideas' } },
  { ideaId: 'sports-printable-ideas', slugs: { en: 'sports-printable-ideas' } },
  { ideaId: 'music-printable-ideas', slugs: { en: 'music-printable-ideas' } },
  { ideaId: 'construction-printable-ideas', slugs: { en: 'construction-printable-ideas' } },
  { ideaId: 'pirates-printable-ideas', slugs: { en: 'pirates-printable-ideas' } },
  { ideaId: 'fairy-tale-printable-ideas', slugs: { en: 'fairy-tale-printable-ideas' } },
  { ideaId: 'camping-printable-ideas', slugs: { en: 'camping-printable-ideas' } },
  { ideaId: 'underwater-printable-ideas', slugs: { en: 'underwater-printable-ideas' } },

  // === Educational Focus (10) ===
  { ideaId: 'preschool-printable-ideas', slugs: { en: 'preschool-printable-ideas' } },
  { ideaId: 'kindergarten-printable-ideas', slugs: { en: 'kindergarten-printable-ideas' } },
  { ideaId: 'first-grade-printable-ideas', slugs: { en: 'first-grade-printable-ideas' } },
  { ideaId: 'second-grade-printable-ideas', slugs: { en: 'second-grade-printable-ideas' } },
  { ideaId: 'third-grade-printable-ideas', slugs: { en: 'third-grade-printable-ideas' } },
  { ideaId: 'homeschool-printable-ideas', slugs: { en: 'homeschool-printable-ideas' } },
  { ideaId: 'special-education-printable-ideas', slugs: { en: 'special-education-printable-ideas' } },
  { ideaId: 'esl-printable-ideas', slugs: { en: 'esl-printable-ideas' } },
  { ideaId: 'summer-learning-printable-ideas', slugs: { en: 'summer-learning-printable-ideas' } },
  { ideaId: 'math-facts-printable-ideas', slugs: { en: 'math-facts-printable-ideas' } },

  // === Business Models (7) ===
  { ideaId: 'subscription-box-printable-ideas', slugs: { en: 'subscription-box-printable-ideas' } },
  { ideaId: 'print-on-demand-printable-ideas', slugs: { en: 'print-on-demand-printable-ideas' } },
  { ideaId: 'digital-download-printable-ideas', slugs: { en: 'digital-download-printable-ideas' } },
  { ideaId: 'physical-printable-product-ideas', slugs: { en: 'physical-printable-product-ideas' } },
  { ideaId: 'party-supply-printable-ideas', slugs: { en: 'party-supply-printable-ideas' } },
  { ideaId: 'custom-worksheet-service-ideas', slugs: { en: 'custom-worksheet-service-ideas' } },
  { ideaId: 'bulk-licensing-printable-ideas', slugs: { en: 'bulk-licensing-printable-ideas' } },
];

/**
 * Get the slug for a specific idea and locale
 */
export function getIdeaSlugForLocale(ideaId: string, locale: SupportedLocale): string | undefined {
  const config = ideaPageSlugs.find(c => c.ideaId === ideaId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the idea config from any slug (in any language)
 */
export function getIdeaConfigBySlug(slug: string): { ideaId: string; locale: SupportedLocale } | undefined {
  for (const config of ideaPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { ideaId: config.ideaId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllIdeaPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of ideaPageSlugs) {
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
export function getIdeaAlternateUrls(ideaId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = ideaPageSlugs.find(c => c.ideaId === ideaId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/ideas/${slug}`;
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
export function hasIdeaPage(slug: string, locale: SupportedLocale): boolean {
  const config = getIdeaConfigBySlug(slug);
  if (!config) return false;

  const ideaConfig = ideaPageSlugs.find(c => c.ideaId === config.ideaId);
  return ideaConfig?.slugs[locale] === slug;
}
