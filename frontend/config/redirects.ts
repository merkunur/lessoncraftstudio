/**
 * Dynamic Redirect Generator for Product Pages
 *
 * This module generates SEO redirects from English slugs to localized slugs.
 * Instead of maintaining 300+ hardcoded redirects in next.config.js, this
 * generates them programmatically from the product-page-slugs configuration.
 *
 * Example: /sv/apps/word-search-worksheets -> /sv/apps/ordletar-arbetsblad
 *
 * Also handles legacy appId redirects for SEO recovery:
 * Example: /en/apps/word-search -> /en/apps/word-search-worksheets
 */

import { productPageSlugs, SUPPORTED_LOCALES, type SupportedLocale } from './product-page-slugs';

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Legacy appId to SEO slug mapping
 *
 * These are the original appId-based URLs that Google had indexed before
 * the SEO optimization. We need to 301 redirect these to the new SEO slugs
 * to transfer ranking value and stop the noindex signal.
 *
 * Note: Some appIds match their SEO slug (e.g., sudoku -> sudoku-worksheets)
 * while others are completely different (e.g., image-addition -> addition-worksheets)
 */
const legacyAppIdToEnglishSlug: Record<string, string> = {
  // These are the appIds that differ from their English SEO slugs
  'word-search': 'word-search-worksheets',
  'image-addition': 'addition-worksheets',
  'alphabet-train': 'alphabet-train-worksheets',
  'coloring': 'coloring-worksheets',
  'math-worksheet': 'math-worksheets',
  'word-scramble': 'word-scramble-worksheets',
  'find-and-count': 'find-and-count-worksheets',
  'matching-app': 'matching-worksheets',
  'drawing-lines': 'drawing-lines-worksheets',
  'picture-bingo': 'picture-bingo-worksheets',
  'sudoku': 'sudoku-worksheets',
  'big-small-app': 'big-small-worksheets',
  'chart-count-color': 'chart-count-worksheets',
  'code-addition': 'code-addition-worksheets',
  'draw-and-color': 'draw-and-color-worksheets',
  'find-objects': 'find-objects-worksheets',
  'grid-match': 'grid-match-worksheets',
  'image-crossword': 'crossword-worksheets',
  'image-cryptogram': 'cryptogram-worksheets',
  'math-puzzle': 'math-puzzle-worksheets',
  'missing-pieces': 'missing-pieces-worksheets',
  'more-less': 'more-less-worksheets',
  'odd-one-out': 'odd-one-out-worksheets',
  'pattern-train': 'pattern-train-worksheets',
  'pattern-worksheet': 'pattern-worksheets',
  'picture-path': 'picture-path-worksheets',
  'picture-sort': 'picture-sort-worksheets',
  'prepositions': 'prepositions-worksheets',
  'shadow-match': 'shadow-match-worksheets',
  'subtraction': 'subtraction-worksheets',
  'treasure-hunt': 'treasure-hunt-worksheets',
  'word-guess': 'word-guess-worksheets',
  'writing-app': 'writing-worksheets',
};

/**
 * Generate 301 redirects from legacy appId URLs to SEO-optimized URLs
 *
 * Before the SEO optimization (Jan 24, 2026), URLs like /en/apps/image-addition
 * were indexed by Google. After the change, these URLs return noindex instead
 * of redirecting, causing Google to de-index ~363 pages.
 *
 * This function creates permanent 301 redirects from all legacy appId-based
 * URLs to their new SEO-optimized slug equivalents for all locales.
 *
 * Example redirects:
 * - /en/apps/image-addition -> /en/apps/addition-worksheets
 * - /de/apps/image-addition -> /de/apps/addition-arbeitsblaetter
 * - /sv/apps/word-search -> /sv/apps/ordletar-arbetsblad
 */
export function generateLegacyAppIdRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  for (const [legacyAppId, englishSeoSlug] of Object.entries(legacyAppIdToEnglishSlug)) {
    // Find the app config to get localized slugs
    const appConfig = productPageSlugs.find(app => app.slugs.en === englishSeoSlug);

    if (!appConfig) {
      console.warn(`Warning: No app config found for English slug: ${englishSeoSlug}`);
      continue;
    }

    // Create redirects for all locales
    for (const locale of SUPPORTED_LOCALES) {
      // Get the localized SEO slug (fallback to English if not available)
      const localizedSlug = appConfig.slugs[locale as SupportedLocale] || englishSeoSlug;

      // Skip if legacy appId equals the localized slug (no redirect needed)
      if (legacyAppId === localizedSlug) continue;

      redirects.push({
        source: `/${locale}/apps/${legacyAppId}`,
        destination: `/${locale}/apps/${localizedSlug}`,
        permanent: true, // 301 redirect for SEO value transfer
      });
    }
  }

  return redirects;
}

/**
 * Generate product page redirects from English slugs to localized slugs
 *
 * For each app and each non-English locale:
 * - If the locale has a localized slug different from English
 * - Create a redirect from /{locale}/apps/{english-slug} to /{locale}/apps/{localized-slug}
 *
 * This ensures that:
 * 1. Users accessing English slugs in other languages are redirected to the correct localized URL
 * 2. Search engines follow 301 redirects to the canonical localized URL
 * 3. Old bookmarks and links still work
 */
export function generateProductPageRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  for (const app of productPageSlugs) {
    const englishSlug = app.slugs.en;
    if (!englishSlug) continue;

    for (const locale of SUPPORTED_LOCALES) {
      // Skip English - no redirect needed
      if (locale === 'en') continue;

      const localizedSlug = app.slugs[locale as SupportedLocale];

      // Only create redirect if:
      // 1. A localized slug exists for this locale
      // 2. The localized slug is different from the English slug
      if (localizedSlug && localizedSlug !== englishSlug) {
        redirects.push({
          source: `/${locale}/apps/${englishSlug}`,
          destination: `/${locale}/apps/${localizedSlug}`,
          permanent: true, // 301 redirect for SEO
        });
      }
    }
  }

  return redirects;
}

/**
 * Generate cross-locale redirects for when users access wrong language slugs
 *
 * Example: /de/apps/ordletar-arbetsblad (Swedish slug with German locale)
 *          -> /sv/apps/ordletar-arbetsblad (correct Swedish locale)
 *
 * Note: This is more complex and may cause redirect chains. Use with caution.
 * The middleware handles most of these cases already.
 */
export function generateCrossLocaleRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  for (const app of productPageSlugs) {
    // For each localized slug, redirect from other locales to correct locale
    for (const [sourceLocale, sourceSlug] of Object.entries(app.slugs)) {
      if (!sourceSlug) continue;

      for (const targetLocale of SUPPORTED_LOCALES) {
        // Skip same locale
        if (targetLocale === sourceLocale) continue;

        const targetSlug = app.slugs[targetLocale as SupportedLocale];

        // Only redirect if the target locale has a different slug
        // This prevents redirect to same URL
        if (targetSlug && targetSlug !== sourceSlug) {
          // Redirect accessing source slug with wrong locale to correct locale with correct slug
          redirects.push({
            source: `/${targetLocale}/apps/${sourceSlug}`,
            destination: `/${sourceLocale}/apps/${sourceSlug}`,
            permanent: true,
          });
        }
      }
    }
  }

  return redirects;
}

/**
 * Get all product page redirects
 *
 * Returns all redirects needed for the product pages.
 * Currently only includes English -> localized slug redirects.
 */
export function getAllProductPageRedirects(): Redirect[] {
  // Only include English -> localized redirects for now
  // Cross-locale redirects can cause issues and are better handled in middleware
  return generateProductPageRedirects();
}

/**
 * Debug: Log all generated redirects
 */
export function logRedirects(): void {
  const redirects = getAllProductPageRedirects();
  console.log(`Generated ${redirects.length} product page redirects:`);
  for (const redirect of redirects) {
    console.log(`  ${redirect.source} -> ${redirect.destination}`);
  }
}
