/**
 * import-qw-instr.js — Level Set 2026-09-29 (Question Words): the native panels' strings (<scratch>/qw-instr-<loc>.json)
 * → i18n/level-instructions.json (the printed level title / instruction of the new levels) and
 * i18n/interactive-instructions.json (the on-screen tap instruction, question-words → mode → locale).
 *
 * Every (type, level) with an override gets one in EVERY locale (strings.js throws on a missing locale); a title override
 * carries the published instruction unless the panel rewrote it too. A check that is not "ok" is a replacement.
 *   node tools/level-set/import-qw-instr.js <scratchDir> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const MODES = ['base', 'match', 'fill', 'sort', 'write'];
const WANT = ['G1-353_L3', 'G1-374_L3', 'G1-375_L3', 'G2-356_L1', 'G2-356_L3', 'G2-357_L1', 'G2-357_L3'];
const strings = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + l + '.json'), 'utf8'))]));
const P = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(DIR, 'qw-instr-' + l + '.json'), 'utf8'))]));
const problems = [];
const clean = (s, max) => typeof s === 'string' && s.trim() === s && s.length > 0 && s.length <= max && !/[{}]/.test(s);

const want = {};
// a check replacement MERGES into an override of the same (type, level): a title from one, the instruction from the other
const put = (id, lv, loc, v) => {
  const by = ((want[id] = want[id] || {})[lv] = want[id][lv] || {});
  const prev = by[loc];
  if (prev != null && typeof prev === 'object' && typeof v === 'string') v = { ...prev, instruction: v };
  else if (prev != null && typeof v === 'object' && typeof prev === 'string') v = { ...v, instruction: v.instruction != null && v.instruction !== strings[loc][id].instruction ? v.instruction : prev };
  else if (prev != null && typeof v === 'object' && typeof prev === 'object') v = { ...prev, ...v };
  by[loc] = v;
};
function entry(id, loc, v, k) {
  const pub = strings[loc][id];
  if (!pub) { problems.push(`${loc} ${id}: no published strings`); return null; }
  const title = v.title == null ? null : v.title, ins = v.instruction == null ? pub.instruction : v.instruction;
  if (title != null && !clean(title, 70)) { problems.push(`${loc} ${k}: title missing / too long`); return null; }
  if (!clean(ins, 160)) { problems.push(`${loc} ${k}: instruction missing / too long`); return null; }
  return title != null ? { title, instruction: ins } : ins;
}
for (const loc of LOCS) {
  const p = P[loc];
  for (const k of WANT) {
    const v = (p.overrides || {})[k];
    if (!v || (v.title == null && v.instruction == null)) { problems.push(`${loc} ${k}: no override`); continue; }
    const m = /^(G[12]-\d{3})_L([13])$/.exec(k);
    const e = entry(m[1], loc, v, k);
    if (e != null) put(m[1], +m[2], loc, e);
  }
  for (const [k, v] of Object.entries(p.checks || {})) {
    if (v === 'ok') continue;
    const m = /^(G[12]-\d{3})_L([123])/.exec(k);
    if (!m || m[2] === '2') { problems.push(`${loc} checks ${k}: a replacement for the published level (report it, never override L2)`); continue; }
    const e = entry(m[1], loc, typeof v === 'string' ? { instruction: v } : v, k);
    if (e != null) put(m[1], +m[2], loc, e);
  }
  for (const mode of MODES) if (!clean((p.tap || {})[mode], 80)) problems.push(`${loc} tap.${mode}: missing / too long`);
}
for (const [id, byLv] of Object.entries(want)) for (const [lv, byLoc] of Object.entries(byLv)) for (const loc of LOCS) if (byLoc[loc] === undefined) byLoc[loc] = strings[loc][id].instruction;
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exit(1); }

const liFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const li = JSON.parse(fs.readFileSync(liFile, 'utf8'));
for (const [id, byLv] of Object.entries(want)) for (const [lv, byLoc] of Object.entries(byLv)) ((li[id] = li[id] || {})[lv] = byLoc);
const iiFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const iiRaw = fs.readFileSync(iiFile, 'utf8');
const ii = JSON.parse(iiRaw);
ii['question-words'] = Object.fromEntries(MODES.map((mode) => [mode, Object.fromEntries(LOCS.map((l) => [l, P[l].tap[mode]]))]));
for (const [id, byLv] of Object.entries(want)) for (const lv of Object.keys(byLv)) console.log(`${id} L${lv}: ${Object.keys(byLv[lv]).length} locales`);
if (!DRY) {
  fs.writeFileSync(liFile, JSON.stringify(li, null, 1) + '\n');
  const ind = iiRaw.match(/^\{\r?\n(\s+)/)[1].length;
  let out = JSON.stringify(ii, null, ind) + '\n';
  if (iiRaw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(iiFile, out);
  console.log('wrote level-instructions + interactive-instructions');
}
