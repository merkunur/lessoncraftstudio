// ============================================================================
// Enriched Theme Content Registry
// Separated from index.ts to break circular dependency:
//   index.ts -> register-all.ts -> content files -> registry.ts (no cycle)
// ============================================================================

import type { EnrichedThemeContent, ThemeId } from './types';

/** Registry of enriched content, populated by per-theme locale files */
export const enrichedRegistry: Partial<Record<ThemeId, Partial<Record<string, EnrichedThemeContent>>>> = {};

/** Called by each theme's locale file to self-register its content */
export function registerThemeContent(
  themeId: ThemeId,
  locale: string,
  content: EnrichedThemeContent,
): void {
  if (!enrichedRegistry[themeId]) enrichedRegistry[themeId] = {};
  enrichedRegistry[themeId]![locale] = content;
}
