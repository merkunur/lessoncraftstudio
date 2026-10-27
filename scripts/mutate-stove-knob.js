#!/usr/bin/env node
/* =====================================================================
   mutate-stove-knob.js — proves verify-stove-knob-core.js can fail.
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-stove-knob.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'stove-knob-core.js'), act: path.join(MINI, 'stove-knob-activity.js'), man: path.join(MINI, 'shades-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['the soup follows the click, not the word', 'core', "var n = rd.kind === 'golook' ? 3 : K.n; return n < 2 ? 0.7 : 0.12 + 0.88 * (t.rank - 1) / (n - 1);", "var n = rd.kind === 'golook' ? 3 : K.n; return n < 2 ? 0.7 : 0.12 + 0.88 * rd.windows[w].click / (n - 1);"],
  ['a word out of rank is not reported', 'core', "if (rd.kind === 'order') return t.rank === W.click + 1;", "if (rd.kind === 'order') return true;"],
  ['any word counts as a twin', 'core', "if (rd.kind === 'twin') return w === 0 || t.kind === 'twin';", "if (rd.kind === 'twin') return true;"],
  ['a going word may sit on the looking knob', 'core', "if (rd.kind === 'golook') return t.knob === W.knob && t.rank === W.click + 1;", "if (rd.kind === 'golook') return t.rank === W.click + 1;"],
  ['a decoy counts as the middle word', 'core', "if (rd.kind === 'between') return w !== 1 || t.kind === 'ladder';", "if (rd.kind === 'between') return true;"],
  ['serving anywhere is right', 'core', "if (st.knob[0] === rd.answer) { st.done = true;", "if (true) { st.done = true;"],
  ['the knob starts at the answer', 'core', "st.knob = rd.knobs.map(function () { return 0; });", "st.knob = rd.knobs.map(function () { return rd.answer || 0; });"],
  ['empty clicks count as a miss', 'core', "if (st.win.some(function (j) { return j == null; })) { st.last = 'empty'; return { result: 'empty' }; }", "if (st.win.some(function (j) { return j == null; })) { st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['miss 2 never shows the soup colours', 'core', "st.misses++; st.last = 'miss'; st.jumped = bad; st.help = st.misses >= 2;", "st.misses++; st.last = 'miss'; st.jumped = bad; st.help = st.misses >= 3;"],
  ['a move keeps the help', 'core', "function moved(st) { st.last = null; st.jumped = []; st.help = false; }", "function moved(st) { st.last = null; st.jumped = []; }"],
  ['the shelf may start in order', 'core', "var id = ident(n), rev = id.slice().reverse(); for (var k = 0; k < 50; k++)", "var id = ident(n), rev = id.slice().reverse(); return id; for (var k = 0; k < 50; k++)"],
  ['the twin always first on the shelf', 'core', "else if (lvl === '3') orders[r] = flip[i] ? [1, 0] : [0, 1];", "else if (lvl === '3') orders[r] = [0, 1];"],
  ['the same order every pass', 'core', "if (!same(c, prev)) { o = c; break; }", "o = ids; break;"],
  ['quiet back on the voice ladder', 'core', '"voice":{"w3":["whisper","talk","shout"]', '"voice":{"w3":["quiet","talk","shout"]'],
  ['a ticket that names its answer', 'core', '"Grandpa likes his soup only a little heated, so he can sip it right away."', '"Grandpa likes his soup warm, so he can sip it right away."'],
  ['a decoy inside its ladder', 'core', '"decoy":{"heat":["cold"]', '"decoy":{"heat":["hot"]'],
  ['creep and stroll on one knob', 'core', '"GO_ROUNDS":[[1,3,4]', '"GO_ROUNDS":[[0,1,4]'],
  ['a digit in a hint', 'act', 'hintEmpty: {en:"Every', 'hintEmpty: {en:"2 Every'],
  ['the word free in a string', 'act', 'missGlow: {en:"Put', 'missGlow: {en:"Free put'],
  ['the manifest still on the old tool', 'man', '"tool": "stove-knob-activity"', '"tool": "shades-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sk-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { SK_CORE: files.core, SK_ACT: files.act, SK_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-stove-knob-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-stove-knob: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
