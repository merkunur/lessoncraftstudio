#!/usr/bin/env node
/* =====================================================================
   apply-ten-frame-locales.js — writes the native panels' strings into
   `mini tools/ten-frame.js`.

   Run:  node scripts/apply-ten-frame-locales.js [--dry-run]

   SoT: `scripts/_tnf-panels/<locale>.json`, one file per non-English
   locale, each produced by a three-person NATIVE panel (§A.13.48) that
   was handed the English as a SOURCE TO AUDIT rather than a target.
   English stays authored in the tool file itself.

   ⚠ ONE PHYSICAL LINE PER KEY. The applier rebuilds each key's whole
   line from {tool-file English} + {panel files}, and DIES rather than
   reflow a file the verify gate reads by line.

   ⚠ IT REFUSES TO RUN ON A PARTIAL SET. A panel file that is missing,
   short of a key, or carrying a placeholder that does not belong is a
   HALT — never a locale quietly left on the builder's draft. That is
   the whole failure mode this file exists to prevent.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'ten-frame.js');
const PANELS = path.join(__dirname, '_tnf-panels');
const LOCALES = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ORDER = ['en'].concat(LOCALES);
const DRY = process.argv.includes('--dry-run');

/* which placeholders each template is allowed to carry — the same table
   the verify gate holds, deliberately duplicated here so the applier
   refuses bad input rather than writing it and letting the gate find it */
const NEEDS = {
  filledAt: ['n'], trayAria: ['n'], numeralAria: ['n'],
  saidBoard: ['n', 'cap'], saidRoom: ['n', 'cap', 'left'],
  saidTidied: ['n', 'cap'], saidFull: ['cap'], saidField: ['field', 'n', 'cap']
};
const INVISIBLE = /[\u00AD\u200B\u200C\u200D\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F]/;

function die(msg) { console.error('HALT: ' + msg); process.exit(1); }

const src = fs.readFileSync(TOOL, 'utf8');
const source = JSON.parse(fs.readFileSync(path.join(PANELS, '_source-en.json'), 'utf8'));
const KEYS = Object.keys(source);

/* ---- load every panel, or refuse ---- */
const panel = {};
for (const loc of LOCALES) {
  const p = path.join(PANELS, loc + '.json');
  if (!fs.existsSync(p)) die(`no panel file for ${loc} (${p}). A partial fan-out is not a fan-out.`);
  let j;
  try { j = JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { die(`${loc}.json is not valid JSON: ${e.message}`); }
  for (const k of KEYS) {
    if (typeof j[k] !== 'string' || !j[k].trim()) die(`${loc}.json is missing key "${k}"`);
    if (INVISIBLE.test(j[k])) die(`${loc}.json "${k}" carries an invisible character`);
    const found = (j[k].match(/\{[a-z]+\}/g) || []).map((s) => s.slice(1, -1));
    const need = NEEDS[k] || [];
    for (const n of need) if (found.indexOf(n) === -1) die(`${loc}.json "${k}" has lost {${n}}`);
    for (const f of found) if (need.indexOf(f) === -1) die(`${loc}.json "${k}" carries a stray {${f}}`);
  }
  /* ⚠ the title is locked — the panels were told, and the applier
     enforces it rather than trusting that they were */
  panel[loc] = j;
}

const LOCKED_TITLE = {
  en: 'Ten Frame', de: 'Zehnerfeld', fr: 'Cadre de dix', it: 'Tabella del dieci',
  es: 'Marco de diez', pt: 'Quadro de dez', nl: 'Tienraam', sv: 'Tioram',
  da: 'Tierramme', no: 'Tierramme', fi: 'Kymmenruudukko'
};
for (const loc of LOCALES) {
  if (panel[loc].title !== LOCKED_TITLE[loc]) {
    die(`${loc}.json renamed the tool to "${panel[loc].title}". The title is an indexed URL ` +
        `slug and the head term in this locale; it is LOCKED to "${LOCKED_TITLE[loc]}".`);
  }
}

/* ---- rebuild one physical line per key ---- */
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
let out = src, changed = 0;
for (const k of KEYS) {
  const re = new RegExp('^([ \\t]*)' + k + ':\\s*\\{[^\\n]*\\},?[ \\t]*$', 'm');
  const m = re.exec(out);
  if (!m) die(`could not find the single-line declaration for "${k}" in ten-frame.js`);
  const hadComma = /,\s*$/.test(m[0]);
  const parts = ORDER.map((loc) => {
    const v = (loc === 'en') ? source[k] : panel[loc][k];
    return loc + ":'" + esc(v) + "'";
  });
  const line = m[1] + k + ': {' + parts.join(',') + '}' + (hadComma ? ',' : '');
  if (line !== m[0]) changed++;
  out = out.replace(re, () => line);
}

if (DRY) {
  console.log(`dry run: ${changed} of ${KEYS.length} key lines would change across ${LOCALES.length} locales`);
  process.exit(0);
}
fs.writeFileSync(TOOL, out, 'utf8');
console.log(`applied ${LOCALES.length} native panels: ${changed} of ${KEYS.length} key lines rewritten`);
console.log('now run: node scripts/verify-ten-frame.js && node scripts/smoke-ten-frame-locales.js');
