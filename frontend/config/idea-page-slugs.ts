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
  { ideaId: 'farm-animals-printable-ideas', slugs: { en: 'farm-animals-printable-ideas', de: 'bauernhoftiere-druckvorlagen-ideen' } },
  { ideaId: 'ocean-animals-printable-ideas', slugs: { en: 'ocean-animals-printable-ideas', de: 'meerestiere-druckvorlagen-ideen' } },
  { ideaId: 'safari-animals-printable-ideas', slugs: { en: 'safari-animals-printable-ideas', de: 'safaritiere-druckvorlagen-ideen' } },
  { ideaId: 'pets-printable-ideas', slugs: { en: 'pets-printable-ideas', de: 'haustiere-druckvorlagen-ideen' } },
  { ideaId: 'dinosaur-printable-ideas', slugs: { en: 'dinosaur-printable-ideas', de: 'dinosaurier-druckvorlagen-ideen' } },
  { ideaId: 'birds-printable-ideas', slugs: { en: 'birds-printable-ideas', de: 'voegel-druckvorlagen-ideen' } },
  { ideaId: 'insects-printable-ideas', slugs: { en: 'insects-printable-ideas', de: 'insekten-druckvorlagen-ideen' } },
  { ideaId: 'forest-animals-printable-ideas', slugs: { en: 'forest-animals-printable-ideas', de: 'waldtiere-druckvorlagen-ideen' } },

  // === Seasons & Holidays (10) ===
  { ideaId: 'christmas-printable-ideas', slugs: { en: 'christmas-printable-ideas', de: 'weihnachten-druckvorlagen-ideen' } },
  { ideaId: 'halloween-printable-ideas', slugs: { en: 'halloween-printable-ideas', de: 'halloween-druckvorlagen-ideen' } },
  { ideaId: 'easter-printable-ideas', slugs: { en: 'easter-printable-ideas', de: 'ostern-druckvorlagen-ideen' } },
  { ideaId: 'valentines-day-printable-ideas', slugs: { en: 'valentines-day-printable-ideas', de: 'valentinstag-druckvorlagen-ideen' } },
  { ideaId: 'back-to-school-printable-ideas', slugs: { en: 'back-to-school-printable-ideas', de: 'schulanfang-druckvorlagen-ideen' } },
  { ideaId: 'summer-printable-ideas', slugs: { en: 'summer-printable-ideas', de: 'sommer-druckvorlagen-ideen' } },
  { ideaId: 'winter-printable-ideas', slugs: { en: 'winter-printable-ideas', de: 'winter-druckvorlagen-ideen' } },
  { ideaId: 'spring-printable-ideas', slugs: { en: 'spring-printable-ideas', de: 'fruehling-druckvorlagen-ideen' } },
  { ideaId: 'thanksgiving-printable-ideas', slugs: { en: 'thanksgiving-printable-ideas', de: 'erntedankfest-druckvorlagen-ideen' } },
  { ideaId: 'parents-day-printable-ideas', slugs: { en: 'parents-day-printable-ideas', de: 'elterntag-druckvorlagen-ideen' } },

  // === Interests & Activities (10) ===
  { ideaId: 'space-printable-ideas', slugs: { en: 'space-printable-ideas', de: 'weltraum-druckvorlagen-ideen' } },
  { ideaId: 'transportation-printable-ideas', slugs: { en: 'transportation-printable-ideas', de: 'fahrzeuge-druckvorlagen-ideen' } },
  { ideaId: 'food-cooking-printable-ideas', slugs: { en: 'food-cooking-printable-ideas', de: 'essen-kochen-druckvorlagen-ideen' } },
  { ideaId: 'sports-printable-ideas', slugs: { en: 'sports-printable-ideas', de: 'sport-druckvorlagen-ideen' } },
  { ideaId: 'music-printable-ideas', slugs: { en: 'music-printable-ideas', de: 'musik-druckvorlagen-ideen' } },
  { ideaId: 'construction-printable-ideas', slugs: { en: 'construction-printable-ideas', de: 'baustelle-druckvorlagen-ideen' } },
  { ideaId: 'pirates-printable-ideas', slugs: { en: 'pirates-printable-ideas', de: 'piraten-druckvorlagen-ideen' } },
  { ideaId: 'fairy-tale-printable-ideas', slugs: { en: 'fairy-tale-printable-ideas', de: 'maerchen-druckvorlagen-ideen' } },
  { ideaId: 'camping-printable-ideas', slugs: { en: 'camping-printable-ideas', de: 'camping-druckvorlagen-ideen' } },
  { ideaId: 'underwater-printable-ideas', slugs: { en: 'underwater-printable-ideas', de: 'unterwasser-druckvorlagen-ideen' } },

  // === Educational Focus (10) ===
  { ideaId: 'preschool-printable-ideas', slugs: { en: 'preschool-printable-ideas', de: 'vorschule-druckvorlagen-ideen' } },
  { ideaId: 'kindergarten-printable-ideas', slugs: { en: 'kindergarten-printable-ideas', de: 'kindergarten-druckvorlagen-ideen' } },
  { ideaId: 'first-grade-printable-ideas', slugs: { en: 'first-grade-printable-ideas', de: 'erste-klasse-druckvorlagen-ideen' } },
  { ideaId: 'second-grade-printable-ideas', slugs: { en: 'second-grade-printable-ideas', de: 'zweite-klasse-druckvorlagen-ideen' } },
  { ideaId: 'third-grade-printable-ideas', slugs: { en: 'third-grade-printable-ideas', de: 'dritte-klasse-druckvorlagen-ideen' } },
  { ideaId: 'homeschool-printable-ideas', slugs: { en: 'homeschool-printable-ideas', de: 'heimunterricht-druckvorlagen-ideen' } },
  { ideaId: 'special-education-printable-ideas', slugs: { en: 'special-education-printable-ideas', de: 'sonderpaedagogik-druckvorlagen-ideen' } },
  { ideaId: 'esl-printable-ideas', slugs: { en: 'esl-printable-ideas', de: 'daf-druckvorlagen-ideen' } },
  { ideaId: 'summer-learning-printable-ideas', slugs: { en: 'summer-learning-printable-ideas', de: 'sommerlernen-druckvorlagen-ideen' } },
  { ideaId: 'math-facts-printable-ideas', slugs: { en: 'math-facts-printable-ideas', de: 'mathe-grundlagen-druckvorlagen-ideen' } },

  // === Business Models (7) ===
  { ideaId: 'subscription-box-printable-ideas', slugs: { en: 'subscription-box-printable-ideas', de: 'abo-box-druckvorlagen-ideen' } },
  { ideaId: 'print-on-demand-printable-ideas', slugs: { en: 'print-on-demand-printable-ideas', de: 'print-on-demand-druckvorlagen-ideen' } },
  { ideaId: 'digital-download-printable-ideas', slugs: { en: 'digital-download-printable-ideas', de: 'digitaler-download-druckvorlagen-ideen' } },
  { ideaId: 'physical-printable-product-ideas', slugs: { en: 'physical-printable-product-ideas', de: 'physische-druckvorlagen-produkt-ideen' } },
  { ideaId: 'party-supply-printable-ideas', slugs: { en: 'party-supply-printable-ideas', de: 'partyzubehoer-druckvorlagen-ideen' } },
  { ideaId: 'custom-worksheet-service-ideas', slugs: { en: 'custom-worksheet-service-ideas', de: 'arbeitsblatt-service-ideen' } },
  { ideaId: 'bulk-licensing-printable-ideas', slugs: { en: 'bulk-licensing-printable-ideas', de: 'massenlizenz-druckvorlagen-ideen' } },
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
