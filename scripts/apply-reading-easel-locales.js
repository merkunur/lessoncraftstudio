#!/usr/bin/env node
/* =====================================================================
   apply-reading-easel-locales.js — merge the native ensembles' strings
   AND their authored starter lines into `mini tools/reading-easel.js`.

   Reads scripts/_reading-easel-ensembles.json:
     { "<locale>": { "strings": {key: value}, "starters": [8 lines] } }

   Rewrites the whole `strings:` and `starters:` blocks from the merged
   objects, so the result is generated rather than hand-edited eleven
   times.

   ⚠ Values are emitted with JSON.stringify (double quotes) on purpose:
   the ensembles return typographic apostrophes, em dashes and commas,
   and hand-quoting those into single-quoted JS is exactly how a stray
   straight apostrophe gets in. The build gate checks the PARSED value.

   ⚠ LF ONLY. A previous pass rewrote a tool file as CRLF and silently
   un-anchored every multi-line mutation in the harness. Never write
   this file through a tool that translates newlines.

   Usage: node scripts/apply-reading-easel-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'mini tools', 'reading-easel.js');
const IN = path.join(__dirname, '_reading-easel-ensembles.json');
const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const src = fs.readFileSync(SRC, 'utf8');
const add = JSON.parse(fs.readFileSync(IN, 'utf8'));

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(src + '\n;this.__T = ReadingEasel;', sandbox);
const T = sandbox.__T;
const cur = T.strings;
const KEYS = Object.keys(cur);

/* ---- every check BEFORE anything is written ---- */
let bad = 0;
const err = (m) => { bad++; console.error('  ERROR  ' + m); };
ORDER.slice(1).forEach((loc) => {
  const e = add[loc];
  if (!e) { err(`${loc}: missing entirely`); return; }
  const st = e.strings || {};
  const missing = KEYS.filter((k) => !st[k]);
  const extra = Object.keys(st).filter((k) => KEYS.indexOf(k) === -1);
  if (missing.length) err(`${loc}: missing string(s) ${missing.join(', ')}`);
  if (extra.length) err(`${loc}: unknown string key(s) ${extra.join(', ')}`);
  KEYS.forEach((k) => {
    const v = st[k];
    if (typeof v !== 'string' || !v.trim()) { err(`${loc}.${k} is empty`); return; }
    if (/'/.test(v)) err(`${loc}.${k} has a straight apostrophe: ${v}`);
    if (/!/.test(v)) err(`${loc}.${k} has an exclamation mark: ${v}`);
  });
  /* the two placeholders are load-bearing — the aria label is built from them */
  if (st.scoopHere && !(/\{a\}/.test(st.scoopHere) && /\{b\}/.test(st.scoopHere))) {
    err(`${loc}.scoopHere lost a placeholder: ${st.scoopHere}`);
  }
  /* the starter lines */
  const s = e.starters;
  if (!Array.isArray(s) || s.length !== 8) { err(`${loc}: expected 8 starter lines, got ${s ? s.length : 0}`); return; }
  let commas = 0;
  s.forEach((line) => {
    if (/'/.test(line)) err(`${loc}: straight apostrophe in a starter: ${line}`);
    const w = T.tokenize(line);
    if (w.length < 4) err(`${loc}: starter too short to scoop (${w.length} words): ${line}`);
    if (w.length > T.MAX_WORDS) err(`${loc}: starter exceeds the ${T.MAX_WORDS}-word cap: ${line}`);
    if (/,/.test(line)) commas++;
  });
  /* ⚠ at least two lines must carry a real comma, or the class never
     gets to discover that the comma wants a scoop */
  if (commas < 2) err(`${loc}: only ${commas} starter line(s) contain a comma — the punctuation lesson needs at least 2`);
});
if (bad) { console.error(`\n${bad} problem(s) — nothing written`); process.exit(1); }

/* ---- rebuild both blocks ---- */
const merged = {};
KEYS.forEach((k) => {
  merged[k] = {};
  ORDER.forEach((loc) => {
    const v = loc === 'en' ? cur[k].en : add[loc].strings[k];
    if (v) merged[k][loc] = v;
  });
});

const pad = Math.max.apply(null, KEYS.map((k) => k.length));
const stringsBlock = 'strings: {\n' + KEYS.map((k) => {
  const inner = ORDER.filter((l) => merged[k][l])
    .map((l) => `${l}: ${JSON.stringify(merged[k][l])}`).join(', ');
  return `    ${k}:${' '.repeat(pad - k.length)} { ${inner} }`;
}).join(',\n') + '\n  },';

const startersBlock = 'starters: {\n' + ORDER.map((loc) => {
  const pool = loc === 'en' ? T.starters.en : add[loc].starters;
  return `    ${loc}: [\n` + pool.map((l) => `      ${JSON.stringify(l)}`).join(',\n') + '\n    ]';
}).join(',\n') + '\n  },';

function replaceBlock(text, startMarker, block) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error(`block not found: ${startMarker}`);
  const end = text.indexOf('\n  },', start);
  if (end === -1) throw new Error(`terminator not found for ${startMarker}`);
  return text.slice(0, start + 2) + block + text.slice(end + 5);
}

let out = replaceBlock(src, '  strings: {', stringsBlock);
out = replaceBlock(out, '  starters: {', startersBlock);
fs.writeFileSync(SRC, out.replace(/\r\n/g, '\n'), 'utf8');

const locs = new Set();
KEYS.forEach((k) => Object.keys(merged[k]).forEach((l) => locs.add(l)));
console.log(`  ${KEYS.length} strings x ${locs.size} locales`);
console.log(`  ${ORDER.length} starter pools x 8 lines`);
