/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Finnish (fi)
   ---------------------------------------------------------------------
   Finnish has the most deterministic grapheme-phoneme correspondence of
   any European language. Syllable boundaries follow simple, unambiguous
   rules — no native-speaker judgment needed for the K-3 vocabulary:

   1. A syllable boundary falls BEFORE a single consonant between vowels.
      Example: 'talo' → 'ta-lo', 'kala' → 'ka-la'
   2. A syllable boundary falls BETWEEN two consonants.
      Example: 'kissa' → 'kis-sa', 'rinta' → 'rin-ta', 'matto' → 'mat-to'
   3. A syllable boundary falls BEFORE the last consonant in a 3+ consonant
      cluster (Finnish has few such clusters, mostly in loanwords).
      Example: 'sinkku' → 'sin-kku' (kk= geminate, treated per rule 2)
   4. Diphthongs (ai, ei, oi, ui, yi, äi, öi, au, eu, iu, ou, äy, öy, ie,
      uo, yö) stay within a single syllable.
      Example: 'aurinko' → 'au-rin-ko', 'koira' → 'koi-ra', 'tie' → 'tie'
   5. Long vowels (aa, ee, ii, oo, uu, yy, ää, öö) stay within a single
      syllable.
      Example: 'kuu' → 'kuu', 'maa' → 'maa', 'puu' → 'puu'
   6. A vowel hiatus (two non-diphthong vowels) IS a syllable boundary.
      Example: 'aine' → 'ai-ne', 'rauha' → 'rau-ha' (au is a diphthong, no split there;
                                                     ha is a single syllable after).

   Reference: Karlsson, F. (1999). *Finnish: An Essential Grammar*.
   Routledge. Chapters on phonology + syllabification.
   Also: Suomi, K., Toivanen, J., Ylitalo, R. (2008). *Finnish Sound
   Structure*. Studia Humaniora Ouluensia 9.

   This module implements rules 1-6 directly without relying on
   hyphenation patterns or external dictionaries. Independent failure
   modes from TeX hyphenation (which is pattern-based).
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y','ä','ö','å']);

/* Finnish diphthongs — pairs of vowels that stay in one syllable. */
const DIPHTHONGS = new Set([
  'ai','ei','oi','ui','yi','äi','öi',
  'au','eu','iu','ou',
  'äy','öy',
  'ie','uo','yö'
]);

/* Transparent compounds where a cross-seam vowel pair must NOT diphthongize.
   Finnish school tavutus splits a compound at its seam FIRST, so vowels that
   straddle the seam never form a diphthong (lumi+ukko → lu-mi-uk-ko), even
   though "iu" IS a real diphthong INSIDE a single morpheme (viu-lu). Maps the
   word → set of seam indices (the index of the part-initial vowel). Surgical
   per-word shape (no.js WORD_BLACKLIST §A.13.52); transparent compounds only —
   lexicalized derivations like kirjailija are a gray zone, left untouched. */
const COMPOUND_VOWEL_SEAMS = { 'lumiukko': new Set([4]) };

function isVowel(ch) { return VOWELS.has(ch.toLowerCase()); }

/**
 * Syllabify a Finnish word. Returns an array of syllable strings.
 * Preserves original casing.
 *
 * @param {string} word
 * @returns {string[] | null}
 */
function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  const w = word.toLowerCase();
  const n = w.length;
  if (n <= 1) return [word];

  // Find syllable boundaries (positions where a new syllable starts)
  // Strategy: walk left-to-right, recording vowel positions; insert a
  // boundary based on rules 1-6.
  const boundaries = [0]; // syllable starts at position 0

  let i = 0;
  while (i < n) {
    // Find next vowel run (potential syllable nucleus)
    while (i < n && !isVowel(w[i])) i++;
    if (i >= n) break;

    // Found vowel at position i. Determine nucleus extent.
    // Long vowel (same letter doubled) OR diphthong (rules 4-5).
    let nucleusEnd = i + 1;
    const _seams = COMPOUND_VOWEL_SEAMS[w];
    if (i + 1 < n && isVowel(w[i + 1]) && !(_seams && _seams.has(i + 1))) {
      const pair = w[i] + w[i + 1];
      if (w[i] === w[i + 1] || DIPHTHONGS.has(pair)) {
        nucleusEnd = i + 2;
      }
      // Else: vowel hiatus — rule 6, treat as separate nucleus on next pass.
      // (A registered compound seam at i+1 also falls through to hiatus.)
    }

    // After the nucleus, count consonants up to the next vowel
    let cStart = nucleusEnd;
    let cEnd = cStart;
    while (cEnd < n && !isVowel(w[cEnd])) cEnd++;
    const numConsonants = cEnd - cStart;

    // Determine where the next syllable starts:
    if (cEnd >= n) {
      // No more vowels — current syllable extends to end of word
      i = n;
      break;
    }

    let nextStart;
    if (numConsonants === 0) {
      // Vowel hiatus (rule 6) — split after the nucleus
      nextStart = nucleusEnd;
    } else if (numConsonants === 1) {
      // Rule 1: single C goes to next syllable
      nextStart = cStart;
    } else {
      // Rule 2/3: two or more Cs — split after the first; last C goes to next
      // For 2 Cs: C1.C2V → split between them (1-1 split)
      // For 3+ Cs: split such that the last C joins the next syllable
      //   e.g., CCC → C-CC (last 2 to next? actually Finnish prefers last 1)
      // We follow the standard pedagogical rule: last consonant goes to next syllable
      nextStart = cEnd - 1;
    }

    boundaries.push(nextStart);
    i = nextStart;
  }

  // Materialize syllables from boundaries
  const out = [];
  for (let k = 0; k < boundaries.length; k++) {
    const start = boundaries[k];
    const end = (k + 1 < boundaries.length) ? boundaries[k + 1] : n;
    if (end > start) out.push(word.substring(start, end));
  }
  return out.length > 0 ? out : null;
}

module.exports = { syllabify, isVowel, VOWELS, DIPHTHONGS };
