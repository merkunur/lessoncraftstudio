/* Shared nl render for the Dutch landing fan-out — PURE SUBSTITUTION, zero morphology.
 *
 * Dutch has NO definiteness-suffix morphology (unlike Swedish: djur->djuren). The definite
 * plural is uniformly "de " + plural for EVERY gender (de dieren, de huizen, de appels), and in
 * the plural both the article (always "de") and any attributive adjective (always -e: de grote
 * dieren) are gender-neutral. So gender (de/het) is NON-load-bearing as long as the prose stays
 * plural — it is stored defensively only. The single morphology trap that justified sv-render.js
 * (a gender+declension-dependent definite-plural suffix) has NO Dutch analog. The real Dutch work
 * is LEXICAL (irregular plurals), handled by hand-verified literals in nl-themes.js — never here.
 *
 * Placeholders (mirror sv-render):
 *   {N_PL}     -> plIndef    (indefinite plural: count / "met {N_PL}" / "hoeveel {N_PL} zie je?" / title slot)
 *   {N_PL_DEF} -> plDef      (definite plural "de ...": "kijk naar {N_PL_DEF}" / "verbind {N_PL_DEF}")
 *   {H1}       -> h1Display  (capitalized display label; title-after-en-dash + carousel)
 *   {GEN}      -> plIndef    (collective family noun; Dutch has no separate de-collective, so = plIndef)
 *
 * The light table assertion (gender ∈ {de,het} · plIndef single token · plDef === "de "+plIndef ·
 * h1Display capitalized · mass-label has a surrogate) lives here and FAIL-halts the wave. There is
 * NO expectedPlDef (no suffix to re-derive). Cross-ref: plan §③; CLAUDE.md §A.13.58 (per-locale
 * gender authority: nl de=common, het=neuter — NEVER sv t/n or de m/f/n).
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

/* ---- table-level assertion: run once over nl-themes.js before any render ----
 * Returns an array of failure strings (empty = clean). The generator FAIL-halts if non-empty. */
function assertThemeTable(THEMES) {
  const fails = [];
  for (const key of Object.keys(THEMES)) {
    const t = THEMES[key];
    // A2: gender ∈ {de,het} (nl codes; never sv t/n or de m/f/n — §A.13.58)
    if (t.gender !== 'de' && t.gender !== 'het') {
      fails.push(`A2 ${key}: gender "${t.gender}" not in {de,het} (nl: de=common, het=neuter)`);
    }
    // A3: h1Display non-empty + starts with a capital letter OR a digit (display labels like "4 juli" are valid)
    if (!t.h1Display || !/^[A-ZÀ-ÖØ-Þ0-9]/.test(t.h1Display)) {
      fails.push(`A3 ${key}: h1Display "${t.h1Display}" empty or not capitalized`);
    }
    // A4: plIndef lowercase, single token (one word, no spaces)
    if (!t.plIndef || /\s/.test(t.plIndef) || t.plIndef !== t.plIndef.toLowerCase()) {
      fails.push(`A4 ${key}: plIndef "${t.plIndef}" must be lowercase single token`);
    }
    // A1: plDef === "de " + plIndef (the uniform Dutch definite plural; no suffix trap)
    if (t.plDef !== 'de ' + t.plIndef) {
      fails.push(`A1 ${key}: plDef "${t.plDef}" != expected "de ${t.plIndef}" (Dutch definite plural is always "de "+plIndef)`);
    }
    // A5: a mass-flagged label must carry a non-empty countable surrogate (it does, in plIndef).
    if (t.mass && !t.plIndef) {
      fails.push(`A5 ${key}: mass label missing countable surrogate plIndef`);
    }
  }
  return fails;
}

/* ---- B-level rendered-copy checks (the generator calls per landing) ---- */
// B1: no unsubstituted placeholders survive.
function placeholdersRemain(text) {
  return /\{(N_PL|N_PL_DEF|H1|GEN)\}/.test(text);
}
// B2: singular-slot guard — a slotted SINGULAR theme noun is a FAIL (theme slots are always plural).
// Flag an indefinite singular "een <Cap>" where <noun> is NOT a whitelisted fixed frame noun.
const FRAME_NOUN_WHITELIST = new Set([
  // fixed singular frame nouns the prose legitimately uses (extend as configs need; mirrors the de/sv WHITE list)
  'werkblad', 'opdracht', 'oefening', 'plaatje', 'rij', 'vakje', 'groep', 'pagina', 'antwoord', 'kind', 'keer',
  'spel', 'spelletje', 'moment', 'patroon', 'regel', 'eenheid', 'reeks', 'maat', 'ritme', 'deel', 'geheel', 'helft',
  'schaduw', 'pad', 'doolhof', 'aanwijzing', 'schat', 'categorie', 'letter', 'klank', 'woord', 'cijfer', 'getal',
  'hoeveelheid', 'aantal', 'gevoel', 'kleur', 'vorm', 'ronde', 'fiche', 'stukje', 'puzzelstukje', 'code', 'som',
  'uitdaging', 'ontdekking', 'vaardigheid', 'kleuter', 'begin', 'ding', 'vraag', 'gedachte', 'blik', 'plek', 'beurt',
]);
function singularSlotSuspects(text) {
  const out = [];
  (text.match(/\b(een)\s+([A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+)/g) || []).forEach((hit) => {
    const noun = hit.split(/\s+/)[1].toLowerCase();
    if (!FRAME_NOUN_WHITELIST.has(noun)) out.push(hit);
  });
  return out;
}

module.exports = {
  render,
  assertThemeTable,
  placeholdersRemain,
  singularSlotSuspects,
  FRAME_NOUN_WHITELIST,
};
