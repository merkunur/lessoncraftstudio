/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — English (en)
   ---------------------------------------------------------------------
   English is classified GREEN (rule-authoritative + vocab-phonics count
   cross-check; TeX is advisory). RATIONALE: TeX `en-us` is typographic
   line-break hyphenation (Liang patterns), NOT syllabification — it
   disagrees with English syllable counts on ~32% of K-2 nouns
   (banana -> "ba-nana"), so the strict T+R split gate would quarantine
   most multisyllabic words. The literacy PRINTABLE vertical never renders
   a syllable boundary split (only counts, for syllable-count/sort, and
   words/graphemes for everything else), so GREEN's rule-authoritative
   split is safe; the COUNT is the load-bearing value and it is
   cross-validated by vocab-phonics (the same R+S bar the es/fi GREEN
   syllable activities already ship on).

   SAFETY DESIGN (the GREEN safety-by-disagreement net): a word only PASSES
   when this counter's count == vocab-phonics' count. Where the two methods
   DISAGREE, the word QUARANTINES (never published). So this counter is
   built to be CORRECT on exactly the classes vocab-phonics gets wrong
   (final consonant+le: table/candle = 2; common vowel hiatus: lion = 2),
   so those DISAGREE with vocab-phonics' under-count and quarantine instead
   of publishing a wrong count. On genuinely-ambiguous cases it biases
   toward OVER-segmentation (over-counting rarely matches vocab-phonics'
   under-counts, so it disagrees -> safe quarantine, never a silent wrong
   count). Multi-word / hyphenated entries ABSTAIN (return null) per the
   "R abstains, never overrides" doctrine (CLAUDE.md §A.13.52) -> they fall
   to the legacy gate and quarantine for insufficient sources.

   Syllable-count heuristic (the count is what matters):
     count = number of vowel-group nuclei
       + hiatus splits inside a vowel run (reliable i/u + vowel pairs)
       - silent final 'e' (cake, house, ate)
       BUT a final consonant + 'le' (table, candle, apple) keeps its 'e'
         (the -le is a syllabic nucleus)
     minimum 1.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
// 'y' is a vowel EXCEPT (a) word-initial (yellow -> consonant) or (b) a glide
// flanked by vowels on both sides (yo-yo, cra-yon, play-er -> consonant onset).
// baby/toy/key keep 'y' as a vowel nucleus.
function isVowelAt(w, i) {
  const ch = w[i];
  if (VOWELS.has(ch)) return true;
  if (ch === 'y') {
    if (i === 0) return false;
    const prevV = VOWELS.has(w[i - 1]);
    const nextV = i + 1 < w.length && VOWELS.has(w[i + 1]);
    if (prevV && nextV) return false; // intervocalic glide -> consonant
    return true;
  }
  return false;
}
function isVowel(ch) { return VOWELS.has(String(ch).toLowerCase()) || ch === 'y'; }

/* Reliable English vowel-hiatus pairs: adjacent vowels that form TWO
   nuclei (di-a-mond, li-on, med-i-um, du-al, du-o). Curated conservative
   set biased to the cases vocab-phonics under-counts. Vowel TEAMS that are
   ONE nucleus (ai, ay, ea, ee, oa, oo, ou, ow, oy, oi, au, aw, ew, ey, ie,
   ui) are deliberately EXCLUDED. */
const HIATUS_PAIRS = new Set(['ia', 'io', 'iu', 'ua', 'uo', 'eo', 'ae']);

/* word ends in a consonant + 'le' -> the final 'e' is a syllabic nucleus
   (ta-ble, can-dle, ap-ple, tur-tle, ea-gle). */
const CLE_END = /[bcdfgklmnprstvz]le$/;

function countSyllables(w) {
  // Identify maximal vowel runs and tally nuclei.
  let nuclei = 0;
  let i = 0;
  const n = w.length;
  while (i < n) {
    if (!isVowelAt(w, i)) { i++; continue; }
    // consume a maximal vowel run
    const start = i;
    while (i < n && isVowelAt(w, i)) i++;
    const run = w.slice(start, i);
    let runNuclei = 1;
    for (let k = 0; k + 1 < run.length; k++) {
      if (HIATUS_PAIRS.has(run[k] + run[k + 1])) runNuclei++;
    }
    nuclei += runNuclei;
  }
  if (nuclei === 0) return 1; // no vowels (e.g. "tv") -> treat as 1

  // Silent final '-gue'/'-que' (tongue, league, plague, antique): the 'ue'
  // run is silent (/g/ or /k/) -> collapse one nucleus.
  if (/[gq]ue$/.test(w) && nuclei > 1) nuclei--;

  // Silent final 'e': word ends in 'e' that is its own single-letter run,
  // preceded by a consonant, with >1 nucleus -> drop it. EXCEPT consonant+le.
  if (w.length >= 2 && w.endsWith('e') && !isVowelAt(w, w.length - 2) && nuclei > 1) {
    if (!CLE_END.test(w)) nuclei--;
  }
  return Math.max(1, nuclei);
}

/* Produce a split with EXACTLY `count` pieces (boundaries placed at a
   reasonable consonant between nuclei). The boundary positions are NOT
   rendered in any printable; only the piece COUNT is load-bearing. */
function splitInto(word, count) {
  const w = word.toLowerCase();
  const n = w.length;
  if (count <= 1) return [word];

  // nucleus center indices (first vowel char of each nucleus, hiatus-aware)
  const centers = [];
  let i = 0;
  while (i < n && centers.length < count) {
    if (!isVowelAt(w, i)) { i++; continue; }
    const start = i;
    while (i < n && isVowelAt(w, i)) i++;
    const run = w.slice(start, i);
    centers.push(start);
    for (let k = 0; k + 1 < run.length && centers.length < count; k++) {
      if (HIATUS_PAIRS.has(run[k] + run[k + 1])) centers.push(start + k + 1);
    }
  }
  if (centers.length < 2) return [word];

  // boundary between consecutive centers: place after the first consonant
  // following the earlier nucleus (maximal-onset-ish; "ca|sa", "ban|an|a").
  const bounds = [0];
  for (let c = 0; c + 1 < centers.length; c++) {
    const a = centers[c];
    const b = centers[c + 1];
    // advance past the vowel(s) of nucleus a
    let j = a;
    while (j < b && isVowelAt(w, j)) j++;
    const cons = b - j; // consonants between the two nuclei
    let cut;
    if (cons <= 0) cut = b;            // hiatus: split right before next vowel
    else if (cons === 1) cut = j + 1;  // single C closes the syllable (keeps pieces tidy)
    else cut = j + 1;                  // 2+ C: first C closes prev syllable
    bounds.push(cut);
  }
  bounds.push(n);

  const out = [];
  for (let k = 0; k + 1 < bounds.length; k++) {
    const s = bounds[k], e = bounds[k + 1];
    if (e > s) out.push(word.substring(s, e));
  }
  // guarantee piece count matches `count` (defensive: merge/trim if drift)
  if (out.length === count) return out;
  if (out.length > count) {
    while (out.length > count) { out[out.length - 2] += out[out.length - 1]; out.pop(); }
    return out;
  }
  return out.length > 0 ? out : [word];
}

function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  const lower = word.toLowerCase();
  // ABSTAIN on multi-word / hyphenated / non-alphabetic entries.
  if (/[\s\-]/.test(lower)) return null;
  const w = lower.replace(/[^a-z]/g, ''); // drop apostrophes etc
  if (w.length === 0) return null;
  if (w.length <= 1) return [word];

  const count = countSyllables(w);
  return splitInto(word, count);
}

module.exports = { syllabify, isVowel, VOWELS, HIATUS_PAIRS, countSyllables };
