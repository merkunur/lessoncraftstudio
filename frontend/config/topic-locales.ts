/**
 * Single source-of-truth for the locales that have topic-page coverage.
 *
 * Per CLAUDE.md §16.6.1 substrate-honesty discipline: even when a locale
 * appears in this list, individual (axis, axisKey, locale) tuples only
 * render / appear in sitemap when the locale has ≥1 published deck for
 * that tuple. Empty tuples are filtered downstream by:
 *   - frontend/app/[locale]/topic/[slug]/page.tsx → fetchDecksForAxis()
 *   - frontend/app/sitemap.ts → listNonEmptyAxisKeys() / listNonEmptyIntersections()
 *
 * Adding a locale here is safe: if no decks exist for the locale, no URLs
 * emit. Removing a locale here breaks topic-page rendering for that locale.
 *
 * Tier-1+2 launches (en, de, es, nl) have substantial catalog coverage
 * already; Tier-3 (sv, fi, no) and Tier-4 (fr, it, da, pt) carry the Track
 * A + Wave 1 substrate per CLAUDE.md §6 amendments + Track C deck-publish
 * pending per locale.
 */
export const TOPIC_ENABLED_LOCALES = [
  'en',
  'de',
  'es',
  'nl',
  'it',
  'fr',
  'pt',
  'sv',
  'da',
  'no',
  'fi',
] as const;

export type TopicEnabledLocale = (typeof TOPIC_ENABLED_LOCALES)[number];

export function isTopicEnabledLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}
