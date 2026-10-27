#!/usr/bin/env node
/* =====================================================================
   mutate-chimney-roof.js — proves verify-chimney-roof-core.js can fail (ACTIVITY #137, The Chimney Roof).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-chimney-roof.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'chimney-roof-core.js'), act: path.join(MINI, 'chimney-roof-activity.js'), man: path.join(MINI, 'choice-board-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['bricks stack on the higher column', 'core', "function columns(p) { return { L: Math.ceil(p / 2), R: Math.floor(p / 2) }; }", "function columns(p) { return { L: p, R: 0 }; }"],
  ['the flat roof fits a lone brick', 'core', "function fits(n, kind) { return even(n) === (kind === 'flat'); }", "function fits(n, kind) { return kind === 'flat' || !even(n); }"],
  ['odd tens leave a lone brick', 'core', "L: s.slabs * 5 + c.L,", "L: s.slabs * 5 + (s.slabs % 2) + c.L,"],
  ['the last bag on a shelf is odd more often', 'core', "[[50, 49, 42, 93],", "[[50, 49, 93, 42],"],
  ['unequal parts accepted', 'core', "if (a === h && b === h) {", "if (a + b === 2 * h) {"],
  ['the flat roof always on the left', 'core', "order.forEach(function (r, k) { bySide[r] = sides[k]; });", "order.forEach(function (r, k) { bySide[r] = 'flatLeft'; });"],
  ['1 is a round', 'core', "var R10 = [2, 3, 4,", "var R10 = [1, 3, 4,"],
  ['three of one verdict in a row allowed', 'core', "if (verdict(num, c[j]) === verdict(num, c[j - 1]) && verdict(num, c[j]) === verdict(num, c[j - 2])) { bad = true; break; }", ""],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2; st.hover = null;", "st.misses++; st.help = st.misses >= 3; st.hover = null;"],
  ['a roof lands before the last brick', 'core', "if (st.poured < st.n) {\n      if (st.mode === 'before')", "if (st.poured < st.n - 1) {\n      if (st.mode === 'before')"],
  ['a landed shelf roof can be moved', 'core', "var b = st.bags[i]; if (!b || b.landed) return 'no';", "var b = st.bags[i]; if (!b) return 'no';"],
  ['a brick leaves after the roof is on', 'core', "function unpour(st) { if (st.num === '99' || st.roof ||", "function unpour(st) { if (st.num === '99' ||"],
  ['the same order every pass', 'core', "var c = shuffle(ids, rnd);", "var c = ids.slice();"],
  ['a delete keeps the equation help', 'core', "st.eq[st.focus] = st.eq[st.focus].slice(0, -1); st.eqHelp = false; return 'del';", "st.eq[st.focus] = st.eq[st.focus].slice(0, -1); return 'del';"],
  ['the bag pours one brick too many', 'core', "if (st.poured >= st.n) return 'full';", "if (st.poured > st.n) return 'full';"],
  ['a hint names the verdict', 'act', 'miss1: {"en":"Look at the top', 'miss1: {"en":"Is it odd? Look at the top'],
  ['the roof word is not the shipped one', 'act', 'even: {"en":"Even"', 'even: {"en":"Evens"'],
  ['a false odd line', 'act', 'okOdd: {"en":"{n} = {a} + {a} + 1:', 'okOdd: {"en":"{n} = {a} + {a}:'],
  ['a digit in a hint', 'act', 'hPour: {"en":"Pour the bricks first."', 'hPour: {"en":"Pour the 2 bricks first."'],
  ['the word free in a string', 'act', 'aDel: {"en":"Delete"', 'aDel: {"en":"Free delete"'],
  ['the manifest still on the old tool', 'man', '"tool": "chimney-roof-activity"', '"tool": "choice-board-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { CR_CORE: files.core, CR_ACT: files.act, CR_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-chimney-roof-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-chimney-roof: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
