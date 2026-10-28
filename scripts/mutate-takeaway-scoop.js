#!/usr/bin/env node
/* =====================================================================
   mutate-takeaway-scoop.js — proves verify-takeaway-scoop-core.js can
   fail (ACTIVITY #147, The Take-Away Scoop). Each mutation breaks the
   core, the activity or the data in one way a real bug would; the gate
   must reject every one. A control (a harmless whitespace change) must
   pass. A needle that is no longer in the file THROWS — a dropped
   mutation would shrink the count while the run still said "every
   mutation killed". Needles are matched after collapsing \r\n.
   Usage: node scripts/mutate-takeaway-scoop.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'takeaway-scoop-core.js'), act: path.join(MINI, 'takeaway-scoop-activity.js'), man: path.join(MINI, 'place-value-regroup-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['the scoop lifts with empty cups', 'core', "return !st.done && !st.scoop.used && COLS.every(function (c) { return st.mat[c] >= st.scoop.need[c]; });", "return !st.done && !st.scoop.used;"],
  ['the scoop ignores its ten- and hundred-slots', 'core', "return !st.done && !st.scoop.used && COLS.every(function (c) { return st.mat[c] >= st.scoop.need[c]; });", "return !st.done && !st.scoop.used && st.mat.O >= st.scoop.need.O;"],
  ['the scoop is reusable in a round', 'core', "if (st.done || st.scoop.used) return { result: 'no' };\n    if (!canLift(st))", "if (st.done) return { result: 'no' };\n    if (!canLift(st))"],
  ['a snapped rod lands on the tens shelf', 'core', "DOWN = { H: 'T', T: 'O' }", "DOWN = { H: 'T', T: 'T' }"],
  ['a snap leaves the rod in place', 'core', 'st.mat[col]--; st.mat[to] += TEN;', 'st.mat[to] += TEN;'],
  ['a snap allowed with ten cubes loose', 'core', "if (st.mat[to] >= TEN) return { result: 'enough' };", ''],
  ['cubes can be snapped', 'core', "if (st.done || !to) return { result: 'no' };\n    if (!st.mat[col])", "if (st.done) return { result: 'no' };\n    if (!to) { st.mat[col]--; return { result: 'snap', from: col, to: col }; }\n    if (!st.mat[col])"],
  ['nine cubes click into a rod', 'core', 'st.mat[col] < TEN || st.mat[to] + 1 > SHELF_MAX', 'st.mat[col] < TEN - 1 || st.mat[to] + 1 > SHELF_MAX'],
  ['the bowl pours back more than it took', 'core', "COLS.forEach(function (c) { st.mat[c] += st.scoop.need[c]; });\n    st.scoop.used = false;", "COLS.forEach(function (c) { st.mat[c] += st.scoop.need[c] + 1; });\n    st.scoop.used = false;"],
  ['Check with the scoop parked', 'core', "if (!st.scoop.used) return { result: 'note', key: 'hintScoop' };", ''],
  ['an untidy right answer is refused', 'core', "if (!wrongs.length) { var tidied = tidy(st);", "if (!wrongs.length && COLS.every(function (c) { return st.mat[c] < TEN; })) { var tidied = tidy(st);"],
  ['the strike written before the snap', 'core', "var R = {}; COLS.forEach(function (c) { R[c] = st.mat[c] + (st.scoop.used ? st.scoop.need[c] : 0); }); return chains(st.a, R);", "return truthMarks(st.a, st.b);"],
  ['a kept round changed', 'core', '[351, 8], [243, 5]]', '[351, 8], [243, 3]]'],
  ['a warm-up round that borrows', 'core', '[38, 14], [77, 35]]', '[38, 14], [77, 38]]'],
  ['the flat round loses its flat', 'core', '[93, 58], [627, 346]]', '[93, 58], [637, 346]]'],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", 'return { order: R.slice() };'],
  ['the two 0-tens rounds may open together', 'core', 'if (zeroTens(face, o[0]) && zeroTens(face, o[1])) continue;', ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['a leading zero allowed', 'core', "(d === '0' && !st.typed)", '(false)'],
  ['digits typed left-aligned', 'core', "function boxDigit(s, col) { var i = s.length - 1 - COLS.slice().reverse().indexOf(col); return i >= 0 ? s.charAt(i) : ''; }", "function boxDigit(s, col) { return s.charAt(COLS.indexOf(col)) || ''; }"],
  ['a B&W picture', 'core', "var TUCK = 'pets/hamster';", "var TUCK = 'animals bw/hamster';"],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['the hundred line is never used', 'act', "k = st.snaps.H > 0 ? 'okHundred' : st.snaps.T > 0 ? 'okTen' : 'okNone';", "k = st.snaps.T > 0 ? 'okTen' : 'okNone';"],
  ['the success line with the numbers swapped', 'act', '{ a: st.a, b: st.b, c: TakeawayScoopCore.answer(st) }', '{ a: st.b, b: st.a, c: TakeawayScoopCore.answer(st) }'],
  ['the task line with a hyphen minus', 'act', "' − '", "' - '"],
  ['a role img on the ones shelf', 'act', "sh.setAttribute('role', 'group');", "sh.setAttribute('role', 'img');"],
  ['a frozen slug edited', 'man', '"en": "subtract-with-regrouping-break-a-ten"', '"en": "subtract-with-regrouping-break-a-ten-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "takeaway-scoop-activity"', '"tool": "place-value-regroup-activity"'],
  ['a sibling row touched', 'man', '"tool": "nested-crates-activity"', '"tool": "nested-crates-activity2"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tk-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { TK_CORE: files.core, TK_ACT: files.act, TK_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-takeaway-scoop-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name + ' — ' + mod[1].slice(0, 60)); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
for (const [name, file, a] of M) { if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name); }
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find(x => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-takeaway-scoop: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
