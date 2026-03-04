/**
 * Cornerstone Guide Content Loader
 *
 * Dynamically loads content for cornerstone guide pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { CornerstoneContent } from './types';

export type { CornerstoneContent } from './types';

export async function getStartContent(
  guideId: string,
  locale: SupportedLocale
): Promise<CornerstoneContent | null> {
  try {
    const mod = await import(`./${locale}/${guideId}`);
    return mod.content || null;
  } catch {
    return null;
  }
}
