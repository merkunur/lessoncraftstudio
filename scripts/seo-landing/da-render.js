/* Shared da render for the Nordic landing fan-out — PURE SUBSTITUTION, zero morphology.
 * Clone of sv-render.js with the DANISH definiteness rules (da ledger-lock 2026-06-12).
 *
 * Danish definiteness is suffixal like Swedish but with DIFFERENT suffix selection:
 *   decl 1: plural in -e/-er           -> +ne   (fugle -> fuglene, blomster -> blomsterne)
 *   decl 2: zero-plural (pl = sg)      -> +ene  (dyr -> dyrene, flag -> flagene)
 *   irregular: consonant-DOUBLING zero-plurals stay hand-locked literals
 *              (påskeæg -> påskeæggene, græskar -> græskarrene, snefnug -> snefnuggene)
 * We NEVER derive a definite suffix in code: each theme stores plIndef + plDef as hand-verified
 * literals (da-themes.js); the render layer substitutes only. The assertion re-derives per decl
 * and FAIL-halts on mismatch (the Danish analog of the sv *djurna guard).
 *
 * THE DANISH-ONLY TRAP — NO DOUBLE DEFINITENESS (≠ Swedish): adjective frames take
 * article + weak adjective + BARE plural: "de små dyr" — NEVER "de små dyrene".
 * Templates must never place den/det/de (± adjective) before {N_PL_DEF}; the
 * template-level lint noDoubleDefiniteness() FAIL-halts on it.
 *
 * Placeholders:
 *   {N_PL}     -> plIndef    (indefinite plural: "med {N_PL}" / "tæl {N_PL}" / title slot)
 *   {N_PL_DEF} -> plDef      (definite plural: "tæl {N_PL_DEF}" / "sortér {N_PL_DEF}" — adjective-free slots ONLY)
 *   {H1}       -> h1Display  (capitalized display label)
 *   {GEN}      -> plIndef    (collective family noun = plIndef, as sv)
 *
 * Cross-ref: CLAUDE.md §A.13.58 per-locale gender authority — da codes: t=intetkøn/et, n=fælleskøn/en.
 */
'use strict';

/* ---- render: pure string substitution, no morphology ---- */
function render(tpl, theme) {
  return tpl
    .replace(/\{N_PL_DEF\}/g, theme.plDef)
    .replace(/\{N_PL\}/g, theme.plIndef)
    .replace(/\{GEN\}/g, theme.plIndef)
    .replace(/\{H1\}/g, theme.h1Display);
}

/* ---- A1: re-derive the EXPECTED definite plural per declension ---- */
function expectedPlDef(plIndef, decl) {
  switch (decl) {
    case 1: // plural in -e / -er -> +ne
      return plIndef + 'ne';
    case 2: // zero-plural -> +ene (long-vowel / non-doubling; doubling cases are irregular:true)
      return plIndef + 'ene';
    default:
      return null;
  }
}

/* ---- table-level assertion: run once over da-themes.js before any render ---- */
function assertThemeTable(THEMES) {
  const fails = [];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];
    // A2: gender ∈ {t,n} (da codes: t=et/intetkøn, n=en/fælleskøn — §A.13.58)
    if (t.gender !== 't' && t.gender !== 'n') {
      fails.push(`A2 ${key}: gender "${t.gender}" not in {t,n} (da: t=et/intetkøn, n=en/fælleskøn)`);
    }
    // A3: h1Display non-empty + starts with a capital letter OR a digit ("4. juli")
    if (!t.h1Display || !/^[A-ZÆØÅ0-9]/.test(t.h1Display)) {
      fails.push(`A3 ${key}: h1Display "${t.h1Display}" empty or not capitalized`);
    }
    // A4: plIndef/plDef lowercase, single token
    if (!t.plIndef || /\s/.test(t.plIndef) || t.plIndef !== t.plIndef.toLowerCase()) {
      fails.push(`A4 ${key}: plIndef "${t.plIndef}" must be lowercase single token`);
    }
    if (!t.plDef || /\s/.test(t.plDef) || t.plDef !== t.plDef.toLowerCase()) {
      fails.push(`A4 ${key}: plDef "${t.plDef}" must be lowercase single token`);
    }
    // A1: plDef matches its declension class. `irregular:true` skips (consonant-doubling literals).
    if (!t.irregular) {
      const exp = expectedPlDef(t.plIndef, t.decl);
      if (exp === null) {
        fails.push(`A1 ${key}: decl ${t.decl} invalid (must be 1-2, or irregular:true)`);
      } else if (exp !== t.plDef) {
        fails.push(`A1 ${key}: plDef "${t.plDef}" != expected "${exp}" for decl ${t.decl} (fix plDef or decl, or mark irregular:true with a comment)`);
      }
    }
  }
  return fails;
}

/* ---- B-level checks ---- */
// B1: no unsubstituted placeholders survive.
function placeholdersRemain(text) {
  return /\{(N_PL|N_PL_DEF|H1|GEN)\}/.test(text);
}
// B4: definite-suffix sanity on RENDERED text — a decl-2 plIndef followed by bare "ne"
// would be the wrong suffix (*dyrne instead of dyrene).
function badDefiniteForm(text, theme) {
  if (theme.decl === 2 && !theme.irregular) {
    const re = new RegExp('\\b' + theme.plIndef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 'ne\\b', 'i');
    const m = text.match(re);
    if (m) return m[0];
  }
  return null;
}
// B5 (DANISH-ONLY): template-level double-definiteness lint — den/det/de (± one adjective-ish
// token) directly before {N_PL_DEF} is ungrammatical Danish ("de små dyrene"). Run on the RAW
// template strings (SKEL/P2/P3) before generation. Returns the offending snippet or null.
function doubleDefinitenessInTemplate(tpl) {
  const m = tpl.match(/\b(den|det|de)\s+(\p{L}+\s+)?\{N_PL_DEF\}/iu);
  return m ? m[0] : null;
}
// B2: singular-slot guard — "en|et <Cap>" where the noun is not a whitelisted fixed frame noun.
const FRAME_NOUN_WHITELIST = new Set([
  'opgave', 'arbejdsark', 'ark', 'billede', 'række', 'felt', 'gruppe', 'side', 'svar', 'barn',
  'gang', 'leg', 'stund', 'pdf', 'mønster', 'regel', 'enhed', 'rytme', 'takt', 'del', 'helhed',
  'halvdel', 'skygge', 'vej', 'labyrint', 'spor', 'skat', 'kategori', 'bogstav', 'lyd', 'ord',
  'tal', 'mængde', 'antal', 'følelse', 'farve', 'form', 'spil', 'runde', 'brik', 'kode',
  'udfordring', 'opdagelse', 'evne', 'børnehave', 'begyndelse', 'ting', 'spørgsmål', 'tanke',
  'blik', 'streg', 'linje', 'klasse', 'plads', 'tur', 'pause', 'vogn', 'sætning', 'stavelse',
]);
function singularSlotSuspects(text) {
  const out = [];
  (text.match(/\b(en|et)\s+([A-ZÆØÅ][a-zæøå]+)/g) || []).forEach((hit) => {
    const noun = hit.split(/\s+/)[1].toLowerCase();
    if (!FRAME_NOUN_WHITELIST.has(noun)) out.push(hit);
  });
  return out;
}

module.exports = {
  render,
  expectedPlDef,
  assertThemeTable,
  placeholdersRemain,
  badDefiniteForm,
  doubleDefinitenessInTemplate,
  singularSlotSuspects,
  FRAME_NOUN_WHITELIST,
};
