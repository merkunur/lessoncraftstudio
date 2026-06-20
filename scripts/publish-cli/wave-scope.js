'use strict';
/* Shared wave-scoping helper for publish-wave retrofit steps.
 *
 * The post-publish retrofits (og-images, alt-text, img-dims, lazy-deckend,
 * topic-slash, end-links, embed-hide, audit) historically walk the ENTIRE
 * /decks/<locale>/ tree, so a wave of N new decks re-touches all ~42k existing
 * decks every run — O(catalog) per wave, and slower every wave. publish-wave.js
 * now derives a wave-slugs file from publish-bulk's _results.txt and passes
 * --slugs-file=<path> to each retrofit; this helper turns that file into a Set
 * and filters a deck dir/symlink name (which may carry a -v<N> version suffix)
 * against it. When no --slugs-file is given, the filter is a no-op (full-catalog
 * behaviour preserved for standalone/manual runs).
 */
const fs = require('fs');

/** Parse --slugs-file=<path> from argv → Set<slug>, or null (no scoping). */
function loadSlugSet(argv) {
  const a = (argv || []).find(function (s) { return s.indexOf('--slugs-file=') === 0; });
  if (!a) return null;
  const p = a.slice('--slugs-file='.length);
  const raw = fs.readFileSync(p, 'utf8').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  return new Set(raw);
}

/** Strip a trailing -v<N> version suffix to get the canonical slug. */
function baseSlug(dirOrName) {
  return String(dirOrName).replace(/-v\d+$/, '');
}

/** True if no scoping set, or the (version-stripped) name is in the wave set. */
function inSet(slugSet, dirOrName) {
  return !slugSet || slugSet.has(baseSlug(dirOrName));
}

module.exports = { loadSlugSet, baseSlug, inSet };
