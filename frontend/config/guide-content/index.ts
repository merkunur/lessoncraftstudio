/**
 * "Create X" Guide Content Loader
 *
 * Dynamically loads content for mid-funnel guide pages.
 * Returns null if content file doesn't exist (graceful fallback).
 */

import type { SupportedLocale } from '../product-page-slugs';
import type { CreateXContent } from './types';

export type { CreateXContent } from './types';

export async function getGuideContent(
  guideId: string,
  locale: SupportedLocale
): Promise<CreateXContent | null> {
  try {
    const mod = await import(`./${locale}/${guideId}`);
    return mod.content || null;
  } catch {
    return null;
  }
}
