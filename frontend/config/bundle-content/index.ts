/**
 * Bundle Content Loader
 *
 * Dynamically loads content for bundle sales pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { BundleContent } from './types';

export type { BundleContent } from './types';

export async function getBundleContent(
  bundleId: string,
  locale: SupportedLocale
): Promise<BundleContent | null> {
  try {
    const mod = await import(`./${locale}/${bundleId}`);
    return mod.content || null;
  } catch {
    return null;
  }
}
