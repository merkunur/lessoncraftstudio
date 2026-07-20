/**
 * When a deck page's CONTENT last changed, for the sitemap's `<lastmod>`.
 *
 * WHY THE DATABASE IS NOT THE ANSWER. `Deck.updatedAt` moves when the DB row is written, and
 * the row is written at publish time. Every retrofit in the SEO programme rewrites the deck's
 * `deck.html` on disk and never touches the row — teaching blocks on 10,664 pages, screen-reader
 * row translation on 20,054, row enrichment on 6,730. So on 21 July 2026 the sitemap was still
 * telling Google that 4,652 of shard 0 last changed on 2026-07-06, and none of that work was
 * visible as a reason to recrawl.
 *
 * That mattered because Googlebot was fetching only 4–12 deck pages a day out of ~34,000
 * (measured from the nginx logs, not assumed), and an accurate `lastmod` is the one sanctioned
 * way to ask for a recrawl of specific pages.
 *
 * The file is therefore the source of truth, and the row is the floor: a deck whose row is newer
 * than its file (a fresh publish) keeps the row's date.
 *
 * Failure is not fatal. A missing or unreadable file falls back to the row rather than throwing
 * — a sitemap shard that 500s is far worse than one with a conservative date.
 */
import fs from 'fs';
import path from 'path';

/** Absolute: the release-model working directory is not the repo root. */
const DECKS_ROOT = process.env.LCS_DECKS_ROOT || '/var/www/lcs-media/decks';

/**
 * Per-process memo. A shard renders ~4,900 entries and the route is ISR-cached for 1800s, so
 * this exists to keep repeat renders cheap rather than because a single pass is expensive.
 */
const cache = new Map<string, number>();

/** mtime of this deck's rendered page in epoch ms, or 0 when it cannot be read. */
function deckHtmlMtimeMs(locale: string, slug: string): number {
  const key = `${locale}/${slug}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  let ms = 0;
  try {
    // `<slug>` is a symlink to `<slug>-v<N>/`; statSync follows it, which is what we want —
    // the version the public URL actually serves.
    ms = fs.statSync(path.join(DECKS_ROOT, locale, slug, 'deck.html')).mtimeMs;
  } catch {
    ms = 0;
  }
  cache.set(key, ms);
  return ms;
}

/**
 * The later of the deck's row timestamp and its rendered file's mtime.
 * Returns a Date so callers can keep using `.toISOString()`.
 */
export function deckLastModified(locale: string, slug: string, dbUpdatedAt: Date): Date {
  const fileMs = deckHtmlMtimeMs(locale, slug);
  const rowMs = dbUpdatedAt instanceof Date ? dbUpdatedAt.getTime() : 0;
  return fileMs > rowMs ? new Date(fileMs) : dbUpdatedAt;
}

/** Test seam: drop the memo so a changed file is picked up without a restart. */
export function clearDeckMtimeCache(): void {
  cache.clear();
}
