#!/usr/bin/env node
/* combine-full.js — union the full-pass batch corrections (verdicts-full/
   <loc>-NN.json) into one corrections-<loc>.json for apply-corrections.
   Each key lives in exactly one batch, so it is a clean union; a key
   appearing in two batches is a hard error (the emit overlapped). Skips
   any proposed fix whose `to` equals the CURRENT value (already-correct
   no-op — e.g. a plural-picture the label fix already set).
   USAGE  node scripts/vocab-audit/combine-full.js --locale=da */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');

const a = process.argv.find((x) => x.startsWith('--locale='));
if (!a) { console.error('FAIL: --locale=<xx> required'); process.exit(1); }
const loc = a.split('=')[1];

const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS/image-vocabulary.js'), 'utf8') + '\n; __O = IMAGE_VOCABULARY;', ctx);
const V = ctx.__O;
const cur = (key, field) => { const r = V[key] && V[key][loc]; if (!r) return undefined; return field === 'singular' ? r[0] : field === 'plural' ? r[1] : (r.length > 2 ? r[2] : undefined); };

const dir = path.join(OUT, 'verdicts-full');
const files = fs.readdirSync(dir).filter((f) => new RegExp('^' + loc + '-\\d+\\.json$').test(f)).sort();
if (!files.length) { console.error('FAIL: no verdicts-full/' + loc + '-*.json'); process.exit(1); }

const out = { singular: {}, plural: {}, gender: {} };
const seen = {}; let noop = 0, dup = 0;
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const c = j.corrections || {};
  for (const field of ['singular', 'plural', 'gender']) {
    for (const [k, v] of Object.entries(c[field] || {})) {
      if (!v || v.to === undefined || v.to === '') continue;
      if (cur(k, field) === v.to) { noop++; continue; }              /* already correct */
      const tag = field + ':' + k;
      if (seen[tag]) { dup++; continue; }
      seen[tag] = true;
      out[field][k] = { from: cur(k, field), to: v.to, why: v.why || '', src: v.src || '' };
    }
  }
}
fs.writeFileSync(path.join(OUT, 'corrections-' + loc + '.json'), JSON.stringify({ locale: loc, reverified: true, corrections: out }, null, 1) + '\n');
console.log(loc + ' full-pass combined: ' + files.length + ' batches → ' +
  Object.keys(out.singular).length + ' singular / ' + Object.keys(out.plural).length + ' plural / ' + Object.keys(out.gender).length + ' gender  (skipped ' + noop + ' no-op, ' + dup + ' dup)');
