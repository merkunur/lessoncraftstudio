/**
 * App Detail Content Loader
 *
 * Dynamically loads enriched content for app detail pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { AppDetailContent } from './types';

export type { AppDetailContent } from './types';
export type { SEOFields, PageVisuals, FAQItem, InternalLink } from './types';

/**
 * Load enriched content for an app detail page.
 * Returns null if content file doesn't exist yet (template renders with fallback).
 */
export async function getAppContent(
  appId: string,
  locale: SupportedLocale
): Promise<AppDetailContent | null> {
  try {
    const mod = await import(`./${locale}/${appId}`);
    return mod.content || null;
  } catch {
    return null;
  }
}

/**
 * Check if enriched content exists for an app.
 */
export async function hasAppContent(
  appId: string,
  locale: SupportedLocale
): Promise<boolean> {
  const content = await getAppContent(appId, locale);
  return content !== null;
}
