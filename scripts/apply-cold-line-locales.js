/* =====================================================================
   apply-cold-line-locales.js — write the strings block from SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-cold-line-locales.js

   Rewrites the entire `strings: { … }` block in
   `mini tools/cold-line.js` from
   `scripts/_cold-line-strings.js`. Idempotent.

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
   no answer. `verify-cold-line.js` asserts that, and it is the
   only thing standing between these two tools. A native panel found
   this; I had assumed the phrasing was doing the work.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const SoT = require('./_cold-line-strings.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'cold-line.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* fixed key order, so a re-run never reshuffles and a diff shows only
   what actually changed */
/* ⚠ THE KEY SET IS READ OFF THE TOOL, NOT HAND-LISTED. A hand-listed
   order silently drops a key the tool actually renders, and a
   completeness check that covers a SUBSET of the required fields is
   worse than none because it CERTIFIES (#42 shipped five of eight
   ToolEntry fields past two such guards). */
const TOOL_MODEL = require(path.join(__dirname, '..', 'mini tools', 'cold-line.js'));
const ORDER = Object.keys(TOOL_MODEL.strings);
if (ORDER.length < 12) {
  console.error(`REFUSED: only ${ORDER.length} string keys parsed off the tool — this gate would be hollow`);
  process.exit(1);
}

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
/* ⭐ THE DEGREE BAN. Naming no unit is not a limitation here — it is
   exactly why one object can be both a thermometer and a number line,
   and it is what dissolves the catalog's flagged Fahrenheit risk. The
   platform's own shipped thermometer (`primitives/thermometer.js:26`)
   already renders `text: v`, a bare integer.
   ⚠ THE BAN-TOO-WIDE RISK IS REAL AND SPECIFIC: `grad` is a live stem
   in ordinary Germanic prose (gradvis, gradually, Grundschule is fine
   but graduell is not a unit), so this matches the UNIT senses with
   word boundaries and is poison-tested against real shipped prose in
   both directions. */
const DEGREE = /(°|\bcelsius\b|\bfahrenheit\b|\bdegree(s)?\b|\bgrad(en|er|os|us|i)?\b|\bgrau(s)?\b|\baste(tta|ita|en|ella)?\b)/i;

/* ⭐ THE WEATHER BAN. `calendar-wall.js:161` owns a six-type weather
   enum in all eleven locales. This tool shows a NUMBER, never a
   condition — and in the Nordic locales that adjacency is closest. */
/* ⭐⭐ JAVASCRIPT'S `\b` IS ASCII-ONLY, AND THAT SILENTLY KILLS A BAN.
   `/\bsnö\b/` can NEVER match: `ö` is not a `\w`, so the trailing
   boundary fails — in Swedish, the very locale where snow vocabulary is
   likeliest. Unicode letter lookarounds are the fix, and every ban in
   this file that touches a non-ASCII term needs them.
   ⚠ SCOPE, STATED HONESTLY: this catches calendar-wall's six NOUN types,
   not every weather VERB (es regnet · il pleut · on sadetta). Widening
   it to verb stems would condemn ordinary prose, and the native panels
   are the real guard there. A ban must claim only what it does. */
const WEATHER = new RegExp(
  '(?<!\\p{L})(sun|sunny|cloud|rain|snow|wind|storm|sonne|wolke|regen|schnee|sturm'
  + '|soleil|nuage|pluie|neige|vent|nube|lluvia|nieve|viento|chuva|neve|vento'
  + '|zon|wolk|sneeuw|moln|regn|snö|sne|snø|aurinko|pilvi|sade|lumi|tuuli)(?!\\p{L})', 'iu');

/* ⭐ THE ASKING BAN. `G3-345-read-thermometer` owns "what does it show"
   and ships an ANSWER KEY. The tool SHOWS; it never ASKS. */
const ASKING = /\?/;

const ARITHMETIC = /[+=−↔Δ]|(\s-\s)/;

const POISON = [
  { name: 'unit', re: NAMED_UNIT,
    fire: ['in cm', 'in Zentimetern', 'en centímetros', 'i centimeter', 'senttimetreinä', 'three inches', 'i tum', 'to tommer'],
    pass: ['Zwei Bretter, eine Linie', 'Deux planches, un même départ', 'Los dos tablones',
      'As Duas Ripas', 'Le due travi', 'De latten', 'Plankorna', 'Brædderne', 'Fjølene', 'Lankut'] },
  /* ⭐ NAMING NO UNIT IS THE INVENTION, NOT A LIMITATION — it is what
     lets one object be both a thermometer and a number line, and it
     dissolves the catalog's flagged Fahrenheit risk. */
  { name: 'degree', re: DEGREE,
    fire: ['minus five degrees', 'in Grad', 'fünf Grad kalt', 'cinco grados', 'graus', 'viisi astetta', '20°C', 'Fahrenheit', 'asteita'],
    /* ⚠ `grad` is a live stem in ordinary Germanic prose and `aste-` in
       Finnish — a ban that condemns these would teach a panel to write
       around it instead of reporting it. */
    pass: ['Der Grundschule', 'graduellement', 'a graded task', 'Lay it down', 'Find zero', 'Stand it up', 'asteikko'] },
  { name: 'weather-noun', re: WEATHER,
    fire: ['a sunny day', 'Sonne', 'soleil', 'la nieve', 'sneeuw', 'snö', 'snø', 'aurinko', 'tuuli', 'storm', 'moln'],
    pass: ['Find zero', 'Slide the scale', 'Lay it down', 'Another setting', 'Say out loud how far apart the marks are'] },
  /* ⭐ `G3-345-read-thermometer` owns "what does it show" AND ships an
     answer key. The tool SHOWS; it never ASKS. */
  { name: 'asking', re: ASKING,
    fire: ['How cold is it?', 'Was zeigt es an?', '¿Cuánto marca?'],
    pass: ['Say out loud how far apart the marks are before you move them.', 'Find zero'] },
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
    if (DEGREE.test(v)) fail(`${loc}.${k} NAMES A UNIT — "${v}"`);
    if (WEATHER.test(v)) fail(`${loc}.${k} uses calendar-wall's WEATHER vocabulary — "${v}"`);
    if (ASKING.test(v)) fail(`${loc}.${k} ASKS something — G3-345 owns that question — "${v}"`);
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
console.log(`\n  wrote ${ORDER.length} keys × ${LOCALES.length} locales into mini tools/cold-line.js`);
