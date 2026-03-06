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
  { guideId: 'sell-math-worksheets-etsy', slugs: { en: 'sell-math-worksheets-etsy', de: 'mathe-arbeitsblaetter-verkaufen-etsy' } },
  { guideId: 'sell-word-search-etsy', slugs: { en: 'sell-word-search-etsy', de: 'wortsuche-verkaufen-etsy' } },
  { guideId: 'start-etsy-printable-shop', slugs: { en: 'start-etsy-printable-shop', de: 'etsy-druckvorlagen-shop-starten' } },
  { guideId: 'create-etsy-coloring-pages', slugs: { en: 'create-etsy-coloring-pages', de: 'etsy-malvorlagen-erstellen' } },
  { guideId: 'sell-educational-printables-etsy', slugs: { en: 'sell-educational-printables-etsy', de: 'lernmaterial-verkaufen-etsy' } },
  { guideId: 'price-etsy-printables', slugs: { en: 'price-etsy-printables', de: 'etsy-druckvorlagen-preise' } },
  { guideId: 'etsy-seo-educational-printables', slugs: { en: 'etsy-seo-educational-printables', de: 'etsy-seo-lernmaterial' } },
  { guideId: 'create-etsy-worksheet-bundles', slugs: { en: 'create-etsy-worksheet-bundles', de: 'etsy-arbeitsblatt-pakete-erstellen' } },
  { guideId: 'math-activity-books-kdp', slugs: { en: 'math-activity-books-kdp', de: 'mathe-aktivitaetsbuecher-kdp' } },
  { guideId: 'publish-puzzle-books-kdp', slugs: { en: 'publish-puzzle-books-kdp', de: 'raetselbuecher-veroeffentlichen-kdp' } },
  { guideId: 'word-search-books-kdp', slugs: { en: 'word-search-books-kdp', de: 'wortsuchbuecher-kdp' } },
  { guideId: 'make-money-kdp-activity-books', slugs: { en: 'make-money-kdp-activity-books', de: 'geld-verdienen-kdp-aktivitaetsbuecher' } },
  { guideId: 'kdp-formatting-worksheets', slugs: { en: 'kdp-formatting-worksheets', de: 'kdp-formatierung-arbeitsblaetter' } },
  { guideId: 'best-kdp-activity-book-niches', slugs: { en: 'best-kdp-activity-book-niches', de: 'beste-kdp-aktivitaetsbuch-nischen' } },
  { guideId: 'sudoku-books-kdp', slugs: { en: 'sudoku-books-kdp', de: 'sudoku-buecher-kdp' } },
  { guideId: 'kdp-vs-etsy-printables', slugs: { en: 'kdp-vs-etsy-printables', de: 'kdp-oder-etsy-druckvorlagen' } },
  { guideId: 'create-sell-tpt-resources', slugs: { en: 'create-sell-tpt-resources', de: 'tpt-materialien-erstellen-verkaufen' } },
  { guideId: 'tpt-store-optimization', slugs: { en: 'tpt-store-optimization', de: 'tpt-shop-optimierung' } },
  { guideId: 'sell-printables-gumroad', slugs: { en: 'sell-printables-gumroad', de: 'druckvorlagen-verkaufen-gumroad' } },
  { guideId: 'sell-creative-fabrica', slugs: { en: 'sell-creative-fabrica', de: 'verkaufen-creative-fabrica' } },

  // === Product Creation Guides (25) ===
  { guideId: 'create-addition-worksheets', slugs: { en: 'create-addition-worksheets', de: 'additions-arbeitsblaetter-erstellen' } },
  { guideId: 'create-subtraction-worksheets', slugs: { en: 'create-subtraction-worksheets', de: 'subtraktions-arbeitsblaetter-erstellen' } },
  { guideId: 'create-word-search-puzzles', slugs: { en: 'create-word-search-puzzles', de: 'wortsuche-raetsel-erstellen' } },
  { guideId: 'create-crossword-puzzles', slugs: { en: 'create-crossword-puzzles', de: 'kreuzwortraetsel-erstellen' } },
  { guideId: 'create-math-puzzle-worksheets', slugs: { en: 'create-math-puzzle-worksheets', de: 'mathe-raetsel-arbeitsblaetter-erstellen' } },
  { guideId: 'create-handwriting-sheets', slugs: { en: 'create-handwriting-sheets', de: 'schreibuebungen-erstellen' } },
  { guideId: 'create-coloring-pages', slugs: { en: 'create-coloring-pages', de: 'malvorlagen-erstellen' } },
  { guideId: 'create-bingo-cards', slugs: { en: 'create-bingo-cards', de: 'bingo-karten-erstellen' } },
  { guideId: 'create-matching-worksheets', slugs: { en: 'create-matching-worksheets', de: 'zuordnungs-arbeitsblaetter-erstellen' } },
  { guideId: 'create-pattern-worksheets', slugs: { en: 'create-pattern-worksheets', de: 'muster-arbeitsblaetter-erstellen' } },
  { guideId: 'create-picture-sudoku', slugs: { en: 'create-picture-sudoku', de: 'bilder-sudoku-erstellen' } },
  { guideId: 'create-maze-worksheets', slugs: { en: 'create-maze-worksheets', de: 'labyrinth-arbeitsblaetter-erstellen' } },
  { guideId: 'create-hidden-object-worksheets', slugs: { en: 'create-hidden-object-worksheets', de: 'suchbilder-arbeitsblaetter-erstellen' } },
  { guideId: 'create-size-comparison-worksheets', slugs: { en: 'create-size-comparison-worksheets', de: 'groessenvergleich-arbeitsblaetter-erstellen' } },
  { guideId: 'create-counting-worksheets', slugs: { en: 'create-counting-worksheets', de: 'zaehl-arbeitsblaetter-erstellen' } },
  { guideId: 'create-drawing-worksheets', slugs: { en: 'create-drawing-worksheets', de: 'zeichen-arbeitsblaetter-erstellen' } },
  { guideId: 'create-sorting-worksheets', slugs: { en: 'create-sorting-worksheets', de: 'sortier-arbeitsblaetter-erstellen' } },
  { guideId: 'create-shadow-matching-worksheets', slugs: { en: 'create-shadow-matching-worksheets', de: 'schatten-zuordnung-arbeitsblaetter-erstellen' } },
  { guideId: 'create-odd-one-out-puzzles', slugs: { en: 'create-odd-one-out-puzzles', de: 'was-passt-nicht-raetsel-erstellen' } },
  { guideId: 'create-missing-pieces-puzzles', slugs: { en: 'create-missing-pieces-puzzles', de: 'fehlende-teile-raetsel-erstellen' } },
  { guideId: 'create-treasure-hunt-worksheets', slugs: { en: 'create-treasure-hunt-worksheets', de: 'schatzsuche-arbeitsblaetter-erstellen' } },
  { guideId: 'create-alphabet-worksheets', slugs: { en: 'create-alphabet-worksheets', de: 'alphabet-arbeitsblaetter-erstellen' } },
  { guideId: 'create-preposition-worksheets', slugs: { en: 'create-preposition-worksheets', de: 'praepositionen-arbeitsblaetter-erstellen' } },
  { guideId: 'create-cryptogram-puzzles', slugs: { en: 'create-cryptogram-puzzles', de: 'kryptogramm-raetsel-erstellen' } },
  { guideId: 'create-chart-count-worksheets', slugs: { en: 'create-chart-count-worksheets', de: 'bilddiagramm-arbeitsblaetter-erstellen' } },

  // === Business Strategy Guides (20) ===
  { guideId: 'create-worksheet-bundles', slugs: { en: 'create-worksheet-bundles', de: 'arbeitsblatt-pakete-erstellen' } },
  { guideId: 'niche-selection-printables', slugs: { en: 'niche-selection-printables', de: 'nischen-auswahl-druckvorlagen' } },
  { guideId: 'create-printable-product-line', slugs: { en: 'create-printable-product-line', de: 'druckvorlagen-produktlinie-erstellen' } },
  { guideId: 'pricing-educational-printables', slugs: { en: 'pricing-educational-printables', de: 'preisgestaltung-lernmaterial' } },
  { guideId: 'scale-printable-business-guide', slugs: { en: 'scale-printable-business-guide', de: 'druckvorlagen-geschaeft-skalieren-anleitung' } },
  { guideId: 'passive-income-worksheets', slugs: { en: 'passive-income-worksheets', de: 'passives-einkommen-arbeitsblaetter' } },
  { guideId: 'understanding-commercial-licenses', slugs: { en: 'understanding-commercial-licenses', de: 'kommerzielle-lizenzen-verstehen' } },
  { guideId: 'research-profitable-niches', slugs: { en: 'research-profitable-niches', de: 'profitable-nischen-recherchieren' } },
  { guideId: 'multilingual-printable-business', slugs: { en: 'multilingual-printable-business', de: 'mehrsprachiges-druckvorlagen-geschaeft' } },
  { guideId: 'worksheets-multiple-languages', slugs: { en: 'worksheets-multiple-languages', de: 'arbeitsblaetter-mehrere-sprachen' } },
  { guideId: 'copyright-printable-sellers', slugs: { en: 'copyright-printable-sellers', de: 'urheberrecht-druckvorlagen-verkaeufer' } },
  { guideId: 'customer-support-digital-products', slugs: { en: 'customer-support-digital-products', de: 'kundensupport-digitale-produkte' } },
  { guideId: 'automate-printable-business', slugs: { en: 'automate-printable-business', de: 'druckvorlagen-geschaeft-automatisieren' } },
  { guideId: 'social-media-printable-marketing', slugs: { en: 'social-media-printable-marketing', de: 'social-media-druckvorlagen-marketing' } },
  { guideId: 'pinterest-marketing-worksheets', slugs: { en: 'pinterest-marketing-worksheets', de: 'pinterest-marketing-arbeitsblaetter' } },
  { guideId: 'email-marketing-printables', slugs: { en: 'email-marketing-printables', de: 'email-marketing-druckvorlagen' } },
  { guideId: 'get-reviews-printable-products', slugs: { en: 'get-reviews-printable-products', de: 'bewertungen-druckvorlagen-produkte' } },
  { guideId: 'seasonal-marketing-printables', slugs: { en: 'seasonal-marketing-printables', de: 'saisonales-marketing-druckvorlagen' } },
  { guideId: 'digital-vs-physical-printables', slugs: { en: 'digital-vs-physical-printables', de: 'digital-oder-physisch-druckvorlagen' } },
  { guideId: 'quality-standards-worksheets', slugs: { en: 'quality-standards-worksheets', de: 'qualitaetsstandards-arbeitsblaetter' } },
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
