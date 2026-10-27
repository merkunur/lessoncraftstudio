#!/usr/bin/env node
/* =====================================================================
   mutate-skewer-plate.js — proves verify-skewer-plate-core.js can fail (ACTIVITY #138, The Skewer Plate).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-skewer-plate.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'skewer-plate-core.js'), act: path.join(MINI, 'skewer-plate-activity.js'), man: path.join(MINI, 'array-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a skewer lifts part of a row', 'core', "if (st.dir === 'rows') for (var c = 0; c < st.c; c++) out.push([i, c]);", "if (st.dir === 'rows') for (var c = 0; c < st.c - 1; c++) out.push([i, c]);"],
  ['unequal addends accepted', 'core', "if (+st.boxes[s] !== holds(st)) return miss(st, 'unequal', { bad: s });", ""],
  ['rows + columns accepted', 'core', "if (tv === t) { st.done = true;", "if (tv === t || tv === st.r + st.c) { st.done = true;"],
  ['the turned target among the Find plates', 'core', "{ t: [3, 4], plates: [[3, 4], [3, 5], [4, 4]] }", "{ t: [3, 4], plates: [[3, 4], [4, 3], [4, 4]] }"],
  ['the right plate more often first', 'core', "{ t: [2, 5], plates: [[2, 4], [2, 5], [3, 5]] }", "{ t: [2, 5], plates: [[2, 5], [2, 4], [3, 5]] }"],
  ['the right plate more often the smallest', 'core', "{ t: [4, 5], plates: [[4, 5], [4, 4], [3, 5]] }", "{ t: [4, 5], plates: [[4, 5], [5, 5], [4, 6]] }"],
  ['a wrong plate two steps off', 'core', "{ t: [5, 4], plates: [[4, 4], [5, 4], [5, 3]] }", "{ t: [5, 4], plates: [[3, 4], [5, 4], [5, 3]] }"],
  ['a turned plate accepted in Build', 'core', "if (st.b.r === st.r && st.b.c === st.c) {", "if (st.b.r * st.b.c === st.r * st.c) {"],
  ['big arrays repeat a table', 'core', "[9, 3], [10, 4]", "[9, 2], [10, 4]"],
  ['turning the sticks moves the fruit', 'core', "else for (var r = 0; r < st.r; r++) out.push([r, i]);", "else for (var r = 0; r < st.r; r++) out.push([i % st.r, r % st.c]);"],
  ['a shipped array dropped', 'core', "[5, 2, 'fruits/orange']", "[5, 3, 'fruits/orange']"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['a skewer lifts twice', 'core', "if (i < 0 || i >= skewers(st) || isLifted(st, i)) return 'no';", "if (i < 0 || i >= skewers(st)) return 'no';"],
  ['a delete keeps the help', 'core', "st.help = false; return 'del';", "return 'del';"],
  ['the total takes four digits', 'core', "if (cur.length >= (key === 'total' ? 3 : 2)) return 'full';", "if (cur.length >= (key === 'total' ? 4 : 2)) return 'full';"],
  ['the same order every pass', 'core', "var o = shuffle(ids, rnd); if (prev", "var o = ids.slice(); if (prev"],
  ['two same totals in a row allowed', 'core', "if (totalOf(mode, o[j]) === totalOf(mode, o[j - 1])) { ok = false; break; }", ""],
  ['the columns line in the wrong order', 'act', '{c} × {r} = {t}.","de"', '{r} × {c} = {t}.","de"'],
  ['a digit in a hint', 'act', 'hLift: {"en":"Lift out the skewers first."', 'hLift: {"en":"Lift out the 2 skewers first."'],
  ['the word free in a string', 'act', 'aDel: {"en":"Delete"', 'aDel: {"en":"Free delete"'],
  ['the manifest still on the old tool', 'man', '"tool": "skewer-plate-activity"', '"tool": "array-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sp-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { SP_CORE: files.core, SP_ACT: files.act, SP_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-skewer-plate-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-skewer-plate: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
