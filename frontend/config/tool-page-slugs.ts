/**
 * Tool Page Slug Configuration
 *
 * This file maps each app to its language-specific SEO slugs for /tools/ pages.
 * These are the tool landing pages (distinct from /apps/ product pages).
 *
 * Example:
 * - English: /en/tools/addition-worksheet-maker
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface ToolSlugConfig {
  toolId: string;  // Internal app identifier (matches appId from warriorplus-products.ts)
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
 * Tool page slug configuration for all apps.
 * Add language-specific slugs as tool pages are created for each language.
 */
export const toolPageSlugs: ToolSlugConfig[] = [
  {
    toolId: 'image-addition',
    slugs: {
      en: 'addition-worksheet-maker',
      de: 'additions-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-addition',
    },
  },
  {
    toolId: 'image-subtraction',
    slugs: {
      en: 'subtraction-worksheet-maker',
      de: 'subtraktions-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-soustraction',
    },
  },
  {
    toolId: 'code-addition',
    slugs: {
      en: 'code-addition-worksheet-maker',
      de: 'bilder-additions-ersteller',
      fr: 'generateur-addition-codee',
    },
  },
  {
    toolId: 'more-less',
    slugs: {
      en: 'more-or-less-worksheet-maker',
      de: 'mehr-weniger-ersteller',
      fr: 'generateur-comparaison-quantites',
    },
  },
  {
    toolId: 'math-puzzle',
    slugs: {
      en: 'math-puzzle-maker',
      de: 'mathe-raetsel-ersteller',
      fr: 'generateur-puzzle-maths',
    },
  },
  {
    toolId: 'math-worksheet',
    slugs: {
      en: 'math-worksheet-maker',
      de: 'mathe-arbeitsblatt-ersteller',
      fr: 'generateur-exercices-maths',
    },
  },
  {
    toolId: 'alphabet-train',
    slugs: {
      en: 'alphabet-train-maker',
      de: 'alphabet-zug-ersteller',
      fr: 'generateur-train-alphabet',
    },
  },
  {
    toolId: 'prepositions',
    slugs: {
      en: 'prepositions-worksheet-maker',
      de: 'praepositionen-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-prepositions',
    },
  },
  {
    toolId: 'word-guess',
    slugs: {
      en: 'word-guess-maker',
      de: 'woerter-raten-ersteller',
      fr: 'generateur-deviner-mots',
    },
  },
  {
    toolId: 'word-scramble',
    slugs: {
      en: 'word-scramble-maker',
      de: 'buchstabensalat-ersteller',
      fr: 'generateur-mots-melanges',
    },
  },
  {
    toolId: 'word-search',
    slugs: {
      en: 'word-search-maker',
      de: 'wortsuche-ersteller',
      fr: 'generateur-mots-caches',
    },
  },
  {
    toolId: 'cryptogram',
    slugs: {
      en: 'cryptogram-maker',
      de: 'kryptogramm-ersteller',
      fr: 'generateur-cryptogramme',
    },
  },
  {
    toolId: 'writing',
    slugs: {
      en: 'handwriting-worksheet-maker',
      de: 'schreibuebungen-ersteller',
      fr: 'generateur-fiches-ecriture',
    },
  },
  {
    toolId: 'big-small',
    slugs: {
      en: 'big-and-small-worksheet-maker',
      de: 'gross-klein-ersteller',
      fr: 'generateur-fiches-grand-petit',
    },
  },
  {
    toolId: 'pattern-train',
    slugs: {
      en: 'pattern-train-maker',
      de: 'muster-zug-ersteller',
      fr: 'generateur-train-suites-logiques',
    },
  },
  {
    toolId: 'pattern-worksheet',
    slugs: {
      en: 'pattern-worksheet-maker',
      de: 'muster-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-sequences-logiques',
    },
  },
  {
    toolId: 'draw-and-color',
    slugs: {
      en: 'draw-and-color-maker',
      de: 'rasterzeichnen-ersteller',
      fr: 'generateur-dessin-quadrillage',
    },
  },
  {
    toolId: 'drawing-lines',
    slugs: {
      en: 'drawing-lines-maker',
      de: 'linien-ziehen-ersteller',
      fr: 'generateur-fiches-graphisme',
    },
  },
  {
    toolId: 'coloring',
    slugs: {
      en: 'coloring-page-maker',
      de: 'malvorlagen-ersteller',
      fr: 'generateur-pages-coloriage',
    },
  },
  {
    toolId: 'chart-count',
    slugs: {
      en: 'chart-count-maker',
      de: 'bilddiagramm-ersteller',
      fr: 'generateur-graphique-images',
    },
  },
  {
    toolId: 'matching',
    slugs: {
      en: 'matching-worksheet-maker',
      de: 'zuordnungs-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-association',
    },
  },
  {
    toolId: 'grid-match',
    slugs: {
      en: 'grid-match-maker',
      de: 'raster-puzzle-ersteller',
      fr: 'generateur-puzzle-grille',
    },
  },
  {
    toolId: 'shadow-match',
    slugs: {
      en: 'shadow-match-maker',
      de: 'schattenbilder-ersteller',
      fr: 'generateur-discrimination-visuelle',
    },
  },
  {
    toolId: 'bingo',
    slugs: {
      en: 'bingo-card-maker',
      de: 'bingo-karten-ersteller',
      fr: 'generateur-cartes-bingo',
    },
  },
  {
    toolId: 'picture-sort',
    slugs: {
      en: 'picture-sort-maker',
      de: 'bilder-sortieren-ersteller',
      fr: 'generateur-tri-images',
    },
  },
  {
    toolId: 'missing-pieces',
    slugs: {
      en: 'missing-pieces-maker',
      de: 'fehlende-puzzleteile-ersteller',
      fr: 'generateur-pieces-manquantes',
    },
  },
  {
    toolId: 'odd-one-out',
    slugs: {
      en: 'odd-one-out-maker',
      de: 'was-passt-nicht-ersteller',
      fr: 'generateur-fiches-intrus',
    },
  },
  {
    toolId: 'sudoku',
    slugs: {
      en: 'sudoku-maker',
      de: 'kinder-sudoku-ersteller',
      fr: 'generateur-sudoku-enfants',
    },
  },
  {
    toolId: 'picture-path',
    slugs: {
      en: 'picture-path-maker',
      de: 'bilderpfad-ersteller',
      fr: 'generateur-parcours-images',
    },
  },
  {
    toolId: 'find-and-count',
    slugs: {
      en: 'find-and-count-maker',
      de: 'suchen-und-zaehlen-ersteller',
      fr: 'generateur-cherche-et-compte',
    },
  },
  {
    toolId: 'find-objects',
    slugs: {
      en: 'hidden-object-maker',
      de: 'suchbilder-ersteller',
      fr: 'generateur-cherche-objets',
    },
  },
  {
    toolId: 'crossword',
    slugs: {
      en: 'crossword-maker',
      de: 'bilderkreuzwortraetsel-ersteller',
      fr: 'generateur-mots-croises-images',
    },
  },
  {
    toolId: 'treasure-hunt',
    slugs: {
      en: 'treasure-hunt-maker',
      de: 'schatzsuche-ersteller',
      fr: 'generateur-chasse-au-tresor',
    },
  },
];

/**
 * Get the slug for a specific tool and locale
 */
export function getToolSlugForLocale(toolId: string, locale: SupportedLocale): string | undefined {
  const config = toolPageSlugs.find(c => c.toolId === toolId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the tool config from any slug (in any language)
 */
export function getToolConfigBySlug(slug: string): { toolId: string; locale: SupportedLocale } | undefined {
  for (const config of toolPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { toolId: config.toolId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllToolPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of toolPageSlugs) {
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
export function getToolAlternateUrls(toolId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = toolPageSlugs.find(c => c.toolId === toolId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/tools/${slug}`;
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
export function hasToolPage(slug: string, locale: SupportedLocale): boolean {
  const config = getToolConfigBySlug(slug);
  if (!config) return false;

  const toolConfig = toolPageSlugs.find(c => c.toolId === config.toolId);
  return toolConfig?.slugs[locale] === slug;
}
