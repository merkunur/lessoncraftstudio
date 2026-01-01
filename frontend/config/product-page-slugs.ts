/**
 * Product Page Slug Configuration
 *
 * This file maps each app to its language-specific SEO slugs.
 * Slugs should be in the target language for optimal SEO.
 *
 * Example:
 * - English: /en/apps/word-search-worksheets
 * - Swedish: /sv/apps/ordletar-arbetsblad
 * - German: /de/apps/wortsuche-arbeitsblaetter
 */

export interface AppSlugConfig {
  appId: string;  // Internal app identifier
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

// All supported locales
export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * Product page slug configuration for all apps.
 * Add language-specific slugs as product pages are created for each language.
 */
export const productPageSlugs: AppSlugConfig[] = [
  {
    appId: 'word-search',
    slugs: {
      en: 'word-search-worksheets',
      sv: 'ordletar-arbetsblad',
      de: 'wortsuche-arbeitsblaetter',
      fr: 'mots-caches-fiches',
      es: 'sopa-letras-fichas',
      it: 'cerca-parole-schede',
      pt: 'caca-palavras-fichas',
      nl: 'woordzoeker-werkbladen',
      da: 'ordsoegning-arbejdsark',
      no: 'ordsoek-arbeidsark',
      fi: 'sananhaku-tyoarkit',
    },
  },
  {
    appId: 'addition',
    slugs: {
      en: 'addition-worksheets',
      sv: 'addition-arbetsblad',
      de: 'addition-arbeitsblaetter',
      fr: 'addition-fiches',
      es: 'suma-fichas',
      it: 'addizione-schede',
      pt: 'adicao-fichas',
      nl: 'optellen-werkbladen',
      da: 'addition-arbejdsark',
      no: 'addisjon-arbeidsark',
      fi: 'yhteenlasku-tyoarkit',
    },
  },
  {
    appId: 'alphabet-train',
    slugs: {
      en: 'alphabet-train-worksheets',
      sv: 'alfabettag-arbetsblad',
      de: 'alphabet-zug-arbeitsblaetter',
      fr: 'train-alphabet-fiches',
      es: 'tren-alfabeto-fichas',
      it: 'treno-alfabeto-schede',
      pt: 'trem-alfabeto-fichas',
      nl: 'alfabet-trein-werkbladen',
      da: 'alfabet-tog-arbejdsark',
      no: 'alfabet-tog-arbeidsark',
      fi: 'aakkosjuna-tyoarkit',
    },
  },
  {
    appId: 'coloring',
    slugs: {
      en: 'coloring-worksheets',
    },
  },
  {
    appId: 'math-worksheet',
    slugs: {
      en: 'math-worksheets',
      sv: 'matematik-arbetsblad',
    },
  },
  {
    appId: 'word-scramble',
    slugs: {
      en: 'word-scramble-worksheets',
      sv: 'ordpussel-arbetsblad',
    },
  },
  {
    appId: 'find-and-count',
    slugs: {
      en: 'find-and-count-worksheets',
      sv: 'hitta-och-rakna-arbetsblad',
    },
  },
  {
    appId: 'matching-app',
    slugs: {
      en: 'matching-worksheets',
      sv: 'matchnings-arbetsblad',
    },
  },
  {
    appId: 'drawing-lines',
    slugs: {
      en: 'drawing-lines-worksheets',
      sv: 'rita-linjer-arbetsblad',
    },
  },
  {
    appId: 'picture-bingo',
    slugs: {
      en: 'picture-bingo-worksheets',
      sv: 'bildlotto-arbetsblad',
    },
  },
  {
    appId: 'sudoku',
    slugs: {
      en: 'sudoku-worksheets',
      sv: 'bildsudoku-arbetsblad',
    },
  },
  {
    appId: 'big-small-app',
    slugs: {
      en: 'big-small-worksheets',
      sv: 'stort-litet-arbetsblad',
    },
  },
  {
    appId: 'chart-count-color',
    slugs: {
      en: 'chart-count-worksheets',
      sv: 'diagram-rakning-arbetsblad',
    },
  },
  {
    appId: 'code-addition',
    slugs: {
      en: 'code-addition-worksheets',
      sv: 'kodaddition-arbetsblad',
    },
  },
  {
    appId: 'draw-and-color',
    slugs: {
      en: 'draw-and-color-worksheets',
      sv: 'rutritning-arbetsblad',
    },
  },
  {
    appId: 'find-objects',
    slugs: {
      en: 'find-objects-worksheets',
      sv: 'hitta-foremal-arbetsblad',
    },
  },
  {
    appId: 'grid-match',
    slugs: {
      en: 'grid-match-worksheets',
      sv: 'rutnatsmatching-arbetsblad',
    },
  },
  {
    appId: 'image-crossword',
    slugs: {
      en: 'crossword-worksheets',
      sv: 'bildkorsord-arbetsblad',
    },
  },
  {
    appId: 'image-cryptogram',
    slugs: {
      en: 'cryptogram-worksheets',
      sv: 'bildkryptogram-arbetsblad',
    },
  },
  {
    appId: 'math-puzzle',
    slugs: {
      en: 'math-puzzle-worksheets',
      sv: 'mattepussel-arbetsblad',
    },
  },
  {
    appId: 'missing-pieces',
    slugs: {
      en: 'missing-pieces-worksheets',
      sv: 'saknade-bitar-arbetsblad',
    },
  },
  {
    appId: 'more-less',
    slugs: {
      en: 'more-less-worksheets',
      sv: 'jamforelse-arbetsblad',
    },
  },
  {
    appId: 'odd-one-out',
    slugs: {
      en: 'odd-one-out-worksheets',
      sv: 'hitta-udda-bilden-arbetsblad',
    },
  },
  {
    appId: 'pattern-train',
    slugs: {
      en: 'pattern-train-worksheets',
      sv: 'monster-tag-arbetsblad',
    },
  },
  {
    appId: 'pattern-worksheet',
    slugs: {
      en: 'pattern-worksheets',
      sv: 'monster-arbetsblad',
    },
  },
  {
    appId: 'picture-path',
    slugs: {
      en: 'picture-path-worksheets',
      sv: 'bildlabyrint-arbetsblad',
    },
  },
  {
    appId: 'picture-sort',
    slugs: {
      en: 'picture-sort-worksheets',
      sv: 'bildsortering-arbetsblad',
    },
  },
  {
    appId: 'prepositions',
    slugs: {
      en: 'prepositions-worksheets',
      sv: 'prepositioner-arbetsblad',
    },
  },
  {
    appId: 'shadow-match',
    slugs: {
      en: 'shadow-match-worksheets',
      sv: 'skuggmatchning-arbetsblad',
    },
  },
  {
    appId: 'subtraction',
    slugs: {
      en: 'subtraction-worksheets',
    },
  },
  {
    appId: 'treasure-hunt',
    slugs: {
      en: 'treasure-hunt-worksheets',
    },
  },
  {
    appId: 'word-guess',
    slugs: {
      en: 'word-guess-worksheets',
    },
  },
  {
    appId: 'writing-app',
    slugs: {
      en: 'writing-worksheets',
    },
  },
];

/**
 * Get the slug for a specific app and locale
 */
export function getSlugForLocale(appId: string, locale: SupportedLocale): string | undefined {
  const config = productPageSlugs.find(c => c.appId === appId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the app config from any slug (in any language)
 */
export function getAppConfigBySlug(slug: string): { appId: string; locale: SupportedLocale } | undefined {
  for (const config of productPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { appId: config.appId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllProductPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of productPageSlugs) {
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
 */
export function getAlternateUrls(appId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = productPageSlugs.find(c => c.appId === appId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      alternates[locale] = `${baseUrl}/${locale}/apps/${slug}`;
    }
  }

  return alternates;
}

/**
 * Check if a slug exists for a specific locale
 */
export function hasProductPage(slug: string, locale: SupportedLocale): boolean {
  const config = getAppConfigBySlug(slug);
  if (!config) return false;

  // Check if the slug matches this locale
  const appConfig = productPageSlugs.find(c => c.appId === config.appId);
  return appConfig?.slugs[locale] === slug;
}
