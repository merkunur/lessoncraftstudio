/**
 * Free Tool Content Loader
 *
 * Dynamically loads content for free tool landing pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { FreeToolContent } from './types';

export type { FreeToolContent } from './types';

export async function getToolContent(
  toolSlug: string,
  locale: SupportedLocale
): Promise<FreeToolContent | null> {
  try {
    const mod = await import(`./${locale}/${toolSlug}`);
    return mod.content || null;
  } catch {
    return null;
  }
}
