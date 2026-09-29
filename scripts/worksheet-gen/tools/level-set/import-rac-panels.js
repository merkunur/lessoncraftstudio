/**
 * import-rac-panels.js — Level Set 2026-09-30 (Read and Color): the native panels' strings (<scratch>/rac-<loc>.json)
 * → i18n/strings.<loc>.json (titles + instructions of the NEW G1-409 / G1-410 / G1-411) and
 * i18n/level-instructions.json (G1-242 / G1-251 / G1-252 level 1 / 3 where the published text is false for that level).
 * A (type, level) with an override in ANY locale gets one in EVERY locale (the published text where it stays true).
 *   node tools/level-set/import-rac-panels.js <scratchDir> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const NEW = ['G1-409', 'G1-410', 'G1-411'];
const OLD = ['G1-242', 'G1-251', 'G1-252'];
const clean = (s, max) => typeof s === 'string' && s.trim() === s && s.length > 0 && s.length <= max && !/[{}]/.test(s);
const problems = [];
const P = {}, S = {};
for (const loc of LOCS) {
  P[loc] = JSON.parse(fs.readFileSync(path.join(DIR, 'rac-' + loc + '.json'), 'utf8'));
  S[loc] = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + loc + '.json'), 'utf8'));
  for (const id of NEW) {
    const v = (P[loc].new || {})[id];
    if (!v || !clean(v.title, 70) || !clean(v.instruction, 160)) problems.push(`${loc} new.${id}: missing / too long`);
  }
}
const want = {};
for (const loc of LOCS) for (const id of OLD) for (const lv of [1, 3]) {
  const v = (P[loc].levels || {})[`${id}_L${lv}`] || (P[loc].levels || {})[id + ' L' + lv] || ((P[loc].levels || {})[id] || {})['L' + lv] || ((P[loc].levels || {})[id] || {})[lv];
  if (!v || v === 'ok') continue;
  const pub = S[loc][id];
  const title = v.title == null ? null : v.title, ins = v.instruction == null ? pub.instruction : v.instruction;
  if (title != null && !clean(title, 70)) { problems.push(`${loc} ${id} L${lv}: title`); continue; }
  if (!clean(ins, 160)) { problems.push(`${loc} ${id} L${lv}: instruction`); continue; }
  ((want[id] = want[id] || {})[lv] = want[id][lv] || {})[loc] = title != null ? { title, instruction: ins } : ins;
}
for (const [id, byLv] of Object.entries(want)) for (const byLoc of Object.values(byLv)) for (const loc of LOCS) if (byLoc[loc] === undefined) byLoc[loc] = S[loc][id].instruction;
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exit(1); }
for (const loc of LOCS) for (const id of NEW) console.log(`${loc} ${id}: ${P[loc].new[id].title}`);
for (const [id, byLv] of Object.entries(want)) for (const lv of Object.keys(byLv)) console.log(`${id} L${lv}: override`);
if (!DRY) {
  for (const loc of LOCS) {
    const f = path.join(ROOT, 'i18n', 'strings.' + loc + '.json');
    const raw = fs.readFileSync(f, 'utf8');
    for (const id of NEW) S[loc][id] = { title: P[loc].new[id].title, instruction: P[loc].new[id].instruction };
    let out = JSON.stringify(S[loc], null, 2) + '\n';
    if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
    fs.writeFileSync(f, out);
  }
  const liFile = path.join(ROOT, 'i18n', 'level-instructions.json');
  const li = JSON.parse(fs.readFileSync(liFile, 'utf8'));
  for (const [id, byLv] of Object.entries(want)) for (const [lv, byLoc] of Object.entries(byLv)) ((li[id] = li[id] || {})[lv] = byLoc);
  fs.writeFileSync(liFile, JSON.stringify(li, null, 1) + '\n');
  console.log('wrote strings + level-instructions');
}
