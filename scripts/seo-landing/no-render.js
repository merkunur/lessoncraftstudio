/* Shared no (Norwegian bokmål) render for the Nordic landing fan-out — PURE SUBSTITUTION, zero morphology.
 * Clone of da-render.js with the BOKMÅL definiteness rules (no ledger-lock 2026-06-15,
 * native-ensemble verified — see go-luminous-moon-agent-a22e62e92042214f5.md).
 *
 * Bokmål definite plural is SINGLE-SUFFIX `-ene` for BOTH genders, but — unlike Danish —
 * the `-er` of the indefinite plural is DROPPED (Danish KEEPS it: frugter→frugterne;
 * Norwegian: frukter→fruktene). So the derivation is NOT the Danish `+ne`:
 *   decl 1: plural in -er   -> STRIP -er, +ene   (biler -> bilene, frukter -> fruktene, blomster -> blomstene)
 *   decl 2: zero-plural     -> +ene              (dyr -> dyrene, flagg -> flaggene, kjøretøy -> kjøretøyene)
 *   irregular: vowel-change plural stays a hand-locked literal (tre -> trær -> trærne)
 * Bokmål has NO consonant-doubling event (egg -> eggene, snøfnugg -> snøfnuggene): the whole
 * Danish doubling-irregular class collapses to regular here, so the ONLY irregular is `tree`.
 * We NEVER derive a definite suffix in production prose: each theme stores plIndef + plDef as
 * hand-verified literals (no-themes.js); the render layer substitutes only. The assertion
 * re-derives per decl and FAIL-halts on mismatch (the no analog of the da *dyrne guard).
 *
 * NO DOUBLE-DEFINITENESS LINT (≠ Danish): Norwegian DOES permit double definiteness
 * ("de små dyrene" is CORRECT bokmål), so the da-only B5 lint is a no-op here. The frames
 * still keep theme nouns adjective-free, so the question never arises.
 *
 * Placeholders:
 *   {N_PL}     -> plIndef    (indefinite plural: "med {N_PL}" / "tell {N_PL}" / title slot)
 *   {N_PL_DEF} -> plDef      (definite plural: "tell {N_PL_DEF}" / "sorter {N_PL_DEF}")
 *   {H1}       -> h1Display  (capitalized display label)
 *   {GEN}      -> plIndef    (collective family noun = plIndef, as da/sv)
 *
 * Cross-ref: CLAUDE.md §A.13.58 per-locale gender authority — no codes: t=intetkjønn/et, n=felleskjønn/en.
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

/* ---- A1: re-derive the EXPECTED definite plural per declension (bokmål) ---- */
function expectedPlDef(plIndef, decl) {
  switch (decl) {
    case 1: // -er plural -> stem + ene (DROP the -er; the Norwegian≠Danish point)
      return plIndef.replace(/er$/, '') + 'ene';
    case 2: // zero-plural -> +ene
      return plIndef + 'ene';
    default:
      return null;
  }
}

/* ---- table-level assertion: run once over no-themes.js before any render ---- */
function assertThemeTable(THEMES) {
  const fails = [];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];
    // A2: gender ∈ {t,n} (no codes: t=et/intetkjønn, n=en/felleskjønn — §A.13.58)
    if (t.gender !== 't' && t.gender !== 'n') {
      fails.push(`A2 ${key}: gender "${t.gender}" not in {t,n} (no: t=et/intetkjønn, n=en/felleskjønn)`);
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
    // A1: plDef matches its declension class. `irregular:true` skips (vowel-change literal, e.g. trærne).
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
// B4: definite-suffix sanity on RENDERED text — the WRONG definite is plIndef + "ne":
//   decl 2: dyr   + ne -> *dyrne      (correct: dyrene)
//   decl 1: frukter+ ne -> *frukterne (the DANISH form; correct bokmål: fruktene)
// Either way `{plIndef}ne` in rendered prose is a defect. (The correct plDef never contains it.)
function badDefiniteForm(text, theme) {
  if (theme.irregular) return null;
  const re = new RegExp('\\b' + theme.plIndef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 'ne\\b', 'i');
  const m = text.match(re);
  if (m) return m[0];
  return null;
}
// B5 (da-only, NO-OP in bokmål): Norwegian permits double definiteness ("de små dyrene"),
// so this never fires. Kept for API parity with the da/sv gen engines.
function doubleDefinitenessInTemplate(_tpl) {
  return null;
}
// B2: singular-slot guard — "en|et <Cap>" where the noun is not a whitelisted fixed frame noun.
// Bokmål frame nouns (translated from the da whitelist).
const FRAME_NOUN_WHITELIST = new Set([
  'oppgave', 'arbeidsark', 'ark', 'bilde', 'rekke', 'felt', 'gruppe', 'side', 'svar', 'barn',
  'gang', 'lek', 'stund', 'pdf', 'mønster', 'regel', 'enhet', 'rytme', 'takt', 'del', 'helhet',
  'halvdel', 'skygge', 'vei', 'labyrint', 'spor', 'skatt', 'kategori', 'bokstav', 'lyd', 'ord',
  'tall', 'mengde', 'antall', 'følelse', 'farge', 'form', 'spill', 'runde', 'brikke', 'kode',
  'utfordring', 'oppdagelse', 'evne', 'barnehage', 'begynnelse', 'ting', 'spørsmål', 'tanke',
  'blikk', 'strek', 'linje', 'klasse', 'trinn', 'plass', 'tur', 'pause', 'vogn', 'setning', 'stavelse',
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
