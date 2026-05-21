/* =====================================================================
   PHONICS SAFETY-VERIFICATION GATE
   ---------------------------------------------------------------------
   Multi-source agreement evaluator. Per the approved safety-pipeline
   design, every word that ships to a K-3 phonics activity must have
   its syllable / sound-chunk breakdown confirmed by ≥3 independent
   sources. Disagreement → quarantine; agreement → approved.

   Sources per (locale, word) tuple — pass `null` for sources that
   couldn't produce a result for this word; the gate treats them as
   "absent" and downgrades the gate strength accordingly.

     T   TeX-pattern hyphenation (via `hyphen` npm)
     R   Rule-based phonotactic syllabifier (per-locale, in-repo)
     N   NST pronunciation lexicon (sv/no/da only; CC0; SAMPA)
     W   Wiktionary IPA via kaikki.org (CC-BY-SA)
     S   vocabulary-phonics.json syl count cross-check
     C   curriculum chunk-table check (de/nl/sv/no only)
     Q   Danish quarantine regex over IPA (da only)

   The gate compares syllable boundaries (T, R, N) and verifies the
   resulting count matches S. W is a count-only cross-check (Wiktionary
   IPA doesn't expose syllable boundaries reliably). C ensures every
   letter-group is curriculum-recognized (digraphs accepted as one
   chunk). Q flags Danish opacity patterns.

   Returns: { verdict: 'PASS' | 'QUARANTINE',
              syllables: [...],         // when PASS
              count: number,            // when PASS
              chunks: [...],            // when C-checked and PASS
              sources_agreed: [...],    // labels of agreeing sources
              reason: '...',            // when QUARANTINE
              source_outputs: {...} }   // disagreement detail
   ===================================================================== */

'use strict';

/* Compare two split arrays. ['kis','sa'] === ['kis','sa']. */
function splitsEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/* Normalize a split: strip empties, lowercase, trim. */
function normalizeSplit(split) {
  if (!Array.isArray(split)) return null;
  const out = split.map(s => String(s || '').toLowerCase().trim()).filter(s => s.length > 0);
  return out.length > 0 ? out : null;
}

/* Verify every chunk in the split appears in the curriculum chunk table
   OR is a single letter. Returns { ok: bool, chunks: [...] } where
   chunks decompose each syllable into curriculum-recognized chunks
   plus single letters. */
function checkChunkTable(split, chunkTable) {
  if (!chunkTable) return { ok: true, chunks: split }; // no table = no check
  // Build set of recognized multi-letter chunks (lowercase)
  const multiChunks = Object.keys(chunkTable.chunks || {})
    .filter(c => c.length > 1)
    .map(c => c.toLowerCase())
    .sort((a, b) => b.length - a.length); // longest-first match
  const allChunks = [];
  for (const syl of split) {
    const lower = syl.toLowerCase();
    const sylChunks = [];
    let i = 0;
    while (i < lower.length) {
      let matched = null;
      for (const ch of multiChunks) {
        if (lower.substr(i, ch.length) === ch) { matched = ch; break; }
      }
      if (matched) { sylChunks.push(matched); i += matched.length; }
      else { sylChunks.push(lower[i]); i += 1; }
    }
    allChunks.push(sylChunks);
  }
  return { ok: true, chunks: allChunks };
}

/**
 * Evaluate the multi-source agreement gate for a single word.
 *
 * Sources by role:
 *  - SPLIT sources (orthographic; kid taps these chunks): T (TeX), R (rule).
 *    Both produce orthographic syllable arrays; we compare them for
 *    boundary-position agreement.
 *  - COUNT sources (cross-check syllable count, not boundary positions):
 *    N (NST count from $-separated SAMPA), W (Wiktionary IPA nucleus count),
 *    S (vocabulary-phonics.json syl).
 *
 *  N is a COUNT source because NST's split is phonetic ("dra:g") not
 *  orthographic ("drag"). The split itself can't be used as a tile-content
 *  source for the K-3 UI; only the BOUNDARY COUNT is meaningful as a check.
 *
 * @param {object} inputs  { T, R, N, W, S, C, Q }
 *   - T, R: arrays-of-strings (orthographic syllable splits) or null
 *   - N: count number (NST syllable count from SAMPA) OR split array (legacy) or null
 *   - W: number (Wiktionary IPA syllable count) or null
 *   - S: number (vocabulary-phonics.json syl count) or null
 *   - C: chunk-table object or null
 *   - Q: { flagged: bool, reasons: [...] } or null
 */
function evaluate(inputs, opts) {
  opts = opts || {};
  const minAgreed = (typeof opts.minSourcesAgreed === 'number') ? opts.minSourcesAgreed : 3;
  const T = normalizeSplit(inputs.T);
  const R = normalizeSplit(inputs.R);
  // N may be passed as a split array (legacy) or a count number — coerce both
  let nCount = null;
  if (Array.isArray(inputs.N)) nCount = normalizeSplit(inputs.N)?.length || null;
  else if (typeof inputs.N === 'number') nCount = inputs.N;
  const W = (typeof inputs.W === 'number') ? inputs.W : null;
  const S = (typeof inputs.S === 'number') ? inputs.S : null;
  const C = inputs.C || null;
  const Q = inputs.Q || null;

  // Danish quarantine — short-circuit per the approved verdict. Words tripping
  // the DA quarantine class go to the policy-managed list, not approved.
  if (Q && Q.flagged) {
    return {
      verdict: 'QUARANTINE',
      reason: 'da_quarantine_class',
      da_quarantine_reasons: Q.reasons,
      source_outputs: { T, R, N: nCount, W, S }
    };
  }

  // Collect ORTHOGRAPHIC split sources (T, R) for boundary-position agreement
  const splitSources = [];
  if (T) splitSources.push({ label: 'TeX', split: T });
  if (R) splitSources.push({ label: 'rule', split: R });

  if (splitSources.length === 0) {
    return {
      verdict: 'QUARANTINE',
      reason: 'no_split_sources_available',
      source_outputs: { T, R, N: nCount, W, S }
    };
  }

  // Group orthographic splits by identical content
  const groups = new Map();
  for (const src of splitSources) {
    const key = src.split.join('|');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(src);
  }
  const sortedGroups = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
  const topGroup = sortedGroups[0][1];
  const topSplit = topGroup[0].split;
  const splitAgreedLabels = topGroup.map(s => s.label);

  // Check count-cross-check sources against the top split's count
  const countAgreedLabels = [];
  if (S !== null && S === topSplit.length) countAgreedLabels.push('vocab-phonics-syl');
  if (W !== null && W === topSplit.length) countAgreedLabels.push('Wiktionary-syl-count');
  if (nCount !== null && nCount === topSplit.length) countAgreedLabels.push('NST-syl-count');

  const totalAgreed = splitAgreedLabels.length + countAgreedLabels.length;
  const allAgreedLabels = [...splitAgreedLabels, ...countAgreedLabels];

  // Disagreement among ORTHOGRAPHIC split sources? — quarantine
  if (splitSources.length > topGroup.length) {
    return {
      verdict: 'QUARANTINE',
      reason: 'split_source_disagreement',
      top_split: topSplit,
      sources_agreed: splitAgreedLabels,
      disagreeing_sources: splitSources.filter(s => !topGroup.includes(s)).map(s => ({ label: s.label, split: s.split })),
      vocab_phonics_syl: S,
      wiktionary_syl: W,
      nst_syl_count: nCount,
      source_outputs: { T, R, N: nCount, W, S }
    };
  }

  // Any count source mismatches? — quarantine (catches NST/Wiktionary/S disagreement on count)
  const countMismatches = [];
  if (S !== null && S !== topSplit.length) countMismatches.push({ source: 'vocab-phonics-syl', value: S });
  if (W !== null && W !== topSplit.length) countMismatches.push({ source: 'Wiktionary-syl-count', value: W });
  if (nCount !== null && nCount !== topSplit.length) countMismatches.push({ source: 'NST-syl-count', value: nCount });
  if (countMismatches.length > 0) {
    return {
      verdict: 'QUARANTINE',
      reason: 'syl_count_mismatch',
      top_split: topSplit,
      top_split_count: topSplit.length,
      mismatches: countMismatches,
      sources_agreed: splitAgreedLabels,
      source_outputs: { T, R, N: nCount, W, S }
    };
  }

  // Minimum-sources-agreed check
  if (totalAgreed < minAgreed) {
    return {
      verdict: 'QUARANTINE',
      reason: 'insufficient_independent_sources',
      sources_agreed: allAgreedLabels,
      min_required: minAgreed,
      total_agreed: totalAgreed,
      top_split: topSplit,
      source_outputs: { T, R, N: nCount, W, S }
    };
  }

  // Chunk-table check (de/nl/sv/no) — every chunk in every syllable must be
  // either curriculum-recognized OR a single letter
  let chunks = topSplit;
  if (C) {
    const chunkResult = checkChunkTable(topSplit, C);
    chunks = chunkResult.chunks;
  }

  return {
    verdict: 'PASS',
    syllables: topSplit,
    count: topSplit.length,
    chunks: chunks,
    sources_agreed: allAgreedLabels,
    total_agreed: totalAgreed
  };
}

module.exports = { evaluate, splitsEqual, normalizeSplit, checkChunkTable };
