/**
 * b2-common.js — shared helpers for the nt20-B specs: vocab entries WITH
 * gender, the display-case rule, the traceability guard, and a few HTML
 * scaffolds. Reads the vocab SoT the same way image-cache/resolve.js does.
 */
'use strict';
const { labelSafeNouns, labels, fileUri } = require('../image-cache/resolve.js');
const { loadVocab } = require('../../publish-cli/deck-rich-alt.js');
const letterStrokes = require('../data/tracing/letter-strokes.js');

let _vocab = null;
function vocab() { if (!_vocab) _vocab = loadVocab(); return _vocab; }

/** Locales that keep the vocab capital on a bare noun (Nomen großschreiben). */
const KEEP_CASE = new Set(['de']);

function displayWord(word, loc, mode) {
  const m = mode || (KEEP_CASE.has(loc) ? 'keep' : 'lower');
  return m === 'keep' ? word : word.toLocaleLowerCase(loc);
}

/** Label-safe nouns of a theme with singular/plural/gender for `loc`. */
/**
 * Vocab entries a page must not use in a locale: the stored word is wrong for the picture
 * (`crane` = the BIRD in es/no/da/sv/fi; da toys-bw `tank`/`loader` mislabelled). The
 * vocabulary file is operator-locked (§10.3) — this is the batch-side guard, reported for the fix.
 */
const B2_EXCLUDE = { crane: ['es', 'no', 'da', 'sv', 'fi'], tank: ['da'], loader: ['da'], lego: ['no'] };
function excluded(vocabKey, loc) { const l = B2_EXCLUDE[String(vocabKey).toLowerCase()]; return !!(l && l.includes(loc)); }
/** labelSafeNouns minus the locale's exclusions — every b2 type that picks nouns goes through this. */
function safeNouns(theme, loc) { return labelSafeNouns(theme).filter((n) => !excluded(n.vocabKey, loc)); }

function entriesFor(theme, loc) {
  const v = vocab();
  return safeNouns(theme, loc).map((n) => {
    const e = v[n.vocabKey] && v[n.vocabKey][loc];
    if (!e || !e[0]) return null;
    return { noun: n.noun, vocabKey: n.vocabKey, px: n.px, singular: e[0], plural: e[1] || '', gender: e[2] || null };
  }).filter(Boolean);
}

/** True when the entry has a distinct plural — an invariant-plural noun (dice, chess, lego; es dados/ajedrez) never enters a counted sentence slot. */
function countable(e) { return !!(e && e.singular && e.plural && e.plural.trim().toLocaleLowerCase() !== e.singular.trim().toLocaleLowerCase()); }

/** True when every code point of `word` has centreline stroke data. */
function traceable(word) {
  try { for (const ch of String(word)) letterStrokes.glyphFor(ch); return true; } catch (e) { return false; }
}

/** Distinct by display string (two nouns can share a word in one locale). */
function distinctByWord(entries, pick) {
  const seen = new Set();
  return entries.filter((e) => { const w = pick(e); if (seen.has(w)) return false; seen.add(w); return true; });
}

/** Sample `n` entries with a predicate, refusing (throw) when short. */
function sampleEntries(rng, entries, n, who) {
  if (entries.length < n) throw new Error(`${who}: only ${entries.length} eligible nouns, need ${n}`);
  return rng.sample(entries, n);
}

module.exports = { countable, excluded, safeNouns, vocab, entriesFor, displayWord, traceable, distinctByWord, sampleEntries, labels, fileUri, KEEP_CASE };
