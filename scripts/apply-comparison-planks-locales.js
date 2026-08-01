/* =====================================================================
   apply-comparison-planks-locales.js — write the strings block from SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-comparison-planks-locales.js

   Rewrites the entire `strings: { … }` block in
   `mini tools/comparison-planks.js` from
   `scripts/_comparison-planks-strings.js`. Idempotent.

   ⚠ IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any locale
     · a key in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak)
     · a string naming a UNIT
     · ⭐ a string NAMING THE HOLLOW — the fourth-named-part law
     · an arithmetic glyph, a digit, an exclamation mark, an invisible

   ⭐⭐ AND ONE FENCE IS DELIBERATELY *NOT* HERE, WHICH IS THE POINT.
   `hintSay` asks the class to say how long the piece is. That has the
   SAME ANSWER as `span-length-gap`'s banned "how much longer is it" —
   so the boundary between this tool and that one CANNOT be enforced by
   a word-ban, and pretending otherwise with a regex would be worse than
   nothing: it would read as protection. What actually holds the line is
   BEHAVIOURAL — this tool has no keypad, no field, no check, and takes
   no answer. `verify-comparison-planks.js` asserts that, and it is the
   only thing standing between these two tools. A native panel found
   this; I had assumed the phrasing was doing the work.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const SoT = require('./_comparison-planks-strings.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'comparison-planks.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* fixed key order, so a re-run never reshuffles and a diff shows only
   what actually changed */
const ORDER = [
  'title', 'instruction', 'sceneLabel',
  'hintSame', 'hintTake', 'hintSay', 'hintCarry', 'hintSeated',
  'takeBtn', 'layBtn', 'putBackBtn', 'nextBtn', 'printBtn',
  'plankAAria', 'plankBAria', 'bracketAria', 'offcutAria',
  'gateTitle', 'gateBody', 'gateCta'
];

/* ---------------------------------------------------------------------
   ⚠ EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS BEFORE IT TOUCHES
   REAL COPY. This program has now bought the ban-too-wide defect five
   times — a ban shown only to FIRE has not been tested. Each MUST_PASS
   below is real shipped or panel-authored prose.
   ------------------------------------------------------------------- */
const NAMED_UNIT = /(\bcm\b|\bmm\b|centimet|centimèt|zentimet|centímetr|sentti|senttimetr|\bmeter\b|\bmetre\b|\bmetro\b|\bmètre\b|\binch(es)?\b|\btum(mar)?\b|\btomme[rn]?\b|paperclip|büroklammer|trombone|graffett)/i;

/* ⭐ THE FOURTH-NAMED-PART BAN. Line 7 of the tool says three named
   parts and nothing else gets a noun — and I broke that law myself
   while fixing an a11y finding, naming the hollow in all eleven
   locales. These are exactly the nouns three native panels proposed
   and then retired. The absence is carried by a VERB instead
   (fehlen · il manque · is missing), which is why the MUST_PASS list
   below is full of sentences about the hollow that name nothing. */
const HOLLOW_NOUN = /(\bl[üu]cke\b|\bcreux\b|\bhueco\b|\bv[ãa]o\b|\bvuoto\b|\bgat\b|\bgaten\b|\blucka[nr]?\b|\bhul(let)?\b|\btomrom(met)?\b|\baukko(on)?\b|\bthe gap\b)/i;

const ARITHMETIC = /[+=−↔Δ]|(\s-\s)/;

const POISON = [
  { name: 'unit', re: NAMED_UNIT,
    fire: ['in cm', 'in Zentimetern', 'en centímetros', 'i centimeter', 'senttimetreinä', 'three inches', 'i tum', 'to tommer'],
    pass: ['Zwei Bretter, eine Linie', 'Deux planches, un même départ', 'Los dos tablones',
      'As Duas Ripas', 'Le due travi', 'De latten', 'Plankorna', 'Brædderne', 'Fjølene', 'Lankut'] },
  { name: 'hollow-noun', re: HOLLOW_NOUN,
    fire: ['Put the piece back in the gap', 'In die Lücke zurücklegen', 'Remettre dans le creux',
      'Devolverlo al hueco', 'Devolver ao vão', 'Rimettilo nel vuoto',
      'Zet het stuk terug in het gat', 'Lägg tillbaka stumpen i luckan',
      'Læg stykket tilbage i hullet', 'Legg biten tilbake i tomrommet', 'Palauta pala aukkoon'],
    /* ⚠ every one of these is a sentence ABOUT the hollow that does not
       NAME it — if the ban were widened to catch the idea rather than
       the noun, it would condemn the correct copy */
    pass: ['Dem langen Brett fehlt jetzt dieses Endstück.', 'Il manque maintenant ce bout à la planche longue.',
      'The long plank is now missing that piece.', 'Endstück zurücklegen', 'Remettre à sa place',
      'Put it back where it was', 'Poser bout à bout', 'Ans Brettende anlegen'] },
  { name: 'arithmetic', re: ARITHMETIC,
    fire: ['5 + 4 = 9', 'a − b', 'the long ↔ the short'],
    /* ⚠ THE SPACED-HYPHEN CLAUSE IS THE INTERESTING ONE. The aria labels
       used " - " as a pause until a panel pointed out a screen reader
       announces it as "dash", as "minus", or as nothing, by verbosity
       setting — so a separator was reading as an operator. Banning it
       enforces the full stop that replaced it. Hyphenated WORDS must
       still pass, which is why the boundary is spaces on both sides. */
    pass: ['the top plank. Drag its end to make it longer or shorter.',
      'Zwei Bretter, eine Linie', 'Deux planches, un même départ',
      'e-mail', 'la planche du haut. Faites glisser son extrémité.'] }
];

let bad = 0;
const fail = (m) => { console.error('  REFUSED: ' + m); bad++; };

(function poison() {
  for (const p of POISON) {
    const missed = p.fire.filter((s) => !p.re.test(s));
    const condemned = p.pass.filter((s) => p.re.test(s));
    if (missed.length) fail(`the ${p.name} ban MISSED a violation: "${missed[0]}"`);
    if (condemned.length) fail(`the ${p.name} ban WRONGLY CONDEMNED: "${condemned[0]}"`);
    if (!missed.length && !condemned.length) {
      console.log(`  poison [${p.name}]: fires ${p.fire.length}/${p.fire.length}, clears ${p.pass.length}/${p.pass.length}`);
    }
  }
}());
if (bad) { console.error('\nFAIL — a ban is untrustworthy; nothing was written'); process.exit(1); }

/* ---- validate the SoT before touching the tool ---------------------- */
for (const loc of LOCALES) {
  const L = SoT[loc];
  if (!L) { fail(`locale ${loc} is missing entirely`); continue; }
  for (const k of ORDER) {
    const v = L[k];
    if (typeof v !== 'string' || !v.trim()) { fail(`${loc}.${k} is missing or empty`); continue; }
    if (NAMED_UNIT.test(v)) fail(`${loc}.${k} NAMES A UNIT — "${v}"`);
    if (HOLLOW_NOUN.test(v)) fail(`${loc}.${k} NAMES THE HOLLOW — a fourth named part — "${v}"`);
    if (ARITHMETIC.test(v)) fail(`${loc}.${k} carries an arithmetic glyph or a spaced hyphen — "${v}"`);
    if (/\d/.test(v)) fail(`${loc}.${k} contains a digit — "${v}"`);
    if (/!/.test(v)) fail(`${loc}.${k} contains an exclamation mark`);
    if (/[​­﻿]/.test(v)) fail(`${loc}.${k} contains an invisible character`);
    if (loc !== 'en' && v === SoT.en[k]) fail(`${loc}.${k} is identical to English — an untranslated leak`);
  }
  const extra = Object.keys(L).filter((k) => ORDER.indexOf(k) < 0);
  if (extra.length) fail(`${loc} has keys not in ORDER: ${extra.join(', ')}`);
}

/* eleven distinct titles */
const titles = {};
for (const loc of LOCALES) {
  const t = SoT[loc] && SoT[loc].title;
  if (t && titles[t]) fail(`${loc} and ${titles[t]} share the title "${t}"`);
  else if (t) titles[t] = loc;
}

/* ⭐ the two aria strings are NOT interchangeable, and a panel pointed
   out the grammar proves it: French needs `Faites-la glisser` for the
   feminine accolade but `Faites-le` for the masculine bout; German
   needs `Zieht ihn` for der Henkel but `Zieht es` for das Endstück. So
   neither may be reused as the other's fallback. */
for (const loc of LOCALES) {
  const L = SoT[loc];
  if (L && L.bracketAria && L.bracketAria === L.offcutAria) {
    fail(`${loc}: bracketAria and offcutAria are the same string — one element, two jobs, one name`);
  }
}

if (bad) { console.error(`\nFAIL — ${bad} problem(s); the tool was NOT written`); process.exit(1); }
console.log(`  validated ${LOCALES.length} locales × ${ORDER.length} keys`);

/* ---- render the block ------------------------------------------------ */
const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const pad = Math.max.apply(null, ORDER.map((k) => k.length));
const lines = ORDER.map((k) => {
  const per = LOCALES.map((loc) => `${loc}: ${q(SoT[loc][k])}`).join(', ');
  return `      ${(k + ':').padEnd(pad + 1)} { ${per} }`;
});
const block = 'strings: {\n' + lines.join(',\n') + '\n    },';

const src = fs.readFileSync(TOOL, 'utf8');
const start = src.indexOf('strings: {');
if (start < 0) { console.error('FAIL — no strings block found'); process.exit(1); }
const endMark = '\n    },';
const end = src.indexOf(endMark, start);
if (end < 0) { console.error('FAIL — the strings block is not closed as expected'); process.exit(1); }
const next = src.slice(0, start) + block + src.slice(end + endMark.length);

if (next === src) { console.log('\n  .. no change — already applied'); process.exit(0); }
fs.writeFileSync(TOOL, next, 'utf8');
console.log(`\n  wrote ${ORDER.length} keys × ${LOCALES.length} locales into mini tools/comparison-planks.js`);
