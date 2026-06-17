/* fi-render.js — Finnish (fi) render for the SEO landing fan-out — PURE SUBSTITUTION, zero morphology.
 *
 * Finnish has NO grammatical gender, NO articles, and NO Romance/Swedish agreement axis. The axis
 * that bites is CASE: one noun must surface in several different case forms across the prose slots,
 * and each case is a stem-dependent suffix with VOWEL HARMONY (back a/o/u vs front ä/ö/y) plus
 * heavy stem gradation/pluralisation that code cannot safely derive. Per CLAUDE.md §A.13.56 a
 * Finnish noun CANNOT be reused as one nominative form across slots — each grammatical role needs
 * its own correct CASE form, stored as a hand-verified LITERAL in the theme table. The render only
 * substitutes; it never inflects.
 *
 * Placeholder / case set (5 placeholders, 4 distinct cases — sv-level economy):
 *   {H1}        -> h1Display   NOMINATIVE PLURAL, Capitalized. Title-after-dash + carousel + on-page H1.
 *                              Verbatim taxonomy name.fi (e.g. "Eläimet"). May be a multi-word label.
 *   {N_PL}      -> nomPl       nominative plural, lowercase. Subject slot: "eläimet ovat sekaisin",
 *                              "kun eläimet on lajiteltu".
 *   {N_PART_SG} -> partSg      PARTITIVE SINGULAR, lowercase. The canonical count phrase workhorse:
 *                              "montako eläintä?", "kuinka monta eläintä".
 *   {N_PART_PL} -> partPl      PARTITIVE PLURAL, lowercase. Object / "of" slot: "laske eläimiä",
 *                              "etsi eläimiä", "kuvia eläimistä" (the partitive-plural object the
 *                              count/find/sort verbs govern).
 *   {N_GEN}     -> genPl       GENITIVE PLURAL, lowercase. "eläinten kuvat" = pictures of the animals,
 *                              "eläinten lajittelu" = sorting of the animals.
 *
 * Vowel harmony is the Finnish analog of sv's *djurna guard: a stem whose vowels are BACK (a/o/u)
 * must take back-harmonic suffixes (-a partitive: omenoita, -en genitive: omenoiden→...), and a
 * FRONT stem (ä/ö/y, or only neutral e/i) must take front-harmonic suffixes (-ä: eläimiä). A stored
 * partitive whose suffix vowel disagrees with its stem's harmony class is a mechanically-wrong
 * inflection — assertThemeTable FAIL-halts on it. NO gender check, NO definiteness check (Finnish
 * has neither).
 *
 * Cross-ref: sv-render.js (the architectural model); CLAUDE.md §A.13.56 (case-per-slot discipline),
 * §A.13.48/§A.13.49 (Finnish OPS 2014 framework). [NSR-FLAG][fi] per §17.5.1.
 */
'use strict';

/* ---- render: pure string substitution, no morphology ---- */
function render(tpl, theme) {
  return tpl
    .replace(/\{N_PART_PL\}/g, theme.partPl)
    .replace(/\{N_PART_SG\}/g, theme.partSg)
    .replace(/\{N_GEN\}/g, theme.genPl)
    .replace(/\{N_PL\}/g, theme.nomPl)
    .replace(/\{H1\}/g, theme.h1Display);
}

/* ---- render2: DUAL-theme pure substitution for picture-sort "-vs-" pairs ----
 * Reads the SAME hand-verified fi-themes fields as render() (no new fields, no morphology) for
 * two themes A and B. Markers {A_*}/{B_*}: NPL->nomPl, PART_PL->partPl, GEN->genPl, H1->h1Display.
 * The sv-render render2 analog; picture-sort SORTS (no counting), so partSg is not used. */
function render2(tpl, A, B) {
  return tpl
    .replace(/\{A_PART_PL\}/g, A.partPl).replace(/\{B_PART_PL\}/g, B.partPl)
    .replace(/\{A_GEN\}/g, A.genPl).replace(/\{B_GEN\}/g, B.genPl)
    .replace(/\{A_NPL\}/g, A.nomPl).replace(/\{B_NPL\}/g, B.nomPl)
    .replace(/\{A_H1\}/g, A.h1Display).replace(/\{B_H1\}/g, B.h1Display);
}

/* ---- vowel-harmony helpers (the Finnish *djurna analog) ----
 * Back vowels: a o u   Front vowels: ä ö y   Neutral: e i (do not set harmony class).
 * A word's harmony class = back if it contains any back vowel, else front (e/i-only -> front).
 * Finnish front/back never mix within a native stem, so the first back-or-front-determining vowel
 * suffices; we scan all vowels and treat "any back vowel present" => back. */
const BACK = new Set(['a', 'o', 'u']);
const FRONT = new Set(['ä', 'ö', 'y']);

function harmonyClass(word) {
  const w = word.toLowerCase();
  for (const ch of w) {
    if (BACK.has(ch)) return 'back';
  }
  for (const ch of w) {
    if (FRONT.has(ch)) return 'front';
  }
  return 'front'; // neutral-only (e/i) words take front-harmonic suffixes
}

// The trailing harmonic vowel of a partitive/genitive form (its last a/ä/o/ö/u/y), or null.
function lastHarmonicVowel(form) {
  const m = form.toLowerCase().match(/[aäoöuy](?=[^aäoöuy]*$)/);
  return m ? m[0] : null;
}

function harmonyOfVowel(v) {
  if (BACK.has(v)) return 'back';
  if (FRONT.has(v)) return 'front';
  return null; // neutral final vowel — uninformative, skip the check
}

/* ---- table-level assertion: run once over fi-themes.js before any render ----
 * Returns an array of failure strings (empty = clean). The generator FAIL-halts if non-empty. */
function assertThemeTable(THEMES) {
  const fails = [];
  const CASE_FIELDS = ['nomPl', 'partSg', 'partPl', 'genPl'];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];

    // A1: h1Display present, non-empty, starts with a capital (Ä/Ö/Å/A-Z) or a digit.
    if (!t.h1Display || !/^[A-ZÅÄÖ0-9]/.test(t.h1Display)) {
      fails.push(`A1 ${key}: h1Display "${t.h1Display}" empty or not capitalized`);
    }

    // A2: every case field present, non-empty, lowercase. Single token — UNLESS the entry is
    //     explicitly marked `multiword:true` (a few collective forms are legitimately 2 words,
    //     e.g. "maatilan eläimet"); then we only enforce lowercase.
    for (const f of CASE_FIELDS) {
      const v = t[f];
      if (!v || v !== String(v).toLowerCase()) {
        fails.push(`A2 ${key}: ${f} "${v}" missing or not lowercase`);
        continue;
      }
      if (/\s/.test(v) && !t.multiword) {
        fails.push(`A2 ${key}: ${f} "${v}" has whitespace but entry is not marked multiword:true`);
      }
    }
    if (fails.some((m) => m.startsWith(`A2 ${key}:`))) continue; // skip harmony if a case field is broken

    // A3: VOWEL-HARMONY consistency (the *djurna analog). The harmony class of the noun stem is
    //     read from the nominative plural (nomPl); the partitive sg, partitive pl, and genitive pl
    //     suffix vowels MUST match that class. A back-stem partitive ending in -ä (front) or a
    //     front-stem partitive ending in -a (back) is a mechanically-wrong inflection.
    //     `harmonyOverride` lets a legitimately-mixed compound (rare) pin the class explicitly.
    const stemClass = t.harmonyOverride || harmonyClass(t.nomPl);
    for (const f of ['partSg', 'partPl', 'genPl']) {
      const v = lastHarmonicVowel(t[f]);
      const c = v ? harmonyOfVowel(v) : null;
      if (c && c !== stemClass) {
        fails.push(
          `A3 ${key}: ${f} "${t[f]}" final harmonic vowel "${v}" is ${c}-harmonic ` +
            `but stem "${t.nomPl}" is ${stemClass}-harmonic (vowel-harmony mismatch — the *djurna guard)`
        );
      }
    }

    // A4: shape sanity — partitive SG and PL must differ (a slot reusing one form for both numbers
    //     is the §A.13.56 reuse-one-nominative bug); genitive plural must differ from nominative pl.
    if (t.partSg === t.partPl) {
      fails.push(`A4 ${key}: partSg == partPl ("${t.partSg}") — partitive singular and plural must differ`);
    }
    if (t.genPl === t.nomPl) {
      fails.push(`A4 ${key}: genPl == nomPl ("${t.genPl}") — genitive plural must differ from nominative plural`);
    }
  }
  return fails;
}

/* ---- B-level rendered-copy check (the generator calls per landing) ---- */
// B1: no unsubstituted placeholders survive.
function placeholdersRemain(text) {
  return /\{(H1|N_PL|N_PART_SG|N_PART_PL|N_GEN)\}/.test(text);
}

module.exports = {
  render,
  render2,
  assertThemeTable,
  placeholdersRemain,
  harmonyClass,
  lastHarmonicVowel,
};
