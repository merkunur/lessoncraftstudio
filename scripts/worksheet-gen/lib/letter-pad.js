/**
 * letter-pad.js — the on-screen letter pad of a `type-word` screen (Level Set 2026-10-13, Number Words: the write
 * page's screen version, where the child TYPES the word). The pad is the locale's whole alphabet (never only the
 * answer's letters — that would spell it out), plus every other character the locale's words use (accents, the
 * hyphen of fr dix-sept, the space of es noventa y siete).
 *
 *   letterPad(loc, words) -> { keys: [...], maxChars }   keys in alphabet order, then the extra characters
 */
'use strict';
const BASE = 'abcdefghijklmnopqrstuvwxyz';
const OWN = { en: '', de: 'äöüß', es: 'ñ', fr: '', it: '', pt: '', nl: '', sv: 'åäö', da: 'æøå', no: 'æøå', fi: 'åäö' };
function letterPad(loc, words) {
  if (!(loc in OWN)) throw new Error('letter-pad: no alphabet for ' + loc);
  const keys = [...BASE, ...OWN[loc]];
  for (const w of words) for (const c of [...String(w).toLocaleLowerCase(loc).normalize('NFC')]) if (!keys.includes(c)) keys.push(c);
  const maxChars = Math.max(...words.map((w) => [...String(w)].length)) + 3;
  return { keys, maxChars };
}
module.exports = { letterPad };
