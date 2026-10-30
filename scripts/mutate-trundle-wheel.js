#!/usr/bin/env node
/* =====================================================================
   mutate-trundle-wheel.js — proves verify-trundle-wheel-core.js can fail
   (ACTIVITY #169, The Trundle Wheel). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-trundle-wheel.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'trundle-wheel-core.js'), act: path.join(MINI, 'trundle-wheel-activity.js'), man: path.join(MINI, 'sort-bins-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['sides read from a fixed table, not the vertices', 'core', 'return { n: v.length, lens: L,', 'return { n: Math.min(4, v.length), lens: L,'],
  ['the roll stops one side early', 'core', 'for (var k = 0; k < n; k++) {\n      var side', 'for (var k = 0; k < n - 1; k++) {\n      var side'],
  ['the start side printed twice', 'core', "return { start: s, order: order, dashes: order.map(function (i) { return L[i]; }), marks: marks, ext: ext, placed: placed };", "return { start: s, order: order.concat([order[0]]), dashes: order.concat([order[0]]).map(function (i) { return L[i]; }), marks: marks.concat(['dot']), ext: ext.concat([0]), placed: placed };"],
  ['an 85° corner marked square', 'core', 'var isSquare = function (a) { return Math.abs(a - 90) <= 0.5; };', 'var isSquare = function (a) { return Math.abs(a - 90) <= 6; };'],
  ['the ticket depends on the turn', 'core', 'function ticketOf(it) { var v = verts(it.id, it.rot);', 'function ticketOf(it) { var v = verts(it.id, it.rot ? it.rot + 7 : 0); v = v.slice(0, 1).concat(v.slice(1).map(function (p) { return [p[0] * 1.02, p[1]]; }));'],
  ['the square refused by the left column', 'core', "function cellOf(inf) { return (inf.allEqual ? 'T' : 'B') + (inf.allSquare ? 'L' : 'R'); }", "function cellOf(inf) { return (inf.allEqual ? 'T' : 'B') + (inf.allSquare && !inf.allEqual ? 'L' : 'R'); }"],
  ['equal sides with a 5 % tolerance (a near-rhombus counts)', 'core', 'return Math.abs(x - mean) <= 0.01 * mean;', 'return Math.abs(x - mean) <= 0.6 * mean;'],
  ['a concave shape admitted', 'core', "    quad_kite: [[50, 4], [80, 40], [50, 92], [20, 40]],", "    quad_kite: [[50, 4], [80, 40], [50, 30], [20, 40]],"],
  ['a round with an empty crate', 'core', "{ crates: [3, 5], tray: items(", "{ crates: [3, 4, 5], tray: items("],
  ['a drawer with two fitting candidates', 'core', "drawer: items('quad_square@45 · quad_rhombus60@45 · quad_rect_thin@0')", "drawer: items('quad_square@45 · quad_square45@0 · quad_rect_thin@0')"],
  ['a right shape un-placed by a later miss', 'core', '    wrong.forEach(function (it) { it.place = null; it.ticket = ticketOf(it); });', '    st.items.forEach(function (it) { if (it.from === \'t\') it.place = null; }); wrong.forEach(function (it) { it.ticket = ticketOf(it); });'],
  ['the crates always in the same order', 'core', 'crates: r.crates ? shuffle(r.crates.slice(), rnd) : null,', 'crates: r.crates ? r.crates.slice() : null,'],
  /* the rest of the model */
  ['the rings: a square corner read as four sides', 'core', "function regionOf(inf) { var a = inf.n === 4, b = inf.hasSquare;", "function regionOf(inf) { var a = inf.n === 4 || inf.hasSquare, b = inf.hasSquare;"],
  ['the dock lands on the highest side', 'core', 'if (y > by + 1e-9) { by = y; best = i; }', 'if (-y > by + 1e-9) { by = -y; best = i; }'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = false;'],
  ['a drawer round done with the empty drawer empty', 'core', "    if (unplaced.length || gap) return { result: 'note', key: 'hintPlace' };", "    if (unplaced.length) return { result: 'note', key: 'hintPlace' };"],
  ['three tray neighbours may share a place', 'core', 'if (a === b && b === c) ok = false;', ''],
  ['the reshuffle repeats the previous order', 'core', 'if (!prev || prev.join() !== c.join()) return c;', 'return c;'],
  ['a design round drifts', 'core', "items('pent_irreg@0 · pent_house@200 · pent_reg@0 · hex_long@0 · hex_lopsided@0 · hex_reg@30')", "items('pent_irreg@0 · pent_house@0 · pent_reg@0 · hex_long@0 · hex_lopsided@0 · hex_reg@30')"],
  ['the success says "1 triangles"', 'act', 'return c.k + \' \' + (c.k === 1 ? nn[0] : nn[2]);', 'return c.k + \' \' + nn[2];'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['a locale loses its shape names', 'act', '    fi: {"3":', '    fx: {"3":'],
  ['the row points at the old tool', 'man', '"tool": "trundle-wheel-activity"', '"tool": "sort-bins-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tw-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-trundle-wheel-core.js')], { env: Object.assign({}, process.env, { TW_CORE: files.core, TW_ACT: files.act, TW_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-trundle-wheel: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
