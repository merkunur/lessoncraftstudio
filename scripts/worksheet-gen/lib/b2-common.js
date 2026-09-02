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
function entriesFor(theme, loc) {
  const v = vocab();
  return labelSafeNouns(theme).map((n) => {
    const e = v[n.vocabKey] && v[n.vocabKey][loc];
    if (!e || !e[0]) return null;
    return { noun: n.noun, vocabKey: n.vocabKey, px: n.px, singular: e[0], plural: e[1] || '', gender: e[2] || null };
  }).filter(Boolean);
}

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

module.exports = { vocab, entriesFor, displayWord, traceable, distinctByWord, sampleEntries, labels, fileUri, KEEP_CASE };
