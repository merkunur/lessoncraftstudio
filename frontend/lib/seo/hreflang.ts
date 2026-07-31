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
 * `x-default` is the page shown to searchers whose language matches NONE of the
 * declared alternates — i.e. a claim about the whole rest of the world. It is
 * therefore emitted ONLY when an English URL exists.
 *
 * This previously fell back to `Object.values(out)[0]` — the first locale that
 * happened to be present — so a cluster with no English member declared some
 * arbitrary locale as the global default. Measured 2026-07-31: 10 of 24 sampled
 * landings did this (a Swedish page declaring Spanish x-default, a Norwegian one
 * declaring Danish), i.e. roughly 12,000 of the 30,078 landings were telling
 * Google "for everyone else on earth, show the Spanish page." Omitting the tag
 * is correct in that case: Google then falls back to its own language matching
 * instead of being handed a wrong answer. `baseUrlFallback` is likewise NOT a
 * valid x-default for a specific piece of content.
 *
 * @param locales       the locales to consider (e.g. TOPIC_ENABLED_LOCALES)
 * @param urlForLocale  returns the absolute URL for a locale, or null/'' if the
 *                      content does not exist in that locale (skipped)
 * @returns map keyed by hreflang code; `x-default` present ONLY if an en URL exists
 */
export function buildHreflangAlternates(
  locales: readonly string[],
  urlForLocale: (locale: string) => string | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _baseUrlFallback?: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of locales) {
    const url = urlForLocale(loc);
    if (url) out[getHreflangCode(loc)] = url;
  }
  const en = out['en'] || out['en-US'];
  if (en) out['x-default'] = en;
  return out;
}
