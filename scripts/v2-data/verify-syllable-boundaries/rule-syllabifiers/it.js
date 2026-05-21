/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Italian (it)
   ---------------------------------------------------------------------
   Italian syllabification rules (Accademia della Crusca / DOP):

   1. CV is the basic syllable: 'casa' → 'ca-sa', 'tavolo' → 'ta-vo-lo'.
   2. Single consonant between vowels goes to the next syllable.
   3. Geminate consonants split between syllables: 'palla' → 'pal-la',
      'mamma' → 'mam-ma', 'ferro' → 'fer-ro'. (Geminates in Italian are
      written as doubled letters and are phonemically distinct.)
   4. Consonant + liquid clusters (b/c/d/f/g/p/t/v + l/r) stay together:
      'libro' → 'li-bro', 'patria' → 'pa-tria'.
   5. s + consonant ("s impura") stays with the FOLLOWING vowel:
      'pasta' → 'pa-sta', 'finestra' → 'fi-ne-stra'.
   6. Digraphs ch, gh, gn, gl, sc(i/e) treated as one consonant:
      'gnomo' → 'gno-mo', 'figli' → 'fi-gli', 'pesce' → 'pe-sce'.
   7. Italian diphthongs (rising: ia, ie, io, iu, ua, ue, ui, uo) stay
      in one syllable; hiatus (two strong vowels) splits.

   Reference: Accademia della Crusca, *Grammatica italiana* (Serianni,
   1989); DOP (Dizionario d'ortografia e di pronunzia, RAI 2010).
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','à','è','é','ì','ò','ù']);
const STRONG_VOWELS = new Set(['a','e','o','à','è','é','ò']);
const WEAK_VOWELS = new Set(['i','u','ì','ù']);

/* Inseparable C-clusters in Italian. */
const INSEPARABLE_CLUSTERS = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','tr','vr',
  'ch','gh','gn','sc' // Italian digraphs as one C
]);
/* "s impura" — s + any consonant, syllable starts at s */
const S_IMPURA = /^s[bcdfghjklmnpqrtvz]/;

function isVowel(ch) { return VOWELS.has(ch.toLowerCase()); }

function isDiphthong(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  if (STRONG_VOWELS.has(a) && WEAK_VOWELS.has(b)) return true;
  if (WEAK_VOWELS.has(a) && STRONG_VOWELS.has(b)) return true;
  if (WEAK_VOWELS.has(a) && WEAK_VOWELS.has(b)) return true;
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
    while (i < n && !isVowel(w[i])) i++;
    if (i >= n) break;
    let nucleusEnd = i + 1;
    if (i + 1 < n && isVowel(w[i + 1]) && isDiphthong(w[i], w[i + 1])) nucleusEnd = i + 2;
    let cStart = nucleusEnd;
    let cEnd = cStart;
    while (cEnd < n && !isVowel(w[cEnd])) cEnd++;
    const numC = cEnd - cStart;
    if (cEnd >= n) { i = n; break; }

    let nextStart;
    if (numC === 0) {
      nextStart = nucleusEnd;
    } else if (numC === 1) {
      nextStart = cStart;
    } else if (numC === 2) {
      const pair = w[cStart] + w[cStart + 1];
      const sImp = S_IMPURA.test(w.substr(cStart));
      // Geminate (e.g., 'tt', 'll', 'mm') splits between
      if (w[cStart] === w[cStart + 1]) nextStart = cStart + 1;
      else if (INSEPARABLE_CLUSTERS.has(pair)) nextStart = cStart;
      else if (sImp) nextStart = cStart; // s impura goes with next
      else nextStart = cStart + 1;
    } else {
      // 3+ consonants — last two inseparable? Or s impura before last vowel?
      const lastTwo = w[cEnd - 2] + w[cEnd - 1];
      const sImp = S_IMPURA.test(w.substr(cEnd - 2));
      if (sImp) nextStart = cEnd - 2;
      else if (INSEPARABLE_CLUSTERS.has(lastTwo)) nextStart = cEnd - 2;
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
