/**
 * P1-05 (SEO Part 6): build the `<xhtml:link>` alternate set for a deck's
 * `<url>` block in the deck sitemap shards (0.xml / 1.xml).
 *
 * Before: each deck emitted ONE self-referential alternate. For a deck that
 * belongs to a cross-locale content family (shares a `contentFamilyId` with
 * siblings in other locales), Google should see the FULL sibling set + an
 * x-default — exactly the hreflang cluster the deck.html carries (§17.8.7).
 *
 * Single-locale decks (null contentFamilyId — the vast majority) keep just
 * their self link, so the sitemap only grows for genuine families
 * (empirically ~77–289 decks).
 *
 * The hreflang code comes from the single SoT `getHreflangCode` (pt → pt-BR).
 * The route's `xmlEscape` is passed in so this helper stays pure + the escaping
 * matches the surrounding `<url>` block exactly.
 */

import { getHreflangCode } from '@/lib/seo/hreflang';

export interface SitemapSibling {
  language: string;
  slug: string;
}

export function buildDeckHreflangLinks(
  deck: SitemapSibling,
  siblings: ReadonlyArray<SitemapSibling>,
  baseUrl: string,
  esc: (s: string | null | undefined) => string,
): string[] {
  const urlFor = (s: SitemapSibling) => `${baseUrl}/${s.language}/decks/${s.slug}/`;

  // Single-locale deck (no family OR family of one): self link only.
  if (!siblings || siblings.length <= 1) {
    const code = getHreflangCode(deck.language);
    return [`  <xhtml:link rel="alternate" hreflang="${esc(code)}" href="${esc(urlFor(deck))}" />`];
  }

  // Family: one alternate per sibling locale (dedupe by hreflang code), + x-default.
  /* One URL per language: the first sibling by slug, so every member of the family — in
     either shard, whatever order the DB returned — picks the SAME representative. A deck
     that is NOT its language's representative (two decks of one locale in one family)
     declares itself only: copying the family's alternates onto it made one-way pairs
     (measured 2026-10-18 on es busca-y-cuenta-…-fbbf vs -1fc8). */
  const sorted = [...siblings].sort((a, b) => (a.language === b.language ? (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0) : a.language < b.language ? -1 : 1));
  const byCode = new Map<string, string>();
  for (const s of sorted) {
    const code = getHreflangCode(s.language);
    if (!byCode.has(code)) byCode.set(code, urlFor(s));
  }
  if (byCode.get(getHreflangCode(deck.language)) !== urlFor(deck)) {
    return [`  <xhtml:link rel="alternate" hreflang="${esc(getHreflangCode(deck.language))}" href="${esc(urlFor(deck))}" />`];
  }
  const lines: string[] = [];
  byCode.forEach((url, code) => {
    lines.push(`  <xhtml:link rel="alternate" hreflang="${esc(code)}" href="${esc(url)}" />`);
  });

  // x-default ONLY when an en sibling exists — same rule as buildHreflangAlternates.
  // Falling back to `this deck` made every non-EN deck without an English sibling
  // declare itself the worldwide default for unmatched-language searchers.
  const enSibling = siblings.find((s) => s.language === 'en') ?? (deck.language === 'en' ? deck : undefined);
  if (enSibling) {
    lines.push(`  <xhtml:link rel="alternate" hreflang="x-default" href="${esc(urlFor(enSibling))}" />`);
  }
  return lines;
}
