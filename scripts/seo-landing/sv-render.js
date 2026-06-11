/* Shared sv render for the Nordic landing fan-out — PURE SUBSTITUTION, zero morphology.
 *
 * Swedish has NO case system on nouns (no de `datN()` dative). The agreement axis that bites is
 * SPECIES (definiteness): the definite-plural suffix is gender- AND declension-dependent —
 *   decl 1/2/3 (-or/-ar/-er)  -> +na   (bollar -> bollarna, frukter -> frukterna)
 *   decl 4 (-n, neuter)       -> +a    (äpplen -> äpplena,  NOT *äpplenna)
 *   decl 5 (zero-pl, neuter)  -> +en   (djur  -> djuren,    NOT *djurna)
 * A naïve "+na" yields *djurna — and the catalog's flagship theme animals->djur is exactly this
 * (decl-5 zero-plural neuter). So we NEVER derive a definite suffix in code: each theme stores
 * plIndef + plDef as hand-verified literals (sv-themes.js); the render layer substitutes only.
 *
 * Placeholders:
 *   {N_PL}     -> plIndef    (indefinite plural: count / "med {N_PL}" / "räkna {N_PL}" / title slot)
 *   {N_PL_DEF} -> plDef      (definite plural: "titta på {N_PL_DEF}" / "para ihop {N_PL_DEF}")
 *   {H1}       -> h1Display  (capitalized display label; the title-after-en-dash + carousel)
 *   {GEN}      -> plIndef    (collective family noun; Swedish has no separate de-collective, so = plIndef)
 *
 * The definiteness/agreement ASSERTION (the *djurna guard) lives here and FAIL-halts the wave.
 * Cross-ref: plan §③ + the sv linguist spec; CLAUDE.md §A.13.58 (per-locale gender authority: sv t=neuter/ett, n=common/en).
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

/* ---- A1: re-derive the EXPECTED definite plural per declension (the *djurna guard) ---- */
function expectedPlDef(plIndef, decl) {
  switch (decl) {
    case 1: // -or
    case 2: // -ar
    case 3: // -er
      return plIndef + 'na';
    case 4: // -n (neuter, decl 4) -> -ena
      return plIndef + 'a';
    case 5: // zero-plural neuter -> +en
      return plIndef + 'en';
    default:
      return null;
  }
}

/* ---- table-level assertion: run once over sv-themes.js before any render ----
 * Returns an array of failure strings (empty = clean). The generator FAIL-halts if non-empty. */
function assertThemeTable(THEMES) {
  const fails = [];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];
    // A2: gender ∈ {t,n} (sv codes; never the de m/f/n or nl d/h — §A.13.58)
    if (t.gender !== 't' && t.gender !== 'n') {
      fails.push(`A2 ${key}: gender "${t.gender}" not in {t,n} (sv: t=ett/neuter, n=en/common)`);
    }
    // A3: h1Display non-empty + starts with a capital letter OR a digit (display labels like "4 juli" are valid)
    if (!t.h1Display || !/^[A-ZÅÄÖ0-9]/.test(t.h1Display)) {
      fails.push(`A3 ${key}: h1Display "${t.h1Display}" empty or not capitalized`);
    }
    // A4: plIndef/plDef lowercase, single token (Option A — collective form)
    if (!t.plIndef || /\s/.test(t.plIndef) || t.plIndef !== t.plIndef.toLowerCase()) {
      fails.push(`A4 ${key}: plIndef "${t.plIndef}" must be lowercase single token`);
    }
    if (!t.plDef || /\s/.test(t.plDef) || t.plDef !== t.plDef.toLowerCase()) {
      fails.push(`A4 ${key}: plDef "${t.plDef}" must be lowercase single token`);
    }
    // A1: plDef matches its declension class (the *djurna guard). `irregular:true` skips (true irregulars only).
    if (!t.irregular) {
      const exp = expectedPlDef(t.plIndef, t.decl);
      if (exp === null) {
        fails.push(`A1 ${key}: decl ${t.decl} invalid (must be 1-5)`);
      } else if (exp !== t.plDef) {
        fails.push(`A1 ${key}: plDef "${t.plDef}" != expected "${exp}" for decl ${t.decl} (the *djurna guard — fix plDef or decl, or mark irregular:true with a comment)`);
      }
    }
  }
  return fails;
}

/* ---- B-level rendered-copy checks (the generator calls per landing) ---- */
// B1: no unsubstituted placeholders survive.
function placeholdersRemain(text) {
  return /\{(N_PL|N_PL_DEF|H1|GEN)\}/.test(text);
}
// B4: definite-suffix sanity — a decl-4/5 plIndef must NOT appear followed by "na" (would be *djurna/*äpplenna).
// Returns the offending substring or null. `theme` is the landing's theme entry.
function badDefiniteForm(text, theme) {
  if (theme.decl === 4 || theme.decl === 5) {
    const re = new RegExp('\\b' + theme.plIndef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 'na\\b', 'i');
    const m = text.match(re);
    if (m) return m[0];
  }
  return null;
}
// B2: singular-slot guard — flag `en|ett <Cap>` where <noun> is NOT a whitelisted fixed frame noun.
// (A slotted SINGULAR theme noun is a FAIL; theme slots are always plural.) Returns array of suspects.
const FRAME_NOUN_WHITELIST = new Set([
  // fixed singular frame nouns the prose legitimately uses (extend as configs need; mirrors the de WHITE list)
  'arbetsblad', 'uppgift', 'övning', 'bild', 'rad', 'ruta', 'grupp', 'sida', 'svar', 'barn', 'gång',
  'lek', 'stund', 'pdf', 'mönster', 'regel', 'enhet', 'följd', 'takt', 'rytm', 'del', 'helhet', 'hälft',
  'skugga', 'väg', 'labyrint', 'ledtråd', 'skatt', 'kategori', 'bokstav', 'ljud', 'ord', 'siffra',
  'mängd', 'antal', 'känsla', 'färg', 'form', 'spel', 'runda', 'bricka', 'pjäs', 'pusselbit', 'kod',
  'utmaning', 'upptäckt', 'förmåga', 'förskola', 'början', 'sak', 'fråga', 'tanke', 'blick',
]);
function singularSlotSuspects(text) {
  const out = [];
  (text.match(/\b(en|ett)\s+([A-ZÅÄÖ][a-zåäö]+)/g) || []).forEach((hit) => {
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
  singularSlotSuspects,
  FRAME_NOUN_WHITELIST,
};
