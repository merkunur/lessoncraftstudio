/**
 * import-rad-panels.js — Level Set 2026-09-30 (Read and Do): the native panels' strings (<scratch>/rad-<loc>.json) →
 *   i18n/interactive-instructions.json   read-and-do.{base,steps,truth}.<loc>   (the screen instruction)
 *   i18n/level-instructions.json         G1-340.1.<loc> = {title, instruction}   (the easier level has no "between")
 *   data/b3/locales/instructions.<loc>.json  draw2 (the two-thing draw level); fi: the two "right after / before"
 *                                        true/false frames appended to truth.frames
 *   data/b3/instructions.js (en)        draw2 is authored in place (already there) — the en panel's audit is reported
 * Refuses a missing / over-long / slot-wrong string (never a partial write).
 *   node tools/level-set/import-rad-panels.js <scratchDir> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const { slotsIn } = require('../../lib/b3-instructions.js');
const problems = [];
const clean = (s, max) => typeof s === 'string' && s.trim() === s && s.length > 0 && s.length <= max;
const P = {};
for (const loc of LOCS) {
  const f = path.join(DIR, 'rad-' + loc + '.json');
  if (!fs.existsSync(f)) { problems.push(`${loc}: no panel file`); continue; }
  const p = P[loc] = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const k of ['base', 'steps', 'truth']) if (!clean((p.screen || {})[k], 110) || /[{}]/.test(p.screen[k])) problems.push(`${loc} screen.${k}`);
  if (!clean(p.g1340L1Title, 60)) problems.push(`${loc} g1340L1Title`);
  const d2 = p.draw2;
  if (!Array.isArray(d2) || d2.length !== 4) problems.push(`${loc} draw2: want 4 frames`);
  else d2.forEach((t, i) => {
    const sl = slotsIn(t).sort().join(',');
    const want = loc === 'fi' ? 'n,n2,part,part2' : 'n,n2,pl,pl2';
    if (!clean(t, 70) || sl !== want) problems.push(`${loc} draw2[${i}] "${t}" slots ${sl} (want ${want})`);
  });
  if (loc === 'fi') {
    if (!Array.isArray(p.truthNext) || p.truthNext.length !== 2) problems.push('fi truthNext: want 2');
    else p.truthNext.forEach((t, i) => { if (!clean(t, 80) || slotsIn(t).sort().join(',') !== 'obj,obj2') problems.push(`fi truthNext[${i}] "${t}"`); });
  }
}
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exit(1); }
for (const loc of LOCS) console.log(`${loc}  L1 title: ${P[loc].g1340L1Title}  | draw2: ${P[loc].draw2[0]}`);
if (DRY) process.exit(0);

// 1. screen instructions
const isFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const IS = JSON.parse(fs.readFileSync(isFile, 'utf8'));
IS['read-and-do'] = { base: {}, steps: {}, truth: {} };
for (const loc of LOCS) for (const k of ['base', 'steps', 'truth']) IS['read-and-do'][k][loc] = P[loc].screen[k];
fs.writeFileSync(isFile, JSON.stringify(IS, null, 1) + '\n');
// 2. the easier G1-340 level: its own title, the published instruction (true for it)
const liFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const LI = JSON.parse(fs.readFileSync(liFile, 'utf8'));
LI['G1-340'] = LI['G1-340'] || {};
LI['G1-340']['1'] = {};
for (const loc of LOCS) {
  const S = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + loc + '.json'), 'utf8'));
  LI['G1-340']['1'][loc] = { title: P[loc].g1340L1Title, instruction: S['G1-340'].instruction };
}
fs.writeFileSync(liFile, JSON.stringify(LI, null, 1) + '\n');
// 3. draw2 (+ fi truth frames) into the locale banks (en lives in data/b3/instructions.js)
for (const loc of LOCS) {
  if (loc === 'en') continue;
  const f = path.join(ROOT, 'data', 'b3', 'locales', 'instructions.' + loc + '.json');
  const raw = fs.readFileSync(f, 'utf8');
  const j = JSON.parse(raw);
  j.draw2 = P[loc].draw2.map((text) => ({ text }));
  if (loc === 'fi') {
    j.truth.frames = j.truth.frames.filter((x) => x.cue !== 'rightof' && x.cue !== 'leftof');
    j.truth.frames.push({ text: P.fi.truthNext[0], cue: 'rightof' }, { text: P.fi.truthNext[1], cue: 'leftof' });
  }
  let out = JSON.stringify(j, null, raw.includes('\n  "') ? 2 : 1) + '\n';
  if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(f, out);
}
console.log('wrote interactive-instructions, level-instructions, draw2 ×10' + ' + fi truth frames');
