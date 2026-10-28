#!/usr/bin/env node
/* =====================================================================
   mutate-deciding-gate.js — proves verify-deciding-gate-core.js can fail
   (ACTIVITY #151, The Deciding Gate). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-deciding-gate.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'deciding-gate-core.js'), act: path.join(MINI, 'deciding-gate-activity.js'), man: path.join(MINI, 'match-pairs-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['compare by the ones digit', 'core', "function signOf(a, b) { return a < b ? '<' : a > b ? '>' : '='; }", "function signOf(a, b) { a = a % 10; b = b % 10; return a < b ? '<' : a > b ? '>' : '='; }"],
  ['compare left to right but skip the equal-gate check', 'core', 'for (var i = 0; i < nd; i++) if (x[i] !== y[i]) return i; return nd;', 'for (var i = 0; i < nd; i++) if (x[i] !== y[i] || i === 1) return i; return nd;'],
  ['accept any gate', 'core', "if (st.predicted > r.gate) kind = { kind: 'gateLate', gate: r.gate };\n      else if (st.predicted < r.gate) kind = { kind: 'gateEarly', gate: st.predicted };\n      else if", 'if'],
  ['accept the reversed sign', 'core', "else if (st.sign !== r.sign) kind = { kind: 'sign' };", "else if (st.sign === '=' && r.sign !== '=') kind = { kind: 'sign' };"],
  ['every round\'s bigger number on the left', 'core', '[[389, 412], [736, 367], [461, 529], [247, 274]', '[[412, 389], [736, 367], [529, 461], [274, 247]'],
  ['the equal round dropped', 'core', '[683, 689], [504, 504]]', '[683, 689], [504, 507]]'],
  ['order by digit sum', 'core', 'function trueOrder(nums) { return nums.map(function (n, i) { return i; }).sort(function (x, y) { return nums[x] - nums[y]; }); }', "function trueOrder(nums) { var ds = function (n) { return String(n).split('').reduce(function (a, b) { return a + +b; }, 0); }; return nums.map(function (n, i) { return i; }).sort(function (x, y) { return ds(nums[x]) - ds(nums[y]); }); }"],
  ['a hundreds tie released by the first number\'s tens only', 'core', 'var k0 = wrong[0], p = [st.steps[k0], want[k0]];', 'var k0 = wrong[0], p = [st.steps[k0], st.steps[k0]];'],
  ['the long view before Check', 'act', 'if (st.done) this._paintLong(main, W);', 'this._paintLong(main, W);'],
  /* the rest of the model */
  ['an empty step is a miss', 'core', "if (st.steps.some(function (x) { return x == null; })) return { result: 'note', key: 'hintSteps' };", "if (st.steps.some(function (x) { return x == null; })) { st.misses++; return { result: 'note', key: 'hintSteps' }; }"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the same order every pass', 'core', 'if (!prev || prev.join() !== o.join()) return { order: o };', 'return { order: o };'],
  ['the flag is not a gate', 'core', "!(g >= 0 && g <= st.nd && g === Math.floor(g))", "!(g >= 0 && g < st.nd && g === Math.floor(g))"],
  ['a move keeps the run', 'core', "st.predicted = g; st.verdict = null; st.ran = false;", "st.predicted = g; st.verdict = null;"],
  ['a taken step does not swap', 'core', "if (from >= 0) st.steps[from] = other != null && other !== i ? other : null;", "if (from >= 0) st.steps[from] = null;"],
  ['the run goes past the deciding gate', 'core', 'for (var i = 0; i < nd && i <= g; i++) out.push(', 'for (var i = 0; i < nd; i++) out.push('],
  ['an early gate reads as late', 'core', "else if (st.predicted < r.gate) kind = { kind: 'gateEarly', gate: st.predicted };", "else if (st.predicted < r.gate) kind = { kind: 'gateLate', gate: r.gate };"],
  ['the equal success says less', 'core', "var s = st.round.sign; return s === '<' ? 'okLess' : s === '>' ? 'okGreater' : 'okEqual';", "var s = st.round.sign; return s === '>' ? 'okGreater' : 'okLess';"],
  /* the activity */
  ['the = rounds lose their own sign hint', 'act', "if (key === 'hintSignSide' && R.sign === '=') key = 'hintSignEq';", ''],
  ['a note never reaches the screen', 'act', "if (r.result === 'note') { v.note = this._t(r.key);", "if (r.result === 'note') { v.note = '';"],
  ['fr loses a narrow space', 'act', '"fr":"Quelle porte décide ?', '"fr":"Quelle porte décide ?'],
  ['a locale without a string', 'act', '"fi":"Laita nyt merkki ruutuun."', '"fi":""'],
  ['the comparison sentence swaps a and b', 'act', '"de":"{a} ist kleiner als {b}."', '"de":"{b} ist größer als {a}."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  /* the manifest */
  ['the row still points at match-pairs', 'man', '"tool": "deciding-gate-activity"', '"tool": "match-pairs-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dg-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-deciding-gate-core.js')], { env: Object.assign({}, process.env, { DG_CORE: files.core, DG_ACT: files.act, DG_MANIFEST: files.man }), encoding: 'utf8', timeout: 60000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
for (const [name, file, a] of M) { if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name); }
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find((x) => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-deciding-gate: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
