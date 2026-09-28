#!/usr/bin/env node
/**
 * import-cloze-panels.js — Level Set 2026-09-28: the 11 native panels' "Fill in the Missing Word" content →
 * data/b4/cloze-levelset.json (new frames / plural frames / stories / hardPlural per locale; the published pages
 * never read it), the per-level PRINTED instructions (i18n/level-instructions.json) and the on-screen tap
 * strings (i18n/interactive-instructions.json → cloze.*).
 *
 *   node tools/level-set/import-cloze-panels.js <dir with clz-text-<loc>.json> [--partial]
 *
 * Every locale file must pass tools/level-set/validate-cloze-content.js first (the family gate's validateBank on
 * the merged block + the Level Set counts); a failing locale REFUSES the whole import. --partial imports the
 * locales present (development only).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const dir = process.argv[2];
const partial = process.argv.includes('--partial');
if (!dir) throw new Error('usage: import-cloze-panels.js <dir> [--partial]');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'].filter((l) => !ONLY || ONLY.split(',').includes(l));
const ROOT = path.join(__dirname, '..', '..');
const INSTR = [['G1-366', '1', 'G1-366_L1'], ['G1-350', '3', 'G1-350_L3'], ['G2-349', '1', 'G2-349_L1'], ['G2-350', '3', 'G2-350_L3']];
const TAP = ['base', 'choice', 'match', 'story', 'spell'];
const out = { _note: 'Level Set 2026-09-28 — Fill in the Missing Word content for the NEW copies only (11 native panels; importer tools/level-set/import-cloze-panels.js). Merged onto the published block by G1-350 mergedBank(); the published pages never read this file.' };
const tapFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const tap = JSON.parse(fs.readFileSync(tapFile, 'utf8'));
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
tap.cloze = tap.cloze || {};
for (const loc of LOCS) {
  const f = path.join(dir, `clz-text-${loc}.json`);
  if (!fs.existsSync(f)) { if (partial) continue; throw new Error(`${loc}: ${f} missing`); }
  execFileSync(process.execPath, [path.join(__dirname, 'validate-cloze-content.js'), f, loc], { stdio: ['ignore', 'ignore', 'inherit'] });   // throws on a failing locale
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  out[loc] = { frames: j.frames || [], plural: loc === 'da' ? [] : (j.plural || []), stories: j.stories || [], hardPlural: loc === 'da' ? [] : (j.hardPlural || []) };
  for (const k of TAP) {
    const t = j.tap && j.tap[k];
    if (!t || t.length > 120) throw new Error(`${loc}: tap.${k} missing or longer than 120`);
    (tap.cloze[k] = tap.cloze[k] || {})[loc] = t;
  }
  for (const [id, lv, key] of INSTR) {
    if (loc === 'da' && id === 'G2-349') continue;
    const t = j.instructions && j.instructions[key];
    if (!t) throw new Error(`${loc}: instructions.${key} missing`);
    ((instr[id] = instr[id] || {})[lv] = instr[id][lv] || {})[loc] = t;
  }
  console.log(`${loc}: ${out[loc].frames.length} frames, ${out[loc].plural.length} plural (${out[loc].hardPlural.length} hard), ${out[loc].stories.length} stories`);
}
fs.writeFileSync(path.join(ROOT, 'data', 'b4', 'cloze-levelset.json'), JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(tapFile, JSON.stringify(tap, null, 2) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
console.log('written');
