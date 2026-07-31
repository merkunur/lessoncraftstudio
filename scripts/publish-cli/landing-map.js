'use strict';
/**
 * landing-map.js — deck slug -> tier-3 landing slug, for the publish-cli path.
 *
 * WHY THIS EXISTS
 * ---------------
 * A deck page canonicals to its landing (`/<locale>/worksheets/<landing>`) when one
 * exists, and self-canonicals when one does not (§22.1 conditional repoint). Anything
 * that emits an internal LINK to a deck must follow the same conditional, or it points
 * readers and crawlers at a canonicalized-away, X-Robots-Tag:noindex URL.
 *
 * This module is the ONE resolver for that question on the scripts/ side. It is a
 * straight extraction of `scripts/seo-landing/reconcile-deck-canonicals.js: loadMaps()`
 * — the same collapse rule, reading the same git-tracked JSON — so the link target and
 * the canonical target can never disagree. Do NOT write a second mapping, and do NOT
 * derive a landing slug by string manipulation: `addition-image-image-animals` maps to
 * `addition-image-image-animals-kindergarten`, which no suffix rule predicts.
 *
 * The Next.js side has its own mirror of this rule at
 * `frontend/lib/seo/landing-content.ts: landingSlugForDeck()`.
 *
 * MEMORY
 * ------
 * The 11 locale files total ~93 MB of JSON. Every existing script loads ONE locale at a
 * time and drops it; this module preserves that by memoizing a single locale and
 * evicting the previous one on switch. Callers that iterate locales should finish a
 * locale before moving on (all current callers do).
 */

var fs = require('fs');
var path = require('path');

var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';
var CONTENT_DIR = path.resolve(__dirname, '..', '..', 'frontend', 'content', 'seo-landing');

// Single-locale cache: { locale, deckToLanding } — see MEMORY note above.
var cache = null;

/**
 * Build deckSlug -> landingSlug for one locale.
 * Collapse rule (verbatim from reconcile-deck-canonicals.js:44-50):
 *   use `collapseSiblings` when non-empty, else `[canonicalDeckSlug]`;
 *   the canonical deck slug always maps.
 */
function loadDeckToLanding(locale) {
  var file = path.join(CONTENT_DIR, locale + '.json');
  if (!fs.existsSync(file)) return {};
  var data = JSON.parse(fs.readFileSync(file, 'utf8'));
  var deckToLanding = {};
  var landings = data.landings || [];
  for (var i = 0; i < landings.length; i++) {
    var l = landings[i];
    if (!l.slug) continue; // defensive: the slugless-entry bug class must never map anything
    var decks = (l.collapseSiblings && l.collapseSiblings.length)
      ? l.collapseSiblings
      : [l.canonicalDeckSlug];
    for (var j = 0; j < decks.length; j++) {
      if (decks[j]) deckToLanding[decks[j]] = l.slug;
    }
    if (l.canonicalDeckSlug) deckToLanding[l.canonicalDeckSlug] = l.slug;
  }
  return deckToLanding;
}

function mapFor(locale) {
  if (!cache || cache.locale !== locale) {
    cache = { locale: locale, deckToLanding: loadDeckToLanding(locale) };
  }
  return cache.deckToLanding;
}

/**
 * @returns {string|null} the landing slug, or null when this deck has no landing
 *   (a landing-less deck is self-canonical and indexable — linking to its /decks/
 *   URL is CORRECT, not a defect).
 */
function landingSlugForDeck(locale, deckSlug) {
  if (!locale || !deckSlug) return null;
  return mapFor(locale)[deckSlug] || null;
}

/**
 * @returns {string|null} absolute www landing URL, or null when there is no landing.
 *   No trailing slash — matches reconcile-deck-canonicals.js:95 and the live canonicals.
 */
function landingURLForDeck(locale, deckSlug) {
  var slug = landingSlugForDeck(locale, deckSlug);
  return slug ? (CANONICAL_URL_BASE + '/' + locale + '/worksheets/' + slug) : null;
}

/** Normalize an apex-host absolute URL to the canonical www host (§A.10). */
function wwwHost(url) {
  if (!url) return url;
  return url.replace('https://lessoncraftstudio.com/', CANONICAL_URL_BASE + '/');
}

module.exports = {
  CANONICAL_URL_BASE: CANONICAL_URL_BASE,
  landingSlugForDeck: landingSlugForDeck,
  landingURLForDeck: landingURLForDeck,
  wwwHost: wwwHost,
};
