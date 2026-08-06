/* =====================================================================
   RULE-BASED PHONOTACTIC SYLLABIFIER — Dutch (nl)
   ---------------------------------------------------------------------
   Dutch orthographic syllabification per Veilig Leren Lezen (VLL kern
   methodology, Mommers & Caesar, Zwijsen) + the VLL open/closed-syllable
   rule (kaas-kat distinction, ma-ken vs kat-ten). NL is the third
   independent split source R for the strict 3-source gate (NOT a GREEN
   locale — no rule-authoritative override). R must AGREE with T (TeX)
   on already-approved splits; otherwise the gate's
   split_source_disagreement check quarantines the word. The operator's
   safety invariant is locked: a wrong split NEVER reaches an activity;
   quarantine ALWAYS beats publishing a wrong split.

   TWO-LAYER ALGORITHM (identical shape to the shipped de.js):

   (1) COMPOUND-AWARE LAYER (matches TeX's morpheme-aware splits on
       Dutch compound nouns and -je/-tje/-pje/-kje/-etje diminutives).
       The chunk table at chunk-tables/nl-chunks.json carries SOUND
       CHUNKS (sch/ch/ng/nk/ij + the long-vowel doublings + diphthongs)
       only — it does NOT encode compound-morpheme seams. So this module
       ships its own curated MORPHEME_SUFFIXES list: standalone Dutch
       nouns + bound morphemes that appear at the end of Dutch compounds
       (boom / huis / stoel / tas / vis / kast / taart / wagen / vogel /
       schoen / steen / dier / hand / voet / etc.) and the diminutive
       suffix family (etje / pje / kje / tje / je). Derived independently
       from a Dutch noun lexicon + VLL bound-morpheme inventory — NOT
       from inspecting TeX patterns. R reaches agreement with T by a
       DIFFERENT route (lexical morpheme matching vs corpus-statistical
       Liang patterns), preserving methodological independence.

       For each word, longest-first try every suffix-morpheme against
       word.endsWith(). If matched (with the remaining prefix ≥ 2 chars
       AND containing a vowel AND, for vowel-initial suffixes, ending in
       a consonant), recursively split the prefix part too (handles
       3+ element compounds like bokshandschoen = boks + hand + schoen).
       Then syllabify each part PHONOTACTICALLY and concatenate.

       JE_FALSE_POSITIVES list (the Dutch analogue of de.js's
       CHEN_FALSE_POSITIVES for -sche+n plurals): grown empirically per
       the regression gate. Starts empty; populated when a non-
       diminutive word ending in -je trips a false-positive split.

   (2) PHONOTACTIC LAYER (within each morpheme element OR for words
       that don't match any compound pattern). Tokenize into vowel
       digraphs + multi-letter consonant chunks (sch / ch) + single
       letters. Walk between nuclei per Dutch open/closed syllable
       convention:
         numC = 0 → hiatus
         numC = 1 → C to next syllable (OPEN: ma-ken, va-der; vowel
                    stays implicitly "long")
         numC = 2 → split between (CLOSED: kat-ten, wek-ker, ap-pel;
                    vowel stays implicitly "short"). EXCEPT stop+liquid
                    pairs (bl/br/dr/fl/fr/gl/gr/kl/kr/pl/pr/tr/vr/cl/cr)
                    + schr stay together.
         numC ≥ 3 → if last 2 form an INSEPARABLE_3PLUS cluster
                    (stop+liquid + sch+sonorant + sp/sk + kn), both
                    go to next; else only last 1 to next.

       sp/st/sk are NOT inseparable in 2-chunk context — Dutch
       stem-internal `wes-pe`/`as-ter`/`mas-ke` analogues split between
       per VLL closed-syllable convention. st is NOT in 3+ context
       either (mirrors DE Bürste/Hamster handling). dl is NOT
       inseparable. Dutch does NOT use pf (DE-only).

   References:
     - Mommers, M.J.C. & Caesar, F. — Veilig Leren Lezen (VLL kern
       methodology, Zwijsen).
     - de Graaff, S. & Bosman, A.M.T. (2012). Klanken en hun letters
       in Nederlandse woorden. Tijdschrift voor Orthopedagogiek 51,
       67-83.
     - SLO Tussendoelen Beginnende Geletterdheid.
   ===================================================================== */

'use strict';

const VOWELS = new Set(['a','e','i','o','u','y']);

/* Vowel groups (single nucleus). Longest-first matching (4 → 3 → 2).
   Dutch has productive vowel triphthongs and the quadgraph 'eeuw':
   - 4-letter: 'eeuw' (leeuw, sneeuw — eeu+w as one nucleus)
   - 3-letter: 'aai' (haai, kraai), 'ooi' (hooi, mooi),
     'oei' (gloei, snoei, roei), 'auw' (pauw, rauw),
     'ouw' (rouw, vrouw), 'ieu' (nieuw)
   - 2-letter: ij (Dutch-unique digraph) + long-vowel doublings
     aa/ee/oo/uu + long-vowel digraphs oe/ie + diphthongs au/ou/eu/ui/ei/ai */
const VOWEL_GROUPS_4 = ['eeuw'];
const VOWEL_GROUPS_3 = ['aai','ooi','oei','auw','ouw','ieu'];
const VOWEL_DIGRAPHS = ['ij','ei','ai','au','ou','ui','eu','oe','ie','aa','ee','oo','uu'];

/* Consonant chunks that stay together as a SINGLE orthographic unit.
   Dutch native inventory: only sch + ch. ng/nk SPLIT between letters
   between vowels per Dutch convention (an-ker, en-gel, boe-ken-kast). */
const CONSONANT_CHUNKS_3 = ['sch'];
const CONSONANT_CHUNKS_2 = ['ch'];

/* Inseparable in 2-chunk context (between two nuclei). Stop+liquid
   (Kobra-equivalents) + schr (Dutch schroef / schrik / schrijver
   onsets). sp/st/sk are NOT here so stem-internal as-ter / wes-pe /
   mas-ke analogues split between per VLL closed-syllable convention.
   dl is NOT inseparable (would split per Dutch convention). */
const INSEPARABLE_2 = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr',
  'schr'
]);

/* 3+ chunk inseparable when those are the LAST two consonants before
   the next vowel. Stop+liquid + sp/sk (compound-onset preserved at
   morpheme boundaries like the Dutch equivalents of Schorn-stein) +
   sch+sonorant + kn (Dutch knie/knop/knoflook). st is NOT here because
   stem-internal st in 3-chunk runs should split off only the last
   consonant (mirrors DE Bürste/Hamster handling). pf* removed (Dutch
   does not use pf). */
const INSEPARABLE_3PLUS = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','vr',
  'sp','st','sk',
  'schl','schm','schn','schr','schw',
  'kn'
]);
/* NOTE: 'st' IS in INSEPARABLE_3PLUS for NL — different from de.js.
   Dutch convention: hamster→ham-ster, borstel→bor-stel, kunstenaar
   →kuns-te-naar (3-chunk st-cluster sends both to next syl). DE
   convention: Bürste→bürs-te, Hamster→hams-ter (3-chunk st splits
   off only the last C). Empirically derived from the STEP 1
   approved-set inspection. */

/* MORPHEME_SUFFIXES — Dutch compound-suffix elements derived from
   K-3 vocabulary AND the VLL diminutive bound-morpheme family.

   Diminutive family first (the Dutch unique class, analog of DE -chen):
   etje / pje / kje / tje / je. Longest-first sorting ensures more-
   specific suffixes win (etje > tje > je).

   Compound element nouns: each is a verifiable standalone Dutch noun
   that appears at the end of Dutch K-3 compounds. Derived from the
   STEP 1 859-approved corpus's final-syllable frequency scan +
   standalone-noun lexical verification. NOT derived from inspecting
   TeX output (methodological-independence rule per commission). */
const MORPHEME_SUFFIXES_RAW = [
  // Diminutive suffix family (VLL bound morphemes).
  // Only -je and -tje are productive in K-3 corpus. -kje (only after -ing
  // stems like koning→koninkje) and -pje (only after long-vowel+m stems
  // like boom→boompje) are too rare to whitelist; over-match risk
  // outweighs coverage (koek+je is misread as koe+kje without guard).
  // -tje carries a context guard (see findCompoundSuffix below):
  // matches only when prefix ends in a schwa-syllable (-el/-er/-en).
  'tje','je',

  // Compound element nouns — common in K-3 corpus. Each is a verifiable
  // standalone Dutch noun. Sorted by topic for maintenance only;
  // longest-first sort at module-load handles matching order.
  // Things + tools + furniture
  'wagen','schoen','vogel','tafel','stoel','taart','kast','boom','lamp','steen',
  'dier','huis','paard','boek','bal','tas','vis','ster','bes','bord',
  'kop','klok','rok','rooster','roller','stam','staart','look','scoop',
  'meester','kantoor','berg','gang','vlies','arts','schaar','schip',
  // Additional compound elements identified in regression sweep
  'appel','ijzer','wijzer','kist','vlok','snoer','spuit','kaart','stal','staf','spaan',
  'stelsel','stel','borstel','rog','achtig','bei','ei','opgang',
  // Body parts (verifiable standalone nouns)
  'hand','voet','been','hoofd','kind','tand','neus','oor','mond','haar',
  // Buildings + places + materials
  'kerk','muur','deur','park','baan','muts','vleugel',
  // Tools + utensils + misc
  'tang','riem','ring','rad','reus','reep','peer','kraal','sleutel','fluit',
  'mes','vork','lepel','beker','kom','pan','fles','kussen','deken','laken','dek',
  'lijn','draad','touw','spel','toren','molen','pen','bloem','beer','kuip','kruik','schaal','schoorsteen',
  // Clothing
  'jas','hoed','das','sok','broek','hemd','jurk','riem',
  // Food
  'koek','brood','melk','soep','vlees','kaas','snoep','slak',
  // Vehicles + transport
  'boot','bus','trein','vliegtuig','fiets',
  // Body-organ + miscellaneous (oog excluded — elleboog false-positive
  // class; oo+g splits across morpheme seam in compounds — the chunk
  // table sees oo as long vowel so phonotactic handles it).
  // 'oog' deliberately NOT in list — see elleboog/regenboog regression
];

/* Sort longest-first so the most-specific suffix matches before any
   shorter substring of it (e.g., 'schoen' before 'oen'; 'etje' before 'je'). */
const MORPHEME_SUFFIXES = MORPHEME_SUFFIXES_RAW
  .slice()
  .sort((a, b) => b.length - a.length);

/* JE_FALSE_POSITIVES: Dutch words ending in -je / -tje / -pje / -kje
   that should NOT be diminutive-split. Analog of de.js's
   CHEN_FALSE_POSITIVES. Starts EMPTY; grown empirically by the
   regression gate during STEP 2 iteration. Dutch has fewer of these
   coincidences than German because nearly every -je / -tje ending in
   the K-3 corpus IS a diminutive (verified in STEP 1 inspection). */
const JE_FALSE_POSITIVES = new Set([]);

/* STER_FALSE_POSITIVES: words ending in -ster that are NOT compounds
   with the noun 'ster' (star); the rs-t cluster should split as stem-
   internal per TeX (oes-ter, not oe-ster). Grown empirically per the
   regression gate. Analog of JE_FALSE_POSITIVES for the -je suffix. */
const STER_FALSE_POSITIVES = new Set(['oester']);

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
    if (i + 3 < n && VOWEL_GROUPS_4.indexOf(w.substr(i, 4)) >= 0) {
      m = { type: 'vowel', str: w.substr(i, 4), len: 4 };
    } else if (i + 2 < n && VOWEL_GROUPS_3.indexOf(w.substr(i, 3)) >= 0) {
      m = { type: 'vowel', str: w.substr(i, 3), len: 3 };
    } else if (i + 1 < n && VOWEL_DIGRAPHS.indexOf(w.substr(i, 2)) >= 0) {
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
     not a valid morpheme).
   - For vowel-initial suffixes, prefix must end in a consonant.
   - Diminutive -je / -tje / -pje / -kje / -etje skipped for known
     false-positive non-diminutive words via JE_FALSE_POSITIVES. */
function findCompoundSuffix(word) {
  const w = word.toLowerCase();
  for (const suffix of MORPHEME_SUFFIXES) {
    if (suffix.length >= w.length) continue;
    const prefixLen = w.length - suffix.length;
    if (prefixLen < 2) continue;
    if (!w.endsWith(suffix)) continue;
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
    // Diminutive false-positive guard
    if (suffix === 'je' && JE_FALSE_POSITIVES.has(w)) continue;
    // -ster false-positive guard
    if (suffix === 'ster' && STER_FALSE_POSITIVES.has(w)) continue;
    // -tje schwa-syllable guard: Dutch diminutive -tje attaches only to
    // stems ending in unstressed -el / -er / -en (the schwa syllable).
    // Otherwise the diminutive is plain -je and the preceding t is part
    // of the stem (stokstaart-je / kast-je / nacht-kast-je). Without
    // this guard, -tje over-matches and strands the stem's final t.
    if (suffix === 'tje') {
      if (prefix.length < 3) continue;
      const last2 = prefix.substring(prefix.length - 2);
      if (last2 !== 'el' && last2 !== 'er' && last2 !== 'en') continue;
    }
    return suffix.length;
  }
  return 0;
}

/* Compound-aware split: recursively decompose word into morpheme
   elements, then syllabify each phonotactically and concatenate.
   Recurses on the PREFIX only — NOT on the matched suffix.
   Different from de.js: Dutch agentive morphology is `-er` (bakker,
   meester) without a recursive sub-element pattern, and Dutch nouns
   like `meester` should be treated as whole morphemes that phonotactic
   syllabification handles correctly (mees-ter). Recursing on the
   suffix would split meester → mee+ster via the `ster` (star)
   compound element, which is wrong here. DE's stapler→stap+ler need
   for recursion doesn't apply to Dutch K-3 vocab. */
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

/**
 * Syllabify a Dutch word per VLL orthographic conventions.
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
  JE_FALSE_POSITIVES,
  // Exposed for testing / inspection
  syllabifyPhonotactic,
  syllabifyCompound,
  findCompoundSuffix
};
