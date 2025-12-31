/**
 * Product Page Content Registry
 *
 * This file centralizes all product page content imports and provides
 * lookup functions for finding content by slug or app ID.
 */

import { ProductPageContent } from '@/components/product-page/ProductPageClient';

// English content imports
import wordSearchEnContent from '@/content/product-pages/en/word-search-worksheets';
import additionEnContent from '@/content/product-pages/en/addition-worksheets';
import alphabetTrainEnContent from '@/content/product-pages/en/alphabet-train-worksheets';
import coloringEnContent from '@/content/product-pages/en/coloring-worksheets';
import mathWorksheetsEnContent from '@/content/product-pages/en/math-worksheets';
import wordScrambleEnContent from '@/content/product-pages/en/word-scramble-worksheets';
import findAndCountEnContent from '@/content/product-pages/en/find-and-count-worksheets';
import matchingEnContent from '@/content/product-pages/en/matching-worksheets';
import drawingLinesEnContent from '@/content/product-pages/en/drawing-lines-worksheets';
import pictureBingoEnContent from '@/content/product-pages/en/picture-bingo-worksheets';
import sudokuEnContent from '@/content/product-pages/en/sudoku-worksheets';
import bigSmallEnContent from '@/content/product-pages/en/big-small-worksheets';
import chartCountEnContent from '@/content/product-pages/en/chart-count-worksheets';
import codeAdditionEnContent from '@/content/product-pages/en/code-addition-worksheets';
import drawAndColorEnContent from '@/content/product-pages/en/draw-and-color-worksheets';
import findObjectsEnContent from '@/content/product-pages/en/find-objects-worksheets';
import gridMatchEnContent from '@/content/product-pages/en/grid-match-worksheets';
import crosswordEnContent from '@/content/product-pages/en/crossword-worksheets';
import cryptogramEnContent from '@/content/product-pages/en/cryptogram-worksheets';
import mathPuzzleEnContent from '@/content/product-pages/en/math-puzzle-worksheets';
import missingPiecesEnContent from '@/content/product-pages/en/missing-pieces-worksheets';
import moreLessEnContent from '@/content/product-pages/en/more-less-worksheets';
import oddOneOutEnContent from '@/content/product-pages/en/odd-one-out-worksheets';
import patternTrainEnContent from '@/content/product-pages/en/pattern-train-worksheets';
import patternWorksheetsEnContent from '@/content/product-pages/en/pattern-worksheets';
import picturePathEnContent from '@/content/product-pages/en/picture-path-worksheets';
import pictureSortEnContent from '@/content/product-pages/en/picture-sort-worksheets';
import prepositionsEnContent from '@/content/product-pages/en/prepositions-worksheets';
import shadowMatchEnContent from '@/content/product-pages/en/shadow-match-worksheets';
import subtractionEnContent from '@/content/product-pages/en/subtraction-worksheets';
import treasureHuntEnContent from '@/content/product-pages/en/treasure-hunt-worksheets';
import wordGuessEnContent from '@/content/product-pages/en/word-guess-worksheets';
import writingEnContent from '@/content/product-pages/en/writing-worksheets';

// Swedish content imports
import wordSearchSvContent from '@/content/product-pages/sv/word-search-worksheets';
import additionSvContent from '@/content/product-pages/sv/addition-worksheets';
import alphabetTrainSvContent from '@/content/product-pages/sv/alphabet-train-worksheets';
import coloringSvContent from '@/content/product-pages/sv/coloring-worksheets';
import mathWorksheetsSvContent from '@/content/product-pages/sv/math-worksheets';
import wordScrambleSvContent from '@/content/product-pages/sv/word-scramble-worksheets';
import findAndCountSvContent from '@/content/product-pages/sv/find-and-count-worksheets';
import matchingSvContent from '@/content/product-pages/sv/matching-worksheets';
import drawingLinesSvContent from '@/content/product-pages/sv/drawing-lines-worksheets';
import pictureBingoSvContent from '@/content/product-pages/sv/picture-bingo-worksheets';

// Content registry: maps slug to content for each locale
interface ContentRegistry {
  [locale: string]: {
    [slug: string]: ProductPageContent;
  };
}

// Build the content registry
// Content with SEO slugs are indexed by their slug
// Legacy content without SEO section uses the old slug
export const contentRegistry: ContentRegistry = {
  en: {
    // Word Search - has SEO section
    'word-search-worksheets': wordSearchEnContent,
    // Legacy content - indexed by old slugs (will be migrated)
    'addition-worksheets': additionEnContent,
    'alphabet-train-worksheets': alphabetTrainEnContent,
    'coloring-worksheets': coloringEnContent,
    'math-worksheets': mathWorksheetsEnContent,
    'word-scramble-worksheets': wordScrambleEnContent,
    'find-and-count-worksheets': findAndCountEnContent,
    'matching-worksheets': matchingEnContent,
    'drawing-lines-worksheets': drawingLinesEnContent,
    'picture-bingo-worksheets': pictureBingoEnContent,
    'sudoku-worksheets': sudokuEnContent,
    'big-small-worksheets': bigSmallEnContent,
    'chart-count-worksheets': chartCountEnContent,
    'code-addition-worksheets': codeAdditionEnContent,
    'draw-and-color-worksheets': drawAndColorEnContent,
    'find-objects-worksheets': findObjectsEnContent,
    'grid-match-worksheets': gridMatchEnContent,
    'crossword-worksheets': crosswordEnContent,
    'cryptogram-worksheets': cryptogramEnContent,
    'math-puzzle-worksheets': mathPuzzleEnContent,
    'missing-pieces-worksheets': missingPiecesEnContent,
    'more-less-worksheets': moreLessEnContent,
    'odd-one-out-worksheets': oddOneOutEnContent,
    'pattern-train-worksheets': patternTrainEnContent,
    'pattern-worksheets': patternWorksheetsEnContent,
    'picture-path-worksheets': picturePathEnContent,
    'picture-sort-worksheets': pictureSortEnContent,
    'prepositions-worksheets': prepositionsEnContent,
    'shadow-match-worksheets': shadowMatchEnContent,
    'subtraction-worksheets': subtractionEnContent,
    'treasure-hunt-worksheets': treasureHuntEnContent,
    'word-guess-worksheets': wordGuessEnContent,
    'writing-worksheets': writingEnContent,
  },
  sv: {
    // Swedish Word Search - uses Swedish slug
    'ordletar-arbetsblad': wordSearchSvContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchSvContent,
    // Swedish Addition - uses Swedish slug
    'addition-arbetsblad': additionSvContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionSvContent,
    // Swedish Alphabet Train - uses Swedish slug
    'alfabettag-arbetsblad': alphabetTrainSvContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainSvContent,
    // Swedish Coloring - uses Swedish slug
    'malarbilder-arbetsblad': coloringSvContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringSvContent,
    // Swedish Math Worksheets - uses Swedish slug
    'matematik-arbetsblad': mathWorksheetsSvContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsSvContent,
    // Swedish Word Scramble - uses Swedish slug
    'ordpussel-arbetsblad': wordScrambleSvContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleSvContent,
    // Swedish Find and Count - uses Swedish slug
    'hitta-och-rakna-arbetsblad': findAndCountSvContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountSvContent,
    // Swedish Matching - uses Swedish slug
    'matchnings-arbetsblad': matchingSvContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingSvContent,
    // Swedish Drawing Lines - uses Swedish slug
    'rita-linjer-arbetsblad': drawingLinesSvContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesSvContent,
    // Swedish Picture Bingo - uses Swedish slug
    'bildlotto-arbetsblad': pictureBingoSvContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoSvContent,
  },
};

/**
 * Get content for a specific locale and slug
 */
export function getContentBySlug(locale: string, slug: string): ProductPageContent | undefined {
  return contentRegistry[locale]?.[slug];
}

/**
 * Get all available slugs for a locale
 */
export function getAvailableSlugs(locale: string): string[] {
  return Object.keys(contentRegistry[locale] || {});
}

/**
 * Get all locale/slug combinations for generateStaticParams
 */
export function getAllStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];

  for (const [locale, slugs] of Object.entries(contentRegistry)) {
    for (const slug of Object.keys(slugs)) {
      params.push({ locale, slug });
    }
  }

  return params;
}

/**
 * Get alternate URLs for hreflang tags
 * Returns all available language versions of the same app
 */
export function getAlternateLanguageUrls(
  appId: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const [locale, slugs] of Object.entries(contentRegistry)) {
    for (const [slug, content] of Object.entries(slugs)) {
      // Check if this content matches the appId
      if (content.seo?.appId === appId) {
        alternates[locale] = `${baseUrl}/${locale}/apps/${content.seo.slug}`;
        break; // Only one URL per locale
      }
    }
  }

  return alternates;
}

/**
 * Check if content has SEO section (new format)
 */
export function hasSeoSection(content: ProductPageContent): boolean {
  return !!content.seo?.slug;
}
