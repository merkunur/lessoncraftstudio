/**
 * cursive-coverage.js — the characters a teacher may type into a cursive page (Cursive maker 2026-11-02; ENGINES
 * cursive-Q1 (5): "refuses glyphs the unit's font lacks"). The set is the locale's OWN cursive content, which the
 * published pages already print in the locale's unit and verify against a fallback glyph (G2-377 verify: the node's
 * width is the unit's, not the serif's): the letters of every lesson and their capitals (the Level Set capitals list),
 * every character of the bank words, join words, sentences and names, plus a space and . , ! ? ' ’ - — so a typed
 * character the school script was never shown to draw is refused BY NAME (the maker says it does not fit), never drawn
 * in a fallback face. Pure.
 */
'use strict';
const PUNCT = [' ', '.', ',', '!', '?', "'", '’', '-'];

/** @param bankLoc the locale's cursive-writing bank block; @param ls its level-set block (or null); @param names b2 names */
function coverageOf(bankLoc, ls, names) {
  const set = new Set(PUNCT);
  const add = (s) => { for (const ch of String(s || '')) set.add(ch); };
  for (const lessons of Object.values(bankLoc.lessons || {})) for (const l of lessons.flat()) { add(l); add(l.toLocaleUpperCase()); }
  for (const v of Object.values(bankLoc.words || {})) add(typeof v === 'string' ? v : v && v.text);
  for (const js of Object.values(bankLoc.joins || {})) for (const j of js) { add(j.pair); add(j.word); }
  for (const s of bankLoc.sentences || []) add(s);
  for (const n of names || []) add(n);
  if (ls) {
    for (const e of ls.capitals || []) { add(e.capital); add(e.word); }
    for (const j of ls.joinsMore || []) { add(j.pair); add(j.word); }
    for (const s of ls.sentencesMore || []) add(s.text);
  }
  // ß has no capital in the school scripts: toLocaleUpperCase gives "SS", already covered by S
  return set;
}

/** the characters of `text` outside the set (empty array = the text can be written) */
function uncovered(text, set) { return [...new Set([...String(text)].filter((ch) => !set.has(ch)))]; }

module.exports = { coverageOf, uncovered, PUNCT };
