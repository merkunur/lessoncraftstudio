#!/usr/bin/env node
/* =====================================================================
   mutate-accordion.js — proves verify-accordion-core.js can fail (ACTIVITY #139, The Accordion Sentence).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-accordion.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'accordion-core.js'), act: path.join(MINI, 'accordion-activity.js'), man: path.join(MINI, 'array-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['unequal pleats fold', 'core', "if (beads[i] !== beads[0]) return false;", ""],
  ['empty pleats fold', 'core', "if (beads.length < 2 || beads[0] < 1) return false;", "if (beads.length < 2) return false;"],
  ['the running total skips a pleat', 'core', "s += beads[i]; out.push(s);", "out.push(s); s += beads[i];"],
  ['unequal groups accepted at Check', 'core', "if (!canFold(b)) { st.folded = false; return miss(st, 'unequal'); }", ""],
  ['the wrong group size accepted', 'core', "if (st.level === '1' && b[0] !== st.e) return miss(st, 'wrongSize');", ""],
  ['only one factor order read', 'core', "|| (a === st.e && bb === st.g)", ""],
  ['a sentence with the wrong product accepted', 'core', "if (factors && c === t) {", "if (factors) {"],
  ['a wrong running total accepted', 'core', "if (+st.windows[j] !== rt[j]) {", "if (+st.windows[j] !== rt[j] && false) {"],
  ['a window miss hides the windows', 'core', "{ st.folded = false; return miss(st, 'run'", "{ return miss(st, 'run'"],
  ['the odd tray never moves', 'core', "(rd.odd + (pass || 0)) % rd.g", "rd.odd % rd.g"],
  ['a fix round off by two', 'core', "{ g: 5, e: 2, odd: 2, delta: 1 }", "{ g: 5, e: 2, odd: 2, delta: 2 }"],
  ['a shipped round dropped', 'core', "[2, 5], [3, 3]", "[2, 6], [3, 3]"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['an array is editable', 'core', "return !st.array && !st.done;", "return !st.done;"],
  ['the total takes three digits', 'core', "if (v.length >= 2) return 'full';", "if (v.length >= 3) return 'full';"],
  ['the same order every pass', 'core', "var o = shuffle(ids, rnd);", "var o = ids.slice();"],
  ['the first window says to 0', 'core', "(L.at ? 'missRun' : 'missRunFirst')", "'missRun'"],
  ['a number in the fix line', 'act', 'pFix: {"en":"One group has a different number.', 'pFix: {"en":"One group has a different number {each}.'],
  ['a digit in a hint', 'act', 'hEmpty: {"en":"Put beads in the groups first."', 'hEmpty: {"en":"Put 2 beads in the groups first."'],
  ['the rows line with the wrong sign', 'act', '{rows} × {cols} = {total}!","de"', '{rows} x {cols} = {total}!","de"'],
  ['pMake is not the shipped sentence', 'act', 'pMake: {"en":"Make {groups} groups of {each}."', 'pMake: {"en":"Make {groups} groups with {each}."'],
  ['the word free in a string', 'act', 'aDel: {"en":"Delete"', 'aDel: {"en":"Free delete"'],
  ['the answer read to a screen reader', 'act', "d.setAttribute('aria-hidden', 'true');", "d.setAttribute('role', 'img');"],
  ['the manifest still on the old tool', 'man', '"tool": "accordion-activity"', '"tool": "array-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ac-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { AC_CORE: files.core, AC_ACT: files.act, AC_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-accordion-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-accordion: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
