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
      sv: 'malarbilder-arbetsblad',
      de: 'malvorlagen-arbeitsblaetter',
      fr: 'coloriage-fiches',
      es: 'dibujos-colorear-fichas',
      it: 'disegni-da-colorare',
    },
  },
  {
    appId: 'math-worksheet',
    slugs: {
      en: 'math-worksheets',
      sv: 'matematik-arbetsblad',
      de: 'mathe-arbeitsblaetter',
      fr: 'exercices-maths-fiches',
      es: 'acertijos-matematicos-fichas',
      it: 'matematica-schede',
    },
  },
  {
    appId: 'word-scramble',
    slugs: {
      en: 'word-scramble-worksheets',
      sv: 'ordpussel-arbetsblad',
      de: 'buchstabensalat-arbeitsblaetter',
      fr: 'mots-melanges-fiches',
      es: 'letras-revueltas-fichas',
      it: 'anagrammi-schede',
    },
  },
  {
    appId: 'find-and-count',
    slugs: {
      en: 'find-and-count-worksheets',
      sv: 'hitta-och-rakna-arbetsblad',
      de: 'suchen-und-zaehlen-arbeitsblaetter',
      fr: 'cherche-et-compte-fiches',
      es: 'buscar-contar-fichas',
      it: 'trova-e-conta-schede',
    },
  },
  {
    appId: 'matching-app',
    slugs: {
      en: 'matching-worksheets',
      sv: 'matchnings-arbetsblad',
      es: 'relacionar-fichas',
      it: 'abbinamenti-schede',
    },
  },
  {
    appId: 'drawing-lines',
    slugs: {
      en: 'drawing-lines-worksheets',
      sv: 'rita-linjer-arbetsblad',
      de: 'linien-ziehen-arbeitsblaetter',
      fr: 'graphisme-fiches',
      es: 'grafomotricidad-fichas',
      it: 'pregrafismo-schede',
    },
  },
  {
    appId: 'picture-bingo',
    slugs: {
      en: 'picture-bingo-worksheets',
      sv: 'bildlotto-arbetsblad',
      de: 'bilder-bingo-arbeitsblaetter',
      fr: 'bingo-images-fiches',
      es: 'bingo-fichas',
      it: 'bingo-immagini-schede',
    },
  },
  {
    appId: 'sudoku',
    slugs: {
      en: 'sudoku-worksheets',
      sv: 'bildsudoku-arbetsblad',
      de: 'kinder-sudoku-arbeitsblaetter',
      es: 'sudoku-fichas-ninos',
      it: 'sudoku-bambini-schede',
    },
  },
  {
    appId: 'big-small-app',
    slugs: {
      en: 'big-small-worksheets',
      sv: 'stort-litet-arbetsblad',
      de: 'gross-klein-arbeitsblaetter',
      fr: 'grand-petit-fiches',
      es: 'grande-pequeno-fichas',
      it: 'grande-piccolo-schede',
    },
  },
  {
    appId: 'chart-count-color',
    slugs: {
      en: 'chart-count-worksheets',
      sv: 'diagram-rakning-arbetsblad',
      de: 'bilddiagramm-arbeitsblaetter',
      fr: 'graphique-images-fiches',
      es: 'graficos-conteo-fichas',
      it: 'grafici-immagini-schede',
    },
  },
  {
    appId: 'code-addition',
    slugs: {
      en: 'code-addition-worksheets',
      sv: 'kodaddition-arbetsblad',
      de: 'bilder-additions-arbeitsblaetter',
      fr: 'addition-codee-fiches',
      es: 'suma-codigo-fichas',
      it: 'addizioni-immagini-schede',
    },
  },
  {
    appId: 'draw-and-color',
    slugs: {
      en: 'draw-and-color-worksheets',
      sv: 'rutritning-arbetsblad',
      de: 'rasterzeichnen-arbeitsblaetter',
      fr: 'dessin-quadrillage-fiches',
      es: 'dibujo-cuadricula-fichas',
      it: 'disegno-griglia-schede',
    },
  },
  {
    appId: 'find-objects',
    slugs: {
      en: 'find-objects-worksheets',
      sv: 'hitta-foremal-arbetsblad',
      de: 'suchbilder-arbeitsblaetter',
      fr: 'cherche-objets-fiches',
      es: 'buscar-objetos-fichas',
      it: 'trova-oggetti-schede',
    },
  },
  {
    appId: 'grid-match',
    slugs: {
      en: 'grid-match-worksheets',
      sv: 'rutnatsmatching-arbetsblad',
      de: 'raster-puzzle-arbeitsblaetter',
      es: 'rompecabezas-cuadricula-fichas',
      it: 'griglia-abbinamento-schede',
    },
  },
  {
    appId: 'image-crossword',
    slugs: {
      en: 'crossword-worksheets',
      sv: 'bildkorsord-arbetsblad',
      de: 'bilderkreuzwortraetsel-arbeitsblaetter',
      fr: 'mots-croises-images-fiches',
      es: 'crucigramas-imagenes-fichas',
      it: 'cruciverba-immagini-schede',
    },
  },
  {
    appId: 'image-cryptogram',
    slugs: {
      en: 'cryptogram-worksheets',
      sv: 'bildkryptogram-arbetsblad',
      de: 'bildkryptogramm-arbeitsblaetter',
      fr: 'cryptogramme-images-fiches',
      es: 'criptogramas-imagenes-fichas',
      it: 'crittogramma-schede',
    },
  },
  {
    appId: 'math-puzzle',
    slugs: {
      en: 'math-puzzle-worksheets',
      sv: 'mattepussel-arbetsblad',
      de: 'mathe-raetsel-arbeitsblaetter',
      fr: 'puzzle-maths-fiches',
      es: 'rompecabezas-matematicos-fichas',
      it: 'puzzle-matematici-schede',
    },
  },
  {
    appId: 'missing-pieces',
    slugs: {
      en: 'missing-pieces-worksheets',
      sv: 'saknade-bitar-arbetsblad',
      de: 'fehlende-puzzleteile-arbeitsblaetter',
      fr: 'pieces-manquantes-fiches',
      es: 'piezas-faltantes-fichas',
      it: 'pezzi-mancanti-schede',
    },
  },
  {
    appId: 'more-less',
    slugs: {
      en: 'more-less-worksheets',
      sv: 'jamforelse-arbetsblad',
      de: 'mehr-weniger-arbeitsblaetter',
      fr: 'comparaison-quantites-fiches',
      es: 'mayor-menor-fichas',
      it: 'confronto-numeri-schede',
    },
  },
  {
    appId: 'odd-one-out',
    slugs: {
      en: 'odd-one-out-worksheets',
      sv: 'hitta-udda-bilden-arbetsblad',
      de: 'was-passt-nicht-arbeitsblaetter',
      fr: 'intrus-fiches',
      es: 'encuentra-el-diferente-fichas',
      it: 'trova-intruso-schede',
    },
  },
  {
    appId: 'pattern-train',
    slugs: {
      en: 'pattern-train-worksheets',
      sv: 'monster-tag-arbetsblad',
      de: 'muster-zug-arbeitsblaetter',
      fr: 'train-suites-logiques-fiches',
      es: 'tren-patrones-fichas',
      it: 'treno-sequenze-schede',
    },
  },
  {
    appId: 'pattern-worksheet',
    slugs: {
      en: 'pattern-worksheets',
      sv: 'monster-arbetsblad',
      de: 'muster-arbeitsblatt-arbeitsblaetter',
      fr: 'sequences-logiques-fiches',
      es: 'fichas-patrones',
      it: 'schede-pattern',
    },
  },
  {
    appId: 'picture-path',
    slugs: {
      en: 'picture-path-worksheets',
      sv: 'bildlabyrint-arbetsblad',
      de: 'bilderpfad-arbeitsblaetter',
      fr: 'parcours-images-fiches',
      es: 'laberintos-imagenes-fichas',
      it: 'percorso-illustrato-schede',
    },
  },
  {
    appId: 'picture-sort',
    slugs: {
      en: 'picture-sort-worksheets',
      sv: 'bildsortering-arbetsblad',
      de: 'bilder-sortieren-arbeitsblaetter',
      fr: 'tri-images-fiches',
      es: 'clasificar-imagenes-fichas',
    },
  },
  {
    appId: 'prepositions',
    slugs: {
      en: 'prepositions-worksheets',
      sv: 'prepositioner-arbetsblad',
      de: 'praepositionen-arbeitsblaetter',
      fr: 'prepositions-exercices-fiches',
      es: 'preposiciones-fichas',
    },
  },
  {
    appId: 'shadow-match',
    slugs: {
      en: 'shadow-match-worksheets',
      sv: 'skuggmatchning-arbetsblad',
      de: 'schattenbilder-zuordnen-arbeitsblaetter',
      fr: 'discrimination-visuelle-fiches',
      es: 'asociacion-sombras-fichas',
    },
  },
  {
    appId: 'subtraction',
    slugs: {
      en: 'subtraction-worksheets',
      sv: 'subtraktion-arbetsblad',
      de: 'subtraktion-arbeitsblaetter',
      fr: 'soustraction-fiches',
      es: 'resta-fichas',
    },
  },
  {
    appId: 'treasure-hunt',
    slugs: {
      en: 'treasure-hunt-worksheets',
      sv: 'skattjakt-arbetsblad',
      de: 'schatzsuche-arbeitsblaetter',
      fr: 'chasse-au-tresor-fiches',
      es: 'busqueda-tesoro-fichas',
    },
  },
  {
    appId: 'word-guess',
    slugs: {
      en: 'word-guess-worksheets',
      sv: 'gissa-ordet-arbetsblad',
      de: 'woerter-raten-arbeitsblaetter',
      fr: 'deviner-mots-fiches',
      es: 'adivinar-palabras-fichas',
    },
  },
  {
    appId: 'writing-app',
    slugs: {
      en: 'writing-worksheets',
      sv: 'skrivovningar-arbetsblad',
      de: 'schreibuebungen-arbeitsblaetter',
      fr: 'ecriture-fiches',
      es: 'lectoescritura-fichas',
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
