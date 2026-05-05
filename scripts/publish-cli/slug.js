/**
 * §17.8.5 ASCII-fold slug generator.
 *
 * Canonical implementation per Brief B Phase 2 (commit landing this file).
 * Diverges intentionally from REFERENCE TRANSLATIONS/catalog-export.js:90
 * slugify, which converts non-ASCII to hyphens (produces 'w-rter' from
 * 'Wörter') rather than ASCII-folding (produces 'worter'). Divergence
 * accepted for v1 because all 29 apps' bundle.title is currently
 * English-only literal — see project_deferred_items_queue.md
 * social-share-v1 family. Resolves at the apps + publish-cli touchpoint.
 *
 * Algorithm:
 *   1. lowercase
 *   2. NFD normalize + strip combining diacritical marks (handles most
 *      Romance accents: à → a + combining grave → a)
 *   3. explicit map for non-decomposable equivalents (ß → ss, æ → ae,
 *      ł → l, etc.)
 *   4. replace any remaining non-[a-z0-9-] with hyphen
 *   5. collapse runs of hyphens
 *   6. strip leading/trailing hyphens
 *
 * Order matters: explicit map BEFORE the regex strip so mapped output
 * (ASCII letters) survives.
 */

'use strict';

var NON_DECOMPOSABLE_MAP = {
  'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
  'å': 'a', 'æ': 'ae', 'ø': 'o',
  'ñ': 'n', 'ç': 'c',
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u',
  'ý': 'y', 'ÿ': 'y',
  'ł': 'l'
};

function slugify(value) {
  var str = String(value == null ? '' : value).toLowerCase();
  var nfd = str.normalize('NFD').replace(/[̀-ͯ]/g, '');
  var mapped = nfd.split('').map(function (c) {
    return Object.prototype.hasOwnProperty.call(NON_DECOMPOSABLE_MAP, c)
      ? NON_DECOMPOSABLE_MAP[c]
      : c;
  }).join('');
  return mapped
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Slug-collision suffix algorithm per §17.8.5.
 *
 * Caller provides candidate + a function to check if a slug is taken in
 * the (language, slug) compound key. On collision, suffixes -2, -3, ...
 * until unique. Idempotency: if the candidate slug already exists for
 * the SAME deck_id (edit-in-place per Brief B v3 Decision 5), the
 * caller's isTaken function should return false for that case so the
 * existing slug is preserved.
 *
 * Phase 2 dry-run does NOT call this (kept hermetic, no DB reads). Phase
 * 3 publish-cli wires it against the real DB query.
 */
function resolveCollision(candidate, isTakenFn) {
  if (!candidate) {
    throw new Error('resolveCollision: candidate slug is empty (slugify returned empty string)');
  }
  if (!isTakenFn(candidate)) return candidate;
  for (var n = 2; n < 1000; n++) {
    var suffixed = candidate + '-' + n;
    if (!isTakenFn(suffixed)) return suffixed;
  }
  throw new Error('resolveCollision: exhausted suffix range 2..999 for candidate "' + candidate + '"');
}

/**
 * Canonical slug-seed derivation from a deck manifest.
 *
 * Single source-of-truth used by all publish-cli paths (bulk.js,
 * publish.js, index.js single-deck dry-run). Extracts the seed string
 * that is passed to slugify() downstream. The slugify pass is
 * unchanged.
 *
 * Composition (per §17.8.5 + theme-aware extension):
 *   <exercise-type> <exercise-mode> <theme-axis-key>?
 *
 * Theme is appended only when manifest.theme is non-null. Themeless
 * decks (per pattern-worksheet remediation precedent) preserve the
 * pre-extension shape: <exercise-type> <exercise-mode>.
 *
 * Slug shape rationale: operation-mechanic-content ordering reads as
 * a deck-identity claim ("an addition find-addend deck themed on
 * animals"), aligns with Google search-snippet leading-segment
 * prominence, and clusters related decks across alphabetic-sort
 * positions. Distinct from intersection-URL axis-ordering
 * (theme→level→type, navigation context); deck-page URLs are
 * leaf-level destinations with identity-claim grammar.
 *
 * Returns: space-joined seed string. Caller passes through slugify().
 */
function deriveSeedFromManifest(manifest) {
  var parts = [];
  if (manifest.exercise_type) parts.push(manifest.exercise_type);
  if (manifest.exercise_mode) parts.push(manifest.exercise_mode);
  if (manifest.theme) parts.push(manifest.theme);
  return parts.join(' ');
}

module.exports = {
  slugify: slugify,
  resolveCollision: resolveCollision,
  deriveSeedFromManifest: deriveSeedFromManifest,
  _NON_DECOMPOSABLE_MAP: NON_DECOMPOSABLE_MAP
};
