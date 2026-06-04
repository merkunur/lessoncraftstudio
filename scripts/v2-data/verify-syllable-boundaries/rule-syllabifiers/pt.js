/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Portuguese (pt, BR canonical)
   ---------------------------------------------------------------------
   Brazilian Portuguese syllabification rules (Acordo Ortográfico 1990
   + BNCC EF01LP04):

   1. CV is the basic syllable: 'gato' → 'ga-to', 'casa' → 'ca-sa'.
   2. Single consonant between vowels goes to the next syllable.
   3. Inseparable C-clusters (consonante + l/r): bl, br, cl, cr, dl, dr,
      fl, fr, gl, gr, pl, pr, tl, tr, vl, vr stay together.
   4. Digraphs ch, lh, nh, gu(+e/i), qu(+e/i) → single C (stay together).
      rr and ss are dígrafos que se separam: the boundary falls BETWEEN
      the letters (car-ro, pas-sa, gi-ras-sol, os-so).
   5. Nasal consonants m, n at end of syllable (before another consonant)
      stay with the previous vowel as the nasal marker: 'irmão' → 'ir-mão',
      'campo' → 'cam-po', 'lente' → 'len-te'.
   6. Diphthongs (rising: ia, ie, io, iu, ua, ue, ui, uo; falling: ai, ei,
      oi, ui, au, eu, iu, ou) + nasal diphthongs (ão, ãe, õe, ãi) stay
      in one syllable. Hiatus (two strong V) splits: 'saúde' → 'sa-ú-de'
      with accented ú marking hiatus.
   7. Geminate consonants (rare in PT): split between syllables.

   Reference: Cunha & Cintra, *Nova Gramática do Português Contemporâneo*;
   BNCC EF01LP04 + EF02LP01.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','á','à','â','ã','é','ê','í','ó','ô','õ','ú']);
const STRONG_VOWELS = new Set(['a','e','o','á','à','â','ã','é','ê','ó','ô','õ']);
const WEAK_VOWELS = new Set(['i','u','í','ú']);
const NASAL_VOWELS = new Set(['ã','õ']);
// Any written stress accent / tilde — when present, default penult stress does
// NOT apply, so the tonic-i/u-hiatus guard (below) must not fire (Má-rio, á-gua,
// his-tó-ria keep their atonic diphthong).
const HAS_ACCENT = /[áàâãéêíóôõú]/;
// Loanwords / exotics where the native default-penult-stress assumption fails
// (the tonic-i/u guard would over-fire). English "brownie" = /braʊni/ → brow-nie
// (atonic ie, NOT hiatus); the durian fruit-name keeps the accepted du-rian.
// Same surgical-exception shape as no.js WORD_BLACKLIST (§A.13.52).
const HIATUS_GUARD_SKIP = new Set(['brownie', 'durian']);

/* Inseparable C-clusters + PT digraphs.
   NOTE: rr and ss are NOT here. They are dígrafos que se separam — the
   syllable boundary falls BETWEEN the two letters (car-ro, pas-sa,
   gi-ras-sol, os-so), unlike ch/lh/nh which are one sound and stay
   together. qu/gu are onset + silent-u and stay together. */
const INSEPARABLE_CLUSTERS = new Set([
  'bl','br','cl','cr','dl','dr','fl','fr','gl','gr','pl','pr','tl','tr','vl','vr',
  'ch','lh','nh','qu','gu' // ch/lh/nh = one sound; qu/gu = onset+silent-u
]);

function isVowel(ch) { return VOWELS.has(ch.toLowerCase()); }

function isDiphthong(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  // Nasal diphthongs (ão, ãe, õe) — checked FIRST so cãibra/mãe/põe stay merged
  if (NASAL_VOWELS.has(a) && (WEAK_VOWELS.has(b) || STRONG_VOWELS.has(b))) return true;
  // Accented weak vowel (í, ú) adjacent to any vowel → HIATUS, not diphthong.
  // Per Acordo Ortográfico: accented í/ú signals stress on the weak vowel,
  // breaking what would otherwise be a diphthong (e.g., país=pa-ís, baú=ba-ú,
  // saúde=sa-ú-de, paraíso=pa-ra-í-so, raízes=ra-í-zes).
  if (a === 'í' || a === 'ú' || b === 'í' || b === 'ú') return false;
  // Strong+weak / weak+strong / weak+weak
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
    if (i + 1 < n && isVowel(w[i + 1]) && isDiphthong(w[i], w[i + 1])) {
      // Re-bracketing guard: if w[i+1] is a nasal vowel (ã/õ) and is followed
      // by another vowel that forms a nasal diphthong (ão/ãe/õe/ãi), the
      // nasal diphthong takes precedence over the rising diphthong (iã/uã).
      // Skip the rising diphthong so the next iteration captures the nasal
      // pair as one nucleus per BR PT canonical pedagogy (Cunha & Cintra;
      // BNCC EF01LP04).
      //   avião   → [a, vi, ão]    (not [a, viã, o])
      //   gavião  → [ga, vi, ão]   (not [ga, viã, o])
      //   lampião → [lam, pi, ão]  (not [lam, piã, o])
      //   pião    → [pi, ão]       (not [piã, o])
      const wouldOrphanNasal = (
        NASAL_VOWELS.has(w[i + 1]) &&
        i + 2 < n && isVowel(w[i + 2]) &&
        WEAK_VOWELS.has(w[i])
      );
      // Tonic-i/u hiatus: an UNACCENTED word whose FINAL vowel pair is an
      // unaccented weak vowel (i/u) + strong vowel carries its stress on that
      // weak vowel (default penult/final stress), so it is a HIATUS not a
      // diphthong — fri-o, ri-o, na-vi-o, pi-a, lu-a, me-lan-ci-a,
      // fo-to-gra-fi-a (the acento-de-hiato convention: país/saída/baú take the
      // written accent precisely because the tonic i/u splits). Accented words
      // (Má-rio, á-gua, his-tó-ria) keep their atonic diphthong — excluded by
      // HAS_ACCENT. Silent-u after q/g (tanque, piquenique) is excluded — there
      // the "u" is part of the qu/gu digraph, not a syllabic vowel.
      let _lastVowelPair = true;
      for (let t = i + 2; t < n; t++) { if (isVowel(w[t])) { _lastVowelPair = false; break; } }
      const _silentU = (w[i] === 'u' && i > 0 && (w[i - 1] === 'q' || w[i - 1] === 'g'));
      const wouldBeTonicHiatus = (
        !HAS_ACCENT.test(w) && !HIATUS_GUARD_SKIP.has(w) &&
        WEAK_VOWELS.has(w[i]) && w[i] !== 'í' && w[i] !== 'ú' &&
        STRONG_VOWELS.has(w[i + 1]) && !NASAL_VOWELS.has(w[i + 1]) &&
        _lastVowelPair && !_silentU
      );
      if (!wouldOrphanNasal && !wouldBeTonicHiatus) nucleusEnd = i + 2;
    }

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
      else if (w[cStart] === w[cStart + 1]) nextStart = cStart + 1; // geminate
      else nextStart = cStart + 1; // split
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
  return out.length > 0 ? out : null;
}

module.exports = { syllabify, isVowel, VOWELS, INSEPARABLE_CLUSTERS };
