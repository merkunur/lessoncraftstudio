#!/usr/bin/env node
/* =====================================================================
   apply-folding-sheet-locales.js — merge the native-ensemble strings
   into `mini tools/folding-sheet.js`, replacing the builder drafts.

   ⚠ EN IS NEVER TOUCHED. It is the authored source; the ten others are
   REBUILT by their own panels (§A.13.48), not translated, so this
   overwrites them wholesale rather than patching.

   Idempotent: run it twice and the second run reports 0 changes.
   Usage: node scripts/apply-folding-sheet-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'folding-sheet.js');
const ENS = require('./_folding-sheet-ensembles.json');
const DRY = process.argv.includes('--dry-run');

const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NON_EN = ORDER.filter((l) => l !== 'en');

let src = fs.readFileSync(SRC_PATH, 'utf8');
const block = /strings:\s*\{\n([\s\S]*?)\n  \},\n/.exec(src);
if (!block) { console.error('  FATAL: the strings block was not found'); process.exit(1); }

/* every key the tool declares, in the order it declares them */
const keyRe = /^    ([a-zA-Z]+):\s+\{(.*)\},$/gm;
const lines = [];
let m, changed = 0;
while ((m = keyRe.exec(block[1])) !== null) lines.push({ key: m[1], raw: m[0], body: m[2] });
if (!lines.length) { console.error('  FATAL: no string lines parsed'); process.exit(1); }

const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

lines.forEach((L) => {
  /* keep en exactly as authored */
  const en = /(?:^|[{,])\s*en:\s*"((?:[^"\\]|\\.)*)"/.exec(L.body);
  if (!en) { console.error(`  FATAL: ${L.key} has no en value`); process.exit(1); }
  const parts = ['en: ' + q(en[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'))];
  NON_EN.forEach((loc) => {
    const v = ENS[loc] && ENS[loc][L.key];
    if (v === undefined) { console.error(`  FATAL: ${loc}.${L.key} missing from the ensembles file`); process.exit(1); }
    parts.push(loc + ': ' + q(v));
  });
  const rebuilt = '    ' + L.key + ':'.padEnd(1) + ' '.repeat(Math.max(1, 14 - L.key.length))
    + '{ ' + parts.join(', ') + ' },';
  if (rebuilt !== L.raw) { changed++; src = src.split(L.raw).join(rebuilt); }
});

/* every placeholder the tool relies on must survive the rebuild */
['{r}', '{c}'].forEach((ph) => {
  NON_EN.concat(['en']).forEach((loc) => {
    const v = loc === 'en' ? null : ENS[loc].cellAria;
    if (v && v.indexOf(ph) === -1) { console.error(`  FATAL: ${loc}.cellAria lost the ${ph} placeholder`); process.exit(1); }
  });
});

if (DRY) { console.log(`  dry run — ${changed} line(s) would change`); process.exit(0); }
fs.writeFileSync(SRC_PATH, src.replace(/\r\n/g, '\n'), 'utf8');
console.log(`  ${changed} string line(s) rewritten from the native ensembles`);
console.log('  en untouched; ' + NON_EN.length + ' locales replaced wholesale');
