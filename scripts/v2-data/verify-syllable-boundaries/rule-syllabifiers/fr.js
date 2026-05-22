/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — French (fr)
   ---------------------------------------------------------------------
   French WRITTEN syllabification rules (méthode syllabique, used in CP):

   1. CV is the basic syllable: 'chat' → 'chat', 'maison' → 'mai-son',
      'bateau' → 'ba-teau'.
   2. Single consonant between vowels goes to the next syllable.
   3. Inseparable C-clusters (consonante + l/r): bl, br, cl, cr, dr, fl,
      fr, gl, gr, pl, pr, tr, vr stay together.
   4. Digraphs ch, ph, gn, qu, gu (+e/i) treated as one consonant.
   5. Geminate consonants (rare in modern FR) split: 'allée' → 'al-lée'.
   6. French vowel digraphs/trigraphs (au, eau, eu, ou, ai, ei, oi, ui)
      stay in one syllable nucleus. Nasal vowel digraphs (an, en, in, on,
      un, am, em, im, om, um) stay with the previous nucleus when followed
      by a consonant: 'enfant' → 'en-fant'; 'bonjour' → 'bon-jour'.
   7. Silent final letters: the rule operates on written form, not
      pronunciation, so final consonants like 't' in 'chat' stay in
      the syllable. This is correct for written syllable-builder UX.

   Reference: Catach, *L'orthographe française* (1995); Programmes du
   cycle 2 (CP-CE1-CE2) Décodage.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y','à','â','é','è','ê','ë','î','ï','ô','ù','û','ü','ÿ','æ','œ']);

/* Inseparable C-clusters + FR digraphs */
const INSEPARABLE_CLUSTERS = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','tr','vr',
  'ch','ph','gn','th','qu','gu' // digraphs
]);

/* French vowel digraphs/trigraphs — sequences that act as one nucleus */
const VOWEL_DIGRAPHS = ['eau','eai','aoû','aux','oeu','œu','ou','ai','au','eu','ei','oi','ui','ay','ey','oy','uy'];
/* `ion` added 2026-05-23: K-3 canon glide-merges the i with the nasal
   `on` at end-of-word into a single nucleus /jɔ̃/ (`avion → [a, vion]`,
   `lion → [lion]`, `natation → [na, ta, tion]`). The existing
   "not followed by a vowel" guard in matchNasalVowel() prevents this
   from matching mid-word `ion` followed by a vowel (e.g. `lionne` falls
   back to single-vowel `i`). Direct analogue of PT iã+o fix at
   ad4924da. Does not resolve `-éon` (accordéon/caméléon) — that's
   vocab-phonics drift, caught by safety floor, parked to backlog. */
const NASAL_VOWELS = ['an','en','in','on','un','am','em','im','om','um','aim','ain','ein','oin','ien','ion'];

function isVowel(ch) { return VOWELS.has(ch.toLowerCase()); }

/* Match a vowel digraph or single vowel at position i. Returns the
   matched length (1, 2, or 3). */
function matchVowelGroup(w, i) {
  // Try trigraph then digraph then single
  for (const tri of VOWEL_DIGRAPHS) {
    if (tri.length === 3 && w.substr(i, 3) === tri) return 3;
  }
  for (const di of VOWEL_DIGRAPHS) {
    if (di.length === 2 && w.substr(i, 2) === di) return 2;
  }
  return isVowel(w[i]) ? 1 : 0;
}

/* Check if positions [i..i+k-1] form a nasal vowel (vowel+n/m, no vowel
   after the n/m). Returns matched length or 0. */
function matchNasalVowel(w, i, n) {
  for (const nv of NASAL_VOWELS) {
    if (w.substr(i, nv.length) === nv) {
      // Must not be followed by a vowel (otherwise it's V+CV, not nasal)
      const after = w[i + nv.length];
      if (after === undefined || !isVowel(after)) return nv.length;
    }
  }
  return 0;
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

    // Match nasal first (longest sequence), then digraph, then single
    let nucLen = matchNasalVowel(w, i, n);
    if (nucLen === 0) nucLen = matchVowelGroup(w, i);
    if (nucLen === 0) { i++; continue; }
    let nucleusEnd = i + nucLen;

    let cStart = nucleusEnd;
    let cEnd = cStart;
    while (cEnd < n && !isVowel(w[cEnd])) cEnd++;
    const numC = cEnd - cStart;
    if (cEnd >= n) { i = n; break; }

    let nextStart;
    if (numC === 0) nextStart = nucleusEnd;
    else if (numC === 1) nextStart = cStart;
    else if (numC === 2) {
      const pair = w[cStart] + w[cStart + 1];
      if (INSEPARABLE_CLUSTERS.has(pair)) nextStart = cStart;
      else if (w[cStart] === w[cStart + 1]) nextStart = cStart + 1;
      else nextStart = cStart + 1;
    } else {
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

  /* Class C: e-muet merge at end-of-word (added 2026-05-23). When the
     last syllable is exactly 'e' (case-insensitive) AND the preceding
     syllable's lowercase final character is a vowel, merge them:
       tortue   → [tor, tu, e]  → [tor, tue]
       azalée   → [a, za, lé, e] → [a, za, lée]
       barbecue → [bar, be, cu, e] → [bar, be, cue]
       brownie  → [brow, ni, e] → [brow, nie]
     Consonant + silent-e cases (table → [ta, ble], vache → [va, che])
     are left intact — their last syllable has 2+ chars, so the
     trigger condition never matches. */
  if (out.length >= 2 && out[out.length - 1].toLowerCase() === 'e') {
    const prevLow = out[out.length - 2].toLowerCase();
    if (prevLow.length > 0 && VOWELS.has(prevLow[prevLow.length - 1])) {
      out[out.length - 2] = out[out.length - 2] + out[out.length - 1];
      out.pop();
    }
  }

  return out.length > 0 ? out : null;
}

module.exports = { syllabify, isVowel, VOWELS, VOWEL_DIGRAPHS, NASAL_VOWELS, INSEPARABLE_CLUSTERS };
