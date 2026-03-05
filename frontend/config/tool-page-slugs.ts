/**
 * Tool Page Slug Configuration
 *
 * This file maps each app to its language-specific SEO slugs for /tools/ pages.
 * These are the free tool landing pages (distinct from /apps/ product pages).
 *
 * Example:
 * - English: /en/tools/free-addition-worksheet-maker
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
      en: 'free-addition-worksheet-maker',
    },
  },
  {
    toolId: 'image-subtraction',
    slugs: {
      en: 'free-subtraction-worksheet-maker',
    },
  },
  {
    toolId: 'code-addition',
    slugs: {
      en: 'free-code-addition-worksheet-maker',
    },
  },
  {
    toolId: 'more-less',
    slugs: {
      en: 'free-more-or-less-worksheet-maker',
    },
  },
  {
    toolId: 'math-puzzle',
    slugs: {
      en: 'free-math-puzzle-maker',
    },
  },
  {
    toolId: 'math-worksheet',
    slugs: {
      en: 'free-math-worksheet-maker',
    },
  },
  {
    toolId: 'alphabet-train',
    slugs: {
      en: 'free-alphabet-train-maker',
    },
  },
  {
    toolId: 'prepositions',
    slugs: {
      en: 'free-prepositions-worksheet-maker',
    },
  },
  {
    toolId: 'word-guess',
    slugs: {
      en: 'free-word-guess-maker',
    },
  },
  {
    toolId: 'word-scramble',
    slugs: {
      en: 'free-word-scramble-maker',
    },
  },
  {
    toolId: 'word-search',
    slugs: {
      en: 'free-word-search-maker',
    },
  },
  {
    toolId: 'cryptogram',
    slugs: {
      en: 'free-cryptogram-maker',
    },
  },
  {
    toolId: 'writing',
    slugs: {
      en: 'free-handwriting-worksheet-maker',
    },
  },
  {
    toolId: 'big-small',
    slugs: {
      en: 'free-big-and-small-worksheet-maker',
    },
  },
  {
    toolId: 'pattern-train',
    slugs: {
      en: 'free-pattern-train-maker',
    },
  },
  {
    toolId: 'pattern-worksheet',
    slugs: {
      en: 'free-pattern-worksheet-maker',
    },
  },
  {
    toolId: 'draw-and-color',
    slugs: {
      en: 'free-draw-and-color-maker',
    },
  },
  {
    toolId: 'drawing-lines',
    slugs: {
      en: 'free-drawing-lines-maker',
    },
  },
  {
    toolId: 'coloring',
    slugs: {
      en: 'free-coloring-page-maker',
    },
  },
  {
    toolId: 'chart-count',
    slugs: {
      en: 'free-chart-count-maker',
    },
  },
  {
    toolId: 'matching',
    slugs: {
      en: 'free-matching-worksheet-maker',
    },
  },
  {
    toolId: 'grid-match',
    slugs: {
      en: 'free-grid-match-maker',
    },
  },
  {
    toolId: 'shadow-match',
    slugs: {
      en: 'free-shadow-match-maker',
    },
  },
  {
    toolId: 'bingo',
    slugs: {
      en: 'free-bingo-card-maker',
    },
  },
  {
    toolId: 'picture-sort',
    slugs: {
      en: 'free-picture-sort-maker',
    },
  },
  {
    toolId: 'missing-pieces',
    slugs: {
      en: 'free-missing-pieces-maker',
    },
  },
  {
    toolId: 'odd-one-out',
    slugs: {
      en: 'free-odd-one-out-maker',
    },
  },
  {
    toolId: 'sudoku',
    slugs: {
      en: 'free-sudoku-maker',
    },
  },
  {
    toolId: 'picture-path',
    slugs: {
      en: 'free-picture-path-maker',
    },
  },
  {
    toolId: 'find-and-count',
    slugs: {
      en: 'free-find-and-count-maker',
    },
  },
  {
    toolId: 'find-objects',
    slugs: {
      en: 'free-hidden-object-maker',
    },
  },
  {
    toolId: 'crossword',
    slugs: {
      en: 'free-crossword-maker',
    },
  },
  {
    toolId: 'treasure-hunt',
    slugs: {
      en: 'free-treasure-hunt-maker',
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
