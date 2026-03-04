/**
 * Niche Idea Content Loader
 *
 * Dynamically loads content for niche idea pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { NicheIdeaContent } from './types';

export type { NicheIdeaContent } from './types';

export async function getIdeaContent(
  ideaId: string,
  locale: SupportedLocale
): Promise<NicheIdeaContent | null> {
  try {
    const mod = await import(`./${locale}/${ideaId}`);
    return mod.content || null;
  } catch {
    return null;
  }
}
