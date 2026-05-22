/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Spanish (es)
   ---------------------------------------------------------------------
   Spanish syllabification rules (RAE Ortografía 2010 + LOMLOE primaria):

   1. CV is the basic syllable shape. A single consonant between vowels
      goes with the following vowel: 'casa' → 'ca-sa', 'sapo' → 'sa-po'.
   2. Two consonants between vowels usually split: 'al-to', 'in-to'.
      EXCEPTION: inseparable C-clusters (consonante + l/r liquid) stay
      together: 'bl/br/cl/cr/dr/fl/fr/gl/gr/pl/pr/tr', plus 'ch/ll/rr'
      as single digraphs. E.g., 'cabra' → 'ca-bra', 'plato' → 'pla-to'.
   3. Three consonants between vowels: if the last two form an
      inseparable cluster, split before them: 'consonante' splits to
      'con-so-nan-te'; 'compresor' → 'com-pre-sor'. Otherwise split
      after the first.
   4. Vowel pairs: a/e/o (strong) + i/u (weak) form diphthongs unless
      the weak vowel carries an accent (hiatus). For simplicity in this
      rule-based syllabifier, we treat strong+weak/weak+strong as
      one nucleus, strong+strong as separate (hiatus), and
      identical+identical as one nucleus.

   Reference: RAE, *Ortografía de la lengua española* (2010), §6.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','á','é','í','ó','ú','ü','y']);
const STRONG_VOWELS = new Set(['a','e','o','á','é','ó']);
const WEAK_VOWELS = new Set(['i','u','í','ú','ü','y']);

/* Inseparable consonant clusters in Spanish: stop+liquid OR f+liquid */
const INSEPARABLE_CLUSTERS = new Set([
  'bl','br','cl','cr','dl','dr','fl','fr','gl','gr','pl','pr','tl','tr',
  'ch','ll','rr', // Spanish digraphs treated as one consonant
  'qu','gu'        // qu/gu before e/i — one consonant
]);

function isVowel(ch) { return VOWELS.has(ch.toLowerCase()); }

function isDiphthong(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  if (a === b && isVowel(a)) return true; // long vowel-like (rare in es)
  // Accented weak vowel (í, ú) adjacent to any vowel → HIATUS, not diphthong.
  // Per RAE: a written accent on a weak vowel signals stress on that vowel,
  // breaking what would otherwise be a diphthong (e.g., río=rí-o, día=dí-a,
  // país=pa-ís, baúl=ba-úl, María=ma-rí-a, púa=pú-a, frío=frí-o, sandía=san-dí-a).
  if (a === 'í' || a === 'ú' || b === 'í' || b === 'ú') return false;
  // Strong+weak or weak+strong → diphthong
  if (STRONG_VOWELS.has(a) && WEAK_VOWELS.has(b)) return true;
  if (WEAK_VOWELS.has(a) && STRONG_VOWELS.has(b)) return true;
  // Weak+weak → diphthong
  if (WEAK_VOWELS.has(a) && WEAK_VOWELS.has(b)) return true;
  // Strong+strong → hiatus (separate syllables)
  return false;
}

function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  const w = word.toLowerCase();
  const n = w.length;
  if (n <= 1) return [word];

  const boundaries = [0];
  let i = 0;
  while (i < n) {
    // Skip to next vowel
    while (i < n && !isVowel(w[i])) i++;
    if (i >= n) break;

    // Determine nucleus extent
    let nucleusEnd = i + 1;
    if (i + 1 < n && isVowel(w[i + 1]) && isDiphthong(w[i], w[i + 1])) {
      nucleusEnd = i + 2;
      // Triphthong check (weak-strong-weak): rare, skip for K-3
    }

    // Consonants between this nucleus and the next vowel
    let cStart = nucleusEnd;
    let cEnd = cStart;
    while (cEnd < n && !isVowel(w[cEnd])) cEnd++;
    const numConsonants = cEnd - cStart;

    if (cEnd >= n) { i = n; break; }

    let nextStart;
    if (numConsonants === 0) {
      nextStart = nucleusEnd; // hiatus
    } else if (numConsonants === 1) {
      nextStart = cStart; // single C goes with next syllable
    } else if (numConsonants === 2) {
      const pair = w[cStart] + w[cStart + 1];
      if (INSEPARABLE_CLUSTERS.has(pair)) nextStart = cStart; // cluster stays
      else nextStart = cStart + 1; // split between them
    } else {
      // 3+ consonants: check if last two are inseparable
      const lastTwo = w[cEnd - 2] + w[cEnd - 1];
      if (INSEPARABLE_CLUSTERS.has(lastTwo)) nextStart = cEnd - 2;
      else nextStart = cEnd - 1;
    }

    boundaries.push(nextStart);
    i = nextStart;
  }

  const out = [];
  for (let k = 0; k < boundaries.length; k++) {
    const start = boundaries[k];
    const end = (k + 1 < boundaries.length) ? boundaries[k + 1] : n;
    if (end > start) out.push(word.substring(start, end));
  }
  return out.length > 0 ? out : null;
}

module.exports = { syllabify, isVowel, VOWELS, INSEPARABLE_CLUSTERS };
