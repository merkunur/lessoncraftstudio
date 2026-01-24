/**
 * Dynamic Redirect Generator for Product Pages
 *
 * This module generates SEO redirects from English slugs to localized slugs.
 * Instead of maintaining 300+ hardcoded redirects in next.config.js, this
 * generates them programmatically from the product-page-slugs configuration.
 *
 * Example: /sv/apps/word-search-worksheets -> /sv/apps/ordletar-arbetsblad
 */

import { productPageSlugs, SUPPORTED_LOCALES, type SupportedLocale } from './product-page-slugs';

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
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
