/**
 * types/_shared/ordinal-more.js — the Ordinal Numbers maker's new templates' view of the ordinals 1-31 (2026-11-02):
 * 1-10 from the reviewed bank (data/b3/ordinals.js through lib/b3-common.js bank('ordinals')), 11-31 from
 * data/ordinal-numbers/ordinals-31.js. ord(k, L) → { k, notation, word, notationAlts, wordAlts } — the citation
 * (masculine / position) word as the bank, the bank's `alt` split into written forms (with a digit: es 1º, pt 1.º, nl
 * 1ste) and word spellings (no syvende), plus the written forms a school also accepts on a SCREEN (EXTRA below — the
 * native review 2026-11-02: es-MX 5º / 1er / 5°, pt / it 21° (what their keyboards type), fr 2ème, nl 5de); a screen
 * accepts them, a page never prints them.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const O31 = require('../../data/ordinal-numbers/ordinals-31.js');

const DEG = '°';
const EXTRA = {
  es: (k) => [`${k}º`, `${k}${DEG}`, `${k}.${DEG}`, ...(k === 1 ? ['1er'] : k === 3 ? ['3er'] : [])],
  pt: (k) => [`${k}${DEG}`],
  it: (k) => [`${k}${DEG}`],
  fr: (k) => (k >= 2 ? [`${k}ème`] : []),
  nl: (k) => (k >= 4 && k <= 10 && k !== 8 ? [`${k}de`] : []),
};
const WORD_EXTRA = { de: { 30: ['dreissigste'], 31: ['einunddreissigste'] } };
const uniq = (arr, main) => [...new Set(arr)].filter((a) => a !== main);

/** gender 'f': the feminine written form and word where the language has one (fr 1re, es 1.ª, pt / it 1ª) — the form a
 *  feminine noun takes (fr étagère, es repisa, pt prateleira); 1-10 only (the bank) */
function ord(k, locale, gender) {
  const L = String(locale || 'en').slice(0, 2);
  if (!Number.isInteger(k) || k < 1 || k > 31) throw new Error(`ordinal-more: ${k} outside 1..31`);
  let o;
  if (k <= 10) {
    const b = bank('ordinals', L);
    const w = b.words.find((x) => x.k === k);
    if (!b.notation[k] || !w) throw new Error(`ordinal-more: no bank ordinal ${k} for ${L}`);
    const alt = (b.alt && b.alt[k]) || [];
    const fem = gender === 'f';
    if (fem) return { k, notation: (b.notationF && b.notationF[k]) || b.notation[k], word: w.f || w.m, notationAlts: [], wordAlts: [] };
    o = { k, notation: b.notation[k], word: w.m, notationAlts: alt.filter((a) => /\d/.test(a)), wordAlts: alt.filter((a) => !/\d/.test(a)) };
  } else {
    const words = O31.words(L);
    if (!words[k]) throw new Error(`ordinal-more: no ordinal ${k} for ${L}`);
    o = { k, notation: O31.notation(k, L), word: words[k], notationAlts: O31.notationAlts(k, L), wordAlts: (O31.wordAlts(L)[k] || []).slice() };
  }
  o.notationAlts = uniq([...o.notationAlts, ...((EXTRA[L] && EXTRA[L](k)) || [])], o.notation);
  o.wordAlts = uniq([...o.wordAlts, ...(((WORD_EXTRA[L] || {})[k]) || [])], o.word);
  return o;
}

module.exports = { ord };
