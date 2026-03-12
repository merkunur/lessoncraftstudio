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
  { ideaId: 'farm-animals-printable-ideas', slugs: { en: 'farm-animals-printable-ideas', de: 'bauernhoftiere-druckvorlagen-ideen', fr: 'animaux-ferme-idees-imprimables' } },
  { ideaId: 'ocean-animals-printable-ideas', slugs: { en: 'ocean-animals-printable-ideas', de: 'meerestiere-druckvorlagen-ideen', fr: 'animaux-marins-idees-imprimables' } },
  { ideaId: 'safari-animals-printable-ideas', slugs: { en: 'safari-animals-printable-ideas', de: 'safaritiere-druckvorlagen-ideen', fr: 'animaux-safari-idees-imprimables' } },
  { ideaId: 'pets-printable-ideas', slugs: { en: 'pets-printable-ideas', de: 'haustiere-druckvorlagen-ideen', fr: 'animaux-compagnie-idees-imprimables' } },
  { ideaId: 'dinosaur-printable-ideas', slugs: { en: 'dinosaur-printable-ideas', de: 'dinosaurier-druckvorlagen-ideen', fr: 'dinosaures-idees-imprimables' } },
  { ideaId: 'birds-printable-ideas', slugs: { en: 'birds-printable-ideas', de: 'voegel-druckvorlagen-ideen', fr: 'oiseaux-idees-imprimables' } },
  { ideaId: 'insects-printable-ideas', slugs: { en: 'insects-printable-ideas', de: 'insekten-druckvorlagen-ideen', fr: 'insectes-idees-imprimables' } },
  { ideaId: 'forest-animals-printable-ideas', slugs: { en: 'forest-animals-printable-ideas', de: 'waldtiere-druckvorlagen-ideen', fr: 'animaux-foret-idees-imprimables' } },

  // === Seasons & Holidays (10) ===
  { ideaId: 'christmas-printable-ideas', slugs: { en: 'christmas-printable-ideas', de: 'weihnachten-druckvorlagen-ideen', fr: 'noel-idees-imprimables' } },
  { ideaId: 'halloween-printable-ideas', slugs: { en: 'halloween-printable-ideas', de: 'halloween-druckvorlagen-ideen', fr: 'halloween-idees-imprimables' } },
  { ideaId: 'easter-printable-ideas', slugs: { en: 'easter-printable-ideas', de: 'ostern-druckvorlagen-ideen', fr: 'paques-idees-imprimables' } },
  { ideaId: 'valentines-day-printable-ideas', slugs: { en: 'valentines-day-printable-ideas', de: 'valentinstag-druckvorlagen-ideen', fr: 'saint-valentin-idees-imprimables' } },
  { ideaId: 'back-to-school-printable-ideas', slugs: { en: 'back-to-school-printable-ideas', de: 'schulanfang-druckvorlagen-ideen', fr: 'rentree-scolaire-idees-imprimables' } },
  { ideaId: 'summer-printable-ideas', slugs: { en: 'summer-printable-ideas', de: 'sommer-druckvorlagen-ideen', fr: 'ete-idees-imprimables' } },
  { ideaId: 'winter-printable-ideas', slugs: { en: 'winter-printable-ideas', de: 'winter-druckvorlagen-ideen', fr: 'hiver-idees-imprimables' } },
  { ideaId: 'spring-printable-ideas', slugs: { en: 'spring-printable-ideas', de: 'fruehling-druckvorlagen-ideen', fr: 'printemps-idees-imprimables' } },
  { ideaId: 'thanksgiving-printable-ideas', slugs: { en: 'thanksgiving-printable-ideas', de: 'erntedankfest-druckvorlagen-ideen', fr: 'action-de-grace-idees-imprimables' } },
  { ideaId: 'parents-day-printable-ideas', slugs: { en: 'parents-day-printable-ideas', de: 'elterntag-druckvorlagen-ideen', fr: 'fete-des-parents-idees-imprimables' } },

  // === Interests & Activities (10) ===
  { ideaId: 'space-printable-ideas', slugs: { en: 'space-printable-ideas', de: 'weltraum-druckvorlagen-ideen', fr: 'espace-idees-imprimables' } },
  { ideaId: 'transportation-printable-ideas', slugs: { en: 'transportation-printable-ideas', de: 'fahrzeuge-druckvorlagen-ideen', fr: 'transports-idees-imprimables' } },
  { ideaId: 'food-cooking-printable-ideas', slugs: { en: 'food-cooking-printable-ideas', de: 'essen-kochen-druckvorlagen-ideen', fr: 'cuisine-alimentation-idees-imprimables' } },
  { ideaId: 'sports-printable-ideas', slugs: { en: 'sports-printable-ideas', de: 'sport-druckvorlagen-ideen', fr: 'sports-idees-imprimables' } },
  { ideaId: 'music-printable-ideas', slugs: { en: 'music-printable-ideas', de: 'musik-druckvorlagen-ideen', fr: 'musique-idees-imprimables' } },
  { ideaId: 'construction-printable-ideas', slugs: { en: 'construction-printable-ideas', de: 'baustelle-druckvorlagen-ideen', fr: 'chantier-idees-imprimables' } },
  { ideaId: 'pirates-printable-ideas', slugs: { en: 'pirates-printable-ideas', de: 'piraten-druckvorlagen-ideen', fr: 'pirates-idees-imprimables' } },
  { ideaId: 'fairy-tale-printable-ideas', slugs: { en: 'fairy-tale-printable-ideas', de: 'maerchen-druckvorlagen-ideen', fr: 'contes-fees-idees-imprimables' } },
  { ideaId: 'camping-printable-ideas', slugs: { en: 'camping-printable-ideas', de: 'camping-druckvorlagen-ideen', fr: 'camping-idees-imprimables' } },
  { ideaId: 'underwater-printable-ideas', slugs: { en: 'underwater-printable-ideas', de: 'unterwasser-druckvorlagen-ideen', fr: 'sous-marin-idees-imprimables' } },

  // === Educational Focus (10) ===
  { ideaId: 'preschool-printable-ideas', slugs: { en: 'preschool-printable-ideas', de: 'vorschule-druckvorlagen-ideen', fr: 'maternelle-idees-imprimables' } },
  { ideaId: 'kindergarten-printable-ideas', slugs: { en: 'kindergarten-printable-ideas', de: 'kindergarten-druckvorlagen-ideen', fr: 'grande-section-idees-imprimables' } },
  { ideaId: 'first-grade-printable-ideas', slugs: { en: 'first-grade-printable-ideas', de: 'erste-klasse-druckvorlagen-ideen', fr: 'cp-idees-imprimables' } },
  { ideaId: 'second-grade-printable-ideas', slugs: { en: 'second-grade-printable-ideas', de: 'zweite-klasse-druckvorlagen-ideen', fr: 'ce1-idees-imprimables' } },
  { ideaId: 'third-grade-printable-ideas', slugs: { en: 'third-grade-printable-ideas', de: 'dritte-klasse-druckvorlagen-ideen', fr: 'ce2-idees-imprimables' } },
  { ideaId: 'homeschool-printable-ideas', slugs: { en: 'homeschool-printable-ideas', de: 'heimunterricht-druckvorlagen-ideen', fr: 'ecole-maison-idees-imprimables' } },
  { ideaId: 'special-education-printable-ideas', slugs: { en: 'special-education-printable-ideas', de: 'sonderpaedagogik-druckvorlagen-ideen', fr: 'education-specialisee-idees-imprimables' } },
  { ideaId: 'esl-printable-ideas', slugs: { en: 'esl-printable-ideas', de: 'daf-druckvorlagen-ideen', fr: 'fle-idees-imprimables' } },
  { ideaId: 'summer-learning-printable-ideas', slugs: { en: 'summer-learning-printable-ideas', de: 'sommerlernen-druckvorlagen-ideen', fr: 'apprentissage-ete-idees-imprimables' } },
  { ideaId: 'math-facts-printable-ideas', slugs: { en: 'math-facts-printable-ideas', de: 'mathe-grundlagen-druckvorlagen-ideen', fr: 'bases-maths-idees-imprimables' } },

  // === Business Models (7) ===
  { ideaId: 'subscription-box-printable-ideas', slugs: { en: 'subscription-box-printable-ideas', de: 'abo-box-druckvorlagen-ideen', fr: 'box-abonnement-idees-imprimables' } },
  { ideaId: 'print-on-demand-printable-ideas', slugs: { en: 'print-on-demand-printable-ideas', de: 'print-on-demand-druckvorlagen-ideen', fr: 'impression-demande-idees-imprimables' } },
  { ideaId: 'digital-download-printable-ideas', slugs: { en: 'digital-download-printable-ideas', de: 'digitaler-download-druckvorlagen-ideen', fr: 'telechargement-numerique-idees-imprimables' } },
  { ideaId: 'physical-printable-product-ideas', slugs: { en: 'physical-printable-product-ideas', de: 'physische-druckvorlagen-produkt-ideen', fr: 'produits-imprimes-physiques-idees' } },
  { ideaId: 'party-supply-printable-ideas', slugs: { en: 'party-supply-printable-ideas', de: 'partyzubehoer-druckvorlagen-ideen', fr: 'fournitures-fete-idees-imprimables' } },
  { ideaId: 'custom-worksheet-service-ideas', slugs: { en: 'custom-worksheet-service-ideas', de: 'arbeitsblatt-service-ideen', fr: 'service-fiches-personnalisees-idees' } },
  { ideaId: 'bulk-licensing-printable-ideas', slugs: { en: 'bulk-licensing-printable-ideas', de: 'massenlizenz-druckvorlagen-ideen', fr: 'licences-volume-idees-imprimables' } },
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
