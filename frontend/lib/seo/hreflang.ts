/**
 * Hreflang — single source of truth for locale → hreflang-code mapping and
 * for building per-content hreflang alternates maps.
 *
 * Convention (CLAUDE.md §6): `pt` → `pt-BR` (Brazilian Portuguese, ~97% of
 * Portuguese speakers); `es` stays plain `es` to serve ALL Spanish markets;
 * every other locale maps 1:1. This file is the ONLY place that mapping is
 * defined for the Next.js app. Consumers MUST import from here — do NOT
 * re-inline the map (that was the historical drift bug: 5 separate copies in
 * activities/tool-content/standards/manipulatives/schema-generator).
 *
 * `frontend/lib/schema-generator.ts` re-exports `hreflangMap` + `getHreflangCode`
 * from here for backwards-compat with its existing importers.
 *
 * NOTE: publish-cli (`scripts/publish-cli/*`) is a separate CommonJS world that
 * cannot import this ESM module; it keeps its own inline copy (substitute.js /
 * the sitemap image routes use getHreflangCode). If the mapping ever changes,
 * update the publish-cli copy too — search for "pt-BR" across scripts/.
 */

/** locale → hreflang code. pt→pt-BR; all others 1:1 (es stays es). */
export const HREFLANG_MAP: Record<string, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt-BR',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
};

/** Backwards-compat alias (schema-generator historically exported `hreflangMap`). */
export const hreflangMap = HREFLANG_MAP;

/** Convert an internal locale code to its proper hreflang code. */
export function getHreflangCode(locale: string): string {
  return HREFLANG_MAP[locale] || locale;
}

/**
 * Build an `{ hreflangCode: absoluteUrl }` alternates map (plus `x-default`)
 * for a piece of content that exists in some subset of locales.
 *
 * @param locales       the locales to consider (e.g. TOPIC_ENABLED_LOCALES)
 * @param urlForLocale  returns the absolute URL for a locale, or null/'' if the
 *                      content does not exist in that locale (skipped)
 * @returns map keyed by hreflang code; `x-default` points at en (or the first
 *          available locale, or the bare baseUrl fallback)
 */
export function buildHreflangAlternates(
  locales: readonly string[],
  urlForLocale: (locale: string) => string | null | undefined,
  baseUrlFallback: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of locales) {
    const url = urlForLocale(loc);
    if (url) out[getHreflangCode(loc)] = url;
  }
  out['x-default'] = out['en'] || out['en-US'] || Object.values(out)[0] || baseUrlFallback;
  return out;
}
