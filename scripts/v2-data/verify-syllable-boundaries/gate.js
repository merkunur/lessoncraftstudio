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

/* =====================================================================
   NORDIC SCHOOL-CONVENTION SURGICAL CARVE-OUT (CLAUDE.md §A.13.57)
   ---------------------------------------------------------------------
   For the Nordic K-literacy *sound-out* product (klappa stavelser /
   ljudmetoden) the school syllable split legitimately differs from TeX
   typographic line-break hyphenation (avstavning) in a few patterns.
   This is a SURGICAL carve-out WITHIN the strict multi-source gate — it
   is NOT a GREEN relaxation. Only these REGISTERED divergences are
   accepted over a disagreeing TeX; every other rule≠TeX disagreement
   still quarantines (so the ~192 words full-GREEN would admit — incl.
   ~14 compound-seam rule errors like bus-schauf-för / pås-klil-ja —
   stay quarantined as the documented "rule compound-seam under-grab"
   backlog). The count sources (S/N/W) still independently verify the
   syllable COUNT for every accepted divergence — only the BOUNDARY is
   taken from the native-reviewer-validated rule.

   Per locale (no/da inherit this structure when their pilots run):
     codaDigraphs  - digraphs that the school keeps WHOLE as a coda unit
                     while TeX splits them (sv 'ck': kloc-ka → klock-a).
                     ALWAYS unambiguous → applied as a PATTERN (any word).
     mutaSeamWords - the AMBIGUOUS divergences: muta-cum-liquida onset
                     (stop+liquid kept as the next onset, e.g. mus-kler,
                     se-bra) and registered compound seams (hand-ske).
                     A consonant-before-stop muta (mus-kler) is
                     phonotactically indistinguishable from a compound-seam
                     rule error (pås-klil-ja), so each is an EXPLICIT,
                     native-reviewer-validated word → school-split entry
                     (a pattern alone would admit the errors). The gate
                     accepts the divergence only when the rule's R equals
                     the registered split exactly. */
const SCHOOL_DIVERGENCE = {
  sv: {
    codaDigraphs: ['ck'],
    mutaSeamWords: {
      // muta-cum-liquida onset re-splits (stop+liquid → next onset)
      'sebra': ['se', 'bra'],
      'kobra': ['ko', 'bra'],
      'cykla': ['cy', 'kla'],
      'aprikos': ['a', 'pri', 'kos'],
      'paprika': ['pa', 'pri', 'ka'],
      'mikrofon': ['mi', 'kro', 'fon'],
      'mikroskop': ['mi', 'kro', 'skop'],
      'dimetrodon': ['di', 'me', 'tro', 'don'],
      'astronaut': ['as', 'tro', 'naut'],
      'muskler': ['mus', 'kler'],
      'ostron': ['os', 'tron'],
      // registered compound seam
      'handske': ['hand', 'ske'],
      // SEAM-RECOVERY (CLAUDE.md §A.13.57; native-sv-reviewed, NSR-flagged).
      // Class-2 compound seams where TeX is ALSO wrong, so the sv.js
      // SCHOOL_COMPOUND_SEAMS-corrected R disagrees with TeX. Registering R here
      // makes the gate accept the school split over the disagreeing TeX (exactly
      // the handske pattern). Exact-match keyed → zero over-match risk; the count
      // sources (N/S) still independently verify the count. Class-1
      // (havssköldpadda, R==TeX) and Class-3 (havssnäcka, differs from TeX only by
      // the ck coda → codaDigraphs auto-accept) are NOT listed here — they need
      // only the sv.js override.
      'julstrumpa':        ['jul', 'strum', 'pa'],
      'blåskrika':         ['blå', 'skri', 'ka'],
      'höstack':           ['hö', 'stack'],
      'ljusslingor':       ['ljus', 'sling', 'or'],
      'sjukhusarmband':    ['sjuk', 'hus', 'arm', 'band'],
      'förlängningssladd': ['för', 'läng', 'nings', 'sladd']
      // kägla / bowlingkägla are NOT here: the native reviewer ruled (SETTLED)
      // that the short ä → CLOSED syllable käg-la is correct, NOT the muta-onset
      // kä-gla. sv.js now overrides them to käg-la (SHORT_VOWEL_MUTA_EXCEPTIONS),
      // which equals TeX, so they pass on strict agreement — no divergence to
      // register here.
    }
    // no (Norwegian Bokmål) — NO ENTRY by native-reviewer determination
    // (2026-06-04, §A.13.57). no.js was ALREADY school-aligned: it agrees with
    // TeX on 100% of its pool, splits geminates per Norwegian pedagogy
    // (klok-ke / som-mer — the OPPOSITE of sv's ck-coda klock-a; do NOT import
    // it), splits ng (en-gel), keeps muta-cum-liquida onsets (a-pri-kos), and
    // treats vr as a valid onset (ha-vre — UNLIKE sv where v was excluded).
    // hanske = hans-ke (not a live seam, unlike sv hand-ske). Zero school
    // divergences → the carve-out never fires for no; the strict gate governs
    // it fully. Each locale's divergence set is empirically determined; no's
    // is EMPTY. (da has no da.js rule at all — a separate build-or-skip decision.)
  }
};

/* Internal boundary char-offsets of a split (length = split.length - 1). */
function splitBoundaryOffsets(split) {
  const o = [];
  let acc = 0;
  for (let i = 0; i < split.length - 1; i++) { acc += split[i].length; o.push(acc); }
  return o;
}

/* Is the rule split R a REGISTERED school-convention divergence from TeX T
   for this (word, locale)? Returns true ONLY for:
     (a) an explicit reviewer-validated muta/seam word whose registered split
         equals R exactly; or
     (b) a coda-digraph-only divergence (e.g. ck): same syllable count, and
         EVERY differing boundary is a registered coda digraph that T split
         and R keeps whole (T boundary between the two digraph letters, R
         boundary one char later).
   Anything else → false → the strict gate quarantines the disagreement. */
function isRegisteredSchoolDivergence(T, R, word, locale) {
  const cfg = SCHOOL_DIVERGENCE[locale];
  if (!cfg || !Array.isArray(T) || !Array.isArray(R) || !word) return false;
  const lw = String(word).toLowerCase();
  // (a) explicit reviewer-validated muta/seam word — exact-split match
  const entry = cfg.mutaSeamWords && cfg.mutaSeamWords[lw];
  if (entry && splitsEqual(entry, R)) return true;
  // (b) coda-digraph-only divergence — count-preserving, every diff is a digraph coda
  if (T.length !== R.length) return false;
  const bT = splitBoundaryOffsets(T);
  const bR = splitBoundaryOffsets(R);
  for (let i = 0; i < bT.length; i++) {
    if (bT[i] === bR[i]) continue;
    let matched = false;
    for (const dg of (cfg.codaDigraphs || [])) {
      if (dg.length === 2 &&
          bR[i] === bT[i] + 1 &&
          lw[bT[i] - 1] === dg[0] && lw[bT[i]] === dg[1]) { matched = true; break; }
    }
    if (!matched) return false;
  }
  return true;
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

  // GREEN-locale branch (es, it, pt, fr, fi): rule-syllabifier is the
  // AUTHORITATIVE split source when present and agreeing with vocab-phonics
  // count. TeX is typographic line-break hyphenation (Liang patterns), not a
  // pedagogical source — its disagreement on GREEN locales is logged in notes,
  // not vetoing. Safety floor preserved: rule-vs-vocab-phonics count
  // disagreement still quarantines; rule-null falls through to the legacy
  // multi-source gate (which quarantines for insufficient sources).
  //
  // NOTE: sv is NOT GREEN. The Nordic school-convention (klappa stavelser)
  // carve-out is SURGICAL, not a wholesale TeX-advisory switch: sv stays on
  // the strict multi-source gate below, and only the three REGISTERED
  // school-divergence patterns (ck-coda, registered muta-cum-liquida onset,
  // registered seam) are accepted over a disagreeing TeX — see
  // isRegisteredSchoolDivergence() + SCHOOL_DIVERGENCE config. Full GREEN for
  // sv would globally relax split_source_disagreement and admit ~192 words
  // (incl. ~14 compound-seam rule errors) the strict gate correctly
  // quarantines, breaching the safety invariant. CLAUDE.md §A.13.57.
  // en is GREEN: TeX en-us is typographic (Liang), not syllabification, and
  // no literacy PRINTABLE renders a syllable split — only the COUNT matters
  // (cross-validated by the careful en.js counter + vocab-phonics, the same
  // R+S bar es/fi syllable activities ship on). See rule-syllabifiers/en.js.
  const GREEN_LOCALES = new Set(['en', 'es', 'it', 'pt', 'fr', 'fi']);
  const isGreen = GREEN_LOCALES.has(opts.locale);

  if (isGreen && R) {
    const topSplit = R;
    const ruleCount = R.length;

    // Genuine conflict: rule vs vocab-phonics disagree on count → quarantine.
    if (S !== null && S !== ruleCount) {
      return {
        verdict: 'QUARANTINE',
        reason: 'rule_vs_vocab_phonics_count_disagreement',
        top_split: topSplit,
        top_split_count: ruleCount,
        vocab_phonics_syl: S,
        tex_split: T,
        source_outputs: { T, R, N: nCount, W, S }
      };
    }

    // S missing → only rule is available. GREEN locales require
    // rule + vocab-phonics agreement (2 pedagogically-grounded sources).
    if (S === null) {
      return {
        verdict: 'QUARANTINE',
        reason: 'insufficient_independent_sources',
        sources_agreed: ['rule'],
        min_required: 2,
        total_agreed: 1,
        top_split: topSplit,
        source_outputs: { T, R, N: nCount, W, S }
      };
    }

    // PASS — rule + vocab-phonics agree on count. TeX disagreement → advisory.
    const sourcesAgreed = ['rule', 'vocab-phonics-syl'];
    const result = {
      verdict: 'PASS',
      syllables: topSplit,
      count: ruleCount,
      chunks: topSplit,
      sources_agreed: sourcesAgreed,
      total_agreed: sourcesAgreed.length,
      rule_authoritative: true
    };
    if (T !== null && !splitsEqual(T, R)) {
      result.notes = { tex_disagreed_with_rule: true, tex_split: T };
    } else if (T !== null) {
      sourcesAgreed.unshift('TeX');
      result.total_agreed = sourcesAgreed.length;
    }
    return result;
  }

  // Collect ORTHOGRAPHIC split sources (T, R) for boundary-position agreement
  let splitSources = [];
  if (T) splitSources.push({ label: 'TeX', split: T });
  if (R) splitSources.push({ label: 'rule', split: R });

  // SURGICAL Nordic school-convention carve-out (sv; §A.13.57): if TeX and the
  // rule disagree ONLY by a REGISTERED school-divergence (ck-coda pattern, or a
  // reviewer-validated muta/seam word), accept the rule's school split — treat
  // TeX as aligned on R so the source count is preserved (T isn't WRONG, just
  // typographic). The count sources (S/N/W) below still independently verify
  // the syllable count. Every OTHER rule≠TeX disagreement falls through to the
  // strict split_source_disagreement quarantine, so the GREEN-would-admit ~192
  // words (incl. compound-seam rule errors) stay quarantined.
  if (T && R && !splitsEqual(T, R) &&
      isRegisteredSchoolDivergence(T, R, opts.word, opts.locale)) {
    splitSources = [
      { label: 'rule (school-split)', split: R },
      { label: 'TeX (school-divergence-aligned)', split: R }
    ];
  }

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
