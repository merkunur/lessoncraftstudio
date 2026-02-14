// ============================================================================
// Enriched Theme Content Loader (with legacy fallback)
// Part 2 of Landing Page SEO Perfection
// ============================================================================

import type { EnrichedThemeContent, ThemeId, GradeId, GradeLearningContent } from './types';
import { getThemeContent as getLegacyContent, type ThemePageContent } from '@/config/theme-page-content';
import { enrichedRegistry, registerThemeContent } from './registry';

// Re-export for consumers
export { registerThemeContent } from './registry';
export type { ThemePageContent } from '@/config/theme-page-content';

// Load all registered enriched content files
// This must come AFTER the registry import so registerThemeContent is available
import './register-all';

// -- Loaders -----------------------------------------------------------------

/** Get enriched content for a theme + locale. Returns null if not yet created. */
export function getEnrichedThemeContent(
  themeId: string,
  locale: string,
): EnrichedThemeContent | null {
  const id = themeId as ThemeId;
  return enrichedRegistry[id]?.[locale] ?? enrichedRegistry[id]?.en ?? null;
}

/** Get grade-specific content from enriched data. Returns null if unavailable. */
export function getEnrichedGradeContent(
  themeId: string,
  gradeId: string,
  locale: string,
): GradeLearningContent | null {
  const enriched = getEnrichedThemeContent(themeId, locale);
  if (!enriched) return null;
  return enriched.gradeContent[gradeId as GradeId] ?? null;
}

/** Seamless fallback: returns enriched content if available, otherwise legacy. */
export function getThemeContentWithFallback(
  themeId: string,
  locale: string,
): EnrichedThemeContent | ThemePageContent | undefined {
  const enriched = getEnrichedThemeContent(themeId, locale);
  if (enriched) return enriched;
  return getLegacyContent(themeId, locale);
}

// -- Type guard --------------------------------------------------------------

/** Check whether content is enriched (has curatedAppIds) vs legacy */
export function isEnrichedContent(
  content: EnrichedThemeContent | ThemePageContent,
): content is EnrichedThemeContent {
  return 'curatedAppIds' in content;
}
