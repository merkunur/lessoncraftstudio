#!/usr/bin/env node
/* =====================================================================
   mutate-capped-mat.js — proves verify-capped-mat-core.js can fail
   (ACTIVITY #149, The Capped Mat). Each mutation breaks the core or the
   activity in one way a real bug would; the gate must reject every one.
   A control (a harmless whitespace change) must pass. A needle that is no
   longer in the file THROWS. Needles are matched after collapsing \r\n.
   Usage: node scripts/mutate-capped-mat.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'capped-mat-core.js'), act: path.join(MINI, 'capped-mat-activity.js') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a tenth block allowed', 'core', 'if (st.mat[p] >= 9) { st.refused = p;', 'if (st.mat[p] >= 10) { st.refused = p;'],
  ['ten regroups by itself', 'core', 'if (st.mat[p] >= 9) { st.refused = p; return { ok: false, refused: true }; }', "if (st.mat[p] >= 9 && p !== 'h') { st.mat[p] = 0; st.mat[p === 'o' ? 't' : 'h']++; return { ok: true }; }"],
  ['a bare empty column passes', 'core', 'if (bare.length) kind = {', 'if (false) kind = {'],
  ['a bare full column folds', 'core', 'var unfilled = PLACES.filter(function (p) { return st.mat[p] > 0 && st.caps[p] == null; });', 'var unfilled = [];'],
  ['a delivery block goes by its order, not its kind', 'core', 'var p = st.delivery[i];', "var p = PLACES[i % 3];"],
  ['a piece count accepted as a cap', 'core', 'var wrong = PLACES.filter(function (p) { return st.caps[p] !== st.mat[p]; });', "var wrong = PLACES.filter(function (p) { return st.caps[p] !== st.mat[p] && st.caps[p] !== st.mat.h + st.mat.t + st.mat.o; });"],
  ['the right tray always first', 'core', '{ ticket: 306, trays: [360, 306, 406] }', '{ ticket: 306, trays: [306, 360, 406] }'],
  ['a tray picked by its flats alone', 'core', '{ ticket: 263, trays: [623, 264, 263] }', '{ ticket: 263, trays: [623, 364, 263] }'],
  ['a zero dropped from a build target', 'core', 'var BUILD_A = [108, 247, 305,', 'var BUILD_A = [18, 247, 305,'],
  ['the child caps in Build', 'core', "if (st.done || st.job !== 'read' || PLACES.indexOf(p) < 0 || !/^[0-9]$/.test(String(d))) return false;", "if (st.done || PLACES.indexOf(p) < 0 || !/^[0-9]$/.test(String(d))) return false;"],
  /* the rest of the model */
  ['a read delivery in H-T-O order', 'core', "{ n: 136, order: 'oht' }, { n: 254, order: 'toh' }", "{ n: 136, order: 'hto' }, { n: 254, order: 'hto' }"],
  ['a read round loses its zero', 'core', "{ n: 307, order: 'oh' }", "{ n: 317, order: 'oth' }"],
  ['the fold keeps the bare column as 0', 'core', "return PLACES.filter(function (p) { return caps[p] != null; }).map(function (p) { return String(caps[p]); }).join('');", "return PLACES.map(function (p) { return String(caps[p] == null ? 0 : caps[p]); }).join('');"],
  ['a wrong build counts', 'core', 'if (built === r.n) return win(st);', 'if (Math.abs(built - r.n) <= 10) return win(st);'],
  ['an empty build is a miss', 'core', "if (!st.mat.h && !st.mat.t && !st.mat.o) return { result: 'note', key: 'hintBuildEmpty' };", ''],
  ['a missing cap is a miss', 'core', "if (unfilled.length) { st.verdict = { kind: 'capMissing', places: unfilled }; return { result: 'note', key: 'hintCapMissing', places: unfilled }; }", "if (unfilled.length) { st.misses++; st.verdict = { kind: 'capMissing', places: unfilled }; return { result: 'note', key: 'hintCapMissing', places: unfilled }; }"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['too many shown as outlines', 'core', "v.over.length && v.under.length ? 'hintBuildBoth' : v.over.length ? 'hintBuildTake' : 'hintBuildFill'", "'hintBuildFill'"],
  ['over and under swapped', 'core', 'over: PLACES.filter(function (p) { return st.mat[p] > want[p]; }), under: PLACES.filter(function (p) { return st.mat[p] < want[p]; })', 'over: PLACES.filter(function (p) { return st.mat[p] < want[p]; }), under: PLACES.filter(function (p) { return st.mat[p] > want[p]; })'],
  ['a move keeps the old caps', 'core', "if (st.job === 'build') st.caps = { h: null, t: null, o: null };", ''],
  ['the wrong tray reports the ticket', 'core', 'var shown = r.trays[st.tray];', 'var shown = r.n;'],
  ['the success counts are the ticket in read', 'core', "return st.job === 'match' ? digits(st.round.n) :", "return true ? { h: 1, t: 1, o: 1 } :"],
  ['a jumbled tray in H-T-O order', 'core', "var SCATTER = ['oht', 'toh', 'tho', 'oth', 'hot'];", "var SCATTER = ['hto', 'toh', 'tho', 'oth', 'hot'];"],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", 'return { order: o };'],
  ['the build passes do not alternate', 'core', "return job !== 'build' || r.pass === (pass % 2);", 'return true;'],
  ['the tenth refusal names the wrong place', 'core', "return p === 'o' ? 'hintTenthO' : p === 't' ? 'hintTenthT' : 'hintTenthH';", "return 'hintTenthT';"],
  ['a second fold gives no 0 hint', 'core', "if (v.kind === 'zeroFold') return st.help ? 'hintZeroCap' : 'hintZeroFold';", "if (v.kind === 'zeroFold') return 'hintZeroFold';"],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['the fold hint gives the answer away', 'act', '"en":"Without a cap the empty column folds away and the caps read {fold}.', '"en":"Without a cap the empty column folds away and {n} becomes {fold}.'],
  ['the fold hint loses its fold', 'act', '"en":"Without a cap the empty column folds away and the caps read {fold}.', '"en":"Without a cap the empty column folds away.'],
  ['a locale without a string', 'act', '"fi":"Poista yliviivatut palikat."', '"fi":""'],
  ['a hint key never reached', 'act', "if (r.refused) { var v = this._view; v.note = this._t(CappedMatCore.refusedKey(p));", "if (r.refused) { var v = this._view; v.note = '';"]
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cm-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { CM_CORE: files.core, CM_ACT: files.act }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-capped-mat-core.js')], { env, encoding: 'utf8', timeout: 30000 }); };
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
console.log(`mutate-capped-mat: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
