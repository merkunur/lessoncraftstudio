#!/usr/bin/env node
/* =====================================================================
   apply-pattern-bench-locales.js — merge the native panels' strings into
   `mini tools/pattern-bench.js`.

   Reads scripts/_pattern-bench-ensembles.json  ({locale: {key: value}}).
   Rewrites ONLY the keys present in that file, leaving every other string
   byte-identical — so a panel that revised four strings does not silently
   re-emit the other twenty-six.

   ⚠ Values are emitted with JSON.stringify (double quotes) on purpose:
   the panels return typographic apostrophes and em dashes, and hand
   quoting those into single-quoted JS is exactly how a stray straight
   apostrophe gets in. The build gate checks the PARSED value.

   ⚠ EVERY LOCALE OR NONE, PER KEY. A key rewritten for eight locales and
   left shipped for three is worse than not touching it: the eight new
   readings and the three old ones would then disagree about what the
   tool does, which is precisely the defect this run exists to fix.

   Usage: node scripts/apply-pattern-bench-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'mini tools', 'pattern-bench.js');
const IN = path.join(__dirname, '_pattern-bench-ensembles.json');
const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') > -1;

let src = fs.readFileSync(SRC, 'utf8');
const add = JSON.parse(fs.readFileSync(IN, 'utf8'));

/* ---- checks BEFORE writing anything ---- */
let bad = 0;
const err = (m) => { bad++; console.error('  ERROR  ' + m); };

const keys = {};
ORDER.forEach((loc) => {
  if (!add[loc]) { err(`${loc}: missing entirely`); return; }
  Object.keys(add[loc]).forEach((k) => { keys[k] = (keys[k] || 0) + 1; });
});
Object.keys(keys).forEach((k) => {
  if (keys[k] !== ORDER.length) err(`key "${k}" is present for only ${keys[k]}/${ORDER.length} locales`);
});
ORDER.forEach((loc) => {
  Object.keys(add[loc] || {}).forEach((k) => {
    const v = add[loc][k];
    if (typeof v !== 'string' || !v.trim()) err(`${loc}.${k} is empty`);
    if (/'/.test(v)) err(`${loc}.${k} carries a straight apostrophe: ${v}`);
  });
});
if (bad) { console.error(`\nrefusing to write — ${bad} problem(s)`); process.exit(1); }

/* ---- rewrite, one key at a time ---- */
let written = 0;
Object.keys(keys).forEach((k) => {
  /* the strings block keeps one key per line: `key:<pad>{ en: "…", … },` */
  /* ⚠ THE TRAILING COMMA IS OPTIONAL. The LAST key in the strings object
     has none, so a matcher that demands `},` silently reports "the block
     shape changed" for exactly one key — and the run refuses to write
     while every other key was fine. */
  const re = new RegExp('(\\n\\s*' + k + ':\\s*)\\{[^\\n]*\\},?');
  const m = re.exec(src);
  if (!m) { err(`no strings entry for "${k}" — the block shape changed`); return; }
  if (re.exec(src.slice(m.index + 1))) { err(`"${k}" matched more than once`); return; }
  const body = ORDER.map((loc) => loc + ': ' + JSON.stringify(add[loc][k])).join(', ');
  src = src.replace(re, m[1] + '{ ' + body + ' },');
  written++;
});
if (bad) { console.error(`\nrefusing to write — ${bad} problem(s)`); process.exit(1); }

if (DRY) { console.log(`dry run — would rewrite ${written} key(s) x ${ORDER.length} locales`); process.exit(0); }
fs.writeFileSync(SRC, src, 'utf8');
console.log(`rewrote ${written} key(s) x ${ORDER.length} locales into mini tools/pattern-bench.js`);
