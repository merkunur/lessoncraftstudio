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
      es: 'generador-fichas-suma', pt: 'gerador-fichas-adicao', it: 'generatore-schede-addizione', nl: 'optellen-werkblad-maker',
      sv: 'additions-arbetsblad-skapare'
    },
  },
  {
    toolId: 'image-subtraction',
    slugs: {
      en: 'subtraction-worksheet-maker',
      de: 'subtraktions-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-soustraction',
      es: 'generador-fichas-resta', pt: 'gerador-fichas-subtracao', it: 'generatore-schede-sottrazione', nl: 'aftrekken-werkblad-maker',
      sv: 'subtraktions-arbetsblad-skapare'
    },
  },
  {
    toolId: 'code-addition',
    slugs: {
      en: 'code-addition-worksheet-maker',
      de: 'bilder-additions-ersteller',
      fr: 'generateur-addition-codee',
      es: 'generador-suma-codificada', pt: 'gerador-adicao-codificada', it: 'generatore-addizione-codificata', nl: 'code-optellen-werkblad-maker',
      sv: 'kodadditions-arbetsblad-skapare'
    },
  },
  {
    toolId: 'more-less',
    slugs: {
      en: 'more-or-less-worksheet-maker',
      de: 'mehr-weniger-ersteller',
      fr: 'generateur-comparaison-quantites',
      es: 'generador-comparacion-cantidades', pt: 'gerador-comparacao-quantidades', it: 'generatore-confronto-quantita', nl: 'meer-minder-werkblad-maker',
      sv: 'mer-eller-mindre-arbetsblad-skapare'
    },
  },
  {
    toolId: 'math-puzzle',
    slugs: {
      en: 'math-puzzle-maker',
      de: 'mathe-raetsel-ersteller',
      fr: 'generateur-puzzle-maths',
      es: 'generador-puzzles-matematicos', pt: 'gerador-puzzles-matematicos', it: 'generatore-puzzle-matematici', nl: 'rekenpuzzel-maker',
      sv: 'mattepussel-skapare'
    },
  },
  {
    toolId: 'math-worksheet',
    slugs: {
      en: 'math-worksheet-maker',
      de: 'mathe-arbeitsblatt-ersteller',
      fr: 'generateur-exercices-maths',
      es: 'generador-ejercicios-matematicas', pt: 'gerador-exercicios-matematica', it: 'generatore-esercizi-matematica', nl: 'reken-werkblad-maker',
      sv: 'matte-arbetsblad-skapare'
    },
  },
  {
    toolId: 'alphabet-train',
    slugs: {
      en: 'alphabet-train-maker',
      de: 'alphabet-zug-ersteller',
      fr: 'generateur-train-alphabet',
      es: 'generador-tren-abecedario', pt: 'gerador-trem-alfabeto', it: 'generatore-treno-alfabeto', nl: 'alfabettrein-maker',
      sv: 'alfabetstaag-skapare'
    },
  },
  {
    toolId: 'prepositions',
    slugs: {
      en: 'prepositions-worksheet-maker',
      de: 'praepositionen-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-prepositions',
      es: 'generador-fichas-preposiciones', pt: 'gerador-fichas-preposicoes', it: 'generatore-schede-preposizioni', nl: 'voorzetsels-werkblad-maker',
      sv: 'prepositioner-arbetsblad-skapare'
    },
  },
  {
    toolId: 'word-guess',
    slugs: {
      en: 'word-guess-maker',
      de: 'woerter-raten-ersteller',
      fr: 'generateur-deviner-mots',
      es: 'generador-adivinar-palabras', pt: 'gerador-adivinhar-palavras', it: 'generatore-indovina-parole', nl: 'woordraadsel-maker',
      sv: 'gissa-ordet-skapare'
    },
  },
  {
    toolId: 'word-scramble',
    slugs: {
      en: 'word-scramble-maker',
      de: 'buchstabensalat-ersteller',
      fr: 'generateur-mots-melanges',
      es: 'generador-palabras-desordenadas', pt: 'gerador-palavras-embaralhadas', it: 'generatore-parole-mescolate', nl: 'letterpuzzel-maker',
      sv: 'ordmix-skapare'
    },
  },
  {
    toolId: 'word-search',
    slugs: {
      en: 'word-search-maker',
      de: 'wortsuche-ersteller',
      fr: 'generateur-mots-caches',
      es: 'generador-sopa-letras', pt: 'gerador-caca-palavras', it: 'generatore-cerca-parole', nl: 'woordzoeker-maker',
      sv: 'ordsoek-skapare'
    },
  },
  {
    toolId: 'cryptogram',
    slugs: {
      en: 'cryptogram-maker',
      de: 'kryptogramm-ersteller',
      fr: 'generateur-cryptogramme',
      es: 'generador-criptogramas', pt: 'gerador-criptogramas', it: 'generatore-crittogrammi', nl: 'cryptogram-maker',
      sv: 'kryptogram-skapare'
    },
  },
  {
    toolId: 'writing',
    slugs: {
      en: 'handwriting-worksheet-maker',
      de: 'schreibuebungen-ersteller',
      fr: 'generateur-fiches-ecriture',
      es: 'generador-fichas-escritura', pt: 'gerador-fichas-escrita', it: 'generatore-schede-scrittura', nl: 'schrijfoefeningen-maker',
      sv: 'skrivoevningar-skapare'
    },
  },
  {
    toolId: 'big-small',
    slugs: {
      en: 'big-and-small-worksheet-maker',
      de: 'gross-klein-ersteller',
      fr: 'generateur-fiches-grand-petit',
      es: 'generador-fichas-grande-pequeno', pt: 'gerador-fichas-grande-pequeno', it: 'generatore-schede-grande-piccolo', nl: 'groot-klein-werkblad-maker',
      sv: 'stor-liten-arbetsblad-skapare'
    },
  },
  {
    toolId: 'pattern-train',
    slugs: {
      en: 'pattern-train-maker',
      de: 'muster-zug-ersteller',
      fr: 'generateur-train-suites-logiques',
      es: 'generador-tren-patrones', pt: 'gerador-trem-padroes', it: 'generatore-treno-sequenze', nl: 'patroontrein-maker',
      sv: 'moenstertaag-skapare'
    },
  },
  {
    toolId: 'pattern-worksheet',
    slugs: {
      en: 'pattern-worksheet-maker',
      de: 'muster-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-sequences-logiques',
      es: 'generador-fichas-patrones', pt: 'gerador-fichas-padroes', it: 'generatore-schede-sequenze', nl: 'patronen-werkblad-maker',
      sv: 'moenster-arbetsblad-skapare'
    },
  },
  {
    toolId: 'draw-and-color',
    slugs: {
      en: 'draw-and-color-maker',
      de: 'rasterzeichnen-ersteller',
      fr: 'generateur-dessin-quadrillage',
      es: 'generador-dibujo-cuadricula', pt: 'gerador-desenho-quadricula', it: 'generatore-disegno-griglia', nl: 'rastertekenen-maker',
      sv: 'rita-och-faerglaeg-skapare'
    },
  },
  {
    toolId: 'drawing-lines',
    slugs: {
      en: 'drawing-lines-maker',
      de: 'linien-ziehen-ersteller',
      fr: 'generateur-fiches-graphisme',
      es: 'generador-fichas-grafomotricidad', pt: 'gerador-fichas-grafomotricidade', it: 'generatore-schede-pregrafismo', nl: 'lijnen-trekken-maker',
      sv: 'linjer-ovningar-skapare'
    },
  },
  {
    toolId: 'coloring',
    slugs: {
      en: 'coloring-page-maker',
      de: 'malvorlagen-ersteller',
      fr: 'generateur-pages-coloriage',
      es: 'generador-paginas-colorear', pt: 'gerador-paginas-colorir', it: 'generatore-pagine-colorare', nl: 'kleurplaten-maker',
      sv: 'maelarsidor-skapare'
    },
  },
  {
    toolId: 'chart-count',
    slugs: {
      en: 'chart-count-maker',
      de: 'bilddiagramm-ersteller',
      fr: 'generateur-graphique-images',
      es: 'generador-graficos-imagenes', pt: 'gerador-graficos-imagens', it: 'generatore-grafici-immagini', nl: 'telgrafiek-werkblad-maker',
      sv: 'bilddiagram-arbetsblad-skapare'
    },
  },
  {
    toolId: 'matching',
    slugs: {
      en: 'matching-worksheet-maker',
      de: 'zuordnungs-arbeitsblatt-ersteller',
      fr: 'generateur-fiches-association',
      es: 'generador-fichas-asociacion', pt: 'gerador-fichas-associacao', it: 'generatore-schede-abbinamento', nl: 'koppelen-werkblad-maker',
      sv: 'matchnings-arbetsblad-skapare'
    },
  },
  {
    toolId: 'grid-match',
    slugs: {
      en: 'grid-match-maker',
      de: 'raster-puzzle-ersteller',
      fr: 'generateur-puzzle-grille',
      es: 'generador-puzzle-cuadricula', pt: 'gerador-puzzle-quadricula', it: 'generatore-puzzle-griglia', nl: 'raster-puzzel-maker',
      sv: 'rutnaetspussel-skapare'
    },
  },
  {
    toolId: 'shadow-match',
    slugs: {
      en: 'shadow-match-maker',
      de: 'schattenbilder-ersteller',
      fr: 'generateur-discrimination-visuelle',
      es: 'generador-discriminacion-visual', pt: 'gerador-discriminacao-visual', it: 'generatore-discriminazione-visiva', nl: 'schaduw-koppelen-maker',
      sv: 'skuggmatchning-skapare'
    },
  },
  {
    toolId: 'bingo',
    slugs: {
      en: 'bingo-card-maker',
      de: 'bingo-karten-ersteller',
      fr: 'generateur-cartes-bingo',
      es: 'generador-tarjetas-bingo', pt: 'gerador-cartelas-bingo', it: 'generatore-cartelle-bingo', nl: 'plaatjesbingo-maker',
      sv: 'bildbingo-skapare'
    },
  },
  {
    toolId: 'picture-sort',
    slugs: {
      en: 'picture-sort-maker',
      de: 'bilder-sortieren-ersteller',
      fr: 'generateur-tri-images',
      es: 'generador-clasificacion-imagenes', pt: 'gerador-classificacao-imagens', it: 'generatore-classificazione-immagini', nl: 'plaatjes-sorteren-maker',
      sv: 'sortera-bilder-skapare'
    },
  },
  {
    toolId: 'missing-pieces',
    slugs: {
      en: 'missing-pieces-maker',
      de: 'fehlende-puzzleteile-ersteller',
      fr: 'generateur-pieces-manquantes',
      es: 'generador-piezas-faltantes', pt: 'gerador-pecas-faltantes', it: 'generatore-pezzi-mancanti', nl: 'ontbrekende-stukjes-maker',
      sv: 'saknade-bitar-skapare'
    },
  },
  {
    toolId: 'odd-one-out',
    slugs: {
      en: 'odd-one-out-maker',
      de: 'was-passt-nicht-ersteller',
      fr: 'generateur-fiches-intrus',
      es: 'generador-fichas-intruso', pt: 'gerador-fichas-intruso', it: 'generatore-schede-intruso', nl: 'wat-hoort-er-niet-bij-maker',
      sv: 'hitta-udda-skapare'
    },
  },
  {
    toolId: 'sudoku',
    slugs: {
      en: 'sudoku-maker',
      de: 'kinder-sudoku-ersteller',
      fr: 'generateur-sudoku-enfants',
      es: 'generador-sudoku-infantil', pt: 'gerador-sudoku-infantil', it: 'generatore-sudoku-bambini', nl: 'kinder-sudoku-maker',
      sv: 'barn-sudoku-skapare'
    },
  },
  {
    toolId: 'picture-path',
    slugs: {
      en: 'picture-path-maker',
      de: 'bilderpfad-ersteller',
      fr: 'generateur-parcours-images',
      es: 'generador-recorrido-imagenes', pt: 'gerador-percurso-imagens', it: 'generatore-percorso-immagini', nl: 'plaatjespad-maker',
      sv: 'bildvaeg-skapare'
    },
  },
  {
    toolId: 'find-and-count',
    slugs: {
      en: 'find-and-count-maker',
      de: 'suchen-und-zaehlen-ersteller',
      fr: 'generateur-cherche-et-compte',
      es: 'generador-busca-cuenta', pt: 'gerador-procura-conta', it: 'generatore-cerca-e-conta', nl: 'zoek-en-tel-maker',
      sv: 'hitta-och-raekna-skapare'
    },
  },
  {
    toolId: 'find-objects',
    slugs: {
      en: 'hidden-object-maker',
      de: 'suchbilder-ersteller',
      fr: 'generateur-cherche-objets',
      es: 'generador-busca-objetos', pt: 'gerador-procura-objetos', it: 'generatore-cerca-oggetti', nl: 'zoek-en-vind-maker',
      sv: 'hitta-foeremaalen-skapare'
    },
  },
  {
    toolId: 'crossword',
    slugs: {
      en: 'crossword-maker',
      de: 'bilderkreuzwortraetsel-ersteller',
      fr: 'generateur-mots-croises-images',
      es: 'generador-crucigramas-imagenes', pt: 'gerador-palavras-cruzadas', it: 'generatore-cruciverba-immagini', nl: 'kruiswoordpuzzel-maker',
      sv: 'bildkorsord-skapare'
    },
  },
  {
    toolId: 'treasure-hunt',
    slugs: {
      en: 'treasure-hunt-maker',
      de: 'schatzsuche-ersteller',
      fr: 'generateur-chasse-au-tresor',
      es: 'generador-busqueda-tesoro', pt: 'gerador-caca-tesouro', it: 'generatore-caccia-tesoro', nl: 'schattenjacht-maker',
      sv: 'skattjakt-skapare'
    },
  },
];

/**
 * Mapping from toolId to the corresponding appId in product-page-slugs.
 * Most IDs are identical; only mismatches are listed here.
 */
const toolIdToAppId: Record<string, string> = {
  'image-subtraction': 'subtraction',
  'cryptogram': 'image-cryptogram',
  'writing': 'writing-app',
  'big-small': 'big-small-app',
  'chart-count': 'chart-count-color',
  'matching': 'matching-app',
  'bingo': 'picture-bingo',
  'crossword': 'image-crossword',
};

/**
 * Get the corresponding appId (from product-page-slugs) for a given toolId.
 * Returns the toolId unchanged if no mapping override exists.
 */
export function getAppIdForTool(toolId: string): string {
  return toolIdToAppId[toolId] || toolId;
}

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
