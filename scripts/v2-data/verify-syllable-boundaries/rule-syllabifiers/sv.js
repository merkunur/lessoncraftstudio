/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Swedish (sv)
   ---------------------------------------------------------------------
   Swedish SCHOOL-CONVENTION syllabification (klappa stavelser /
   ljudmetoden) per Lgr22 grundskolan svenska årskurs 1-3 (Skolverket
   läsmetodik) — the way a K-1 child sounds a word out, which is exactly
   what this sound-out activity teaches. DELIBERATELY DIFFERENT from the
   Garlén/TeX typographic line-break convention (avstavning): where they
   diverge (ck, long-vowel-open stop+liquid muta-cum-liquida, morpheme
   seam) the SCHOOL split wins and TeX is advisory.

   sv is a GREEN-gate locale (gate.js): this rule R is the AUTHORITATIVE
   split source when its syllable COUNT agrees with vocabulary-phonics
   (S); TeX (T) disagreement is logged as a note, not vetoing. The
   safety floor is intact — rule-vs-S count disagreement still
   quarantines, and the school re-splits are count-preserving so they
   stay approved. The operator's safety invariant is locked: a wrong
   split NEVER reaches an activity; quarantine ALWAYS beats publishing a
   wrong split. (See CLAUDE.md §A.13.57 Nordic carve-out.)

   SV pipeline has 5 sources (more than DE/NL):
     T = TeX hyphenation
     R = this module (new)
     W = Wiktionary IPA syllable count (sparse for SV — ~30%)
     N = NST pronunciation lexicon SAMPA syllable count (~86.5%)
     S = vocabulary-phonics.json count

   N is COUNT-only (NST split is SAMPA-phonetic, not orthographic);
   W is also count-only. Under the GREEN gate this module's R is the
   AUTHORITATIVE orthographic split (T is advisory); the count sources
   (S/N/W) guard it.

   TWO-LAYER ALGORITHM (identical shape to shipped de.js + nl.js):

   (1) COMPOUND-AWARE LAYER. Swedish compounds heavily like German/
       Dutch (Noun+Noun + Noun+Noun+Noun nesting). Longest-first match
       against curated MORPHEME_SUFFIXES = standalone Swedish noun
       elements drawn from the K-3 corpus (träd, vagn, häst, klocka,
       borste, ögon, etc.) + verbal-noun suffix `ning`/`ring` patterns.
       Recursive on PREFIX (not suffix — Swedish agentive -re like
       'mästare' shouldn't be sub-split; phonotactic handles it). Plus a
       surgical SCHOOL_COMPOUND_SEAMS override for lexicalized compounds
       whose seam the suffix list cannot see (handske → hand-ske).

   (2) PHONOTACTIC LAYER per Skolverket K-1 ljudning (sound-out) inventory:
       * sj-ljudet trigraphs (sch / skj / stj) and digraphs (sj) stay
         together as a single onset-or-coda unit.
       * tj-ljudet digraphs (tj / kj) stay together.
       * ng STAYS together as Swedish /ŋ/ phoneme (different from DE/NL
         which split ng between letters; ng is the Swedish phoneme symbol).
       * ck STAYS together as a single /k/ sound-unit and acts as the
         CODA of the preceding syllable (klock-a, sock-er, drick-a,
         fack-la) — tokenized as one 'ck' chunk, handled at the numC===1
         coda case. SCHOOL convention; the OPPOSITE of the Garlén/TeX
         typographic split (kloc-ka).
       * gn separates as g|n (vagn → v,a,g,n).
       * å/ä/ö are SEPARATE LETTERS each as a single-letter vowel
         nucleus (NOT modified a/o).
       * Walk between nuclei:
           numC = 0 → hiatus
           numC = 1 → C to next syllable (open syllable; long vowel
                      implicit), EXCEPT x / ck which are complex codas of
                      the previous syllable (byx-or, klock-a)
           numC = 2 → split between, EXCEPT stop+liquid muta-cum-liquida
                      pairs (bl/br/dr/fl/fr/gl/gr/kl/kr/pl/pr/tr/vr) which
                      stay together as the next onset → OPEN preceding
                      syllable (se-bra, ko-bra, cy-kla). SCHOOL convention.
           numC ≥ 3 → if last 2 form INSEPARABLE_3PLUS (stop+liquid +
                      sp + sch+sonorant + kn), both go to next (as-tro-naut,
                      mus-kler); else only last 1 to next.
       * sp/st/sk NOT in INSEPARABLE_2 (a child claps fis-ka / bors-te /
         wes-pa — s+stop splits between in sound-out).
       * st/sk NOT in INSEPARABLE_3PLUS (tandborste → tand-bors-te; the
         handske seam is the SCHOOL_COMPOUND_SEAMS override, NOT an sk
         onset — that would wrongly merge fis-ka).

   References:
     - Skolverket Lgr22 svenska årskurs 1-3 (läs- och skrivinlärning;
       ljudmetoden / klappa stavelser — the authoritative sound-out split).
     - Swedish reading-method tradition (ljudmetoden / Bornholmsmodellen).
     - Garlén, C. (1988). Svenskans fonologi. Studentlitteratur (cited for
       the CONTRAST: typographic avstavning, now advisory under GREEN).
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y','å','ä','ö']);

/* Swedish vowel digraphs are MINIMAL — au only (for loanwords like
   auto / paus). Swedish writes long vowels as single letters; quality
   distinction is signaled by the following consonant context (open
   syllable rule). Starting minimal; extend if regression sweep shows need. */
const VOWEL_DIGRAPHS = ['au'];

/* Consonant chunks that stay together as a SINGLE orthographic unit.
   Longest-first matching: 3-letter trigraphs (skj/stj/sch) > 2-letter
   digraphs (sj/tj/kj/ch).

   NOTE: ck IS here (SCHOOL CONVENTION) — ck is a single /k/ sound-unit,
   so it tokenizes as ONE chunk and acts as a complex coda of the
   preceding syllable (klock-a, sock-er, drick-a, fack-la) — the OPPOSITE
   of the Garlén/TeX c|k split (kloc-ka). See the numC===1 coda case.
   NOTE: gn is NOT here — Garlén treats g+n as separate.
   NOTE: ng is HANDLED SEPARATELY in the walker — see NG_AS_CODA below.
   Tokenized as n+g (2 separate chunks), but at the walker step a
   2-chunk (n,g) between vowels is moved entirely to the PRECEDING
   syllable (ng is /ŋ/ as syllable coda, not onset of next). Native
   Swedish (finger / sångare / tärning) needs this; loanwords like
   mango / flamingo will mis-split (acceptable as loanword regressions). */
const CONSONANT_CHUNKS_3 = ['skj','stj','sch'];
const CONSONANT_CHUNKS_2 = ['sj','tj','kj','ch','ck'];

/* Inseparable in 2-chunk context (between two nuclei).
   SCHOOL CONVENTION (klappa stavelser / Lgr22 ljudmetoden): a stop +
   liquid (muta cum liquida) is a single spoken onset, so the boundary
   falls BEFORE it and the preceding syllable stays OPEN with a long
   vowel — exactly how a child sounds the word out (se-bra, ka-bra...
   ko-bra, cy-kla, mi-kro-fon, pa-pri-ka, a-pri-kos). This is the
   OPPOSITE of the Garlén/TeX typographic avstavning (seb-ra), which is
   a line-break convention, not a sound-out one. Per Skolverket
   läsmetodik; TeX disagreement is advisory under the GREEN gate. */
const INSEPARABLE_2 = new Set([
  'bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr'
  // sp/st/sk deliberately NOT here: a child claps fis-ka, bors-te,
  // wes-pa — s+stop is split between in sound-out (the s closes the
  // preceding syllable). Only stop+liquid forms the single onset.
  // 'vr' NOT here: v is a FRICATIVE, not a stop — havre claps hav-re
  // and liv-räddare keeps its v as a coda (NOT ha-vre / li-vräddare).
  // fl/fr KEPT (f+liquid are conventional onsets: flod, fru, frukt).
]);

/* 3+ chunk inseparable when those are the LAST two consonants before
   the next vowel. SCHOOL CONVENTION: the same stop+liquid muta-cum-
   liquida onset is preserved at the 3-chunk boundary, so the liquid+
   stop go together to the next syllable and the preceding consonant
   closes the prior one: astronaut → as-tro-naut (NOT ast-ro-naut);
   muskler → mus-kler (s closes, kl onset). This inverts the Garlén/TeX
   3-chunk split (ast-ro-naut). Per Skolverket.

   sk/st still NOT here: handske → hand-ske and tandborste → tand-bors-te
   keep s+stop split (handske's seam is handled surgically in
   SCHOOL_COMPOUND_SEAMS, NOT by making sk an onset — that would wrongly
   merge fis-ka). Keeping sp (rare compound onset) + sch+sonorant for
   sch-trigraph words + kn (knä/knapp word-initial). */
const INSEPARABLE_3PLUS = new Set([
  'bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr',
  'sp',
  'schl','schm','schn','schr','schw',
  'kn'
  // kn KEPT in 3PLUS — nötknäppare needs kn together (nöt-knäp-pa-re).
  // Trade-off: anteckningsbok will regress (an-tec-knings-bok instead of
  // an-teck-nings-bok). Single-word edge case vs 1+ compound; keep kn.
]);

/* SCHOOL_COMPOUND_SEAMS — surgical word→explicit-split overrides for the
   handful of lexicalized compounds whose morpheme seam the phonotactic
   layer cannot see (the second element begins sk-, so the phonotactic
   rule would split s|k as a stem-internal cluster → hands-ke, but the
   child sounds the compound at its seam → hand-ske). Same surgical
   per-word shape as fi.js COMPOUND_VOWEL_SEAMS / no.js WORD_BLACKLIST
   (CLAUDE.md §A.13.52) — keeping `sk` OUT of the phonotactic onset set
   (so fis-ka / bors-te stay correctly split) while still honoring the
   seam for these specific words. Populated empirically from the sv pool
   dry-run + native-reviewer confirmation; transparent compounds only. */
const SCHOOL_COMPOUND_SEAMS = {
  'handske': ['hand', 'ske'],
  // påsk (Easter) + lilja: the seam is påsk|lilja → påsk-lil-ja. This RESTORES
  // the correct split that the 3-chunk muta-cum-liquida change (INSEPARABLE_3PLUS
  // += stop+liquid) would otherwise regress (the 'kl' would grab across the seam
  // → pås-klil-ja). It is NOT a new admission — påsk-lil-ja already agreed with
  // TeX and was approved under the old rule; the override keeps it in the pool.
  'påsklilja': ['påsk', 'lil', 'ja']
  // The OTHER compound-seam words the phonotactic layer under-grabs but the OLD
  // rule never got right either (busschaufför, julstrumpa, blåskrika, höstack,
  // …) stay quarantined behind the strict gate — the documented "rule
  // compound-seam under-grab" backlog (CLAUDE.md §A.13.57). Hardening the seam
  // handling at root is the prerequisite to ever widening sv further.
};

/* SHORT_VOWEL_MUTA_EXCEPTIONS — the muta-cum-liquida "stop+liquid stays as the
   next onset → OPEN preceding syllable" rule only holds when the preceding
   vowel is LONG (se-bra, cy-kla). When that vowel is SHORT, the syllable is
   CLOSED and the stop is its coda (käg-la, NOT kä-gla — the ä is short before
   /gl/). The phonotactic layer can't see vowel length, so these are surgical
   per-word overrides (same shape as SCHOOL_COMPOUND_SEAMS). Native-reviewer
   confirmed (SETTLED): kägla = käg-la. This RESTORES the correct split the
   muta change would otherwise regress (the word agreed with TeX under the old
   rule and was already in the pool). */
const SHORT_VOWEL_MUTA_EXCEPTIONS = {
  'kägla': ['käg', 'la'],
  'bowlingkägla': ['bow', 'ling', 'käg', 'la']
};

/* MORPHEME_SUFFIXES — Swedish compound-suffix elements. Derived from:
   1. Final-syllable frequency scan of STEP 1's 931-approved corpus
   2. Standalone Swedish noun lexicon (Svensk ordbok) verification

   NOT derived from inspecting TeX output. R reaches agreement with T
   by an independent route (lexical morpheme matching).

   Excluded over-match risks: -mat (tomat is loanword, not to+mat),
   -ko (gecko), -ull (kastrull), -ost (brödrost would over-match). */
const MORPHEME_SUFFIXES_RAW = [
  // Compound element nouns from K-3 vocabulary (extracted in Phase 1)
  'borste','flaska','vandring','konditionering','fotografering',
  'glasögon','holk','klot','häst','vagn','säng','ring','lampa',
  'stol','bord','kniv','hus','korg','hatt','sko','kläder',
  'plats','blomma','fågel','björn','park','väg','bok','tavla',
  'glas','pinne','päls','sjö','stad','smör','peppar','ägg',
  'potatis','lök','morot','gurka','citron',
  'träd','boll','fisk','bil','barn','dag','tid',
  // Additional compound elements from regression sweep (iter 1)
  'sten','stuga','svin','stav','stift','stövel','stövlar',
  'snurra','slag','slända','ros','kort','mussla','skrämma',
  'maskin','rost','järn','apparat','skop',
  // Compound elements from iter 2 (post stop+liquid removal)
  'plan','plåt','bräda','gran','gris','brev','skåp','skydd',
  'kontroll','slott','klippare','brytare','spelare','kaka',
  'krona','klocka','truck','fluga','skor','skap','droppe','dräkt',
  'skyffel','gräs','glob','glass','klad','krubba','press',
  'ögon','gård',
  // Compound elements from iter 3 (suffix-recursion + remaining cases)
  'skin','gryn','kräm','blandare','blom','plåt',
  'djur','sköterska','arbetare','grönsak','glas',
  // Compound elements from iter 4
  'kläde','gång','eld','upp','gröna',
  // Compound elements from iter 5 (tail)
  'byxor','gångare','stall','troll','kvarn',
  // Verbal-noun derivational suffixes (productive in K-3 vocabulary)
  'ning','tion'
];

const MORPHEME_SUFFIXES = MORPHEME_SUFFIXES_RAW
  .slice()
  .sort((a, b) => b.length - a.length);

/* SUFFIX_FALSE_POSITIVES — words ending in a matched suffix but where
   the suffix should NOT split (the suffix is part of the stem, not a
   compound element). Grown empirically during regression sweep. */
const SUFFIX_FALSE_POSITIVES = new Set([]);

function isVowel(ch) { return ch ? VOWELS.has(ch.toLowerCase()) : false; }

/* Tokenize the lowercased word. Longest-first matching:
   4 → 3 → 2 → 1 char vowel; 3 → 2 → 1 char consonant. */
function tokenize(word) {
  const w = word.toLowerCase();
  const n = w.length;
  const tokens = [];
  let i = 0;
  while (i < n) {
    let m;
    if (i + 1 < n && VOWEL_DIGRAPHS.indexOf(w.substr(i, 2)) >= 0) {
      m = { type: 'vowel', str: w.substr(i, 2), len: 2 };
    } else if (VOWELS.has(w[i])) {
      m = { type: 'vowel', str: w[i], len: 1 };
    } else if (i + 2 < n && CONSONANT_CHUNKS_3.indexOf(w.substr(i, 3)) >= 0) {
      m = { type: 'consonant', str: w.substr(i, 3), len: 3 };
    } else if (i + 1 < n && CONSONANT_CHUNKS_2.indexOf(w.substr(i, 2)) >= 0) {
      m = { type: 'consonant', str: w.substr(i, 2), len: 2 };
    } else {
      m = { type: 'consonant', str: w[i], len: 1 };
    }
    tokens.push({ type: m.type, str: m.str, start: i });
    i += m.len;
  }
  return tokens;
}

function syllabifyPhonotactic(word) {
  if (!word || typeof word !== 'string') return null;
  const n = word.length;
  if (n <= 1) return [word];

  const tokens = tokenize(word);
  const nucleusIdx = [];
  for (let k = 0; k < tokens.length; k++) {
    if (tokens[k].type === 'vowel') nucleusIdx.push(k);
  }
  if (nucleusIdx.length === 0) return [word];

  const boundaries = [0];
  for (let p = 0; p + 1 < nucleusIdx.length; p++) {
    const i = nucleusIdx[p];
    const j = nucleusIdx[p + 1];
    const numC = j - i - 1;

    let boundaryTok;
    if (numC === 0) {
      boundaryTok = j;
    } else if (numC === 1) {
      // Special-case x + ck: a single chunk that stays as the complex coda of
      // the PREVIOUS syllable rather than the onset of the next. x is /ks/
      // (byxor → byx-or, mixer → mix-er, strumpbyxor → strump-byx-or). ck is a
      // single /k/ sound-unit per SCHOOL CONVENTION (klock-a, sock-er, drick-a)
      // — tokenized as one 'ck' chunk (CONSONANT_CHUNKS_2), so a lone ck between
      // vowels is numC===1 and lands here. (Garlén/TeX would split kloc-ka.)
      if (tokens[i + 1].str === 'x' || tokens[i + 1].str === 'ck') {
        boundaryTok = j;
      } else {
        boundaryTok = i + 1;
      }
    } else if (numC === 2) {
      const pair = tokens[i + 1].str + tokens[i + 2].str;
      // Special-case ng-2-chunk: both consonants go to PRECEDING syllable
      // (Swedish /ŋ/ phoneme as coda; native fing-er / sång-a-re /
      // tärn-ing / äng-el). Note loanwords mango/flamingo regress here
      // (acceptable loanword class).
      if (pair === 'ng') {
        boundaryTok = j;  // boundary at next nucleus = both Cs stay with prev
      } else if (INSEPARABLE_2.has(pair)) boundaryTok = i + 1;
      else boundaryTok = i + 2;
    } else {
      const lastTwo = tokens[j - 2].str + tokens[j - 1].str;
      const beforeLast = tokens[j - 3].str;
      // A stop+liquid muta-cum-liquida is the next onset (both go forward →
      // as-tro-naut, mus-kler) ONLY when the consonant before it is a distinct
      // coda. Two guards keep the preceding sound as a coda instead:
      //   * geminate+liquid (äpp-le, ugg-la, toff-lor, våff-la): the "stop" is
      //     the 2nd half of a doubled consonant (beforeLast === lastTwo[0]).
      //   * ng+liquid (kring-la, häng-lås): /ŋ/ is a coda (n before g+liquid).
      const isGeminateOnset = beforeLast === lastTwo[0];
      const isNgCoda = beforeLast === 'n' && lastTwo[0] === 'g';
      if (INSEPARABLE_3PLUS.has(lastTwo) && !isGeminateOnset && !isNgCoda) {
        boundaryTok = j - 2;
      } else {
        boundaryTok = j - 1;
      }
    }
    boundaries.push(tokens[boundaryTok].start);
  }

  const out = [];
  for (let k = 0; k < boundaries.length; k++) {
    const start = boundaries[k];
    const end = (k + 1 < boundaries.length) ? boundaries[k + 1] : n;
    if (end > start) out.push(word.substring(start, end));
  }
  return out.length > 0 ? out : null;
}

function findCompoundSuffix(word) {
  const w = word.toLowerCase();
  for (const suffix of MORPHEME_SUFFIXES) {
    if (suffix.length >= w.length) continue;
    const prefixLen = w.length - suffix.length;
    if (prefixLen < 2) continue;
    if (!w.endsWith(suffix)) continue;
    const prefix = w.substring(0, prefixLen);
    let hasVowel = false;
    for (const ch of prefix) {
      if (VOWELS.has(ch)) { hasVowel = true; break; }
    }
    if (!hasVowel) continue;
    const sufFirstChar = suffix[0];
    if (VOWELS.has(sufFirstChar)) {
      const prefLastChar = prefix[prefix.length - 1];
      if (VOWELS.has(prefLastChar)) continue;
    }
    if (SUFFIX_FALSE_POSITIVES.has(w)) continue;
    return suffix.length;
  }
  return 0;
}

/* Compound-aware split: recursively decompose on BOTH prefix and
   suffix. Different from nl.js (which is prefix-only) — Swedish has
   multi-level compound elements like `glasögon` (glas+ögon) appearing
   as the suffix of larger compounds like `skyddsglasögon`. Recursing
   on the suffix lets the inner compound split correctly. Safe for
   Swedish because we deliberately excluded productive agentive `-are`
   from the suffix list (it gets phonotactic handling for mästare /
   snickare via the open-syllable rule). */
function syllabifyCompound(word) {
  const sufLen = findCompoundSuffix(word);
  if (sufLen === 0) {
    return syllabifyPhonotactic(word);
  }
  const prefixPart = word.substring(0, word.length - sufLen);
  const suffixPart = word.substring(word.length - sufLen);

  const prefixSyllables = syllabifyCompound(prefixPart);
  const suffixSyllables = syllabifyCompound(suffixPart);

  if (!prefixSyllables) return suffixSyllables;
  if (!suffixSyllables) return prefixSyllables;
  return [...prefixSyllables, ...suffixSyllables];
}

function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  if (word.length <= 1) return [word];
  // Surgical per-word overrides (CLAUDE.md §A.13.52 shape): lexicalized
  // compound seams the phonotactic layer can't see (SCHOOL_COMPOUND_SEAMS) +
  // short-vowel muta exceptions where the open-syllable rule must NOT apply
  // (SHORT_VOWEL_MUTA_EXCEPTIONS). Rebuild from the ORIGINAL word by part-length
  // so casing is preserved and the pieces always re-concatenate; fall through
  // on any length mismatch.
  const override = SCHOOL_COMPOUND_SEAMS[word.toLowerCase()] ||
                   SHORT_VOWEL_MUTA_EXCEPTIONS[word.toLowerCase()];
  if (override && override.join('').length === word.length) {
    const out = [];
    let pos = 0;
    for (const part of override) { out.push(word.substr(pos, part.length)); pos += part.length; }
    return out;
  }
  return syllabifyCompound(word);
}

module.exports = {
  syllabify,
  isVowel,
  VOWELS,
  VOWEL_DIGRAPHS,
  CONSONANT_CHUNKS_3,
  CONSONANT_CHUNKS_2,
  INSEPARABLE_2,
  INSEPARABLE_3PLUS,
  MORPHEME_SUFFIXES,
  SUFFIX_FALSE_POSITIVES,
  SCHOOL_COMPOUND_SEAMS,
  SHORT_VOWEL_MUTA_EXCEPTIONS,
  syllabifyPhonotactic,
  syllabifyCompound,
  findCompoundSuffix
};
