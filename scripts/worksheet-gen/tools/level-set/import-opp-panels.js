#!/usr/bin/env node
/**
 * import-opp-panels.js — Level Set 2026-09-28 (Opposites): the native panels' additions →
 * data/b3/opposites-levelset.json (new pairs / frames / prefix items / pictures for NEW copies only — the
 * published pages never read it), the per-level printed instructions (i18n/level-instructions.json) and the
 * screen instructions (i18n/interactive-instructions.json → opposites.<layout>).
 *
 *   node tools/level-set/import-opp-panels.js <dir> [--only=<locs>] [--partial]
 *
 * Every locale must pass validate-opp-content.js (the family gate's validateBank on the merged bank); a failing
 * locale REFUSES the import.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { toLevelset, INSTR_KEYS, SCREEN_KEYS } = require('./opp-common.js');

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-opp-panels.js <dir> [--only=…] [--partial]');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const partial = process.argv.includes('--partial');
const only = arg('only') ? arg('only').split(',') : null;
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'].filter((l) => !only || only.includes(l));
const ROOT = path.join(__dirname, '..', '..');
const outFile = path.join(ROOT, 'data', 'b3', 'opposites-levelset.json');
const out = fs.existsSync(outFile) && partial ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
out._note = 'Level Set 2026-09-28 — Opposites: new pairs, sentence frames and prefix items by 11 native panels (+ the full/empty and summer/winter pictures, opened in session); importer tools/level-set/import-opp-panels.js. Merged onto the published bank by G1-307 mergedBank() for NEW copies only; the published pages never read this file.';
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
const scrFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const scr = JSON.parse(fs.readFileSync(scrFile, 'utf8'));
scr.opposites = scr.opposites || {};
for (const loc of LOCS) {
  const f = path.join(dir, `opp-text-${loc}.json`);
  if (!fs.existsSync(f)) { if (partial) continue; throw new Error(`${loc}: ${f} missing`); }
  execFileSync(process.execPath, [path.join(__dirname, 'validate-opp-content.js'), f, loc], { stdio: ['ignore', 'ignore', 'inherit'] });   // throws on a failing locale
  const P = JSON.parse(fs.readFileSync(f, 'utf8'));
  out[loc] = toLevelset(loc, P);
  for (const k of INSTR_KEYS) {
    const [id, lv] = k.split('_L');
    ((instr[id] = instr[id] || {})[lv] = instr[id][lv] || {})[loc] = P.instructions[k];
  }
  for (const k of SCREEN_KEYS) (scr.opposites[k] = scr.opposites[k] || {})[loc] = P.screen[k];
  const x = out[loc];
  console.log(`${loc}: +${x.pairs.length} pairs, +${x.frames.length} frames, +${x.prefixItems.length} prefix items, pictures ${Object.keys(x.picAdd).join(',') || '—'}`);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
fs.writeFileSync(scrFile, JSON.stringify(scr, null, 1) + '\n');
console.log('written');
