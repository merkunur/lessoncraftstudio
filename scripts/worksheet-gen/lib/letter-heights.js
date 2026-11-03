/**
 * letter-heights.js — the height class of a printed letter for the word-shape boxes (K-529, makers 2026-11-02): 'tall'
 * (it reaches above the small letters: b d f h k l t, every capital, ß), 'low' (it reaches below the line: g j p q y),
 * else 'mid' (a small letter between the lines). The box follows the letter's BODY, as configuration boxes do in every
 * school tradition (fr lettres à hampe / à jambage, fi korkeat / matalat / alas ulottuvat): an accented small letter
 * takes its base letter's box (é ä å ñ ã ü → small like e a n u; ÿ hangs like y), the cedilla of ç is not a descender
 * and æ ø œ sit between the lines (native + pedagogy review 2026-11-02: "a mark above → tall" made é the box of l and
 * contradicted "tall letters in the tall boxes"). Pure; the school letters of data/tracing/letter-strokes.js have these
 * heights (ascender 14, x-height 44, baseline 84, descender 96).
 * heightOf returns null for a letter with no class (not a Latin school letter): K-529 never draws such a word.
 */
'use strict';
const TALL = new Set([...'bdfhklt']);
const LOW = new Set([...'gjpqy']);
const MID = new Set([...'acemnorsuvwxzi', 'æ', 'ø', 'œ']);
function heightOf(ch) {
  const low = ch.toLocaleLowerCase();
  const base = low.normalize('NFD')[0];
  if (low === 'ß') return 'tall';
  if (!TALL.has(base) && !LOW.has(base) && !MID.has(base)) return null;
  if (ch !== low) return 'tall';
  if (TALL.has(base)) return 'tall';
  if (LOW.has(base)) return 'low';
  return 'mid';
}
const shapeOf = (word) => [...word].map(heightOf);
module.exports = { heightOf, shapeOf };
