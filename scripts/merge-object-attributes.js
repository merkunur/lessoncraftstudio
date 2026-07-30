#!/usr/bin/env node
/* =====================================================================
   merge-object-attributes.js — PHASE A step 2.

   Applies the reviewed corrections to the seed and writes the shipping
   corpus `mini tools/object-attributes.json`.

   Change format, one per line:  key|field=value,field=value|why
   Anything unparseable, any unknown key, any unknown field and any value
   outside the closed enum HALTS — the corpus is never written from a
   partially-understood change set.

   Usage: node scripts/merge-object-attributes.js <changes.txt> [--write]
   Without --write it reports and mutates nothing.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SEED_PATH = path.join(ROOT, 'mini tools', '_object-attributes.seed.json');
const OUT_PATH = path.join(ROOT, 'mini tools', 'object-attributes.json');
const CHANGES = process.argv[2];
const WRITE = process.argv.includes('--write');

const ENUM = {
  living: ['living', 'once_living', 'never_living'],
  natural: ['natural', 'made'],
  edible: ['yes', 'no'],
  moves: ['self', 'moved', 'still'],
  size_band: ['hand', 'person', 'bigger'],
  habitat: ['land', 'water', 'air', 'none']
};
const FIELDS = Object.keys(ENUM);

if (!CHANGES || !fs.existsSync(CHANGES)) { console.error('usage: merge-object-attributes.js <changes.txt> [--write]'); process.exit(1); }

const seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
const rec = seed.keys;
const errs = [];
let applied = 0, fieldsChanged = 0, noops = 0;
const reasons = {};

fs.readFileSync(CHANGES, 'utf8').split('\n').forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith('#')) return;
  const parts = line.split('|');
  if (parts.length !== 3) { errs.push(`L${i + 1}: expected 3 pipe-separated parts, got ${parts.length}`); return; }
  const [key, sets, why] = parts.map((s) => s.trim());
  if (!rec[key]) { errs.push(`L${i + 1}: unknown key "${key}" (not in the seed)`); return; }
  let touched = 0;
  sets.split(',').forEach((pair) => {
    const m = /^([a-z_]+)=([a-z_]+)$/.exec(pair.trim());
    if (!m) { errs.push(`L${i + 1} ${key}: cannot parse "${pair}"`); return; }
    const [, f, v] = m;
    if (!ENUM[f]) { errs.push(`L${i + 1} ${key}: unknown field "${f}"`); return; }
    if (ENUM[f].indexOf(v) === -1) { errs.push(`L${i + 1} ${key}: "${v}" not a valid ${f} (${ENUM[f].join('|')})`); return; }
    if (rec[key][f] === v) { noops++; return; }
    rec[key][f] = v; touched++; fieldsChanged++;
  });
  if (touched) { applied++; reasons[key] = why; }
});

if (errs.length) {
  console.error(`HALT — ${errs.length} problem(s) in the change set:`);
  errs.slice(0, 30).forEach((e) => console.error('  ' + e));
  process.exit(1);
}

console.log(`change set clean: ${applied} keys changed, ${fieldsChanged} field(s), ${noops} already-agreed no-op(s)`);

/* strip provenance; the shipped corpus is language-neutral data only */
const out = {};
Object.keys(rec).sort().forEach((k) => {
  const r = {};
  FIELDS.forEach((f) => { r[f] = rec[k][f]; });
  out[k] = r;
});

const doc = {
  $comment: 'Conceptual attributes of the depicted OBJECT — language-independent, never about the picture or the word. Seeded from picture-library theme membership, then corrected per key. Consumed by mini tools/sorting-hoops.js.',
  $fields: ENUM,
  v: 1,
  count: Object.keys(out).length,
  reviewed: applied,
  keys: out
};

if (!WRITE) {
  console.log(`(dry run — would write ${doc.count} keys to mini tools/object-attributes.json)`);
  process.exit(0);
}
fs.writeFileSync(OUT_PATH, JSON.stringify(doc, null, 1) + '\n', 'utf8');
fs.writeFileSync(path.join(ROOT, 'mini tools', '_object-attributes.reasons.json'),
  JSON.stringify(reasons, null, 1) + '\n', 'utf8');
console.log(`wrote ${doc.count} keys -> mini tools/object-attributes.json`);
