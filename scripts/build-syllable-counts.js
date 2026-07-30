#!/usr/bin/env node
/* =====================================================================
   build-syllable-counts.js — emit `mini tools/syllable-counts.json`, the
   served slice of syllable counts that Sorting Hoops' "how many beats?"
   rule reads.

   ⚠ SOURCE IS THE GATED CORPUS, NOT vocabulary-phonics.json.
   `scripts/v2-data/vocabulary-phonics.json` carries a `syl` for all 1,246
   keys in all 11 locales, but it is ungated and wrong in places — it calls
   English "apple" ONE syllable. §20.7 is explicit that a syllable count
   reaching a child must come from the multi-source gate, so this reads
   `approved-words-<locale>.json`, where every count is agreed by three or
   more independent sources or the word is quarantined out.

   The cost of that choice is coverage: 794-1,120 keys per locale instead
   of 1,246. A key with no gated count for a locale simply gets no entry,
   and the tool keeps it OUT of the tray whenever a syllable rule is set —
   silence rather than a guess.

   Usage: node scripts/build-syllable-counts.js [--write]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output');
const OUT = path.join(ROOT, 'mini tools', 'syllable-counts.json');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WRITE = process.argv.includes('--write');

/* only keys that are real sortable objects */
const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'pww-index-en.json'), 'utf8'));
const inScope = new Set();
idx.themes.forEach((t) => t.c.forEach((c) => { if (!c.na) inScope.add(c.k); }));

const out = {};
const per = {};
LOCALES.forEach((loc) => {
  const f = path.join(SRC, `approved-words-${loc}.json`);
  if (!fs.existsSync(f)) { console.error(`HALT — missing ${f}`); process.exit(1); }
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  let n = 0;
  (j.entries || []).forEach((e) => {
    if (!inScope.has(e.key)) return;
    const c = e.count || (e.split && e.split.length);
    if (!c || c < 1 || c > 6) return;
    if (!out[e.key]) out[e.key] = {};
    out[e.key][loc] = c;
    n++;
  });
  per[loc] = n;
});

const doc = {
  $comment: 'Gate-verified syllable counts (approved-words-<locale>.json, three-source agreement) for the sortable picture keys. A missing (key,locale) means the word was quarantined — the tool must exclude it from a syllable rule rather than guess.',
  v: 1,
  locales: LOCALES,
  count: Object.keys(out).length,
  keys: out
};

console.log('gated syllable counts in scope, per locale:');
LOCALES.forEach((l) => console.log(`  ${l}  ${String(per[l]).padStart(4)}`));
console.log(`union: ${doc.count} keys`);
/* the rule needs at least two distinct counts per locale or it cannot split */
LOCALES.forEach((l) => {
  const vals = new Set();
  Object.keys(out).forEach((k) => { if (out[k][l]) vals.add(out[k][l]); });
  if (vals.size < 2) console.error(`  WARN ${l}: only ${vals.size} distinct count(s) — no syllable rule can split`);
});

if (!WRITE) { console.log('(dry run — pass --write)'); process.exit(0); }
fs.writeFileSync(OUT, JSON.stringify(doc) + '\n', 'utf8');
console.log(`wrote ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB -> mini tools/syllable-counts.json`);
