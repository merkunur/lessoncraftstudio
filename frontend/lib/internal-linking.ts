/**
 * Internal Linking Utility for SEO
 *
 * Maps keywords, categories, and app IDs to enable cross-linking between:
 * - Blog posts → Product pages
 * - Product pages → Blog posts
 *
 * Pure utility functions with no side effects.
 */

import { appsConfig, type AppConfig } from './apps-config';
import { productPageSlugs, type SupportedLocale } from '@/config/product-page-slugs';

/**
 * Keyword groups that map to specific product types
 * These are used to match blog post content to relevant products
 */
const KEYWORD_PRODUCT_MAP: Record<string, string[]> = {
  // Math keywords
  'addition': ['image-addition', 'code-addition', 'math-worksheet'],
  'subtraction': ['subtraction', 'math-worksheet'],
  'math': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
  'counting': ['find-and-count', 'chart-count-color', 'more-less'],
  'numbers': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],

  // Language Arts keywords
  'vocabulary': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
  'words': ['word-search', 'word-scramble', 'word-guess'],
  'alphabet': ['alphabet-train', 'writing-app'],
  'letters': ['alphabet-train', 'writing-app'],
  'writing': ['writing-app', 'story-dice'],
  'handwriting': ['writing-app', 'drawing-lines'],
  'spelling': ['word-search', 'word-scramble', 'image-crossword'],
  'crossword': ['image-crossword'],
  'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],

  // Logic & Patterns keywords
  'pattern': ['pattern-worksheet', 'pattern-train'],
  'sequence': ['pattern-worksheet', 'pattern-train'],
  'logic': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
  'sorting': ['picture-sort', 'big-small-app'],
  'matching': ['matching-app', 'shadow-match', 'grid-match'],

  // Visual & Fine Motor keywords
  'coloring': ['coloring', 'draw-and-color'],
  'drawing': ['coloring', 'draw-and-color', 'drawing-lines'],
  'tracing': ['drawing-lines', 'writing-app'],
  'fine motor': ['drawing-lines', 'coloring', 'draw-and-color'],

  // Games & Activities keywords
  'bingo': ['picture-bingo'],
  'game': ['picture-bingo', 'treasure-hunt', 'story-dice'],
  'maze': ['picture-path'],
  'hidden objects': ['find-objects'],

  // Early Childhood keywords
  'preschool': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  'kindergarten': ['alphabet-train', 'coloring', 'find-and-count', 'matching-app', 'pattern-worksheet'],
  'toddler': ['coloring', 'big-small-app', 'matching-app'],

  // Skill-based keywords
  'visual perception': ['shadow-match', 'find-objects', 'odd-one-out', 'missing-pieces'],
  'critical thinking': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'math-puzzle'],
  'memory': ['matching-app', 'picture-bingo', 'grid-match'],
  'comparison': ['more-less', 'big-small-app'],
  'size': ['big-small-app'],
  'prepositions': ['prepositions'],
  'cryptogram': ['image-cryptogram'],
};

/**
 * Multilingual keyword mappings - maps localized terms to the same app IDs
 * These enable non-English blog posts to match with relevant products
 */
const KEYWORD_TRANSLATIONS: Record<string, Record<string, string[]>> = {
  // German
  de: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'mathematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'rechnen': ['math-worksheet', 'image-addition', 'subtraction'],
    'zählen': ['find-and-count', 'chart-count-color', 'more-less'],
    'zahlen': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'wortschatz': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'wörter': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'buchstaben': ['alphabet-train', 'writing-app'],
    'schreiben': ['writing-app', 'story-dice'],
    'muster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'ausmalen': ['coloring', 'draw-and-color'],
    'malen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'zeichnen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'rätsel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spiel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrinth': ['picture-path'],
    'vorschule': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
    'kindergarten': ['alphabet-train', 'coloring', 'find-and-count', 'matching-app', 'pattern-worksheet'],
  },
  // French
  fr: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'soustraction': ['subtraction', 'math-worksheet'],
    'mathématiques': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'maths': ['math-worksheet', 'math-puzzle', 'image-addition'],
    'compter': ['find-and-count', 'chart-count-color', 'more-less'],
    'nombres': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulaire': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'mots': ['word-search', 'word-scramble', 'word-guess'],
    'alphabet': ['alphabet-train', 'writing-app'],
    'lettres': ['alphabet-train', 'writing-app'],
    'écriture': ['writing-app', 'story-dice'],
    'motif': ['pattern-worksheet', 'pattern-train'],
    'logique': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'coloriage': ['coloring', 'draw-and-color'],
    'dessin': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'jeu': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrinthe': ['picture-path'],
    'maternelle': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Spanish
  es: {
    'suma': ['image-addition', 'code-addition', 'math-worksheet'],
    'adición': ['image-addition', 'code-addition', 'math-worksheet'],
    'resta': ['subtraction', 'math-worksheet'],
    'matemáticas': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'números': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulario': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palabras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escritura': ['writing-app', 'story-dice'],
    'patrón': ['pattern-worksheet', 'pattern-train'],
    'lógica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorear': ['coloring', 'draw-and-color'],
    'dibujo': ['coloring', 'draw-and-color', 'drawing-lines'],
    'rompecabezas': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'juego': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'laberinto': ['picture-path'],
    'preescolar': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Portuguese
  pt: {
    'adição': ['image-addition', 'code-addition', 'math-worksheet'],
    'soma': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtração': ['subtraction', 'math-worksheet'],
    'matemática': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contar': ['find-and-count', 'chart-count-color', 'more-less'],
    'números': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabulário': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'palavras': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'letras': ['alphabet-train', 'writing-app'],
    'escrita': ['writing-app', 'story-dice'],
    'padrão': ['pattern-worksheet', 'pattern-train'],
    'lógica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorir': ['coloring', 'draw-and-color'],
    'desenho': ['coloring', 'draw-and-color', 'drawing-lines'],
    'quebra-cabeça': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'jogo': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labirinto': ['picture-path'],
    'pré-escolar': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Italian
  it: {
    'addizione': ['image-addition', 'code-addition', 'math-worksheet'],
    'sottrazione': ['subtraction', 'math-worksheet'],
    'matematica': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'contare': ['find-and-count', 'chart-count-color', 'more-less'],
    'numeri': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'vocabolario': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'parole': ['word-search', 'word-scramble', 'word-guess'],
    'alfabeto': ['alphabet-train', 'writing-app'],
    'lettere': ['alphabet-train', 'writing-app'],
    'scrittura': ['writing-app', 'story-dice'],
    'schema': ['pattern-worksheet', 'pattern-train'],
    'logica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'colorare': ['coloring', 'draw-and-color'],
    'disegno': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzle': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'gioco': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labirinto': ['picture-path'],
    'prescolare': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Dutch
  nl: {
    'optellen': ['image-addition', 'code-addition', 'math-worksheet'],
    'aftrekken': ['subtraction', 'math-worksheet'],
    'wiskunde': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'rekenen': ['math-worksheet', 'image-addition', 'subtraction'],
    'tellen': ['find-and-count', 'chart-count-color', 'more-less'],
    'getallen': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'woordenschat': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'woorden': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'letters': ['alphabet-train', 'writing-app'],
    'schrijven': ['writing-app', 'story-dice'],
    'patroon': ['pattern-worksheet', 'pattern-train'],
    'logica': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'kleuren': ['coloring', 'draw-and-color'],
    'tekenen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puzzel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'doolhof': ['picture-path'],
    'kleuterschool': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Swedish
  sv: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'räkna': ['math-worksheet', 'image-addition', 'subtraction'],
    'räkning': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordförråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokstäver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'mönster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'färgläggning': ['coloring', 'draw-and-color'],
    'rita': ['coloring', 'draw-and-color', 'drawing-lines'],
    'pussel': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spel': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'förskola': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Danish
  da: {
    'addition': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraktion': ['subtraction', 'math-worksheet'],
    'matematik': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    'tælle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tal': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bogstaver': ['alphabet-train', 'writing-app'],
    'skrivning': ['writing-app', 'story-dice'],
    'mønster': ['pattern-worksheet', 'pattern-train'],
    'logik': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'farvelægning': ['coloring', 'draw-and-color'],
    'tegne': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puslespil': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spil': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'børnehave': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Norwegian
  no: {
    'addisjon': ['image-addition', 'code-addition', 'math-worksheet'],
    'subtraksjon': ['subtraction', 'math-worksheet'],
    'matematikk': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'regne': ['math-worksheet', 'image-addition', 'subtraction'],
    'telle': ['find-and-count', 'chart-count-color', 'more-less'],
    'tall': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'ordforråd': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'ord': ['word-search', 'word-scramble', 'word-guess'],
    'alfabet': ['alphabet-train', 'writing-app'],
    'bokstaver': ['alphabet-train', 'writing-app'],
    'skriving': ['writing-app', 'story-dice'],
    'mønster': ['pattern-worksheet', 'pattern-train'],
    'logikk': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'fargelegging': ['coloring', 'draw-and-color'],
    'tegne': ['coloring', 'draw-and-color', 'drawing-lines'],
    'puslespill': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'spill': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrint': ['picture-path'],
    'barnehage': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
  // Finnish
  fi: {
    'yhteenlasku': ['image-addition', 'code-addition', 'math-worksheet'],
    'vähennyslasku': ['subtraction', 'math-worksheet'],
    'matematiikka': ['math-worksheet', 'math-puzzle', 'image-addition', 'subtraction', 'code-addition'],
    'laskea': ['math-worksheet', 'image-addition', 'subtraction'],
    'laskeminen': ['find-and-count', 'chart-count-color', 'more-less'],
    'numerot': ['math-worksheet', 'sudoku', 'more-less', 'find-and-count'],
    'sanasto': ['word-search', 'word-scramble', 'word-guess', 'image-crossword'],
    'sanat': ['word-search', 'word-scramble', 'word-guess'],
    'aakkoset': ['alphabet-train', 'writing-app'],
    'kirjaimet': ['alphabet-train', 'writing-app'],
    'kirjoitus': ['writing-app', 'story-dice'],
    'kuvio': ['pattern-worksheet', 'pattern-train'],
    'logiikka': ['sudoku', 'odd-one-out', 'pattern-worksheet', 'image-cryptogram'],
    'värittäminen': ['coloring', 'draw-and-color'],
    'piirtäminen': ['coloring', 'draw-and-color', 'drawing-lines'],
    'palapeli': ['word-search', 'word-scramble', 'sudoku', 'math-puzzle', 'image-cryptogram'],
    'bingo': ['picture-bingo'],
    'peli': ['picture-bingo', 'treasure-hunt', 'story-dice'],
    'labyrintti': ['picture-path'],
    'esikoulu': ['alphabet-train', 'coloring', 'drawing-lines', 'big-small-app', 'matching-app'],
  },
};

/**
 * Category to app mapping
 * Aligns with blog post categories and app categories
 */
const CATEGORY_APP_MAP: Record<string, string[]> = {
  // Blog categories → App IDs
  'teaching-resources': ['word-search', 'math-worksheet', 'coloring', 'matching-app', 'sudoku'],
  'worksheet-tips': ['math-worksheet', 'word-search', 'pattern-worksheet', 'writing-app'],
  'educational-activities': ['picture-bingo', 'treasure-hunt', 'story-dice', 'coloring'],
  'learning-strategies': ['pattern-worksheet', 'sudoku', 'matching-app', 'odd-one-out'],
  'curriculum-guides': ['math-worksheet', 'alphabet-train', 'word-search', 'writing-app'],
  'parent-resources': ['coloring', 'drawing-lines', 'alphabet-train', 'matching-app'],
  'seasonal-content': ['coloring', 'word-search', 'picture-bingo', 'treasure-hunt'],

  // App categories → App IDs (for product page to product page linking)
  'Math': ['image-addition', 'subtraction', 'math-worksheet', 'math-puzzle', 'code-addition', 'more-less', 'find-and-count', 'chart-count-color'],
  'Language Arts': ['word-search', 'word-scramble', 'word-guess', 'writing-app', 'alphabet-train', 'image-crossword', 'prepositions', 'story-dice'],
  'Logic & Puzzles': ['sudoku', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'image-cryptogram', 'picture-sort'],
  'Visual Perception': ['shadow-match', 'find-objects', 'big-small-app', 'missing-pieces', 'picture-path'],
  'Art & Creativity': ['coloring', 'draw-and-color'],
  'Memory & Matching': ['matching-app', 'grid-match'],
  'Fine Motor Skills': ['drawing-lines'],
  'Games': ['picture-bingo', 'treasure-hunt'],
};

export interface RelatedProduct {
  appId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  url: string;
}

/**
 * Find related products based on keywords found in content
 *
 * @param keywords - Array of keywords to match against
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsByKeywords(
  keywords: string[],
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  const appScores = new Map<string, number>();

  // Score apps based on keyword matches
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase().trim();

    // Direct keyword match from English map
    let matchedAppIds = KEYWORD_PRODUCT_MAP[normalizedKeyword] || [];

    // If not found in English map and locale is not English, check localized keywords
    if (matchedAppIds.length === 0 && locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
      matchedAppIds = KEYWORD_TRANSLATIONS[locale][normalizedKeyword] || [];
    }

    for (const appId of matchedAppIds) {
      if (!excludeAppIds.includes(appId)) {
        appScores.set(appId, (appScores.get(appId) || 0) + 2);
      }
    }

    // Partial keyword match (for compound keywords) - English
    for (const [mapKeyword, appIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
      if (mapKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(mapKeyword)) {
        for (const appId of appIds) {
          if (!excludeAppIds.includes(appId)) {
            appScores.set(appId, (appScores.get(appId) || 0) + 1);
          }
        }
      }
    }

    // Partial keyword match for localized keywords
    if (locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
      for (const [mapKeyword, appIds] of Object.entries(KEYWORD_TRANSLATIONS[locale])) {
        if (mapKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(mapKeyword)) {
          for (const appId of appIds) {
            if (!excludeAppIds.includes(appId)) {
              appScores.set(appId, (appScores.get(appId) || 0) + 1);
            }
          }
        }
      }
    }
  }

  // Sort by score and get top matches
  const sortedAppIds = Array.from(appScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([appId]) => appId);

  return sortedAppIds.map(appId => appIdToProduct(appId, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Find related products based on blog category
 *
 * @param category - Blog post category ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsByCategory(
  category: string,
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  const appIds = CATEGORY_APP_MAP[category] || CATEGORY_APP_MAP['teaching-resources'] || [];

  const filteredAppIds = appIds
    .filter(appId => !excludeAppIds.includes(appId))
    .slice(0, limit);

  return filteredAppIds.map(appId => appIdToProduct(appId, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Find related products based on both keywords and category
 * Combines results with preference for keyword matches
 *
 * @param keywords - Array of keywords to match against
 * @param category - Blog post category ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @param excludeAppIds - App IDs to exclude from results
 * @returns Array of related products with localized URLs
 */
export function getRelatedProducts(
  keywords: string[],
  category: string,
  locale: SupportedLocale,
  limit: number = 4,
  excludeAppIds: string[] = []
): RelatedProduct[] {
  // Get keyword-based matches (higher priority)
  const keywordProducts = getRelatedProductsByKeywords(keywords, locale, limit, excludeAppIds);

  if (keywordProducts.length >= limit) {
    return keywordProducts;
  }

  // Fill remaining slots with category-based matches
  const existingAppIds = keywordProducts.map(p => p.appId);
  const categoryProducts = getRelatedProductsByCategory(
    category,
    locale,
    limit - keywordProducts.length,
    [...excludeAppIds, ...existingAppIds]
  );

  return [...keywordProducts, ...categoryProducts];
}

/**
 * Get related products for a specific app (for product page linking)
 *
 * @param appId - Current app ID
 * @param locale - Target locale for URLs
 * @param limit - Maximum number of products to return (default: 4)
 * @returns Array of related products with localized URLs
 */
export function getRelatedProductsForApp(
  appId: string,
  locale: SupportedLocale,
  limit: number = 4
): RelatedProduct[] {
  const app = appsConfig.find(a => a.id === appId);
  if (!app) return [];

  // Find related apps by category
  const categoryApps = CATEGORY_APP_MAP[app.category] || [];
  const relatedAppIds = categoryApps.filter(id => id !== appId).slice(0, limit);

  // If not enough from category, add apps with shared keywords
  if (relatedAppIds.length < limit) {
    const appKeywords = app.keywords || [];
    const keywordProducts = getRelatedProductsByKeywords(
      appKeywords,
      locale,
      limit - relatedAppIds.length,
      [appId, ...relatedAppIds]
    );

    return [
      ...relatedAppIds.map(id => appIdToProduct(id, locale)).filter(Boolean) as RelatedProduct[],
      ...keywordProducts
    ];
  }

  return relatedAppIds.map(id => appIdToProduct(id, locale)).filter(Boolean) as RelatedProduct[];
}

/**
 * Convert an app ID to a RelatedProduct object
 *
 * @param appId - App ID to convert
 * @param locale - Target locale for URL
 * @returns RelatedProduct object or null if not found
 */
export function appIdToProduct(appId: string, locale: SupportedLocale): RelatedProduct | null {
  const app = appsConfig.find(a => a.id === appId);
  if (!app) return null;

  const slugConfig = productPageSlugs.find(p => p.appId === appId);
  const slug = slugConfig?.slugs[locale] || slugConfig?.slugs.en;
  if (!slug) return null;

  return {
    appId: app.id,
    name: app.name,
    slug,
    description: app.description,
    category: app.category,
    icon: app.icon,
    url: `/${locale}/apps/${slug}`
  };
}

/**
 * Extract keywords from HTML content for matching
 * Simple extraction - looks for common educational terms
 * Supports multilingual keyword extraction when locale is provided
 *
 * @param htmlContent - HTML content to extract keywords from
 * @param locale - Target locale for language-specific keywords (default: 'en')
 * @returns Array of matched keywords
 */
export function extractKeywordsFromContent(htmlContent: string, locale: string = 'en'): string[] {
  // Strip HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').toLowerCase();

  const foundKeywords: string[] = [];

  // Check for each English keyword in our map (always checked)
  for (const keyword of Object.keys(KEYWORD_PRODUCT_MAP)) {
    // Use word boundary matching for better accuracy
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(textContent)) {
      foundKeywords.push(keyword);
    }
  }

  // Check locale-specific keywords if not English
  if (locale !== 'en' && KEYWORD_TRANSLATIONS[locale]) {
    for (const keyword of Object.keys(KEYWORD_TRANSLATIONS[locale])) {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(textContent)) {
        foundKeywords.push(keyword);
      }
    }
  }

  return foundKeywords;
}

/**
 * Get all app IDs from appsConfig
 * Utility function for testing and validation
 */
export function getAllAppIds(): string[] {
  return appsConfig.map(app => app.id);
}

/**
 * Get product URL for a specific app and locale
 *
 * @param appId - App ID
 * @param locale - Target locale
 * @returns URL string or null if not found
 */
export function getProductUrl(appId: string, locale: SupportedLocale): string | null {
  const product = appIdToProduct(appId, locale);
  return product?.url || null;
}

/**
 * Get keywords associated with an app ID
 * This is the reverse of KEYWORD_PRODUCT_MAP - finds keywords that map to a given app
 *
 * @param appId - App ID to find keywords for
 * @returns Array of keywords that map to this app
 */
export function getKeywordsForApp(appId: string): string[] {
  const keywords: string[] = [];

  for (const [keyword, appIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
    if (appIds.includes(appId)) {
      keywords.push(keyword);
    }
  }

  // Also include the app's own keywords from config
  const app = appsConfig.find(a => a.id === appId);
  if (app?.keywords) {
    for (const keyword of app.keywords) {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    }
  }

  return keywords;
}

/**
 * Get the category for an app ID
 *
 * @param appId - App ID
 * @returns Category string or null if not found
 */
export function getCategoryForApp(appId: string): string | null {
  const app = appsConfig.find(a => a.id === appId);
  return app?.category || null;
}
