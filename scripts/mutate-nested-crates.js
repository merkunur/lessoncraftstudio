#!/usr/bin/env node
/* =====================================================================
   mutate-nested-crates.js — proves verify-nested-crates-core.js can fail
   (ACTIVITY #146, The Nested Crates). Each mutation breaks the core, the
   activity or the data in one way a real bug would; the gate must reject
   every one. A control (a harmless whitespace change) must pass. A needle
   that is no longer in the file THROWS — a dropped mutation would shrink
   the count while the run still said "every mutation killed".
   Usage: node scripts/mutate-nested-crates.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'nested-crates-core.js'), act: path.join(MINI, 'nested-crates-activity.js'), man: path.join(MINI, 'place-value-regroup-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a crate opens straight into a hundred cubes', 'core', 's.H--; s.T += TEN; st.opened.H++;', 's.H--; s.O += TEN * TEN; st.opened.H++;'],
  ['a box opens from inside a crate (no box on the shelf)', 'core', "if (!s.T) return { result: 'empty' };", "if (!s.T) { if (!s.H) return { result: 'empty' }; s.H--; s.T += TEN; }"],
  ['a second crate opens while boxes lie loose', 'core', "if (s.T > 0) return { result: 'full' };", ''],
  ['a box opens with ten cubes loose', 'core', 'if (s.O >= TEN) return', 'if (s.O > TEN) return'],
  ['the slip takes from an empty shelf', 'core', "if (!st.shelves[col]) return { result: 'air', moved: 0 };", ''],
  ['the slip takes a wrong kind', 'core', "if (room <= 0) return { result: 'full', moved: 0 };", "if (room <= 0 && col === 'O') return { result: 'full', moved: 0 };"],
  ['Check with the slip unfilled', 'core', "if (!slipFull(st)) return { result: 'note', key: 'hintSlip' };", ''],
  ['Check accepts seventeen cubes on a shelf', 'core', "if (full.length) return { result: 'note', key: 'hintTooMany', cols: full };", ''],
  ['nine loose pieces pack', 'core', 's[col] < TEN || s[to] + 1 > SHELF_MAX', 's[col] < TEN - 1 || s[to] + 1 > SHELF_MAX'],
  ['a put-back overfills a shelf', 'core', ' || st.shelves[log[log.length - 1]] >= SHELF_MAX) return false;', ') return false;'],
  ['the 10 mark written before the crate opens', 'core', "if (c === 'T' && crates > 0) ch.push", "if (c === 'T') ch.push"],
  ["the child's marks ignore the crate", 'core', 'return chains(st.a, R, st.opened.H);', 'return chains(st.a, R, 0);'],
  ['a kept round changed', 'core', '[301, 6], [203, 7]]', '[301, 6], [203, 3]]'],
  ['a big round with tens to spare', 'core', '[905, 368], [604, 279]]', '[905, 368], [614, 279]]'],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", 'return { order: R.slice() };'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['a leading zero allowed', 'core', "(d === '0' && !st.typed)", '(false)'],
  ['digits typed left-aligned', 'core', "function boxDigit(s, col) { var i = s.length - 1 - COLS.slice().reverse().indexOf(col); return i >= 0 ? s.charAt(i) : ''; }", "function boxDigit(s, col) { return s.charAt(COLS.indexOf(col)) || ''; }"],
  ['a B&W picture', 'core', "var TUCK = 'pets/hamster';", "var TUCK = 'animals bw/hamster';"],
  ['a digit in a hint', 'act', 'hintCount: {"en":"Count what is left on each shelf."', 'hintCount: {"en":"Count what is left on each shelf (0-9)."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['borgen in German', 'act', '"de":"In einer Kiste sind zehn Zehner, in einer Schachtel zehn Einer."', '"de":"Borg dir einen Zehner aus der Kiste."'],
  ['a success line without its answer', 'act', 'okBig: {"en":"{a} take away {b} leaves {c}."', 'okBig: {"en":"{a} take away {b}."'],
  ['the success line names the wrong face', 'act', "st.face === 'big' ? 'okBig' : 'okOnes'", "st.face === 'big' ? 'okOnes' : 'okOnes'"],
  ['the success line with the numbers swapped', 'act', '{ a: st.a, b: st.b, c: NestedCratesCore.answer(st) }', '{ a: st.b, b: st.a, c: NestedCratesCore.answer(st) }'],
  ['the task line with a hyphen minus', 'act', "' − '", "' - '"],
  ['a frozen slug edited', 'man', '"en": "subtract-with-regrouping-break-a-hundred"', '"en": "subtract-with-regrouping-break-a-hundred-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "nested-crates-activity"', '"tool": "place-value-regroup-activity"'],
  ['a sibling row touched', 'man', '"tool": "square-vice-activity"', '"tool": "square-vice-activity2"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nc-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { NC_CORE: files.core, NC_ACT: files.act, NC_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-nested-crates-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-nested-crates: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
