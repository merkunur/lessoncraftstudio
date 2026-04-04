/**
 * Lemon Squeezy Product Configuration
 *
 * Maps internal app IDs to Lemon Squeezy product IDs and checkout URLs.
 * Generated from Lemon Squeezy API on 2027-04-04.
 */

import type { AppId, CategoryId } from './products';

const STORE_SLUG = 'lessoncraftstudio-com';

// ==========================================
// INDIVIDUAL APP PRODUCTS ($49 each)
// ==========================================

export const LS_APP_PRODUCTS: Record<AppId, { productId: string; slug: string }> = {
  'addition': { productId: '946365', slug: 'addition-worksheet-generator' },
  'subtraction': { productId: '946386', slug: 'subtraction-worksheet-generator' },
  'code-addition': { productId: '946395', slug: 'code-addition-worksheet-generator' },
  'more-less': { productId: '946400', slug: 'more-or-less-worksheet-generator' },
  'math-puzzle': { productId: '946406', slug: 'math-puzzle-worksheet-generator' },
  'math-worksheet': { productId: '946418', slug: 'math-worksheet-generator' },
  'alphabet-train': { productId: '946422', slug: 'alphabet-train-worksheet-generator' },
  'prepositions': { productId: '946430', slug: 'prepositions-worksheet-generator' },
  'word-guess': { productId: '946434', slug: 'word-guess-worksheet-generator' },
  'word-scramble': { productId: '946438', slug: 'word-scramble-worksheet-generator' },
  'wordsearch': { productId: '946443', slug: 'word-search-worksheet-generator' },
  'cryptogram': { productId: '946447', slug: 'cryptogram-worksheet-generator' },
  'writing': { productId: '946451', slug: 'writing-worksheet-generator' },
  'big-small': { productId: '946454', slug: 'big-small-worksheet-generator' },
  'pattern-train': { productId: '946455', slug: 'pattern-train-worksheet-generator' },
  'pattern-worksheet': { productId: '946456', slug: 'pattern-worksheet-generator' },
  'draw-and-color': { productId: '946459', slug: 'draw-color-worksheet-generator' },
  'drawing-lines': { productId: '946464', slug: 'drawing-lines-worksheet-generator' },
  'coloring': { productId: '946467', slug: 'coloring-worksheet-generator' },
  'chart-count': { productId: '946471', slug: 'chart-count-worksheet-generator' },
  'matching': { productId: '946475', slug: 'matching-worksheet-generator' },
  'grid-match': { productId: '946478', slug: 'grid-match-worksheet-generator' },
  'shadow-match': { productId: '946484', slug: 'shadow-match-worksheet-generator' },
  'bingo': { productId: '946488', slug: 'bingo-worksheet-generator' },
  'picture-sort': { productId: '946490', slug: 'picture-sort-worksheet-generator' },
  'missing-pieces': { productId: '946493', slug: 'missing-pieces-worksheet-generator' },
  'odd-one-out': { productId: '946496', slug: 'odd-one-out-worksheet-generator' },
  'sudoku': { productId: '946498', slug: 'sudoku-worksheet-generator' },
  'picture-path': { productId: '946502', slug: 'picture-path-worksheet-generator' },
  'find-and-count': { productId: '946507', slug: 'find-count-worksheet-generator' },
  'find-objects': { productId: '946510', slug: 'find-objects-worksheet-generator' },
  'crossword': { productId: '946514', slug: 'crossword-worksheet-generator' },
  'treasure-hunt': { productId: '946518', slug: 'treasure-hunt-worksheet-generator' },
};

// ==========================================
// BUNDLE PRODUCTS ($149 each)
// ==========================================

export const LS_BUNDLE_PRODUCTS: Record<CategoryId, { productId: string; slug: string }> = {
  'math': { productId: '946521', slug: 'math-mastery-bundle' },
  'literacy': { productId: '946524', slug: 'literacy-language-bundle' },
  'visual': { productId: '946526', slug: 'visual-learning-bundle' },
  'matching': { productId: '946533', slug: 'matching-sorting-bundle' },
  'puzzle': { productId: '946534', slug: 'puzzles-logic-bundle' },
  'search': { productId: '946535', slug: 'search-find-bundle' },
};

// ==========================================
// CHECKOUT URL HELPERS
// ==========================================

/** Get the Lemon Squeezy checkout URL for an individual app */
export function getCheckoutUrl(appId: AppId): string {
  const product = LS_APP_PRODUCTS[appId];
  return `https://${STORE_SLUG}.lemonsqueezy.com/buy/${product.slug}`;
}

/** Get the Lemon Squeezy checkout URL for a category bundle */
export function getBundleCheckoutUrl(categoryId: CategoryId): string {
  const product = LS_BUNDLE_PRODUCTS[categoryId];
  return `https://${STORE_SLUG}.lemonsqueezy.com/buy/${product.slug}`;
}

/** Look up an app ID from a Lemon Squeezy product ID */
export function getAppIdFromProductId(productId: string): AppId | null {
  for (const [appId, product] of Object.entries(LS_APP_PRODUCTS)) {
    if (product.productId === productId) return appId as AppId;
  }
  return null;
}

/** Look up a category ID from a Lemon Squeezy product ID */
export function getCategoryIdFromProductId(productId: string): CategoryId | null {
  for (const [categoryId, product] of Object.entries(LS_BUNDLE_PRODUCTS)) {
    if (product.productId === productId) return categoryId as CategoryId;
  }
  return null;
}

/** Get all app IDs that a Lemon Squeezy product grants access to */
export function getAppsForLSProduct(productId: string): AppId[] {
  // Check individual apps first
  const appId = getAppIdFromProductId(productId);
  if (appId) return [appId];

  // Check bundles
  const categoryId = getCategoryIdFromProductId(productId);
  if (categoryId) {
    // Import dynamically to avoid circular dependency
    const { APP_CATEGORIES } = require('./products');
    return [...APP_CATEGORIES[categoryId].apps];
  }

  return [];
}
