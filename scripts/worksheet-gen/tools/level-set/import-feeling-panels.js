#!/usr/bin/env node
/**
 * import-feeling-panels.js — Level Set 2026-09-28: the Feelings picture panel's situation scenes + sets and
 * the native panels' per-locale content → data/b3/feelings-levelset.json (+ the 'feelings' tap strings in
 * i18n/interactive-instructions.json and the per-level printed instructions in i18n/level-instructions.json).
 * The published pages never read the levelset file.
 *
 *   node tools/level-set/import-feeling-panels.js <scenes.json> <dir with fee-text-<loc>.json>
 *
 * fee-text-<loc>.json = { locale, veto:[scene ids], tap:{match,scene,sort,choice},
 *   instr319L3, instr332L1, notes }
 * Refuses (throws) rather than drops: a scene set that fails validate-feeling-scenes, a tap string missing, a veto naming an unknown scene or leaving a set under 4 cards.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { bank } = require('../../lib/b3-common.js');

const [scenesFile, dir] = process.argv.slice(2);
if (!scenesFile || !dir) throw new Error('usage: import-feeling-panels.js <scenes.json> <dir>');
execFileSync(process.execPath, [path.join(__dirname, 'validate-feeling-scenes.js'), scenesFile], { stdio: 'inherit' });   // throws on a failing set
const S = JSON.parse(fs.readFileSync(scenesFile, 'utf8'));
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ROOT = path.join(__dirname, '..', '..');
const out = {
  _note: 'Level Set 2026-09-28 — Feelings content for the NEW copies only (picture panel + 11 native panels; importer tools/level-set/import-feeling-panels.js). The published pages never read this file.',
  scenes: S.scenes.map(({ id, objects, feeling, alsoPlausible, vetoable, why }) => ({ id, objects, feeling, alsoPlausible: alsoPlausible || [], vetoable: !!vetoable, why: why || '', sceneOpened: true })),
  sets: S.sets.map((s) => ({ id: s.id, scenes: s.scenes })),
  veto: {},
};
const ids = new Set(out.scenes.map((s) => s.id));
const tapFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const tap = JSON.parse(fs.readFileSync(tapFile, 'utf8'));
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
tap.feelings = tap.feelings || {};
for (const loc of LOCS) {
  const f = path.join(dir, `fee-text-${loc}.json`);
  if (!fs.existsSync(f)) throw new Error(`${loc}: ${f} missing`);
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const b = bank('feelings', loc);
  const veto = j.veto || [];
  for (const v of veto) if (!ids.has(v)) throw new Error(`${loc}: veto names unknown scene "${v}"`);
  for (const s of out.sets) { const left = s.scenes.filter((x) => !veto.includes(x)).length; if (left < 4) throw new Error(`${loc}: veto leaves set ${s.id} with ${left} cards < 4`); }
  if (veto.length) out.veto[loc] = veto;
  for (const k of ['match', 'scene', 'sort', 'choice']) {
    const t = j.tap && j.tap[k];
    if (!t || t.length > 120) throw new Error(`${loc}: tap.${k} missing or longer than 120`);
    (tap.feelings[k] = tap.feelings[k] || {})[loc] = t;
  }
  for (const [id, lv, key] of [['K-319', '3', 'instr319L3'], ['K-332', '1', 'instr332L1']]) {
    if (!j[key]) throw new Error(`${loc}: ${key} missing`);
    ((instr[id] = instr[id] || {})[lv] = instr[id][lv] || {})[loc] = j[key];
  }
  console.log(`${loc}: veto ${veto.length ? veto.join(' ') : '—'}`);
}
fs.writeFileSync(path.join(ROOT, 'data', 'b3', 'feelings-levelset.json'), JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(tapFile, JSON.stringify(tap, null, 2) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
console.log(`${out.scenes.length} scenes, ${out.sets.length} sets written`);
