#!/usr/bin/env node
/* apply-plural-picture-labels.js — set both slots of each plural-picture to
   the correct PLURAL (the label IS the plural; operator ruling). Kills the
   invented forms (Gardinere/Krykkere/Guanci/Tendi...). Reads the labels file
   the micro-agent produced; keeps the gender element; rewrites key lines
   surgically. --apply to write. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REPO = path.join(__dirname, '..', '..');
const REL = 'REFERENCE TRANSLATIONS/image-vocabulary.js';
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function load(src) { const c = { window: {} }; vm.createContext(c); vm.runInContext(src + '\n; __O = IMAGE_VOCABULARY;', c); return c.__O; }

let src = fs.readFileSync(path.join(REPO, REL), 'utf8');
const V = load(src);
const labels = JSON.parse(fs.readFileSync(path.join(REPO, 'docs/audit-results/vocab-audit/plural-picture-labels.json'), 'utf8')).rows;
const apply = process.argv.includes('--apply');

const byKey = {};
for (const r of labels) (byKey[r.key] = byKey[r.key] || {})[r.locale] = r.plural;

let slots = 0, miss = [], changes = [];
for (const key of Object.keys(byKey)) {
  const row = V[key];
  if (!row) { miss.push(key); continue; }
  const next = {};
  for (const l of LOC) {
    if (!row[l]) continue;
    const r = row[l].slice();
    if (byKey[key][l]) { const p = byKey[key][l]; if (r[0] !== p || r[1] !== p) { r[0] = p; r[1] = p; slots++; } }
    next[l] = r;
  }
  changes.push({ key, next });
}

function rewrite(source, key, next) {
  const esc = key.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
  const re = new RegExp('^(\\s*)"' + esc + '":\\s*\\{.*?\\},?\\s*$', 'm');
  const m = source.match(re);
  if (!m) return null;
  const parts = LOC.filter((l) => next[l]).map((l) => '"' + l + '":[' + next[l].map((x) => JSON.stringify(x)).join(',') + ']');
  const line = m[1] + '"' + key + '": {' + parts.join(',') + '}' + (/,\s*$/.test(m[0]) ? ',' : '');
  return source.replace(re, () => line);   /* function replacement → no $-escaping hazard */
}

for (const ch of changes) {
  const nx = rewrite(src, ch.key, ch.next);
  if (nx === null) { miss.push(ch.key); continue; }
  src = nx;
}
if (miss.length) { console.error('FAIL: could not locate key lines: ' + miss.join(', ')); process.exit(1); }

const after = load(src);
if (Object.keys(after).length !== 1263) { console.error('FAIL: key count ' + Object.keys(after).length); process.exit(1); }

console.log((apply ? 'APPLIED ' : 'DRY ') + slots + ' plural-picture slots across ' + changes.length + ' keys');
console.log('  curtains.da → ' + JSON.stringify(after.curtains.da));
console.log('  cheeks.sv   → ' + JSON.stringify(after.cheeks.sv));
console.log('  cymbals.da  → ' + JSON.stringify(after.cymbals.da));
if (apply) { fs.writeFileSync(path.join(REPO, REL), src); console.log('→ wrote ' + REL); }
else console.log('(dry-run — re-run with --apply)');
