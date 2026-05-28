/**
 * seo-differentiator.js — per-deck title differentiator (Node-CJS).
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * Deck titles were `"{Type} {Worksheet} — {Theme} — {Level} — Set NNN"`. The
 * "Set NNN" tail carried no keyword value; it existed only to satisfy the DB
 * rule `@@unique([language, titleHash])` when 2–6 near-identical decks shared
 * one (exercise-type, theme, educational-level) tuple. Those decks all targeted
 * the IDENTICAL keyword → genuine SEO cannibalization.
 *
 * This module replaces "Set NNN" with a REAL, honest, content-derived keyword
 * — the actual subset of vocabulary the deck features, or its number range, or
 * its activity mode — so that near-duplicate decks become genuinely distinct on
 * a keyword a teacher would search ("…— Snakes & Lizards" / "…— Sums to 20").
 *
 * CONTRACT
 * --------
 *   deriveDifferentiator(manifest, locale, ctx) -> { kind, phrase, raw, source }
 *     kind:   'vocab' | 'numeric' | 'mode' | 'none'
 *     phrase: localized string to insert in the title (null when kind==='none')
 *     raw:    locale-INVARIANT canonical key for grouping / cannibalization
 *             detection (null when kind==='none'). Two decks with the same
 *             (type,theme,level) AND the same `raw` are TRUE content duplicates.
 *     source: provenance tag for audit/debug ('vocabulary'|'images_used'|
 *             'settings'|'exercises'|'mode'|'none').
 *
 * PURITY (cacheability per CLAUDE.md §4.4 / plan risk #2):
 *   A pure function of (manifest, locale, ctx) — NO clock, randomness, or
 *   catalog-state. The same deck always yields the same differentiator, so the
 *   baked deck.html stays byte-stable and Cloudflare-cacheable.
 *
 * MIRROR DISCIPLINE (§A.14.8 / plan risk #1):
 *   A browser-portable twin of this logic lives inline in
 *   REFERENCE TRANSLATIONS/catalog-export.js (it cannot `require()` this module).
 *   When the precedence or phrase/raw shape changes here, the twin changes in
 *   the SAME commit; build-seo-head.test.js asserts parity on shared fixtures.
 *
 * REUSE: the Node vocab resolver delegates to deck-rich-alt.js
 *   (resolveVocabNamesFromPaths / imagePathToVocabKey / formatVocabPhrase) so
 *   image→noun mapping logic lives in exactly one place.
 */

'use strict';

// ---------------------------------------------------------------------------
// Small pure helpers
// ---------------------------------------------------------------------------

function isNonEmptyArray(a) {
  return Array.isArray(a) && a.length > 0;
}

// Apply title-segment casing to a localized noun.
//   'preserve' -> unchanged (German nouns already capitalized)
//   'title'    -> capitalize each word ("ice cream" -> "Ice Cream")  [default]
//   'lower'    -> lowercased
// Unicode-aware (toLocaleUpperCase) so diacritics survive intact.
function applyCasing(noun, casing) {
  var s = String(noun == null ? '' : noun);
  if (!s) return s;
  if (casing === 'lower') return s.toLocaleLowerCase();
  if (casing === 'preserve') return s;
  // 'title' (default)
  return s.replace(/(^|[\s\-/'’])(\p{L})/gu, function (m, sep, ch) {
    return sep + ch.toLocaleUpperCase();
  });
}

// Capitalize only the first letter of a phrase (locale-aware); rest as-is.
function sentenceCap(s) {
  var str = String(s == null ? '' : s);
  if (!str) return str;
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

// Order-independent, lowercased, de-duplicated canonical-key join for `raw`.
function rawJoin(keys) {
  var seen = {};
  var out = [];
  for (var i = 0; i < keys.length; i++) {
    var k = String(keys[i] == null ? '' : keys[i]).trim().toLowerCase();
    if (!k || seen[k]) continue;
    seen[k] = true;
    out.push(k);
  }
  out.sort();
  return out.join('|');
}

/**
 * Join localized nouns into a title-appropriate phrase.
 *   style 'ampersand' (default) -> "Snakes & Lizards"
 *   style 'conjunction'         -> Intl.ListFormat ("Snakes and Lizards")
 * The engine HTML-escapes the title, so a literal '&' becomes '&amp;' in the
 * stored bytes and renders as '&' in the browser/SERP — correct + standard.
 */
function joinNouns(nouns, locale, style, deckRichAlt) {
  if (!nouns || !nouns.length) return null;
  if (nouns.length === 1) return nouns[0];
  if (style === 'conjunction' && deckRichAlt && deckRichAlt.formatVocabPhrase) {
    return deckRichAlt.formatVocabPhrase(nouns, locale);
  }
  return nouns.join(' & ');
}

// ---------------------------------------------------------------------------
// Default Node vocab resolver (delegates to deck-rich-alt.js)
// ---------------------------------------------------------------------------

var _deckRichAlt = null;
function deckRichAltModule() {
  if (_deckRichAlt === null) {
    try { _deckRichAlt = require('./deck-rich-alt'); }
    catch (e) { _deckRichAlt = false; }
  }
  return _deckRichAlt || null;
}

/**
 * Localized nouns featured by the deck, in stable manifest order, capped to N.
 *   1) manifest.vocabulary[] — already localized at gen time (e.g. ["vaca","oveja"]).
 *   2) else manifest.images_used[] — English filenames mapped via IMAGE_VOCABULARY.
 */
function resolveLocalizedNouns(manifest, locale, maxN, deckRichAlt) {
  if (isNonEmptyArray(manifest.vocabulary)) {
    var out = [];
    for (var i = 0; i < manifest.vocabulary.length && out.length < maxN; i++) {
      var v = manifest.vocabulary[i];
      if (typeof v === 'string' && v.trim()) out.push(v.trim());
    }
    if (out.length) return out;
  }
  if (isNonEmptyArray(manifest.images_used) && deckRichAlt) {
    return deckRichAlt.resolveVocabNamesFromPaths(manifest.images_used, locale, maxN) || [];
  }
  return [];
}

/**
 * Locale-invariant canonical keys for the SAME nouns (for `raw` grouping).
 *   - Prefer images_used (English filenames → canonical keys).
 *   - Else fall back to lowercased localized vocabulary (locale-scoped raw;
 *     acceptable because cannibalization grouping is always within one locale).
 */
function canonicalKeys(manifest, maxN, deckRichAlt) {
  if (isNonEmptyArray(manifest.images_used) && deckRichAlt) {
    var keys = [];
    for (var i = 0; i < manifest.images_used.length && keys.length < maxN; i++) {
      var k = deckRichAlt.imagePathToVocabKey(manifest.images_used[i]);
      if (k) keys.push(k);
    }
    if (keys.length) return keys;
  }
  if (isNonEmptyArray(manifest.vocabulary)) {
    return manifest.vocabulary.slice(0, maxN).map(function (v) { return String(v); });
  }
  return [];
}

// ---------------------------------------------------------------------------
// Numeric facet (themeless math decks: "Sums to 20" distinguishes ranges)
// ---------------------------------------------------------------------------

var NUMERIC_TYPES = {
  'addition': 1, 'subtraction': 1, 'code-addition': 1,
  'math-worksheet': 1, 'math-puzzle': 1
};

// Settings keys that commonly carry a declared upper bound across apps.
var MAX_SETTING_KEYS = [
  'max_sum', 'max_addend', 'max_number', 'number_range_max',
  'max', 'items_per_group_max', 'max_value', 'sum_max', 'range_max'
];
var MIN_SETTING_KEYS = [
  'min_sum', 'min_addend', 'min_number', 'number_range_min',
  'min', 'items_per_group_min', 'min_value', 'sum_min', 'range_min'
];

function firstNumeric(obj, keys) {
  if (!obj) return null;
  for (var i = 0; i < keys.length; i++) {
    var v = obj[keys[i]];
    if (typeof v === 'number' && isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '' && isFinite(Number(v))) return Number(v);
  }
  return null;
}

// Scan exercises[] for the largest integer answer/operand as a last resort.
function scanExercisesMax(exercises) {
  if (!isNonEmptyArray(exercises)) return null;
  var max = null;
  function consider(n) {
    if (typeof n === 'number' && isFinite(n) && n === Math.floor(n)) {
      if (max === null || n > max) max = n;
    }
  }
  for (var i = 0; i < exercises.length && i < 200; i++) {
    var ex = exercises[i];
    if (ex == null) continue;
    if (typeof ex === 'number') { consider(ex); continue; }
    if (typeof ex !== 'object') continue;
    ['answer', 'result', 'sum', 'total', 'a', 'b', 'addend1', 'addend2', 'minuend', 'subtrahend']
      .forEach(function (k) { consider(ex[k]); });
    if (isNonEmptyArray(ex.operands)) ex.operands.forEach(consider);
  }
  return max;
}

function deriveNumericFacet(manifest) {
  if (!NUMERIC_TYPES[manifest.exercise_type]) return null;
  var settings = manifest.settings || {};
  var max = firstNumeric(settings, MAX_SETTING_KEYS);
  var min = firstNumeric(settings, MIN_SETTING_KEYS);
  if (max === null) max = scanExercisesMax(manifest.exercises);
  if (max === null || max <= 0) return null;
  return { op: manifest.exercise_type, min: (min === null ? null : min), max: max };
}

function interpolate(template, params) {
  return String(template).replace(/\{(\w+)\}/g, function (m, k) {
    return (params && params[k] != null) ? String(params[k]) : '';
  });
}

function numericPhrase(facet, config) {
  var templates = (config && config.numericTemplates) || {};
  var tpl = templates[facet.op] || templates._generic;
  if (!tpl) return null;
  var p = interpolate(tpl, { max: facet.max, min: (facet.min == null ? 0 : facet.min) }).trim();
  return p || null;
}

// ---------------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------------

/**
 * @param {object} manifest  generation.json (merged) — reads vocabulary,
 *                           images_used, exercises, settings, exercise_type,
 *                           exercise_mode, theme.
 * @param {string} locale    deck content language ('en'|'es'|'pt'|...).
 * @param {object} [ctx]     { config, vocab?, exerciseModeName? }
 *                           - config: locale block from seo-title-config.json
 *                             (vocab.maxNouns, vocab.joinStyle, numericTemplates,
 *                             diff.enableVocab/enableNumeric/enableMode). Optional;
 *                             sensible defaults applied.
 *                           - vocab: optional resolver override (tests / parity);
 *                             defaults to deck-rich-alt.js.
 *                           - exerciseModeName: localized mode name (the caller —
 *                             republish-seo — already resolves it from taxonomy);
 *                             used for the mode-as-differentiator branch.
 * @returns {{kind:string, phrase:(string|null), raw:(string|null), source:string}}
 */
function deriveDifferentiator(manifest, locale, ctx) {
  if (!manifest || typeof manifest !== 'object') {
    return { kind: 'none', phrase: null, raw: null, source: 'none' };
  }
  ctx = ctx || {};
  var config = ctx.config || {};
  var diff = config.diff || {};
  var loc = locale || manifest.language || 'en';
  var deckRichAlt = ctx.vocab || deckRichAltModule();

  var vocabCfg = config.vocab || {};
  var maxNouns = (typeof vocabCfg.maxNouns === 'number' && vocabCfg.maxNouns > 0) ? vocabCfg.maxNouns : 2;
  var joinStyle = vocabCfg.joinStyle || 'ampersand';
  var casing = vocabCfg.casing || 'title';
  // Exercise types whose "vocabulary" is NOT a localizable featured noun and must
  // not become a title differentiator. cryptogram's vocab is a fixed English
  // cipher pangram ("The Quick Brown Fox…") → on non-en locales it trips the
  // locale-residue gate; everywhere it's puzzle-answer text, not a keyword.
  var excludeTypes = Array.isArray(diff.excludeTypes) ? diff.excludeTypes : [];
  var typeExcluded = manifest.exercise_type && excludeTypes.indexOf(manifest.exercise_type) !== -1;

  // -- Precedence 1: featured vocabulary (themed decks) -----------------------
  if (diff.enableVocab !== false && !typeExcluded) {
    var nouns = resolveLocalizedNouns(manifest, loc, maxNouns, deckRichAlt);
    if (nouns && nouns.length) {
      var phrase, phraseShort;
      if (casing === 'sentence') {
        // Phrase-level sentence-case (Spanish/Romance): lowercase every noun,
        // join, capitalize only the FIRST letter — "serpiente y lagarto" ->
        // "Serpiente y lagarto"; also normalizes ALL-CAPS vocab ("MURCIÉLAGO" ->
        // "Murciélago"). Connector comes from joinStyle (es: 'conjunction' -> "y").
        var lowered = nouns.map(function (n) { return String(n).toLocaleLowerCase(); });
        phrase = sentenceCap(joinNouns(lowered, loc, joinStyle, deckRichAlt));
        phraseShort = sentenceCap(lowered[0]);
      } else {
        var casedNouns = nouns.map(function (n) { return applyCasing(n, casing); });
        phrase = joinNouns(casedNouns, loc, joinStyle, deckRichAlt);
        // phraseShort: 1-noun fallback the title engine substitutes when the
        // 2-noun phrase pushes the title over the char budget.
        phraseShort = casedNouns.length > 1 ? casedNouns[0] : phrase;
      }
      var keys = canonicalKeys(manifest, maxNouns, deckRichAlt);
      var raw = rawJoin(keys.length ? keys : nouns);
      var src = isNonEmptyArray(manifest.vocabulary) ? 'vocabulary' : 'images_used';
      if (phrase) return { kind: 'vocab', phrase: phrase, phraseShort: phraseShort, raw: raw || phrase.toLowerCase(), source: src };
    }
  }

  // -- Precedence 2: numeric range (themeless math decks) ---------------------
  if (diff.enableNumeric === true) {
    var facet = deriveNumericFacet(manifest);
    if (facet) {
      var nphrase = numericPhrase(facet, config);
      if (nphrase) {
        return {
          kind: 'numeric',
          phrase: nphrase,
          raw: facet.op + ':' + (facet.min == null ? '' : facet.min) + '-' + facet.max,
          source: 'settings'
        };
      }
    }
  }

  // -- Precedence 3: activity mode (only when 1+2 unavailable) ----------------
  if (diff.enableMode !== false && manifest.exercise_mode) {
    var modeName = ctx.exerciseModeName || null;
    if (modeName) {
      return {
        kind: 'mode',
        phrase: String(modeName),
        raw: 'mode:' + String(manifest.exercise_mode).toLowerCase(),
        source: 'mode'
      };
    }
  }

  // -- Precedence 4: none -----------------------------------------------------
  return { kind: 'none', phrase: null, raw: null, source: 'none' };
}

module.exports = {
  deriveDifferentiator: deriveDifferentiator,
  // exported for unit tests
  deriveNumericFacet: deriveNumericFacet,
  resolveLocalizedNouns: resolveLocalizedNouns,
  canonicalKeys: canonicalKeys,
  rawJoin: rawJoin,
  joinNouns: joinNouns
};
