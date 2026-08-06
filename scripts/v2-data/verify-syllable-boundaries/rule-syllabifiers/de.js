/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — German (de)
   ---------------------------------------------------------------------
   German orthographic syllabification per Duden 1996 reform + Augst &
   Dehn (2009). DE is the third independent split source R for the strict
   3-source gate (NOT a GREEN locale — no rule-authoritative override).
   R must AGREE with T (TeX) on already-approved splits; otherwise the
   gate's split_source_disagreement check quarantines the word. The
   operator's safety invariant is locked: a wrong split NEVER reaches an
   activity; quarantine ALWAYS beats publishing a wrong split.

   TWO-LAYER ALGORITHM:

   (1) COMPOUND-AWARE LAYER (this layer's purpose: match TeX's
       morpheme-aware splits on compound nouns, which Liang patterns
       handle statistically). The chunk table at chunk-tables/de-chunks.json
       carries SOUND CHUNKS (sch/ch/ck/pf/qu/tz/etc.) only — it does NOT
       encode compound-morpheme seams. So this module ships its own
       curated MORPHEME_SUFFIXES list: standalone German nouns + bound
       morphemes that appear at the end of compound nouns (Stuhl, Stein,
       Eimer, Eck, Auf, Uhr, Amt, the diminutive -chen / -lein, etc.).
       The list is independently derived from K-3 German vocabulary — NOT
       from TeX patterns. R reaches agreement with T by a DIFFERENT route
       (lexical morpheme matching vs corpus-statistical Liang patterns),
       preserving methodological independence.

       For each word, longest-first try every suffix-morpheme against
       word.endsWith(). If matched (with the remaining prefix ≥ 2 chars),
       recursively split the prefix part too (handles 3+ element
       compounds like Affenbrotbaum = Affen + Brot + Baum). Then
       syllabify each part PHONOTACTICALLY and concatenate.

   (2) PHONOTACTIC LAYER (within each morpheme element OR for words
       that don't match any compound pattern). Tokenize into vowel
       digraphs + multi-letter consonant chunks (sch / ch / ck / ph /
       qu / th) + single letters. Walk between nuclei:
         numC = 0 → hiatus
         numC = 1 → C to next syllable
         numC = 2 → split between, EXCEPT stop+liquid pairs (bl/br/pl/
                    pr/dr/tr/gl/gr/kl/kr/fl/fr/vr/cl/cr) stay together
         numC ≥ 3 → if last 2 form an INSEPARABLE_3PLUS cluster
                    (stop+liquid + sch+sonorant + sp + sk + pfl/pfr/pf
                    + kn), both go to next; else only last 1 to next.
       Note: sp/st/sk are NOT inseparable in 2-chunk context (Duden
       splits Wes-pe / Es-pe / Mas-ke etc. between stems). st is NOT in
       the 3+ cluster set either (Bürs-te / Hams-ter / Krankenschwes-ter
       all need stem-internal st to split off the last consonant only).
       dl is NOT in 2-chunk inseparable (Ad-ler splits between).

   References:
     - Duden, Rechtschreibung der deutschen Sprache (28. Aufl., 2020),
       §107-§111 (silbentrennung).
     - Augst, G. & Dehn, M. (2009). Rechtschreibung und
       Rechtschreibunterricht. Klett.
     - KMK Bildungsstandards Deutsch Grundschule (2004/2022).
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y','ä','ö','ü']);

/* 2-letter vowel groups (single nucleus). Longest-first matching. */
const VOWEL_DIGRAPHS = ['ei','ai','au','eu','äu','ie','ee','aa','oo'];

/* Consonant chunks that stay together as a SINGLE orthographic unit. */
const CONSONANT_CHUNKS_3 = ['sch'];
const CONSONANT_CHUNKS_2 = ['ch','ck','ph','qu','th'];

/* Inseparable in 2-chunk context (between two nuclei). Stop+liquid
   (Kobra → Ko-bra, Paprika → Pa-pri-ka) + schr (Heuschrecke →
   Heu-schrecke; other schX restricted to 3+ context so Waschmaschine
   → Wasch-ma-schi-ne splits at the morpheme seam). dl/sp/st/sk are
   NOT in here so Ad-ler / Wes-pe / Müt-ze / Mas-ke / As-ter all
   split between per Duden. */
const INSEPARABLE_2 = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr',
  'schr'
]);

/* 3+ chunk inseparable when those are the LAST two consonants before
   the next vowel. Includes sp / sk (compound-onset preserved at
   morpheme boundaries like Schorn-stein, but Compound-aware layer
   handles most of these directly — this is the fallback). st is NOT
   here because stem-internal st in 3-chunk runs (Bürste, Hamster)
   should split off only the last consonant. */
const INSEPARABLE_3PLUS = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr',
  'sp','sk',
  'schl','schm','schn','schr','schw',
  'pfl','pfr','pf',
  'kn'
]);

/* MORPHEME_SUFFIXES — German compound-suffix elements derived from
   K-3 vocabulary. Each entry is a standalone noun / bound morpheme
   that appears at the end of compound nouns. Sorted longest-first at
   module load so the most-specific match wins. INDEPENDENT of TeX
   patterns — these come from Duden lemma lists + observed K-3
   compound-noun morphology, not from corpus-derived hyphenation. */
const MORPHEME_SUFFIXES_RAW = [
  // Diminutive suffixes (very common; -chen alone fixes Häs-chen,
  // Hähn-chen, Glöck-chen, etc.)
  'chen', 'lein',

  // Vowel-initial morphemes (critical: a vowel-initial morpheme
  // creates a hiatus that the pure phonotactic rule can't handle
  // correctly — it would attach the preceding consonant)
  'apfel', 'anzug', 'aufgang', 'auf', 'amt', 'eimer', 'eck', 'uhr', 'um',

  // s-prefix consonant clusters (Sp-, St-, Sch-, Sk- morpheme onsets
  // at compound boundaries — most common compound element class in K-3)
  'spieler', 'sprecher', 'stellung', 'stuhl', 'stein', 'stange',
  'stapler', 'stab', 'stern', 'stift', 'skop',
  'schloss', 'schlag', 'schule', 'schwein',

  // Agentive -ler suffix (Adler, Künstler, Schäler — and inside
  // compounds like Gabel-stap-ler). 3 chars; matches longest-first
  // so -spieler (7) / -sprecher (8) win when they apply.
  'ler',

  // Common compound-element nouns (longest-first within each prefix
  // letter group)
  'pferdchen', 'pferd', 'pasta',
  'hähnchen', 'hahn', 'haus', 'hut',
  'kette', 'kasten', 'kuchen', 'käfer',
  'baum', 'blume', 'beere', 'bürste', 'block',
  'wagen', 'wand', 'weste',
  'rose', 'riegel', 'ring', 'rad',
  'lauch', 'lader', 'lampe',
  'ball', 'bett',
  'flocke', 'glocke', 'glöckchen',
  'tisch', 'topf'
];

/* Sort longest-first so the most-specific suffix matches before any
   shorter substring of it (e.g., 'hähnchen' before 'hahn'). */
const MORPHEME_SUFFIXES = MORPHEME_SUFFIXES_RAW
  .slice()
  .sort((a, b) => b.length - a.length);

/* -chen false positives: words ending in "-schen" that are -sche+n
   plurals (NOT diminutives), where the `sch` is a single sound /ʃ/
   and the canonical Duden split is `-sche-n` not `-s-chen`.
   Tasche-n, Flasche-n, etc. Without this exclusion, the -chen
   diminutive rule wrongly grabs the final -chen and produces e.g.
   Tas-chen instead of Ta-schen. Inside compounds like Taschenlampe
   this still applies during the recursive prefix split. */
const CHEN_FALSE_POSITIVES = new Set([
  'taschen','flaschen','aschen','sachen','maschen','wäschen','fischen'
]);

function isVowel(ch) { return ch ? VOWELS.has(ch.toLowerCase()) : false; }

/* Tokenize the lowercased word into typed chunks with original-string
   offsets preserved (so syllable materialization keeps original casing). */
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

/* Pure phonotactic syllabifier — runs on a single morpheme element or
   on a non-compound word. Returns syllable strings with original case. */
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
      boundaryTok = i + 1;
    } else if (numC === 2) {
      const pair = tokens[i + 1].str + tokens[i + 2].str;
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

/* Find the best compound-suffix match for a word. Returns the suffix
   length (chars) or 0 if no match. Constraints:
   - Suffix must be < word.length (not the whole word).
   - Prefix must be ≥ 2 chars.
   - Prefix must contain at least one vowel (a stem with no vowel is
     not a valid morpheme — rules out Schlauch → Sch + lauch).
   - For vowel-initial suffixes, prefix must end in a consonant
     (compound morphology: vowel-initial morphemes attach to
     consonant-final stems — rules out Baum → Ba + um, Speck → Sp +
     eck, while still allowing Postamt → Post + amt, Mülleimer → Müll
     + eimer, Siebeneck → Sieben + eck, Briefumschlag → Brief + um). */
function findCompoundSuffix(word) {
  const w = word.toLowerCase();
  // -chen false-positive guard: -sche+n plurals look like -chen
  // diminutives orthographically but aren't.
  if (CHEN_FALSE_POSITIVES.has(w)) {
    // Allow other suffixes to match but skip -chen specifically below.
  }
  for (const suffix of MORPHEME_SUFFIXES) {
    if (suffix.length >= w.length) continue;
    const prefixLen = w.length - suffix.length;
    if (prefixLen < 2) continue;
    if (!w.endsWith(suffix)) continue;
    // Skip -chen for known -sche+n plurals
    if (suffix === 'chen' && CHEN_FALSE_POSITIVES.has(w)) continue;
    const prefix = w.substring(0, prefixLen);
    // Prefix must contain at least one vowel
    let hasVowel = false;
    for (const ch of prefix) {
      if (VOWELS.has(ch)) { hasVowel = true; break; }
    }
    if (!hasVowel) continue;
    // Vowel-initial suffix requires consonant-final prefix
    const sufFirstChar = suffix[0];
    if (VOWELS.has(sufFirstChar)) {
      const prefLastChar = prefix[prefix.length - 1];
      if (VOWELS.has(prefLastChar)) continue;
    }
    return suffix.length;
  }
  return 0;
}

/* Compound-aware split: recursively decompose word into morpheme
   elements, then syllabify each phonotactically and concatenate.
   Recurses on BOTH prefix AND suffix — handles multi-level compounds
   like Affenbrotbaum = Affen+Brot+Baum AND sub-decomposable elements
   like stapler = stap+ler (agentive). */
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

/**
 * Syllabify a German word per Duden 1996 orthographic conventions.
 * Returns an array of syllable strings preserving original casing.
 * Returns null for empty/invalid input.
 */
function syllabify(word) {
  if (!word || typeof word !== 'string') return null;
  if (word.length <= 1) return [word];
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
  // Exposed for testing / inspection
  syllabifyPhonotactic,
  syllabifyCompound,
  findCompoundSuffix
};
