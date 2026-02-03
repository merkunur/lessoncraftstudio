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

    // Direct keyword match
    const matchedAppIds = KEYWORD_PRODUCT_MAP[normalizedKeyword] || [];
    for (const appId of matchedAppIds) {
      if (!excludeAppIds.includes(appId)) {
        appScores.set(appId, (appScores.get(appId) || 0) + 2);
      }
    }

    // Partial keyword match (for compound keywords)
    for (const [mapKeyword, appIds] of Object.entries(KEYWORD_PRODUCT_MAP)) {
      if (mapKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(mapKeyword)) {
        for (const appId of appIds) {
          if (!excludeAppIds.includes(appId)) {
            appScores.set(appId, (appScores.get(appId) || 0) + 1);
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
 *
 * @param htmlContent - HTML content to extract keywords from
 * @returns Array of matched keywords
 */
export function extractKeywordsFromContent(htmlContent: string): string[] {
  // Strip HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').toLowerCase();

  const foundKeywords: string[] = [];

  // Check for each keyword in our map
  for (const keyword of Object.keys(KEYWORD_PRODUCT_MAP)) {
    // Use word boundary matching for better accuracy
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(textContent)) {
      foundKeywords.push(keyword);
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
