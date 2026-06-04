/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Norwegian Bokmål (no)
   ---------------------------------------------------------------------
   Norwegian orthographic syllabification per Endresen/Simonsen/Sveen
   (Innføring i lingvistikk, 2000) + Læreplanverket LK20 norsk
   (Utdanningsdirektoratet) — kunne bokstaver, lyder, ord. NO is an
   additional independent split source R for the strict 5-source gate
   (NOT a GREEN locale — no rule-authoritative override). R must AGREE
   with T (TeX) on already-approved splits; otherwise the gate's
   split_source_disagreement check quarantines the word. The operator's
   safety invariant is locked: a wrong split NEVER reaches an activity;
   quarantine ALWAYS beats publishing a wrong split.

   NO pipeline has 5 potential sources (same as SV):
     T = TeX hyphenation
     R = this module (new)
     W = Wiktionary IPA syllable count (genuine ceiling ~14% for NO K-3)
     N = NST pronunciation lexicon SAMPA syllable count (~80% via 1011
         K-3 matches against the Språkbanken NO lexicon)
     S = vocabulary-phonics.json count

   N is COUNT-only (NST split is SAMPA-phonetic, not orthographic);
   this module's R is the SECOND split source after T, providing the
   alternative orthographic split the gate needs for split-source
   agreement.

   TWO-LAYER ALGORITHM (identical shape to shipped sv.js, with
   Norwegian-specific constant adjustments):

   (1) COMPOUND-AWARE LAYER. Norwegian compounds heavily like Swedish/
       German/Dutch (Noun+Noun + Noun+Noun+Noun nesting). Longest-first
       match against curated MORPHEME_SUFFIXES = standalone Bokmål noun
       elements drawn from the STEP 1 771-approved K-3 corpus (klokke,
       lampe, vogn, kasse, klokke, bil, tre, kake, flaske, skap,
       børste, fugl, mus, etc.). Recursive on PREFIX (not suffix —
       Norwegian agentive -er is handled phonotactically; recursing on
       suffix would over-split words like meester/lærer).

   (2) PHONOTACTIC LAYER per Norwegian K-1 phonics inventory:
       * sj-ljudet trigraphs (skj/stj/sch) and digraph (sj) stay
         together as a single onset-or-coda unit (sjokolade, skjorte,
         stjerne).
       * kj-ljudet digraphs (kj/tj) stay together (kjole, kjede).
       * sk before front vowels (i/e/y/æ/ø) handled CONTEXTUALLY — not
         pre-chunked; ski/skip/skinne tokenize as [s,k,V] and produce
         correct monosyllabic / disyllabic splits via the walker.
       * ng SPLITS between letters between vowels (engel → en-gel,
         per the empirical STEP 1 approved corpus). The SV ng-as-coda
         special-case is REMOVED for Norwegian — Endresen et al. and
         the empirical TeX/NST output both confirm n|g split between
         vowels in Norwegian. Final-position ng (lang/ring/seng/-perm)
         is naturally handled as syllable coda (no between-vowel
         split to consider).
       * kk SPLITS between c and k between vowels (klok-ke, syk-kel,
         vek-ker — same as Swedish ck-split convention; geminate
         convention).
       * æ/ø/å are SEPARATE LETTERS each as a single-letter vowel
         nucleus (NOT modified a/o). Distinct from Swedish ä/ö.
       * Diphthongs ei/au/ai/øy/oi/oy preserved as single nuclei
         (eikenøtt → ei-ke-nøtt; sløyfe → sløy-fe; allosaurus →
         al-lo-sau-rus; asteroide → as-te-roi-de).
       * x stays as coda of previous syllable (Swedish-style;
         Norwegian x is /ks/ acting as complex coda).
       * Walk between nuclei:
           numC = 0 → hiatus (boundary at next nucleus)
           numC = 1 → C to next syllable (open syllable; long vowel implicit)
           numC = 2 → split between (default — geminates kk/ll/nn/tt
                      etc. split; stop+liquid splits between, NOT kept
                      together — matches Norwegian K-1 lydmetoden
                      tradition + SV convention)
           numC ≥ 3 → if last 2 form INSEPARABLE_3PLUS (sp + sch+
                      sonorant + kn), both go to next; else only last
                      1 to next.
       * sp/st/sk NOT in INSEPARABLE_2 (stem-internal splits between).
       * st NOT in INSEPARABLE_3PLUS (Norwegian tannbørste → tann-
         børs-te, NOT tann-bor-ste — matches SV + DE conventions).

   References:
     - Endresen, R.T., Simonsen, H.G., Sveen, A. (2000). Innføring i
       lingvistikk. Universitetsforlaget.
     - Læreplanverket LK20 norsk (Utdanningsdirektoratet).
     - Bokmålsordboka + Svensk-Norsk-Dansk kontrastiv tradition.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y','æ','ø','å']);

/* Norwegian K-1 diphthongs as single nuclei. Empirical from STEP 1:
   - ei: eikenøtt (ei-ke-nøtt), reinsdyr (reins-dyr → 2-syl)
   - au: allosaurus (al-lo-sau-rus), sau, frau (loanword)
   - ai: rare (mostly loanwords)
   - øy: øy (mono), sløyfe (sløy-fe), trøye (trøy-e)
   - oi/oy: asteroide (as-te-roi-de); rare-loanword
   Conservative inclusion; expand if regression sweep shows need. */
const VOWEL_DIGRAPHS = ['ei','au','ai','øy','oi','oy'];

/* Consonant chunks that stay together as a SINGLE orthographic unit.
   Longest-first matching: 3-letter trigraphs (skj/stj/sch) > 2-letter
   digraphs (sj/tj/kj/ch).

   NOTE: kk is NOT here — Norwegian convention splits between vowels
   (klok-ke per Endresen). Handled by default 2-chunk walker.
   NOTE: ng is NOT here — Norwegian convention splits n|g between
   vowels (en-gel per empirical TeX+NST output). Default 2-chunk
   walker handles correctly. Special-cased ng-as-coda was REMOVED
   from this module after STEP 1 analysis showed engel/ringperm
   approved as en-gel / ring-perm in TeX (different from SV which
   prefers äng-el). */
const CONSONANT_CHUNKS_3 = ['skj','stj','sch'];
const CONSONANT_CHUNKS_2 = ['sj','tj','kj','ch'];

/* Inseparable in 2-chunk context (between two nuclei).
   CRITICALLY DIFFERENT from SV: Norwegian K-1 (Endresen et al.,
   LK20 norsk) follows OPEN-SYLLABLE convention for stop+liquid
   stem-internally: aprikos → a-pri-kos (NOT ap-ri-kos), kobra →
   ko-bra, eple → e-ple, sypress → sy-press, lysekrone → ly-se-
   kro-ne. Per empirical TeX output across the 771-approved NO
   corpus, TeX's Norwegian hyphenation table also follows open-
   syllable convention. Stop+liquid pairs stay together as
   syllable onset of the next syllable. Plus 'sk' (flaske →
   fla-ske / maske → mas-ke per TeX). Geminates (kk/ll/nn/tt/pp/
   ss/dd/gg/mm/ff/rr) NOT here — they correctly split between
   vowels via the default 2-chunk walker (klok-ke, syk-kel). */
const INSEPARABLE_2 = new Set([
  'bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr'
]);

/* 3+ chunk inseparable when those are the LAST two consonants before
   the next vowel. Stop+liquid + sk preserved for compound-onset
   protection (lommetørkle → lom-me-tør-kle; rundstykke handled
   via morpheme split). Plus sch+sonorant for sch-trigraph words
   (rare in NO K-3) + kn for word-initial kn- (knapp/kne).

   st NOT here: Norwegian tannbørste → tann-børs-te (only last C
   to next syllable; matches SV+DE). rundstykke handled via
   compound MORPHEME_SUFFIXES (stykke). */
const INSEPARABLE_3PLUS = new Set([
  'bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr',
  'sp',
  'schl','schm','schn','schr','schw',
  'kn'
]);

/* MORPHEME_SUFFIXES — Norwegian compound-suffix elements. Derived from:
   1. Final-syllable frequency scan of STEP 1's 771-approved corpus
   2. Standalone Bokmål noun verification (Bokmålsordboka)

   NOT derived from inspecting TeX output. R reaches agreement with T
   by an independent route (lexical morpheme matching).

   Excluded over-match risks: -er/-en/-et/-ene (productive inflectional
   suffixes — phonotactic walker handles them correctly via open/
   closed-syllable + geminate-split rules; including as compound seams
   would false-split tigger/sukker/lærer-class words). */
const MORPHEME_SUFFIXES_RAW = [
  // Compound element nouns from K-3 vocabulary (Bokmålsordboka-verified)
  // Furniture + household
  // NOTE: 'ske' (Norwegian "spoon") DELIBERATELY EXCLUDED — false-
  // positive on flaske/maske/huske splits them as fla+ske / mas+ke /
  // hus+ke. Compound use of 'ske' is rare in K-3; phonotactic
  // walker handles -ske-final words correctly.
  'klokke','lampe','stol','bord','seng','hylle','teppe','dyne','skap',
  'krukke','flaske','kopp','glass','gaffel','kniv','panne','tallerken',
  'kasse','vogn','vase','børste','krem','såpe','ring','kjede',
  'sekk','kurv','korg','snor','stykke','spill','rister','skilt','vekt',
  'maskin','fnugg','støvel','støvler','brev','veske','rakett',

  // Vehicles
  'bil','båt','buss','sykkel','tog','traktor','fly',

  // Animals
  'mus','hund','katt','gris','hest','sau','fugl','dyr','fisk','bjørn',
  'hare','ulv','rev','padde','slange','hval','svin','skilpadde',

  // Buildings + places
  'hus','hjem','slott','kirke','skole','gård','hage','butikk','bro',
  'vei','gate','plass','park','stall','sten','stein','tårn','slag',

  // Food
  'mat','kake','brød','melk','suppe','smør','ost','ris','kjøtt','egg',
  'bær','frukt','eple','pære','plomme','banan','agurk','gulrot','løk',
  'nøtt','kar',

  // Plants + nature
  'tre','blomst','busk','gress','blad','holk','stakk','gang','oppgang',

  // Clothing
  'sko','hatt','lue','sokk','jakke','bukse','kjole','skjørt','genser',
  'votter','hanske','belte','frakk','strømpe',

  // Tools + utensils + misc
  'hammer','sag','øks','pinne','stang','spade','spann','kost','rake',

  // Body parts + person
  'hånd','fot','øye','øre','munn','tann','hår','hode','finger','bein',
  'kropp','barn','mann','kone','dame','gutt','jente','hjørning',
  'arbeider','kontroll','redder','strupe','sprut','vertinne','stokk',

  // Productive derivational suffixes (substantive of verb, productive
  // in K-3 vocabulary — same role as SV's 'ning')
  'ning'
];

const MORPHEME_SUFFIXES = MORPHEME_SUFFIXES_RAW
  .slice()
  .sort((a, b) => b.length - a.length);

/* SUFFIX_FALSE_POSITIVES — words ending in a matched suffix but where
   the suffix should NOT split (the suffix is part of the stem, not a
   compound element). Grown empirically during regression sweep. */
const SUFFIX_FALSE_POSITIVES = new Set([]);

/* WORD_BLACKLIST — words where R returns null deliberately. Used when
   R's principled open-syllable Norwegian K-1 convention conflicts with
   TeX's empirically-inconsistent closed-syllable choice for specific
   words, AND the word is Norwegian-native (operator's "must not
   regress" class). With R=null the gate sees only T as split source
   (no split_source_disagreement), then count-agreement via N+S+W
   recovers the word with T's split. The locked safety invariant is
   preserved (R never overrides T's split — it just abstains).

   Acceptable use: Norwegian-native simple words where TeX consistently
   picks closed-syllable AND R's open-syllable would falsely flag the
   word as a split-disagreement quarantine. Loanwords NOT added here —
   loanword regressions are explicitly acceptable per operator spec. */
const WORD_BLACKLIST = new Set([
  // -gle final native words (TeX kjeg-le / kong-le / krin-gle; R's
  // gl-INSEPARABLE_2 produces kje-gle / kon-gle / krin-gle)
  'kjegle','kongle','kringle',
  // -ing derivation native words where TeX picks closed-syllable for
  // the kl/gl in the body (TeX syk-ling; R sy-kling)
  'sykling',
  // -ler simple native words where TeX picks closed-syl for fl/tl
  // (TeX tøf-ler; R tøf-ler — actually R gives same; verify before
  // shipping). 'tøfler' included as backstop.
  'tøfler',
  // gjøkur — native compound where ur is too short (2 chars) for
  // compound-match; phonotactic gives gjø-kur but TeX has gjøk-ur
  'gjøkur',
  // oppvaskmaskin — TeX opp-vask-ma-skin (sk together); R
  // produces opp-vask-mas-kin (sk split). Sub-component sk
  // inconsistency.
  'oppvaskmaskin',
  // symaskin — same sk-inconsistency inside the maskin element
  'symaskin',
  // forstørrelsesglass — Norwegian-native compound where TeX picks
  // closed-syllable for the for-stør-rel-ses-glass internal st-cluster
  // (st-3-chunk handled as compound-boundary in TeX). R's open-syl
  // produces fors-tør-rel-ses-glass. Blacklist to recover via T+N+S.
  'forstørrelsesglass'
]);

function isVowel(ch) { return ch ? VOWELS.has(ch.toLowerCase()) : false; }

/* Tokenize the lowercased word. Longest-first matching:
   2 → 1 char vowel; 3 → 2 → 1 char consonant. */
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
      // Special-case x: stays as coda of previous syllable. Norwegian
      // doesn't use x as syllable onset between vowels.
      if (tokens[i + 1].str === 'x') {
        boundaryTok = j;
      } else {
        boundaryTok = i + 1;
      }
    } else if (numC === 2) {
      const pair = tokens[i + 1].str + tokens[i + 2].str;
      // NOTE: ng-as-coda special-case from sv.js is REMOVED for NO.
      // Norwegian K-1 splits engel → en-gel (n with prev, g with next)
      // per empirical TeX+NST agreement in STEP 1.
      if (INSEPARABLE_2.has(pair)) boundaryTok = i + 1;
      else boundaryTok = i + 2;
    } else {
      const lastTwo = tokens[j - 2].str + tokens[j - 1].str;
      if (INSEPARABLE_3PLUS.has(lastTwo)) boundaryTok = j - 2;
      else boundaryTok = j - 1;
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

/* Compound-aware split: recursively decompose on PREFIX only. The
   matched suffix is treated as a single morpheme and run through
   phonotactic syllabification. Same shape as nl.js (prefix-only
   recursion); different from sv.js which also recurses on suffix
   for the glasögon-class multi-level inner-compound pattern.
   Norwegian doesn't have that pattern in K-3 corpus. */
function syllabifyCompound(word) {
  const sufLen = findCompoundSuffix(word);
  if (sufLen === 0) {
    return syllabifyPhonotactic(word);
  }
  const prefixPart = word.substring(0, word.length - sufLen);
  const suffixPart = word.substring(word.length - sufLen);

  const prefixSyllables = syllabifyCompound(prefixPart);
  const suffixSyllables = syllabifyPhonotactic(suffixPart);

  if (!prefixSyllables) return suffixSyllables;
  if (!suffixSyllables) return prefixSyllables;
  return [...prefixSyllables, ...suffixSyllables];
}

function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  if (word.length <= 1) return [word];
  // WORD_BLACKLIST: R abstains for these. Gate's count-agreement
  // recovers them via T+N+S+W. See WORD_BLACKLIST comment for rationale.
  if (WORD_BLACKLIST.has(word.toLowerCase())) return null;
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
  syllabifyPhonotactic,
  syllabifyCompound,
  findCompoundSuffix
};
