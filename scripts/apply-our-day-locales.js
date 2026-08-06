#!/usr/bin/env node
/* =====================================================================
   apply-our-day-locales.js — rewrite the localised tables in
   `mini tools/our-day.js` from the native panels' output in
   `scripts/_our-day-strings.json`, and add the new catalogue cards from
   `scripts/_our-day-new-cards.js`.

   ⚠ IDEMPOTENT. A second run must report every point as already done.

   ⚠ REBUILD, NEVER TRANSLATE (§A.13.48). The JSON is what eleven native
   panels returned when handed the English as a SOURCE TO AUDIT. Their
   `sourceDefects` lists are kept in the JSON on purpose — they are the
   record of what the English got wrong, and three of them were bugs in
   the MODEL, not the copy.

   Usage:  node scripts/apply-our-day-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'our-day.js');
const DRY = process.argv.indexOf('--dry-run') >= 0;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const panels = JSON.parse(fs.readFileSync(path.join(__dirname, '_our-day-strings.json'), 'utf8'));
const cards = require('./_our-day-new-cards.js');

let src = fs.readFileSync(TOOL, 'utf8');
const before = src;
const log = [];

/* ---- every panel must be present, or this is a partial write ---- */
const missing = LOCALES.filter((l) => !panels[l] || !panels[l].strings);
if (missing.length) {
  console.error('REFUSING TO RUN — no panel output for: ' + missing.join(', '));
  console.error('A partial locale write is worse than none: the untouched locales keep');
  console.error('an English source the panels have already shown to be wrong.');
  process.exit(1);
}

function esc(v) { return String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
function row(indent, key, byLocale) {
  const parts = LOCALES.filter((l) => byLocale[l] !== undefined && byLocale[l] !== null)
    .map((l) => l + ":'" + esc(byLocale[l]) + "'");
  return indent + key + ': {' + parts.join(',') + '},';
}

/* ---- 1. strings ---- */
const stringKeys = Object.keys(panels.en.strings);
let strDone = 0;
stringKeys.forEach((k) => {
  const by = {};
  LOCALES.forEach((l) => { if (panels[l].strings[k] !== undefined) by[l] = panels[l].strings[k]; });
  if (Object.keys(by).length !== LOCALES.length) { log.push('SKIP string ' + k + ' (not in every panel)'); return; }
  const re = new RegExp('^(    ' + k + ':\\s*)\\{en:(?:[^\\n])*\\},?$', 'm');
  if (!re.test(src)) { log.push('SKIP string ' + k + ' (no anchor)'); return; }
  src = src.replace(re, row('    ', k, by).replace(/,$/, ','));
  strDone++;
});
log.push('strings rewritten: ' + strDone + '/' + stringKeys.length);

/* ---- 2. new cards: CARDS + NAMES + ICON_PATHS ---- */
let added = 0;
cards.ADD.forEach((c) => {
  if (src.indexOf("{ id: '" + c.id + "',") >= 0) return;          /* idempotent */
  const by = {};
  LOCALES.forEach((l) => { by[l] = (panels[l].cardNames || {})[c.id] || c.en; });
  const pad = ' '.repeat(Math.max(1, 11 - c.id.length));
  const cardRow = "    { id: '" + c.id + "'," + pad + 'group: ' + c.group + ' },';
  src = src.replace(/^(    \{ id: 'celebrate',.*)$/m, '$1\n' + cardRow);
  src = src.replace(/^(    celebrate: \{en:.*)$/m, '$1\n' + row('    ', c.id, by));
  src = src.replace(/^(    celebrate: '.*',?)$/m, "$1\n    " + c.id + ": '" + c.icon.replace(/'/g, "\\'") + "',");
  added++;
});
log.push('cards added: ' + added + '/' + cards.ADD.length);

/* ---- 3. rescoped names ---- */
Object.keys(cards.RESCOPE || {}).forEach((id) => {
  const by = {};
  LOCALES.forEach((l) => { by[l] = (panels[l].cardNames || {})[id]; });
  if (LOCALES.some((l) => !by[l])) { log.push('SKIP rescope ' + id); return; }
  const re = new RegExp('^(    ' + id + ':\\s*)\\{en:(?:[^\\n])*\\},?$', 'm');
  if (re.test(src)) { src = src.replace(re, row('    ', id, by)); log.push('rescoped: ' + id); }
});

/* ---- 4. per-locale name corrections the panels ruled on ---- */
const NAME_FIX = {
  religion: { fi: 'Katsomustunti', da: 'Kristendomskundskab' },
  crafts:   { no: 'Formingsstund' }
};
Object.keys(NAME_FIX).forEach((id) => {
  Object.keys(NAME_FIX[id]).forEach((loc) => {
    const re = new RegExp('(^    ' + id + ': \\{[^\\n]*?)' + loc + ":'[^']*'", 'm');
    if (re.test(src)) { src = src.replace(re, '$1' + loc + ":'" + esc(NAME_FIX[id][loc]) + "'"); log.push('name fix: ' + id + '.' + loc); }
  });
});

/* ---- 5. ANNOUNCE — the sentence-internal forms ---- */
const ann = {};
LOCALES.forEach((l) => { if (panels[l].announce && Object.keys(panels[l].announce).length) ann[l] = panels[l].announce; });
if (Object.keys(ann).length) {
  const re = /^  ANNOUNCE: \{[\s\S]*?\n  \},$/m;
  if (re.test(src)) {
    /* merge onto what is already there rather than replacing it — the
       existing fi/nl tables are hand-authored and must survive */
    const existing = /ANNOUNCE: \{([\s\S]*?)\n  \},/m.exec(src);
    const lines = ['  ANNOUNCE: {'];
    LOCALES.forEach((l) => {
      const prevRow = new RegExp('^\\s*' + l + ': \\{(.*)\\},?$', 'm').exec(existing[1] || '');
      const merged = [];
      if (prevRow) merged.push(prevRow[1].trim().replace(/,$/, ''));
      if (ann[l]) {
        const add = Object.keys(ann[l])
          .filter((k) => !prevRow || prevRow[1].indexOf(k + ':') < 0)
          .map((k) => k + ": '" + esc(ann[l][k]) + "'");
        if (add.length) merged.push(add.join(', '));
      }
      if (merged.length) lines.push('    ' + l + ': { ' + merged.join(', ') + ' },');
    });
    lines.push('  },');
    src = src.replace(re, lines.join('\n'));
    log.push('ANNOUNCE merged for ' + Object.keys(ann).length + ' locale(s)');
  }
}

/* ---- 6. fi TIME_NAMES — the new cards cannot be sentence subjects ----
   Without these the premium time frame emits "the special-ed teacher
   begins…" and a plural subject with a singular verb. */
const FI_TIME = {
  onetoone: 'Erityisopettajan tunti',
  changepe: 'Liikuntavaatteiden vaihto',
  helper: 'Päivystäjän vuoro',
  homelang: 'Oman äidinkielen tunti'
};
{
  const re = /(^  TIME_NAMES: \{\s*\n\s*fi: \{)([^\n]*?)(\},?)/m;
  const m = re.exec(src);
  if (m) {
    const add = Object.keys(FI_TIME).filter((k) => m[2].indexOf(k + ':') < 0)
      .map((k) => k + ": '" + esc(FI_TIME[k]) + "'");
    if (add.length) {
      src = src.replace(re, m[1] + m[2].replace(/\s*$/, '') + ', ' + add.join(', ') + ' ' + m[3]);
      log.push('fi TIME_NAMES: +' + add.length + ' rows');
    } else log.push('fi TIME_NAMES: already complete');
  } else log.push('SKIP fi TIME_NAMES (no anchor)');
}

/* ---- 7. removals ---- */
(cards.REMOVE || []).forEach((id) => {
  const re = new RegExp("^    \\{ id: '" + id + "'.*$\\n", 'm');
  if (re.test(src)) { src = src.replace(re, ''); log.push('card removed from the palette: ' + id); }
});

/* ---- report ---- */
log.forEach((l) => console.log('  ' + l));
if (src === before) { console.log('\nno change — already applied (idempotent)'); process.exit(0); }
if (DRY) { console.log('\n--dry-run: nothing written'); process.exit(0); }
fs.writeFileSync(TOOL, src, 'utf8');
console.log('\nwritten to ' + TOOL);
