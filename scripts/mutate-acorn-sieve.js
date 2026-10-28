#!/usr/bin/env node
/* =====================================================================
   mutate-acorn-sieve.js — proves verify-acorn-sieve-core.js can fail
   (ACTIVITY #144, The Acorn Sieve). Each mutation breaks the core, the
   activity or the data in one way a real bug would; the gate must reject
   every one. A control (a harmless whitespace change) must pass. A needle
   that is no longer in the file THROWS — a dropped mutation would shrink
   the count while the run still said "every mutation killed".
   Usage: node scripts/mutate-acorn-sieve.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'acorn-sieve-core.js'), act: path.join(MINI, 'acorn-sieve-activity.js'), man: path.join(MINI, 'tally-squirrel-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a basket can be tipped twice', 'core', "if (st.done || !t || t.tipped || st.face === 'wall') return false;", "if (st.done || !t || st.face === 'wall') return false;"],
  ['a shake lets the cups fall through too', 'core', "var moved = st.sieve; st.tray += moved; st.sieve = 0;", "var moved = st.sieve + st.cups * 10; st.tray += moved; st.sieve = 0; st.cups = 0;"],
  ['a groove holds eleven', 'core', "var GROOVE = 10, GROOVES = 4;", "var GROOVE = 11, GROOVES = 4;"],
  ['the cups window read as ones', 'core', "var truth = { cups: st.cups, loose: st.tray, all: target(st) }", "var truth = { cups: st.cups * 10, loose: st.tray, all: target(st) }"],
  ['the total accepts cups + loose without the ten', 'core', "all: target(st) }, wrongs = [];", "all: st.cups + st.tray }, wrongs = [];"],
  ['Check allowed with a basket upright', 'core', "if (!allTipped(st)) return { result: 'note', key: st.face === 'wall' ? 'hintPour' : 'hintTip' };", ""],
  ['the cloth lifts before Check (a shake under it)', 'core', "if (st.covered || st.sieve === 0) return 0;", "if (st.sieve === 0) return 0;"],
  ['a wall brick is the difference of its supports', 'core', "return [a, b, c, a + b, b + c, a + b + b + c];", "return [a, b, c, Math.abs(a - b), Math.abs(b - c), a + b + b + c];"],
  ['the miss-2 split puts the ones over the sieve', 'core', "var T = ns.map(function (n) { return tens(n) * 10; })", "var T = ns.map(function (n) { return ones(n) * 10; })"],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", "return { order: o.sort(function (a, b) { return a - b; }) };"],
  ['the bands are dropped from the plan', 'core', "var keys = Object.keys(bands).sort();", "var keys = ['1']; bands['1'] = R.map(function (r) { return r.k; });"],
  ['a kept round changed', 'core', "[[15, 22, 34, 11], 3]", "[[15, 22, 34, 12], 3]"],
  ['a two-or-three round regroups', 'core', "var FEW = [[21, 13],", "var FEW = [[28, 13],"],
  ['a small round passes ten', 'core', "[3, 4, 3]];", "[3, 4, 5]];"],
  ['a wall base changed', 'core', "[13, 28, 15]", "[13, 28, 16]"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['the cups window takes two digits', 'core', "function maxLen(w) { return w === 'cups' ? 1 : 2; }", "function maxLen(w) { return 2; }"],
  ['a full groove under the cloth rolls', 'core', "if (st.done || st.covered || st.tray < GROOVE) return false;", "if (st.done || st.tray < GROOVE) return false;"],
  ['the small face shows a cups window', 'core', "return face === 'small' ? ['loose', 'all'] :", "return face === 'small' ? ['cups', 'loose', 'all'] :"],
  ['a B&W picture', 'core', "var TALLY = 'forest creatures/squirrel';", "var TALLY = 'animals bw/squirrel';"],
  ['a digit in a hint', 'act', 'hintCount: {"en":"Count the cups by tens and the loose acorns by ones."', 'hintCount: {"en":"Count the cups by 10s and the loose acorns by ones."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['a success line without its total', 'act', 'okFour: {"en":"{list} = {total}: {t} tens and {o} ones make {total}!"', 'okFour: {"en":"{list} = {total}: {t} tens and {o} ones!"'],
  ['the success line with the tens and ones swapped', 'act', "return this._t('okFour', { list: list, total: total, t: t, o: o });", "return this._t('okFour', { list: list, total: total, t: o, o: t });"],
  ['a frozen slug edited', 'man', '"en": "tally-squirrel-add-four"', '"en": "tally-squirrel-add-four-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "acorn-sieve-activity"', '"tool": "tally-squirrel-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'as-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { AS_CORE: files.core, AS_ACT: files.act, AS_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-acorn-sieve-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-acorn-sieve: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
