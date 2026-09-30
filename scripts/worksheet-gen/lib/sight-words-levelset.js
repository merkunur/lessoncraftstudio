/**
 * sight-words-levelset.js — shared data + helpers for the Sight Words Level Set (2026-09-30).
 *
 * Data: data/literacy/sight-words-levelset.json (built by tools/level-set/validate-sight-sentences.js from the
 * authored data/literacy/sight-levelset/<loc>.txt) = per locale ~100 K-1 sight words (the published 24 first, in
 * their published order) + 6 sentences per word, each carrying the word exactly once. Page strings + in-page
 * labels: data/literacy/sight-levelset/strings.json. The published K-239 / K-259..K-263 pages never read this file.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const letterStrokes = require('../data/tracing/letter-strokes.js');
const { textLaneGeometry, LM } = require('../primitives/trace-path.js');

const DATA = path.join(__dirname, '..', 'data', 'literacy', 'sight-words-levelset.json');
const STRINGS = path.join(__dirname, '..', 'data', 'literacy', 'sight-levelset', 'strings.json');
let _data, _strings;
function data() { if (!_data) _data = JSON.parse(fs.readFileSync(DATA, 'utf8')); return _data; }
function strings() { if (!_strings) _strings = JSON.parse(fs.readFileSync(STRINGS, 'utf8')); return _strings; }

const loc2 = (l) => String(l || 'en').slice(0, 2);

/** The locale's full ordered word list (published 24 first). */
function words(loc) {
  const d = data()[loc2(loc)];
  if (!d) throw new Error(`sight-words: no level-set list for ${loc}`);
  return d.words;
}

/** The six sentences of `word` (throws on an unknown word). */
function sentencesOf(word, loc) {
  const s = (data()[loc2(loc)] || {}).sentences || {};
  if (!s[word]) throw new Error(`sight-words: no sentences for "${word}" (${loc})`);
  return s[word];
}

/** The in-page label `key` in the locale (throws when missing — a label never falls back to English). */
function label(key, loc) {
  const L = ((strings()[loc2(loc)] || {}).labels || {})[key];
  if (!L) throw new Error(`sight-words: no label "${key}" for ${loc}`);
  return L;
}

/** Page strings of a type id in the locale ({ title, instruction }). */
function typeStrings(id, loc) {
  const s = (strings()[loc2(loc)] || {})[id];
  if (!s) throw new Error(`sight-words: no strings for ${id} (${loc})`);
  return s;
}

/** Unicode-aware whole-word position of `word` in `sentence` (case-insensitive) → { index, length, text } or null. */
function findWord(sentence, word) {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
  const m = re.exec(sentence);
  return m ? { index: m.index, length: m[0].length, text: m[0] } : null;
}

/** Split a sentence around its (single) sight word: { before, target, after }. */
function splitAtWord(sentence, word) {
  const f = findWord(sentence, word);
  if (!f) throw new Error(`sight-words: "${word}" not in "${sentence}"`);
  return { before: sentence.slice(0, f.index), target: f.text, after: sentence.slice(f.index + f.length) };
}

/** True when the word opens the sentence (after ¿/¡) — its blank then needs a capital. */
function startsSentence(sentence, word) {
  const f = findWord(sentence, word);
  return !!f && sentence.slice(0, f.index).replace(/[¿¡\s]/g, '') === '';
}

/**
 * A sentence can take a GAP for the word only when the word stands alone: not glued to a neighbour by an apostrophe
 * or hyphen (it "anch'io", fr "est-il", "qu'il"). A gap there leaves a fragment ("anch'____") a K child cannot read.
 */
function blankable(sentence, word) {
  const f = findWord(sentence, word);
  if (!f) return false;
  const prev = sentence[f.index - 1] || '', next = sentence[f.index + f.length] || '';
  return !/['’\-]/.test(prev) && !/['’\-]/.test(next);
}

const wordCount = (s) => s.split(/\s+/).filter((t) => /\p{L}/u.test(t)).length;

/** The glyph height a stroke lane of width `w` actually gives `text` (after shrink-to-fit), in px. */
function tracedGlyphH(text, { w, h, glyphH, padLeft = 10 }) {
  const { width } = letterStrokes.textGlyphs(text);
  let { scale } = textLaneGeometry({ h, glyphH, heightUnits: LM.base - LM.ascender, inkTop: LM.ascender, inkBottom: LM.desc });
  const maxW = w - padLeft - 8;
  if (width * scale > maxW) scale = maxW / width;
  return (LM.base - LM.ascender) * scale;
}

/**
 * Pick `n` distinct sentences of `word` in a level's order: level 1 shortest first, level 3 longest first, level 2
 * the middle of the length order. `accept(s)` filters (e.g. traceable at a readable size); `rng` breaks ties so
 * the pick is seeded. Throws when fewer than n qualify (the page refuses rather than shrinking).
 */
function pickSentences(word, loc, { n, level, rng, accept = () => true, initial = 'any' }) {
  let pool = sentencesOf(word, loc).filter(accept);
  if (initial === 'never') pool = pool.filter((s) => !startsSentence(s, word));
  // 'prefer': sentence-initial blanks only when the non-initial sentences run out (the page then shows the capital reminder)
  const late = initial === 'prefer' ? pool.filter((s) => startsSentence(s, word)) : [];
  if (initial === 'prefer') pool = pool.filter((s) => !startsSentence(s, word));
  const jitter = new Map(pool.map((s) => [s, rng ? rng.next() : 0]));
  const byLen = [...pool].sort((a, b) => (a.length - b.length) || (jitter.get(a) - jitter.get(b)));
  let order;
  if (level === 1) order = byLen;
  else if (level === 3) order = [...byLen].reverse();
  else { const mid = Math.floor(byLen.length / 2); order = byLen.slice(mid).concat(byLen.slice(0, mid).reverse()); }
  order = order.concat(late.sort((a, b) => a.length - b.length));
  if (order.length < n) throw new Error(`sight-words: "${word}" (${loc}) has ${order.length} usable sentences < ${n}`);
  return order.slice(0, n);
}

function levenshtein(a, b) {
  const A = [...a], B = [...b];
  const d = Array.from({ length: A.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= B.length; j++) d[0][j] = j;
  for (let i = 1; i <= A.length; i++) for (let j = 1; j <= B.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
  }
  return d[A.length][B.length];
}

/**
 * Foils for the find-the-word grid: real words from the locale's own list, never the target and never a word
 * that differs from it only by case. mode 'unlike' = distance >= 3 and a different first letter;
 * 'alike' = the closest words first (distance, then shared first letter). Returns up to `k`, seeded.
 */
function foils(word, loc, { k, mode, rng }) {
  const low = word.toLocaleLowerCase(loc2(loc));
  const pool = words(loc).filter((w) => w.toLocaleLowerCase(loc2(loc)) !== low);
  const scored = pool.map((w) => ({ w, d: levenshtein(w.toLocaleLowerCase(loc2(loc)), low), same: w[0].toLocaleLowerCase() === low[0], r: rng.next() }));
  let list;
  if (mode === 'unlike') list = scored.filter((x) => x.d >= 3 && !x.same).sort((a, b) => a.r - b.r);
  else list = scored.sort((a, b) => (a.d - b.d) || (b.same - a.same) || (a.r - b.r));
  return list.slice(0, k).map((x) => x.w);
}

/**
 * Unit ids. The deck id / slug tail folds a unit to ASCII (lib/unit-axis.js unitKey), so accented homographs in one
 * list (es el/él, fr la/là a/à, it e/è, pt e/é) would share a slug. The id is the word itself unless an EARLIER word
 * of the list folds the same; then it is fold + 2 (3…). The page and title always print the real word (tokens()).
 */
const fold = (w) => String(w).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const _ids = new Map();
function idTable(loc) {
  const l = loc2(loc);
  if (!_ids.has(l)) {
    const byId = new Map(), byWord = new Map(), seen = new Map();
    for (const w of words(l)) {
      const f = fold(w);
      const n = (seen.get(f) || 0) + 1;
      seen.set(f, n);
      const id = n === 1 ? w : f + n;
      byId.set(id, w); byWord.set(w, id);
    }
    _ids.set(l, { byId, byWord });
  }
  return _ids.get(l);
}
const unitIds = (loc) => [...idTable(loc).byId.keys()];
/** The sight word a unit id stands for (throws on an unknown id). */
function wordOf(unit, loc) {
  const w = idTable(loc).byId.get(unit);
  if (w == null) throw new Error(`sight-words: unit "${unit}" is not a ${loc} sight word`);
  return w;
}

/** The unit axis of the one-word pages: every sight word of the locale is a unit (one page per word per level). */
const unitAxis = {
  applicable: true,
  units: (loc) => unitIds(loc),
  exemplar: (loc) => unitIds(loc)[0],
  tokens: (unit, loc) => { const w = wordOf(unit, loc); return { UNIT: w, U: w, L: w }; },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tokens = require('../primitives/_tokens.js');
const { writingRow, strokeWordLane } = require('../primitives/trace-path.js');

/** A small teal section heading (the in-page step label). */
function sectionLabel(text, n) {
  return `<div data-lcs-label style="font-family:${tokens.font.body},sans-serif;font-weight:800;font-size:16px;color:${tokens.color.teal || '#146B5E'};margin:2px 0 4px">${n ? `<span style="display:inline-block;min-width:22px">${n}.</span>` : ''}${esc(text)}</div>`;
}

/**
 * A sentence with its sight word taken out: the gap is a small school-lined row the child writes the word on
 * (`traced`: the word is printed dashed in the gap to trace instead). The word's own case is kept on the gap
 * (a sentence-initial blank gets the capital form when traced). Stamps data-lcs-answer + data-lcs-initial.
 */
function blankSentence(sentence, word, { traced = false, fontPx = 20 } = {}) {
  const { before, target, after } = splitAtWord(sentence, word);
  const initial = startsSentence(sentence, word);
  // a traced gap is taller: the dashed word must be big enough to trace (at h 46 the strokes broke up)
  const w = traced ? Math.max(150, Math.min(300, Math.round([...target].length * 30 + 60))) : Math.max(120, Math.min(260, Math.round([...target].length * 22 + 48)));
  const h = traced ? 66 : 46;
  const row = traced
    ? strokeWordLane({ text: target, w, h, glyphH: 48, reps: 1, stack: true, modelless: true, align: 'center', padLeft: 8 }).svg
    : writingRow({ w, h, glyphH: 30, xHeight: true }).svg;
  const gap = `<span data-lcs-gap style="display:inline-block;vertical-align:${traced ? -24 : -14}px;margin:0 3px;line-height:0">${row}</span>`;
  return `<p data-lcs-sentence data-lcs-answer="${esc(target)}" data-lcs-initial="${initial ? 1 : 0}" style="margin:0;font-family:${tokens.font.body},sans-serif;font-weight:700;font-size:${fontPx}px;line-height:1.9;color:${tokens.color.ink}">${esc(before)}${gap}${esc(after)}</p>`;
}

/** The sight word big and solid in a rounded box (the page's model word). */
function wordBox(word, px = 64) {
  return `<div data-lcs-wordbox="${esc(word)}" style="display:inline-block;border:3px solid ${tokens.color.ink};border-radius:14px;padding:4px 26px;font-family:${tokens.font.display},sans-serif;font-weight:700;font-size:${px}px;line-height:1.15;color:${tokens.color.ink}">${esc(word)}</div>`;
}

module.exports = { blankable, unitAxis, unitIds, wordOf, sectionLabel, blankSentence, wordBox, esc, words, sentencesOf, label, typeStrings, findWord, splitAtWord, startsSentence, wordCount, tracedGlyphH, pickSentences, foils, levenshtein };
