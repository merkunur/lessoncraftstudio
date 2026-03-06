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
    },
  },
  {
    toolId: 'image-subtraction',
    slugs: {
      en: 'subtraction-worksheet-maker',
      de: 'subtraktions-arbeitsblatt-ersteller',
    },
  },
  {
    toolId: 'code-addition',
    slugs: {
      en: 'code-addition-worksheet-maker',
      de: 'bilder-additions-ersteller',
    },
  },
  {
    toolId: 'more-less',
    slugs: {
      en: 'more-or-less-worksheet-maker',
      de: 'mehr-weniger-ersteller',
    },
  },
  {
    toolId: 'math-puzzle',
    slugs: {
      en: 'math-puzzle-maker',
      de: 'mathe-raetsel-ersteller',
    },
  },
  {
    toolId: 'math-worksheet',
    slugs: {
      en: 'math-worksheet-maker',
      de: 'mathe-arbeitsblatt-ersteller',
    },
  },
  {
    toolId: 'alphabet-train',
    slugs: {
      en: 'alphabet-train-maker',
      de: 'alphabet-zug-ersteller',
    },
  },
  {
    toolId: 'prepositions',
    slugs: {
      en: 'prepositions-worksheet-maker',
      de: 'praepositionen-arbeitsblatt-ersteller',
    },
  },
  {
    toolId: 'word-guess',
    slugs: {
      en: 'word-guess-maker',
      de: 'woerter-raten-ersteller',
    },
  },
  {
    toolId: 'word-scramble',
    slugs: {
      en: 'word-scramble-maker',
      de: 'buchstabensalat-ersteller',
    },
  },
  {
    toolId: 'word-search',
    slugs: {
      en: 'word-search-maker',
      de: 'wortsuche-ersteller',
    },
  },
  {
    toolId: 'cryptogram',
    slugs: {
      en: 'cryptogram-maker',
      de: 'kryptogramm-ersteller',
    },
  },
  {
    toolId: 'writing',
    slugs: {
      en: 'handwriting-worksheet-maker',
      de: 'schreibuebungen-ersteller',
    },
  },
  {
    toolId: 'big-small',
    slugs: {
      en: 'big-and-small-worksheet-maker',
      de: 'gross-klein-ersteller',
    },
  },
  {
    toolId: 'pattern-train',
    slugs: {
      en: 'pattern-train-maker',
      de: 'muster-zug-ersteller',
    },
  },
  {
    toolId: 'pattern-worksheet',
    slugs: {
      en: 'pattern-worksheet-maker',
      de: 'muster-arbeitsblatt-ersteller',
    },
  },
  {
    toolId: 'draw-and-color',
    slugs: {
      en: 'draw-and-color-maker',
      de: 'rasterzeichnen-ersteller',
    },
  },
  {
    toolId: 'drawing-lines',
    slugs: {
      en: 'drawing-lines-maker',
      de: 'linien-ziehen-ersteller',
    },
  },
  {
    toolId: 'coloring',
    slugs: {
      en: 'coloring-page-maker',
      de: 'malvorlagen-ersteller',
    },
  },
  {
    toolId: 'chart-count',
    slugs: {
      en: 'chart-count-maker',
      de: 'bilddiagramm-ersteller',
    },
  },
  {
    toolId: 'matching',
    slugs: {
      en: 'matching-worksheet-maker',
      de: 'zuordnungs-arbeitsblatt-ersteller',
    },
  },
  {
    toolId: 'grid-match',
    slugs: {
      en: 'grid-match-maker',
      de: 'raster-puzzle-ersteller',
    },
  },
  {
    toolId: 'shadow-match',
    slugs: {
      en: 'shadow-match-maker',
      de: 'schattenbilder-ersteller',
    },
  },
  {
    toolId: 'bingo',
    slugs: {
      en: 'bingo-card-maker',
      de: 'bingo-karten-ersteller',
    },
  },
  {
    toolId: 'picture-sort',
    slugs: {
      en: 'picture-sort-maker',
      de: 'bilder-sortieren-ersteller',
    },
  },
  {
    toolId: 'missing-pieces',
    slugs: {
      en: 'missing-pieces-maker',
      de: 'fehlende-puzzleteile-ersteller',
    },
  },
  {
    toolId: 'odd-one-out',
    slugs: {
      en: 'odd-one-out-maker',
      de: 'was-passt-nicht-ersteller',
    },
  },
  {
    toolId: 'sudoku',
    slugs: {
      en: 'sudoku-maker',
      de: 'kinder-sudoku-ersteller',
    },
  },
  {
    toolId: 'picture-path',
    slugs: {
      en: 'picture-path-maker',
      de: 'bilderpfad-ersteller',
    },
  },
  {
    toolId: 'find-and-count',
    slugs: {
      en: 'find-and-count-maker',
      de: 'suchen-und-zaehlen-ersteller',
    },
  },
  {
    toolId: 'find-objects',
    slugs: {
      en: 'hidden-object-maker',
      de: 'suchbilder-ersteller',
    },
  },
  {
    toolId: 'crossword',
    slugs: {
      en: 'crossword-maker',
      de: 'bilderkreuzwortraetsel-ersteller',
    },
  },
  {
    toolId: 'treasure-hunt',
    slugs: {
      en: 'treasure-hunt-maker',
      de: 'schatzsuche-ersteller',
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
