/**
 * featured-deck-by-locale.ts — per-locale featured-deck resolution for any
 * homepage surface that needs a single representative deck URL.
 *
 * Use cases (Arc 2):
 *   - EmbedViralityCTA — links to a representative deck so the visitor lands
 *     on a page where the in-deck "Embed this" affordance (Layer 2,
 *     `e8cec493`) is one click away.
 *
 * Resolution per Arc 2 A4 operator-locked adjudication (2026-05-06):
 *   1. Prefer a deck published in the visiting locale.
 *   2. Fallback to en, then de.
 *   3. Final fallback null → caller links to `/<locale>/` (locale-rooted catalog
 *      home) instead of a deck URL.
 *
 * Per `frontend/lib/breadth-grid-selection.ts` already implements this
 * fallback chain in service of the BreadthGrid Section 2 composition. This
 * helper reads from the same selection so featured-deck choice stays
 * coherent across surfaces — the same deck the BreadthGrid surfaces as the
 * featured inline-play tile is the deck the EmbedViralityCTA links to.
 *
 * SSR-safe: thin wrapper around the existing DB query in
 * `selectBreadthGridDecks`. ISR cache lives on the BreadthGrid query path.
 */

import { selectBreadthGridDecks } from './breadth-grid-selection';
import type { SupportedLocale } from '@/config/locales';

export interface FeaturedDeckRef {
  slug: string;
  language: string;
}

/**
 * Returns the featured-deck reference for a given locale, or null if the
 * catalog has no eligible deck for any of the fallback locales (extreme
 * empty-catalog edge case; in practice the 884+ deck production catalog
 * always returns a hit).
 *
 * Caller pattern (EmbedViralityCTA):
 *   const featured = await getFeaturedDeckForLocale(locale);
 *   const href = featured
 *     ? `/${featured.language}/decks/${featured.slug}/?embed=open`
 *     : `/${locale}/`;
 */
export async function getFeaturedDeckForLocale(
  locale: SupportedLocale
): Promise<FeaturedDeckRef | null> {
  try {
    const selection = await selectBreadthGridDecks(locale);
    if (!selection.featured) return null;
    return {
      slug: selection.featured.slug,
      language: selection.featured.language,
    };
  } catch (err) {
    // Mirrors the BreadthGrid fallback at queryDbState in catalog-axes.ts —
    // build-time DB unreachability is tolerated; component renders the
    // locale-root fallback URL until ISR cache fills on first user request.
    console.warn(
      '[featured-deck-by-locale] selectBreadthGridDecks failed; returning null fallback:',
      (err as Error).message
    );
    return null;
  }
}
