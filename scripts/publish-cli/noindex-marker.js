/**
 * noindex-marker.js — the single definition of the do-not-index marker
 * (2026-09-27, Level Set programme).
 *
 * A do-not-index deck is VISIBLE to teachers (every browse surface lists it,
 * it downloads and plays) but is never offered to search engines. The marker
 * travels in the deck's own manifest (`manifest.indexable === false`), so it
 * moves with the ZIP; publish.js turns it into:
 *   - Deck.indexable = false in the DB (sitemap shards 0/1 and the hreflang
 *     injector skip it; gen-deck-noindex-exempt-map.js never exempts it, so
 *     nginx keeps its default `X-Robots-Tag: noindex`)
 *   - a `<meta name="robots" content="noindex, follow">` in deck.html
 *
 * The marker is STICKY: republishing a do-not-index deck keeps it
 * do-not-index even when the new ZIP does not say so. Only an explicit,
 * deliberate change may make such a deck indexable.
 */
'use strict';

var NOINDEX_META = '<meta name="robots" content="noindex, follow" data-lcs-noindex="1">';
var ROBOTS_META_RE = /<meta\s+name=["']robots["'][^>]*>/i;

/** True when the manifest asks for the deck to stay out of search engines. */
function manifestWantsNoindex(manifest) {
  return !!(manifest && manifest.indexable === false);
}

/** True when deck.html already carries the marker's robots meta. */
function isNoindexDeckHtml(html) {
  if (typeof html !== 'string') return false;
  var m = html.match(ROBOTS_META_RE);
  return !!(m && /noindex/i.test(m[0]));
}

/**
 * Put the noindex robots meta into deck.html: replaces the existing robots
 * meta, or inserts one right after <head> when there is none. Idempotent.
 */
function applyNoindexToDeckHtml(html) {
  if (typeof html !== 'string') throw new Error('applyNoindexToDeckHtml: html must be a string');
  if (html.indexOf('data-lcs-noindex="1"') !== -1) return html;
  if (ROBOTS_META_RE.test(html)) return html.replace(ROBOTS_META_RE, NOINDEX_META);
  var head = html.match(/<head\b[^>]*>/i);
  if (!head) throw new Error('applyNoindexToDeckHtml: deck.html has no <head>');
  var at = head.index + head[0].length;
  return html.slice(0, at) + '\n' + NOINDEX_META + html.slice(at);
}

module.exports = {
  NOINDEX_META: NOINDEX_META,
  manifestWantsNoindex: manifestWantsNoindex,
  isNoindexDeckHtml: isNoindexDeckHtml,
  applyNoindexToDeckHtml: applyNoindexToDeckHtml
};
