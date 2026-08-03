/* =====================================================================
   apply-arrow-strip-locales.js — fold the eleven panels into the tool
   ---------------------------------------------------------------------
   Run:  node scripts/apply-arrow-strip-locales.js [--dry-run]

   Reads .scratch/arw/<loc>.json (each the output of that locale's native
   three-person panel) and writes:
     * the 20 apparatus strings into `mini tools/arrow-strip.js`
     * the landing entries into `scripts/_arrow-strip-content.js`

   EN is authored, not translated, and is folded from the same file so
   there is exactly one shape to validate.

   ⚠ Normalises CRLF -> LF on write. A multi-line anchor in the mutation
   harness silently reports ANCHOR NOT FOUND against CRLF, and the harness
   then reports a clean sweep of nothing.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IN = path.join(ROOT, '.scratch', 'arw');
const TOOL = path.join(ROOT, 'mini tools', 'arrow-strip.js');
const CONTENT = path.join(__dirname, '_arrow-strip-content.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') > -1;

/* ⚠ `instruction` IS NOT OPTIONAL — lcs-shell.js:449 reads it for the line
   under the title AND for the aria label, and prints the raw KEY when it is
   absent. This tool shipped without one, so every arrow-strip page in every
   language rendered the literal word "instruction". The panels' own
   `predictHint` is used: it is already native in eleven languages and it
   names the routine rather than the opening move, so it does not duplicate
   the first-paint hint. Flagged for a sentence of its own at the next panel
   pass. Adding it HERE rather than in the generated block is the point --
   the first repair went into `mini tools/arrow-strip.js` and this script
   erased it on the next run, exactly as its own header warns. */
const KEYS = ['title', 'instruction', 'buildHint', 'predictHint', 'againHint', 'runBtn', 'clearBtn', 'eyeBtn',
  'eyeOffBtn', 'matLabel', 'matBook', 'printBtn', 'gateLine', 'unlock', 'cardFwd', 'cardBack',
  'cardTurnL', 'cardTurnR', 'railSlotAria', 'bodyAria'];

/* the plan name is platform-wide and the panels cannot see the lexicon */
const UNLOCK = {
  en: 'See the Teacher plan', de: 'Lehrer-Paket ansehen', fr: 'Voir l’offre Enseignant',
  es: 'Ver el plan Docente', pt: 'Ver o plano Professor', it: 'Vedi il piano Insegnante',
  nl: 'Bekijk het Leerkracht-pakket', sv: 'Se Lärarpaketet', da: 'Se Lærerabonnementet',
  no: 'Se Lærerabonnementet', fi: 'Katso Opettaja-tilaus'
};

let ERR = 0;
const die = (m) => { ERR++; console.error('  ERROR ' + m); };

/* ---- read + validate every panel before writing anything ---------- */
const P = {};
LOCALES.forEach((loc) => {
  const f = path.join(IN, loc + '.json');
  if (!fs.existsSync(f)) { die(`${loc}: no panel output at ${f}`); return; }
  let j;
  try { j = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { die(`${loc}: not JSON — ${e.message}`); return; }
  const a = j.apparatus, l = j.landing;
  if (!a || !l) { die(`${loc}: missing apparatus or landing`); return; }
  KEYS.forEach((k) => { if (typeof a[k] !== 'string' || !a[k].trim()) die(`${loc}.apparatus.${k} is missing`); });
  ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription'].forEach((k) => {
    if (typeof l[k] !== 'string' || !l[k].trim()) die(`${loc}.landing.${k} is missing`);
  });
  if (!Array.isArray(l.about) || l.about.length !== 4) die(`${loc}.landing.about must be exactly 4 paragraphs (got ${(l.about || []).length})`);
  if (!Array.isArray(l.howToUse) || l.howToUse.length !== 6) die(`${loc}.landing.howToUse must be exactly 6 steps (got ${(l.howToUse || []).length})`);
  if (!Array.isArray(l.classroomIdeas) || l.classroomIdeas.length !== 5) die(`${loc}.landing.classroomIdeas must be exactly 5 (got ${(l.classroomIdeas || []).length})`);
  if (!/^[a-z0-9-]+$/.test(l.slug)) die(`${loc}.landing.slug "${l.slug}" is not url-safe`);

  /* the panels cannot see the product lexicon — normalise, never trust */
  if (a.unlock !== UNLOCK[loc]) {
    console.log(`  ..    ${loc}: unlock normalised to the suite's plan name ("${a.unlock}" -> "${UNLOCK[loc]}")`);
    a.unlock = UNLOCK[loc];
  }
  /* placeholders must survive verbatim */
  [['railSlotAria', ['{i}', '{card}']], ['bodyAria', ['{r}', '{c}']]]
    .forEach(([k, ph]) => ph.forEach((p) => { if (a[k].indexOf(p) === -1) die(`${loc}.apparatus.${k} lost the placeholder ${p}`); }));
  /* invisibles slip through every other check because they render as nothing */
  Object.keys(a).forEach((k) => {
    const m = /[­​-‍⁠﻿]/.exec(a[k]);
    if (m) die(`${loc}.apparatus.${k} carries U+${m[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`);
  });
  P[loc] = j;
});

/* slugs must be unique across locales — da folds oe, no folds o */
const slugs = {};
LOCALES.forEach((loc) => {
  if (!P[loc]) return;
  const s = P[loc].landing.slug;
  if (slugs[s]) die(`slug collision: ${loc} and ${slugs[s]} both claim "${s}"`);
  slugs[s] = loc;
});

if (ERR) { console.error(`\nFAIL — ${ERR} problem(s); nothing written`); process.exit(1); }

/* ---- 1: the apparatus strings ------------------------------------- */
(function () {
  let s = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
  const block = '  strings: {\n' + KEYS.map((k) => {
    const pad = ' '.repeat(Math.max(1, 13 - k.length));
    return `    ${k}:${pad}{ ` + LOCALES.map((l) => `${l}: ${JSON.stringify(P[l].apparatus[k])}`).join(', ') + ' }';
  }).join(',\n') + '\n  },';
  const re = /^ {2}strings: \{[\s\S]*?\n {2}\},/m;
  if (!re.test(s)) { console.error('  FATAL: could not find the strings block'); process.exit(1); }
  s = s.replace(re, block);
  if (!DRY) fs.writeFileSync(TOOL, s, 'utf8');
  console.log(`  ok    mini tools/arrow-strip.js: ${KEYS.length} keys x ${LOCALES.length} locales`);
}());

/* ---- 2: the landing content module -------------------------------- */
(function () {
  const out = {};
  LOCALES.forEach((l) => {
    const g = P[l].landing;
    out[l] = {
      slug: g.slug, name: g.name, tagline: g.tagline, about: g.about,
      howToUse: g.howToUse, classroomIdeas: g.classroomIdeas,
      metaTitle: g.metaTitle, metaDescription: g.metaDescription
    };
  });
  const body = '/* =====================================================================\n'
    + '   _arrow-strip-content.js — the landing entry for TOOL #37, all 11 locales\n'
    + '   ---------------------------------------------------------------------\n'
    + '   GENERATED by scripts/apply-arrow-strip-locales.js from the ten native\n'
    + '   three-person panels (§A.13.48) plus the authored EN. Rebuilt per locale,\n'
    + '   never translated. Consumed by scripts/register-arrow-strip.js.\n'
    + '   ===================================================================== */\n\n'
    + 'module.exports = ' + JSON.stringify(out, null, 2) + ';\n';
  if (!DRY) fs.writeFileSync(CONTENT, body, 'utf8');
  console.log(`  ok    scripts/_arrow-strip-content.js: ${LOCALES.length} landing entries`);
  LOCALES.forEach((l) => console.log(`        ${l}  ${P[l].landing.name}  /${P[l].landing.slug}`));
}());

console.log('');
console.log(DRY ? 'DRY RUN — nothing was written' : 'applied');
