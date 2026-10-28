#!/usr/bin/env node
/* =====================================================================
   mutate-glass-stack.js — proves verify-glass-stack-core.js can fail
   (ACTIVITY #148, The Glass Stack). Each mutation breaks the core, the
   activity or the data in one way a real bug would; the gate must reject
   every one. A control (a harmless whitespace change) must pass. A
   needle that is no longer in the file THROWS. Needles are matched after
   collapsing \r\n.
   Usage: node scripts/mutate-glass-stack.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'glass-stack-core.js'), act: path.join(MINI, 'glass-stack-activity.js'), man: path.join(MINI, 'comet-kangaroo-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a step down is 1 more', 'core', 'STEP = { R: 1, L: -1, D: 10,', 'STEP = { R: 1, L: -1, D: 1,'],
  ['a dive is 10 more', 'core', 'U: -10, DIVE: 100,', 'U: -10, DIVE: 10,'],
  ['the sheet is the tens digit', 'core', 'return { sheet: Math.floor(n / 100), row: Math.floor(n / 10) % 10, col: n % 10 };', 'return { sheet: Math.floor(n / 10) % 10, row: Math.floor(n / 10) % 10, col: n % 10 };'],
  ['the offset reads the wrong axis', 'core', 'dRow: c.row - t.row, dCol: c.col - t.col', 'dRow: c.col - t.col, dCol: c.row - t.row'],
  ['a kept round changed', 'core', '[[247, 10], [362, -10]', '[[247, 10], [362, 10]'],
  ['a wrap round lost', 'core', '[296, 10], [602, -10]]', '[293, 10], [602, -10]]'],
  ['a small round starts at 0', 'core', '[[47, 10], [35, 10]', '[[47, 10], [5, 10]'],
  ['a mystery with two answers', 'core', "{ kind: 'mystery', a: 38, ca: 'D', b: 47, cb: 'R' }", "{ kind: 'mystery', a: 38, ca: 'D', b: 37, cb: 'D' }"],
  ['a how-far of 0', 'core', "{ kind: 'far', a: 52, b: 83 }", "{ kind: 'far', a: 52, b: 82 }"],
  ['a wrong answer counts', 'core', 'if (claim === truth) { st.done = true;', 'if (Math.abs(claim - truth) < 2) { st.done = true;'],
  ['no flag on a miss', 'core', '    st.flag = claim;\n', '\n'],
  ['Check with nothing typed is a miss', 'core', "if (!st.typed) return { result: 'note', key: 'hintType' };", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;\n    st.verdict = { off:', 'st.misses++; st.help = st.misses >= 3;\n    st.verdict = { off:'],
  ['Comet stays on the landing at miss 2', 'core', 'if (st.help) { st.token = r.a;', 'if (false) { st.token = r.a;'],
  ['the arrows work before miss 2', 'core', '    if (!st.help) return false;\n    var n = step', '    var n = step'],
  ['Comet leaves the stack', 'core', 'if (!inRange(n) || (st.face', 'if ((st.face'],
  ['a dive changes the square', 'core', 'st.token = sheet * 100 + (st.token % 100);', 'st.token = sheet * 100 + (st.token % 10);'],
  ['a keystroke keeps the flag', 'core', 'function clearMarks(st) { st.verdict = null; st.flag = null; }', 'function clearMarks(st) { st.verdict = null; }'],
  ['two digits in a how-far box', 'core', 'max = two ? 1 : 4;', 'max = two ? 2 : 4;'],
  ['a leading zero allowed', 'core', "(d === '0' && !st[key] && !two)", '(false)'],
  ['the edge hint never shows', 'core', "return Math.abs(r.leap) === 1 ? 'hintRowEnd' : 'hintEdge';", "return 'hintAxis';"],
  ['the wrong box blamed in how-far', 'core', 'rightOk: rr === r.answer.right', 'rightOk: rr === r.answer.down'],
  ['two wraps back to back', 'core', 'if (isWrap(R[o[i]]) && isWrap(R[o[i - 1]])) bad = true;', ''],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", 'return { order: o };'],
  ['bands ignored', 'core', "if (face === 'big') { o = [];", "if (false) { o = [];"],
  ['a B&W picture', 'core', "var COMET = 'zoo animals/kangaroo';", "var COMET = 'animals bw/kangaroo';"],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['the edge line is never used', 'act', "if (C.isWrap(r)) return this._t(Math.abs(r.leap) === 1 ? 'okRow' : 'okEdge', a);", ''],
  ['the success line names the wrong place', 'act', "p === 'ones' ? 'okOnes' : p === 'tens' ? 'okTens' : 'okHundreds'", "p === 'ones' ? 'okOnes' : 'okTens'"],
  ['the leap with a hyphen minus', 'act', "(leap > 0 ? '+ ' : '− ')", "(leap > 0 ? '+ ' : '- ')"],
  ['the task line asks the opposite way', 'act', "(r.leap > 0 ? 'qMore' : 'qLess')", "(r.leap > 0 ? 'qLess' : 'qMore')"],
  ['the sheet reads out the landing at a miss', 'act', 'return st.verdict && !st.help && !st.done && st.flag != null ?', 'return false ?'],
  ['the spoken line names the landing', 'act', '"Comet leapt. Your flag is on {f}."', '"Comet landed on {n}. Your flag is on {f}."'],
  ['a frozen slug edited', 'man', '"tool": "glass-stack-activity"', '"tool": "glass-stack-activity2"'],
  ['the manifest still on the old tool', 'man', '"tool": "glass-stack-activity"', '"tool": "comet-kangaroo-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gk-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { GK_CORE: files.core, GK_ACT: files.act, GK_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-glass-stack-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-glass-stack: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
