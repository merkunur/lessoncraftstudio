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
  { guideId: 'sell-math-worksheets-etsy', slugs: { en: 'sell-math-worksheets-etsy', de: 'mathe-arbeitsblaetter-verkaufen-etsy', fr: 'vendre-fiches-maths-etsy' } },
  { guideId: 'sell-word-search-etsy', slugs: { en: 'sell-word-search-etsy', de: 'wortsuche-verkaufen-etsy', fr: 'vendre-mots-caches-etsy' } },
  { guideId: 'start-etsy-printable-shop', slugs: { en: 'start-etsy-printable-shop', de: 'etsy-druckvorlagen-shop-starten', fr: 'ouvrir-boutique-etsy-imprimables' } },
  { guideId: 'create-etsy-coloring-pages', slugs: { en: 'create-etsy-coloring-pages', de: 'etsy-malvorlagen-erstellen', fr: 'creer-coloriages-etsy' } },
  { guideId: 'sell-educational-printables-etsy', slugs: { en: 'sell-educational-printables-etsy', de: 'lernmaterial-verkaufen-etsy', fr: 'vendre-materiel-pedagogique-etsy' } },
  { guideId: 'price-etsy-printables', slugs: { en: 'price-etsy-printables', de: 'etsy-druckvorlagen-preise', fr: 'tarification-imprimables-etsy' } },
  { guideId: 'etsy-seo-educational-printables', slugs: { en: 'etsy-seo-educational-printables', de: 'etsy-seo-lernmaterial', fr: 'seo-etsy-materiel-pedagogique' } },
  { guideId: 'create-etsy-worksheet-bundles', slugs: { en: 'create-etsy-worksheet-bundles', de: 'etsy-arbeitsblatt-pakete-erstellen', fr: 'creer-packs-fiches-etsy' } },
  { guideId: 'math-activity-books-kdp', slugs: { en: 'math-activity-books-kdp', de: 'mathe-aktivitaetsbuecher-kdp', fr: 'livres-activites-maths-kdp' } },
  { guideId: 'publish-puzzle-books-kdp', slugs: { en: 'publish-puzzle-books-kdp', de: 'raetselbuecher-veroeffentlichen-kdp', fr: 'publier-livres-puzzles-kdp' } },
  { guideId: 'word-search-books-kdp', slugs: { en: 'word-search-books-kdp', de: 'wortsuchbuecher-kdp', fr: 'livres-mots-caches-kdp' } },
  { guideId: 'make-money-kdp-activity-books', slugs: { en: 'make-money-kdp-activity-books', de: 'geld-verdienen-kdp-aktivitaetsbuecher', fr: 'gagner-argent-kdp-livres-activites' } },
  { guideId: 'kdp-formatting-worksheets', slugs: { en: 'kdp-formatting-worksheets', de: 'kdp-formatierung-arbeitsblaetter', fr: 'formatage-kdp-fiches' } },
  { guideId: 'best-kdp-activity-book-niches', slugs: { en: 'best-kdp-activity-book-niches', de: 'beste-kdp-aktivitaetsbuch-nischen', fr: 'meilleures-niches-kdp-livres-activites' } },
  { guideId: 'sudoku-books-kdp', slugs: { en: 'sudoku-books-kdp', de: 'sudoku-buecher-kdp', fr: 'livres-sudoku-kdp' } },
  { guideId: 'kdp-vs-etsy-printables', slugs: { en: 'kdp-vs-etsy-printables', de: 'kdp-oder-etsy-druckvorlagen', fr: 'kdp-ou-etsy-imprimables' } },
  { guideId: 'create-sell-tpt-resources', slugs: { en: 'create-sell-tpt-resources', de: 'tpt-materialien-erstellen-verkaufen', fr: 'creer-vendre-ressources-tpt' } },
  { guideId: 'tpt-store-optimization', slugs: { en: 'tpt-store-optimization', de: 'tpt-shop-optimierung', fr: 'optimisation-boutique-tpt' } },
  { guideId: 'sell-printables-gumroad', slugs: { en: 'sell-printables-gumroad', de: 'druckvorlagen-verkaufen-gumroad', fr: 'vendre-imprimables-gumroad' } },
  { guideId: 'sell-creative-fabrica', slugs: { en: 'sell-creative-fabrica', de: 'verkaufen-creative-fabrica', fr: 'vendre-creative-fabrica' } },

  // === Product Creation Guides (25) ===
  { guideId: 'create-addition-worksheets', slugs: { en: 'create-addition-worksheets', de: 'additions-arbeitsblaetter-erstellen', fr: 'creer-fiches-addition' } },
  { guideId: 'create-subtraction-worksheets', slugs: { en: 'create-subtraction-worksheets', de: 'subtraktions-arbeitsblaetter-erstellen', fr: 'creer-fiches-soustraction' } },
  { guideId: 'create-word-search-puzzles', slugs: { en: 'create-word-search-puzzles', de: 'wortsuche-raetsel-erstellen', fr: 'creer-mots-caches' } },
  { guideId: 'create-crossword-puzzles', slugs: { en: 'create-crossword-puzzles', de: 'kreuzwortraetsel-erstellen', fr: 'creer-mots-croises' } },
  { guideId: 'create-math-puzzle-worksheets', slugs: { en: 'create-math-puzzle-worksheets', de: 'mathe-raetsel-arbeitsblaetter-erstellen', fr: 'creer-fiches-puzzles-maths' } },
  { guideId: 'create-handwriting-sheets', slugs: { en: 'create-handwriting-sheets', de: 'schreibuebungen-erstellen', fr: 'creer-fiches-ecriture' } },
  { guideId: 'create-coloring-pages', slugs: { en: 'create-coloring-pages', de: 'malvorlagen-erstellen', fr: 'creer-pages-coloriage' } },
  { guideId: 'create-bingo-cards', slugs: { en: 'create-bingo-cards', de: 'bingo-karten-erstellen', fr: 'creer-cartes-bingo' } },
  { guideId: 'create-matching-worksheets', slugs: { en: 'create-matching-worksheets', de: 'zuordnungs-arbeitsblaetter-erstellen', fr: 'creer-fiches-association' } },
  { guideId: 'create-pattern-worksheets', slugs: { en: 'create-pattern-worksheets', de: 'muster-arbeitsblaetter-erstellen', fr: 'creer-fiches-sequences-logiques' } },
  { guideId: 'create-picture-sudoku', slugs: { en: 'create-picture-sudoku', de: 'bilder-sudoku-erstellen', fr: 'creer-sudoku-images' } },
  { guideId: 'create-maze-worksheets', slugs: { en: 'create-maze-worksheets', de: 'labyrinth-arbeitsblaetter-erstellen', fr: 'creer-fiches-labyrinthes' } },
  { guideId: 'create-hidden-object-worksheets', slugs: { en: 'create-hidden-object-worksheets', de: 'suchbilder-arbeitsblaetter-erstellen', fr: 'creer-fiches-objets-caches' } },
  { guideId: 'create-size-comparison-worksheets', slugs: { en: 'create-size-comparison-worksheets', de: 'groessenvergleich-arbeitsblaetter-erstellen', fr: 'creer-fiches-comparaison-tailles' } },
  { guideId: 'create-counting-worksheets', slugs: { en: 'create-counting-worksheets', de: 'zaehl-arbeitsblaetter-erstellen', fr: 'creer-fiches-comptage' } },
  { guideId: 'create-drawing-worksheets', slugs: { en: 'create-drawing-worksheets', de: 'zeichen-arbeitsblaetter-erstellen', fr: 'creer-fiches-dessin' } },
  { guideId: 'create-sorting-worksheets', slugs: { en: 'create-sorting-worksheets', de: 'sortier-arbeitsblaetter-erstellen', fr: 'creer-fiches-tri' } },
  { guideId: 'create-shadow-matching-worksheets', slugs: { en: 'create-shadow-matching-worksheets', de: 'schatten-zuordnung-arbeitsblaetter-erstellen', fr: 'creer-fiches-discrimination-visuelle' } },
  { guideId: 'create-odd-one-out-puzzles', slugs: { en: 'create-odd-one-out-puzzles', de: 'was-passt-nicht-raetsel-erstellen', fr: 'creer-fiches-intrus' } },
  { guideId: 'create-missing-pieces-puzzles', slugs: { en: 'create-missing-pieces-puzzles', de: 'fehlende-teile-raetsel-erstellen', fr: 'creer-puzzles-pieces-manquantes' } },
  { guideId: 'create-treasure-hunt-worksheets', slugs: { en: 'create-treasure-hunt-worksheets', de: 'schatzsuche-arbeitsblaetter-erstellen', fr: 'creer-fiches-chasse-au-tresor' } },
  { guideId: 'create-alphabet-worksheets', slugs: { en: 'create-alphabet-worksheets', de: 'alphabet-arbeitsblaetter-erstellen', fr: 'creer-fiches-alphabet' } },
  { guideId: 'create-preposition-worksheets', slugs: { en: 'create-preposition-worksheets', de: 'praepositionen-arbeitsblaetter-erstellen', fr: 'creer-fiches-prepositions' } },
  { guideId: 'create-cryptogram-puzzles', slugs: { en: 'create-cryptogram-puzzles', de: 'kryptogramm-raetsel-erstellen', fr: 'creer-cryptogrammes' } },
  { guideId: 'create-chart-count-worksheets', slugs: { en: 'create-chart-count-worksheets', de: 'bilddiagramm-arbeitsblaetter-erstellen', fr: 'creer-fiches-graphiques-images' } },

  // === Business Strategy Guides (20) ===
  { guideId: 'create-worksheet-bundles', slugs: { en: 'create-worksheet-bundles', de: 'arbeitsblatt-pakete-erstellen', fr: 'creer-packs-fiches-exercices' } },
  { guideId: 'niche-selection-printables', slugs: { en: 'niche-selection-printables', de: 'nischen-auswahl-druckvorlagen', fr: 'choix-niche-imprimables' } },
  { guideId: 'create-printable-product-line', slugs: { en: 'create-printable-product-line', de: 'druckvorlagen-produktlinie-erstellen', fr: 'creer-gamme-produits-imprimables' } },
  { guideId: 'pricing-educational-printables', slugs: { en: 'pricing-educational-printables', de: 'preisgestaltung-lernmaterial', fr: 'tarification-materiel-pedagogique' } },
  { guideId: 'scale-printable-business-guide', slugs: { en: 'scale-printable-business-guide', de: 'druckvorlagen-geschaeft-skalieren-anleitung', fr: 'guide-developper-activite-imprimables' } },
  { guideId: 'passive-income-worksheets', slugs: { en: 'passive-income-worksheets', de: 'passives-einkommen-arbeitsblaetter', fr: 'revenus-passifs-fiches-exercices' } },
  { guideId: 'understanding-commercial-licenses', slugs: { en: 'understanding-commercial-licenses', de: 'kommerzielle-lizenzen-verstehen', fr: 'comprendre-licences-commerciales' } },
  { guideId: 'research-profitable-niches', slugs: { en: 'research-profitable-niches', de: 'profitable-nischen-recherchieren', fr: 'rechercher-niches-rentables' } },
  { guideId: 'multilingual-printable-business', slugs: { en: 'multilingual-printable-business', de: 'mehrsprachiges-druckvorlagen-geschaeft', fr: 'activite-imprimables-multilingue' } },
  { guideId: 'worksheets-multiple-languages', slugs: { en: 'worksheets-multiple-languages', de: 'arbeitsblaetter-mehrere-sprachen', fr: 'fiches-exercices-plusieurs-langues' } },
  { guideId: 'copyright-printable-sellers', slugs: { en: 'copyright-printable-sellers', de: 'urheberrecht-druckvorlagen-verkaeufer', fr: 'droits-auteur-vendeurs-imprimables' } },
  { guideId: 'customer-support-digital-products', slugs: { en: 'customer-support-digital-products', de: 'kundensupport-digitale-produkte', fr: 'support-client-produits-numeriques' } },
  { guideId: 'automate-printable-business', slugs: { en: 'automate-printable-business', de: 'druckvorlagen-geschaeft-automatisieren', fr: 'automatiser-activite-imprimables' } },
  { guideId: 'social-media-printable-marketing', slugs: { en: 'social-media-printable-marketing', de: 'social-media-druckvorlagen-marketing', fr: 'marketing-reseaux-sociaux-imprimables' } },
  { guideId: 'pinterest-marketing-worksheets', slugs: { en: 'pinterest-marketing-worksheets', de: 'pinterest-marketing-arbeitsblaetter', fr: 'marketing-pinterest-fiches' } },
  { guideId: 'email-marketing-printables', slugs: { en: 'email-marketing-printables', de: 'email-marketing-druckvorlagen', fr: 'email-marketing-imprimables' } },
  { guideId: 'get-reviews-printable-products', slugs: { en: 'get-reviews-printable-products', de: 'bewertungen-druckvorlagen-produkte', fr: 'obtenir-avis-produits-imprimables' } },
  { guideId: 'seasonal-marketing-printables', slugs: { en: 'seasonal-marketing-printables', de: 'saisonales-marketing-druckvorlagen', fr: 'marketing-saisonnier-imprimables' } },
  { guideId: 'digital-vs-physical-printables', slugs: { en: 'digital-vs-physical-printables', de: 'digital-oder-physisch-druckvorlagen', fr: 'numerique-ou-physique-imprimables' } },
  { guideId: 'quality-standards-worksheets', slugs: { en: 'quality-standards-worksheets', de: 'qualitaetsstandards-arbeitsblaetter', fr: 'normes-qualite-fiches-exercices' } },
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
