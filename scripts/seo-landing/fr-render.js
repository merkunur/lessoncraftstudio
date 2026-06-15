/* Shared `fr` render for the French landing fan-out — PURE SUBSTITUTION, zero morphology computed
 * from suffixes. French agreement is trivial for plurals (definite article is invariably `les`), so
 * the only French complexity is preposition+article contraction (de+les→des, à+les→aux) and the
 * `de`→`d'` elision before a vowel/h-muet. Because EVERY theme reference in this fan is PLURAL, the
 * singular-only contractions/elisions (`l'`, `du`, `au`) can never fire — only the plural forms are
 * needed, and they are all DERIVABLE from the bare plural `plIndef` + the hand-verified `vowelInit`
 * boolean. So fr-themes stores only { gen, vowelInit, plIndef, h1Display } and the render computes:
 *   {N_PL}     -> plIndef            ("compte {N_PL}")
 *   {LES_PL} / {N_PL_DEF} -> les+plIndef  (definite plural: "trie {LES_PL}")
 *   {DES_PL}   -> des+plIndef         (de+les: "le groupe {DES_PL}")
 *   {DE_PL}    -> de/d'+plIndef       (elision-aware: "Combien {DE_PL} ?" -> "Combien d'oiseaux ?")
 *   {AUX_PL}   -> aux+plIndef         (à+les: "à côté {DES_PL}" / "joue {AUX_PL}")
 *   {GEN}      -> plIndef             (collective = plIndef, as sv/da)
 *   {H1}       -> h1Display           (display label from topics-taxonomy.json name.fr)
 *
 * assertThemeTable() FAIL-halts at generation time on any theme whose `vowelInit` disagrees with
 * its plIndef's initial letter (the `d'`/`de` correctness guard — the fr analog of the it
 * genArt∈{i,gli,le} / sv *djurna assertion). NO double-definiteness ban (French allows "les petits
 * animaux") and NO suffixal-definite trap (French definite is the free word "les"), so the Danish
 * B4/B5 guards are no-ops here.
 *
 * Cross-ref: CLAUDE.md §A.13.58 per-locale gender authority — fr codes: m=masculin, f=féminin.
 */
'use strict';

/* ---- render: pure string substitution; plural contractions derived from plIndef + vowelInit ---- */
function render(tpl, theme) {
  const de = (theme.vowelInit ? "d'" : 'de ') + theme.plIndef;
  return tpl
    .replace(/\{N_PL_DEF\}/g, 'les ' + theme.plIndef)
    .replace(/\{LES_PL\}/g, 'les ' + theme.plIndef)
    .replace(/\{DES_PL\}/g, 'des ' + theme.plIndef)
    .replace(/\{AUX_PL\}/g, 'aux ' + theme.plIndef)
    .replace(/\{DE_PL\}/g, de)
    .replace(/\{N_PL\}/g, theme.plIndef)
    .replace(/\{GEN\}/g, theme.plIndef)
    .replace(/\{H1\}/g, theme.h1Display);
}

// French vowels incl. accented + the œ ligature. `h` is ambiguous (h-muet elides, h-aspiré blocks)
// → the assertion SKIPS h-initial plIndef and trusts the hand-ruled vowelInit (none in the table).
const VOWEL_INIT = /^[aeiouyàâäéèêëîïôöùûüœæ]/i;
const CONSONANT_INIT = /^[bcdfgjklmnpqrstvwxz]/i;

/* ---- table-level assertion: run once over fr-themes.js before any render. Returns array of fails
   (da convention — gen-fr-readiness checks `fails.length`). ---- */
function assertThemeTable(THEMES) {
  const fails = [];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];
    if (!t || !t.plIndef || !t.h1Display || typeof t.vowelInit !== 'boolean' || !t.gen) {
      fails.push(`${key}: missing field (need gen, vowelInit, plIndef, h1Display)`);
      continue;
    }
    // gender ∈ {m,f} (fr: m=masculin, f=féminin — §A.13.58 per-locale authority)
    if (t.gen !== 'm' && t.gen !== 'f') fails.push(`${key}: gen "${t.gen}" not in {m,f}`);
    // plIndef lowercase single token (the bare plural; "les/des/de/aux + plIndef" must read correctly)
    if (/\s/.test(t.plIndef) || t.plIndef !== t.plIndef.toLowerCase()) {
      fails.push(`${key}: plIndef "${t.plIndef}" must be lowercase single token`);
    }
    // h1Display non-empty + starts capital OR digit ("4 juillet")
    if (!/^[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŒÆ0-9]/.test(t.h1Display)) {
      fails.push(`${key}: h1Display "${t.h1Display}" empty or not capitalized`);
    }
    // THE core French assertion — vowelInit must agree with plIndef's initial (the d'/de guard).
    // h-initial is hand-ruled (h-muet vs h-aspiré) → skipped.
    const first = t.plIndef.charAt(0).toLowerCase();
    if (first !== 'h') {
      if (VOWEL_INIT.test(t.plIndef) && !t.vowelInit) {
        fails.push(`${key}: plIndef "${t.plIndef}" starts with a vowel → vowelInit must be true (d'${t.plIndef})`);
      } else if (CONSONANT_INIT.test(t.plIndef) && t.vowelInit) {
        fails.push(`${key}: plIndef "${t.plIndef}" starts with a consonant → vowelInit must be false (de ${t.plIndef})`);
      }
    }
  }
  return fails;
}

/* ---- B-level checks (da-engine contract) ---- */
// B1: no unsubstituted placeholders survive.
function placeholdersRemain(text) {
  return /\{(N_PL|N_PL_DEF|LES_PL|DES_PL|DE_PL|AUX_PL|H1|GEN)\}/.test(text);
}
// B2/B4/B5 are Danish-specific (singular-slot un/une noise; suffixal-definite trap; double-
// definiteness ban). French has none of these → no-ops so the da engine's calls are inert.
function singularSlotSuspects() { return []; }
function badDefiniteForm() { return null; }
function doubleDefinitenessInTemplate() { return null; }

module.exports = {
  render,
  assertThemeTable,
  placeholdersRemain,
  badDefiniteForm,
  doubleDefinitenessInTemplate,
  singularSlotSuspects,
};
