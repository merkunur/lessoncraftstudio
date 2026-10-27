#!/usr/bin/env node
/* =====================================================================
   mutate-flip-pads.js — proves verify-flip-pads-core.js can fail (ACTIVITY #141, The Flip Pads).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-flip-pads.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'flip-pads-core.js'), act: path.join(MINI, 'flip-pads-activity.js'), man: path.join(MINI, 'skipcount-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a flip carries into the next flap', 'core', "else f[i] = ((v == null ? 0 : v) + d + 10) % 10;", "else { var nv = (v == null ? 0 : v) + d; if (nv > 9 && i > 0) f[i - 1] = (f[i - 1] || 0) + 1; f[i] = (nv + 10) % 10; }"],
  ['a leading flap shows 0', 'core', "if (f[i] === 0) f[i] = null; if (f[i] != null) seen = true;", "if (f[i] != null) seen = true;"],
  ['the bud starts blank, not as a copy', 'core', "else st.board = flaps(rd.seq[rd.buds[0] - 1], p);", "else st.board = flaps(rd.seq[rd.buds[0] - 1], p).map(function () { return null; });"],
  ['the second bud copies the printed pad two back', 'core', "st.board = flaps(st.rd.seq[budIndex(st) - 1], st.places);", "st.board = flaps(st.rd.seq[Math.max(0, budIndex(st) - 2)], st.places);"],
  ['the meter loses its sign', 'core', "return miss(st, 'meter', { made: v - prev, hop: stepOf(st.rd) });", "return miss(st, 'meter', { made: Math.abs(v - prev), hop: stepOf(st.rd) });"],
  ['a going-down pad accepted when flipped forward', 'core', "if (v !== target(st)) return miss(st, 'meter'", "if (v !== target(st) && v !== prev + Math.abs(stepOf(st.rd))) return miss(st, 'meter'"],
  ['a chain containing 0', 'core', "{ seq: [10, 20, 30, 40, 50], buds: [2, 4] }", "{ seq: [0, 10, 20, 30, 40], buds: [2, 4] }"],
  ['a four-flap board on a three-digit chain', 'core', "return rd.seq.some(function (n) { return n >= 1000; }) ? 4 : 3;", "return rd.seq.some(function (n) { return n >= 900; }) ? 4 : 3;"],
  ['buds moved to the last pad', 'core', "{ seq: [63, 68, 73, 78, 83], buds: [2, 4] }", "{ seq: [63, 68, 73, 78, 83], buds: [3, 4] }"],
  ['find-the-hop ignores the sign', 'core', "if (st.sign * mag === want) {", "if (mag === Math.abs(want)) {"],
  ['the same order every pass', 'core', "var o = shuffle(ids, rnd);", "var o = ids.slice();"],
  ['up only keeps the going-down rounds', 'core', "return dirOf(dir) === 'up' ? R.filter(function (r) { return r.hop || !isDown(r); }) : R;", "return R;"],
  ['a bank chain drawn winding', 'core', "return !rd.hop && rd.seq[0] === stepOf(rd);", "return !rd.hop && rd.seq[0] === stepOf(rd) && rd.seq[0] < 10;"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['a flip keeps the help', 'core', "flipDigits(st.board, i, d); st.tally += d; st.help = false; return 'flipped';", "flipDigits(st.board, i, d); st.tally += d; return 'flipped';"],
  ['miss 2 rings the wrong flaps', 'core', "for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) out.push(i);", "for (var i = 0; i < a.length; i++) if (a[i] === b[i]) out.push(i);"],
  ['a crossing bud removed', 'core', "{ seq: [85, 90, 95, 100, 105], buds: [2, 3] }", "{ seq: [85, 90, 95, 100, 105], buds: [2, 4] }"],
  ['the ascii hyphen for minus', 'act', "MINUS: '−',", "MINUS: '-',"],
  ['a digit in a hint', 'act', 'hSame: {"en":"Flip it forward by one hop of {s}."', 'hSame: {"en":"Flip it forward by 1 hop of {s}."'],
  ['a false sign line', 'act', 'okSign: {"en":"Every hop is {sign}{s}!"', 'okSign: {"en":"Every hop is {s}!"'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['a role="img" label', 'act', "pond.setAttribute('role', 'group');", "pond.setAttribute('role', 'img');"],
  ['the frog picture missing', 'act', "FROG: 'pets/frog',", "FROG: 'pets/frogs',"],
  ['a frozen slug edited', 'man', '"en": "skip-counting-by-5-10-100"', '"en": "skip-counting-by-5-10-100-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "flip-pads-activity"', '"tool": "skipcount-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { FP_CORE: files.core, FP_ACT: files.act, FP_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-flip-pads-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-flip-pads: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
