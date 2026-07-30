#!/usr/bin/env node
/* =====================================================================
   apply-pattern-bench-locales.js — merge the native ensembles' strings
   into `mini tools/pattern-bench.js`.

   Reads scripts/_pattern-bench-ensembles.json  ({locale: {key: value}}).
   Rewrites the whole `strings:` block from the merged object, so the
   result is generated rather than hand-edited eleven times.

   ⚠ Values are emitted with JSON.stringify (double quotes) on purpose:
   the ensembles return typographic apostrophes and em dashes, and hand
   quoting those into single-quoted JS is exactly how a stray straight
   apostrophe gets in. The build gate checks the PARSED value.

   Usage: node scripts/apply-pattern-bench-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'mini tools', 'pattern-bench.js');
const IN = path.join(__dirname, '_pattern-bench-ensembles.json');
const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const src = fs.readFileSync(SRC, 'utf8');
const add = JSON.parse(fs.readFileSync(IN, 'utf8'));

/* read the existing strings object out of the tool itself */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(src + '\n;this.__T = PatternBench;', sandbox);
const cur = sandbox.__T.strings;
const KEYS = Object.keys(cur);

/* ---- checks BEFORE writing anything ---- */
let bad = 0;
const err = (m) => { bad++; console.error('  ERROR  ' + m); };
ORDER.slice(1).forEach((loc) => {
  if (!add[loc]) { err(`${loc}: missing entirely`); return; }
  const missing = KEYS.filter((k) => !add[loc][k]);
  const extra = Object.keys(add[loc]).filter((k) => KEYS.indexOf(k) === -1);
  if (missing.length) err(`${loc}: missing ${missing.join(', ')}`);
  if (extra.length) err(`${loc}: unknown key(s) ${extra.join(', ')}`);
  KEYS.forEach((k) => {
    const v = add[loc][k];
    if (typeof v !== 'string' || !v.trim()) { err(`${loc}.${k} is empty`); return; }
    if (/'/.test(v)) err(`${loc}.${k} has a straight apostrophe: ${v}`);
    if (v === cur[k].en && !/^(A|B|C|D)$/.test(v)) {
      /* identical to English is only suspicious, not always wrong */
      console.log(`  note   ${loc}.${k} is identical to en ("${v}")`);
    }
  });
});
if (bad) { console.error(`\n${bad} problem(s) — nothing written`); process.exit(1); }

/* ---- rebuild the block ---- */
const merged = {};
KEYS.forEach((k) => {
  merged[k] = {};
  ORDER.forEach((loc) => {
    const v = loc === 'en' ? cur[k].en : add[loc][k];
    if (v) merged[k][loc] = v;
  });
});

const pad = Math.max.apply(null, KEYS.map((k) => k.length));
const block = 'strings: {\n' + KEYS.map((k) => {
  const inner = ORDER.filter((l) => merged[k][l])
    .map((l) => `${l}: ${JSON.stringify(merged[k][l])}`).join(', ');
  return `    ${k}:${' '.repeat(pad - k.length)} { ${inner} }`;
}).join(',\n') + '\n  },';

const start = src.indexOf('  strings: {');
if (start === -1) { console.error('strings block not found'); process.exit(1); }
const end = src.indexOf('\n  },', start);
if (end === -1) { console.error('strings block terminator not found'); process.exit(1); }
const out = src.slice(0, start + 2) + block + src.slice(end + 5);
fs.writeFileSync(SRC, out, 'utf8');

const n = new Set(); KEYS.forEach((k) => Object.keys(merged[k]).forEach((l) => n.add(l)));
console.log(`  ${KEYS.length} strings x ${n.size} locales written`);
