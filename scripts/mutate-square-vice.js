#!/usr/bin/env node
/* =====================================================================
   mutate-square-vice.js — proves verify-square-vice-core.js can fail
   (ACTIVITY #145, The Square Vice). Each mutation breaks the core, the
   activity or the data in one way a real bug would; the gate must reject
   every one. A control (a harmless whitespace change) must pass. A needle
   that is no longer in the file THROWS — a dropped mutation would shrink
   the count while the run still said "every mutation killed".
   Usage: node scripts/mutate-square-vice.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'square-vice-core.js'), act: path.join(MINI, 'square-vice-activity.js'), man: path.join(MINI, 'place-value-regroup-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['the vice locks at nine', 'core', "if (n < LOCK) return { result: 'short', stop: n, bare: LOCK - n };", "if (n < LOCK - 1) return { result: 'short', stop: n, bare: LOCK - n };"],
  ['the vice locks at eleven', 'core', "if (n > LOCK) return { result: 'tall', stop: n, over: n - LOCK };", "if (n > LOCK + 1) return { result: 'tall', stop: n, over: n - LOCK };"],
  ['a lock makes a piece of the wrong place', 'core', "UP = { O: 'T', T: 'H' }", "UP = { O: 'T', T: 'T' }"],
  ['a lock without the crank (automatic at ten)', 'core', "if (k) { bed.kind = col; st.verdict = null; }", "if (k) { bed.kind = col; st.verdict = null; if (bed.pieces.length === LOCK && col !== 'H') { bed.pieces = []; bed.kind = null; st.bays[UP[col]].push('made'); st.locks[col]++; } }"],
  ['two kinds share the bed', 'core', "if (bed.kind && bed.kind !== col) return 0;", ""],
  ['Check accepted with a column at eleven', 'core', "if (full.length) return { result: 'note', key: 'hintTooMany', tooMany: full[0], cols: full };", ""],
  ['digits typed left-aligned', 'core', "function boxDigit(s, col) { var i = s.length - 1 - COLS.slice().reverse().indexOf(col); return i >= 0 ? s.charAt(i) : ''; }", "function boxDigit(s, col) { return s.charAt(COLS.indexOf(col)) || ''; }"],
  ['the lock swallows the leftover rod too', 'core', "st.bays[to].push('made'); st.locks[from]++;", "st.bays[to].push('made'); st.locks[from]++; st.bays[from] = [];"],
  ['a flat splits into a hundred cubes', 'core', "DOWN = { T: 'O', H: 'T' }", "DOWN = { T: 'O', H: 'O' }"],
  ['a split keeps nine', 'core', "for (var i = 0; i < LOCK; i++) st.bays[to].push(src);", "for (var i = 0; i < LOCK - 1; i++) st.bays[to].push(src);"],
  ['a warm-up round where a lock is possible', 'core', "[451, 127], [206, 81]", "[451, 127], [206, 84]"],
  ['a kept round changed', 'core', "[410, 90], [240, 60]]", "[410, 90], [240, 70]]"],
  ['a both-trade round without a ones trade', 'core', "[297, 135]", "[297, 132]"],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", "return { order: R.slice() };"],
  ['two exactly-ten rounds may open', 'core', "if (exactTen(face, o[0]) && exactTen(face, o[1])) continue;", ""],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['a leading zero allowed', 'core', "(d === '0' && !st.typed)", "(false)"],
  ['the carry mark ignores the locks', 'core', "return (col === 'T' ? st.locks.O : col === 'H' ? st.locks.T : 0) > 0;", "return false;"],
  ['the bed holds eleven', 'core', "var LOCK = 10, BED_MAX = 12, BAY_MAX = 19;", "var LOCK = 10, BED_MAX = 11, BAY_MAX = 19;"],
  ['a B&W picture', 'core', "var TUCK = 'pets/hamster';", "var TUCK = 'animals bw/hamster';"],
  ['a digit in a hint', 'act', 'hintCount: {"en":"Each box tells how many pieces lie above it."', 'hintCount: {"en":"Each box tells how many pieces (0-9) lie above it."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['a success line without its total', 'act', 'okHundred: {"en":"{a} plus {b} makes {c} — ten tens locked into one hundred!"', 'okHundred: {"en":"{a} plus {b} — ten tens locked into one hundred!"'],
  ['the success line names the wrong face', 'act', "k = st.face === 'both' ? 'okBoth' : st.face === 'none' ? 'okNone' : 'okHundred';", "k = st.face === 'both' ? 'okHundred' : st.face === 'none' ? 'okNone' : 'okHundred';"],
  ['the success line with the previous numbers', 'act', "return this._t(k, { a: st.a, b: st.b, c: SquareViceCore.total(st) });", "return this._t(k, { a: st.b, b: st.a, c: SquareViceCore.total(st) });"],
  ['a frozen slug edited', 'man', '"en": "add-with-regrouping-make-a-hundred"', '"en": "add-with-regrouping-make-a-hundred-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "square-vice-activity"', '"tool": "place-value-regroup-activity"'],
  ['a sibling row touched', 'man', '"tool": "roll-mat-activity"', '"tool": "roll-mat-activity2"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sv-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { SV_CORE: files.core, SV_ACT: files.act, SV_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-square-vice-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name + ' — ' + mod[1].slice(0, 60)); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
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
console.log(`mutate-square-vice: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
