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
  const byCode = new Map<string, string>();
  for (const s of siblings) {
    const code = getHreflangCode(s.language);
    if (!byCode.has(code)) byCode.set(code, urlFor(s));
  }
  const lines: string[] = [];
  byCode.forEach((url, code) => {
    lines.push(`  <xhtml:link rel="alternate" hreflang="${esc(code)}" href="${esc(url)}" />`);
  });

  // x-default: prefer the en sibling, else this deck.
  const enSibling = siblings.find((s) => s.language === 'en');
  const xDefaultUrl = urlFor(enSibling ?? deck);
  lines.push(`  <xhtml:link rel="alternate" hreflang="x-default" href="${esc(xDefaultUrl)}" />`);
  return lines;
}
