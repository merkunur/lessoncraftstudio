#!/usr/bin/env node
/**
 * apply-ntr-strings.js — Level Set 2026-10-13, Number Tracing. Writes the level-3 printed instruction of the
 * RANGE pages (K-237 / K-249 / K-250 / K-251 = digit wording, K-252 / K-253 = number wording) from
 * data/tracing/number-tracing-levelset.json `range3` into i18n/level-instructions.json. Level 1 of the range
 * pages keeps the published instruction (every slot traced from its own orange dot — still true). The
 * per-number pages read their strings through K-237 copyStrings, not from here. Idempotent.
 *
 *   node tools/level-set/apply-ntr-strings.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LI = path.join(ROOT, 'i18n', 'level-instructions.json');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'tracing', 'number-tracing-levelset.json'), 'utf8'));
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FORM = { 'K-237': 'digit', 'K-249': 'digit', 'K-250': 'digit', 'K-251': 'digit', 'K-252': 'number', 'K-253': 'number' };

const text = fs.readFileSync(LI, 'utf8');
const li = JSON.parse(text);
let changed = 0;
for (const [id, form] of Object.entries(FORM)) {
  const src = data.range3[form];
  const want = {};
  for (const l of LOCALES) {
    if (!src[l]) throw new Error(`range3.${form} has no ${l}`);
    want[l] = src[l];
  }
  const cur = li[id] && li[id]['3'];
  if (JSON.stringify(cur) !== JSON.stringify(want)) { li[id] = { ...(li[id] || {}), 3: want }; changed++; }
}
if (process.argv.includes('--check')) {
  console.log(changed ? `${changed} entries out of date` : 'level-instructions up to date');
  process.exit(changed ? 1 : 0);
}
const out = JSON.stringify(li, null, 1) + '\n';
if (out !== text) fs.writeFileSync(LI, out);
console.log(`${changed} type entries written`);
