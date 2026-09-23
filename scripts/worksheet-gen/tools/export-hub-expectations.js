#!/usr/bin/env node
/**
 * export-hub-expectations.js [--check]
 *
 * The nt20-C README (docs/worksheet-gen/b3-designs/README.md) carries the
 * hub-gate expectation matrix — rows per (family key × locale) that
 * /[locale]/worksheets must list under the type once the batch is live. The
 * README is the SoT; this exports the table to hub-expectations.json, which
 * scripts/verify-hub-type-rows.js reads. Never hand-edit the JSON: change the
 * README, re-export. `--check` re-parses and diffs against the committed JSON
 * (a README edit without a re-export FAILS).
 *
 * Cell grammar: the FIRST integer is the design-time expectation, the LAST is
 * the ceiling ("1→6" = 1 now, 6 when the panel data lands; "6 (5)" = 6 with a
 * contingency of 5; "47 (55 ceiling)").
 */
'use strict';
const fs = require('fs');
const path = require('path');

// --batch=b3 (default) | b4 : which design directory's README matrix to export (nt10-D added 2026-09-21;
// the verifier still reads the b3 JSON until the b4 batch is built and its keys are wired in).
const BATCH_ARG = process.argv.find((a) => a.startsWith('--batch='));
const BATCH = BATCH_ARG ? BATCH_ARG.slice('--batch='.length) : 'b3';
if (!/^b[345]$/.test(BATCH)) { console.error('export-hub-expectations: --batch must be b3, b4 or b5'); process.exit(1); }
const DIR = BATCH + '-designs';
const MIN_KEYS = (BATCH === 'b4' || BATCH === 'b5') ? 10 : 20;
const README = path.resolve(__dirname, '..', '..', '..', 'docs', 'worksheet-gen', DIR, 'README.md');
const OUT = path.resolve(__dirname, '..', '..', '..', 'docs', 'worksheet-gen', DIR, 'hub-expectations.json');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// live nt20-B / nt20-B-VAR keys with measured, locale-uniform row counts — the gate's control set
const CONTROLS = { articles: 4, 'word-tracing': 7, 'letter-tracing': 6 };

function parse() {
  const lines = fs.readFileSync(README, 'utf8').split(/\r?\n/);
  const head = lines.findIndex((l) => /^\|\s*key\s*\|\s*en\s*\|/.test(l));
  if (head < 0) throw new Error('export-hub-expectations: matrix header row not found in README');
  const hdr = lines[head].split('|').map((s) => s.trim()).filter(Boolean);
  const locIdx = LOCALES.map((l) => hdr.indexOf(l));
  if (locIdx.some((i) => i < 0)) throw new Error('export-hub-expectations: header lacks a locale column: ' + hdr.join(','));
  const keys = {}, ceiling = {}, notes = {};
  for (let i = head + 2; i < lines.length; i++) {
    const l = lines[i];
    if (!l.startsWith('|')) break;
    const cells = l.split('|').slice(1, -1).map((s) => s.trim());
    const key = cells[0];
    if (!key || key.startsWith('**')) continue;   // the design-total row
    keys[key] = {}; ceiling[key] = {};
    for (let k = 0; k < LOCALES.length; k++) {
      const cell = cells[locIdx[k]] || '';
      const ints = (cell.match(/\d+/g) || []).map(Number);
      if (!ints.length) throw new Error('export-hub-expectations: no integer in cell ' + key + '/' + LOCALES[k] + ': "' + cell + '"');
      keys[key][LOCALES[k]] = ints[0];
      ceiling[key][LOCALES[k]] = ints[ints.length - 1];
    }
    notes[key] = cells[cells.length - 1] || '';
  }
  const n = Object.keys(keys).length;
  if (n < MIN_KEYS) throw new Error('export-hub-expectations: parsed only ' + n + ' keys (expected ' + MIN_KEYS + ')');
  return { source: 'docs/worksheet-gen/' + DIR + '/README.md (hub-gate expectation matrix)', locales: LOCALES, keys, ceiling, notes, controls: CONTROLS };
}

const parsed = parse();
const json = JSON.stringify(parsed, null, 1) + '\n';
if (process.argv.includes('--check')) {
  if (!fs.existsSync(OUT)) { console.error('hub-expectations.json missing — run without --check'); process.exit(1); }
  const cur = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  const a = JSON.stringify({ keys: cur.keys, ceiling: cur.ceiling, notes: cur.notes, controls: cur.controls });
  const b = JSON.stringify({ keys: parsed.keys, ceiling: parsed.ceiling, notes: parsed.notes, controls: parsed.controls });
  if (a !== b) { console.error('hub-expectations.json is STALE vs the README matrix — re-export'); process.exit(1); }
  console.log('hub-expectations.json matches the README (' + Object.keys(parsed.keys).length + ' keys)');
  process.exit(0);
}
fs.writeFileSync(OUT, json);
const total = Object.values(parsed.keys).reduce((s, row) => s + Object.values(row).reduce((x, y) => x + y, 0), 0);
console.log('wrote ' + OUT + ': ' + Object.keys(parsed.keys).length + ' keys, design total ' + total);
