/**
 * Centralized Locale Configuration
 * SINGLE SOURCE OF TRUTH - Do NOT define locale arrays anywhere else!
 */

export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Mapping from locale code to full language name
 */
export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Francais',
  es: 'Espanol',
  it: 'Italiano',
  pt: 'Portugues',
  nl: 'Nederlands',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};

/**
 * Locales whose /[locale]/about/ ships authored Bucket-A copy that has
 * NOT been cleared by native-speaker review (CLAUDE.md §17.5.1). Concept-
 * named so the mechanism generalises past /about if a future surface
 * needs the same gating.
 *
 * Two behaviors derive from this ONE array:
 *   - frontend/app/[locale]/about/page.tsx
 *       → robots: { index: false, follow: true }
 *   - frontend/app/sitemap.ts shard-3 /about loop
 *       → entry excluded from sitemap
 *
 * To re-gate a locale: add its 2-letter code to this array. That single
 * edit simultaneously sets `robots: { index: false, follow: true }` on
 * the About page AND removes its sitemap entry. Consumers MUST import
 * this constant directly and use `.includes()` — never re-derive or
 * re-filter, that's a silent fork.
 *
 * 2026-05-27: cleared from `['sv','da','no','fi']` → `[]` after the four
 * Nordic+Finnic About pages were reviewed by parallel linguist agents
 * (reports archived at `docs/audit-results/about-linguist-review-2026-
 * 05-27.json`). Corrections applied in the same arc to message files
 * + a critical phonics-vs-phonetics term-choice fix across all four.
 * Native-speaker spot-check welcome but not required to keep them live.
 *
 * Mirror (keep in sync): scripts/seo-verify.mjs `UNREVIEWED_ABOUT_LOCALES`
 * — the harness lives outside Next.js TS module resolution and mirrors
 * this constant by comment-anchored convention (same pattern as
 * HREFLANG_MAP in that file).
 */
export const NSR_PENDING_LOCALES: readonly SupportedLocale[] = [];

/**
 * Mapping from locale code to folder name used in /samples/ directory
 */
export const LOCALE_TO_FOLDER: Record<SupportedLocale, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  pt: 'portuguese',
  it: 'italian',
  nl: 'dutch',
  sv: 'swedish',
  da: 'danish',
  no: 'norwegian',
  fi: 'finnish',
};
