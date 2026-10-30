#!/usr/bin/env node
/* =====================================================================
   mutate-stamp-sheet.js — proves verify-stamp-sheet-core.js can fail
   (ACTIVITY #170, The Stamp Sheet). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-stamp-sheet.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'stamp-sheet-core.js'), act: path.join(MINI, 'stamp-sheet-activity.js'), man: path.join(MINI, 'fractions-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a pick round whose match is the middle-total sheet (the size tell)', 'core', "{ card: [2, 3], sheets: [[2, 3], [2, 4], [3, 3]], slot: 2 },", "{ card: [2, 3], sheets: [[2, 3], [2, 2], [3, 3]], slot: 2 },"],
  ['a grid with a cut at a half notch accepted (only the count of lines is checked)', 'core', 'return cutsSorted(st.colCuts).join() === want(st.cols) && cutsSorted(st.rowCuts).join() === want(st.rows);', 'return st.colCuts.length === st.cols - 1 && st.rowCuts.length === st.rows - 1;'],
  ['the fence post: as many lines as columns accepted', 'core', 'var want = function (n) { var o = []; for (var i = 1; i < n; i++) o.push(2 * i); return o.join(); };', 'var want = function (n) { var o = []; for (var i = 1; i <= n; i++) o.push(2 * i - 1); return o.join(); };'],
  ['rows and columns swapped accepted', 'core', 'return cutsSorted(st.colCuts).join() === want(st.cols) && cutsSorted(st.rowCuts).join() === want(st.rows);', 'return cutsSorted(st.colCuts).join() === want(Math.min(st.cols, st.rows)) && cutsSorted(st.rowCuts).join() === want(Math.min(st.cols, st.rows));'],
  ['the total is rows + cols', 'core', 'function total(st) { return st.rows * st.cols; }', 'function total(st) { return st.rows + st.cols; }'],
  ['pick accepts an equal total (2×6 for 3 rows of 4)', 'core', 'function fits(sheet, card) { return sheet.rows === card.rows && sheet.cols === card.cols; }', 'function fits(sheet, card) { return sheet.rows * sheet.cols === card.rows * card.cols; }'],
  ['a transposed sheet offered', 'core', "{ card: [3, 4], sheets: [[3, 4], [3, 3], [2, 4]], slot: 3 },", "{ card: [3, 4], sheets: [[3, 4], [3, 3], [4, 3]], slot: 3 },"],
  ['the showing survives a new perforation', 'core', 'function changed(st) { st.verdict = null; }', 'function changed(st) { }'],
  ['the count step opens before the grid is true', 'core', "if (isTrueGrid(st)) { st.step = 'count';", "if (isTrueGrid(st) || st.colCuts.length === st.cols - 1) { st.step = 'count';"],
  ['de writes × instead of the raised dot', 'core', "de: '·'", "de: '×'"],
  /* the rest of the model */
  ['a too-thin piece not marked sliced', 'core', 'if (p.w < 2) o.over.push(', 'if (p.w < 1) o.over.push('],
  ['a too-big piece not marked bordered', 'core', 'if (p.w > 2) o.border.push(', 'if (p.w > 3) o.border.push('],
  ['a true piece printed as a misprint', 'core', "ok: p.w === 2 && p.h === 2,", "ok: p.w === 2,"],
  ['no reminder when nothing is perforated (a miss instead)', 'core', "if (!st.colCuts.length && !st.rowCuts.length) return { result: 'note', key: 'hintStart' };", ''],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2; st.verdict = { misprint: true };", "st.misses++; st.help = false; st.verdict = { misprint: true };"],
  ['the count never helps', 'core', 'st.cmisses++; st.chelp = st.cmisses >= 2;', 'st.cmisses++; st.chelp = false;'],
  ['the keypad takes a leading 0', 'core', " || (st.typed === '' && String(d) === '0')", ''],
  ['running totals off by one row', 'core', 'for (var r = 1; r <= rows; r++) o.push(r * cols);', 'for (var r = 0; r < rows; r++) o.push(r * cols);'],
  ['the match keeps its slot every pass', 'core', 'function slotIn(r, pass) { return ((r.slot - 1) + (pass || 0)) % 3; }', 'function slotIn(r, pass) { return r.slot - 1; }'],
  ['the reshuffle repeats the previous order', 'core', "if ((!prev || prev.join() !== c.join()) && okRuns(c)) return c;", "if (okRuns(c)) return c;"],
  ['the pick plan lets one slot run three times', 'core', "var okRuns = function (c) { if (board !== 'pick') return true;", "var okRuns = function (c) { return true;"],
  ['a design round drifts (M9 is no longer the tall twin)', 'core', 'var NUMBERS = [[2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [4, 4], [3, 5], [4, 5], [3, 2]];', 'var NUMBERS = [[2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [4, 4], [3, 5], [4, 5], [2, 3]];'],
  ['the pieces hint leaks onto the plate board', 'act', "if (!st.help && st.board === 'numbers') v.note +=", "if (!st.help) v.note +="],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['a locale loses a string', 'act', '"fi":"Montako postimerkkiä?"', '"fx":"Montako postimerkkiä?"'],
  ['the row points at the old tool', 'man', '"tool": "stamp-sheet-activity"', '"tool": "fractions-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sts-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-stamp-sheet-core.js')], { env: Object.assign({}, process.env, { SS_CORE: files.core, SS_ACT: files.act, SS_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 60) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
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
console.log(`mutate-stamp-sheet: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
