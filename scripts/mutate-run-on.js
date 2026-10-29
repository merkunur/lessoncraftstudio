#!/usr/bin/env node
/* =====================================================================
   mutate-run-on.js — proves verify-run-on-core.js can fail
   (ACTIVITY #163, The Run-On Test). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-run-on.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'run-on-core.js'), act: path.join(MINI, 'run-on-activity.js'), man: path.join(MINI, 'clock-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the short-hand tolerance widened to a whole number', 'core', 'var shortOk = dd <= 5 &&', 'var shortOk = dd <= 30 &&'],
  ['the run-on skipped (readout alone grades)', 'core', 'right = longOk && rd.h === r.h && run.square;', 'right = longOk && rd.h === r.h;'],
  ['square on any number, not the goal hour', 'core', 'off = Math.abs(((arrive - goal * 30 + 540) % 360) - 180);', 'off = Math.abs(((arrive - near * 30 + 540) % 360) - 180);'],
  ['the bell strikes the hour set, not the next', 'core', "struck: (near % 12) || 12,", "struck: (goal - 1) % 12 || 12,"],
  ['the rest hands may lie on top of each other', 'core', 'if (Math.abs(((L - S + 540) % 360) - 180) < 30) S = norm(wrap(r.h + 5) * 30); ', ''],
  ['the rest pose is the answer', 'core', 'return { long: L, short: S }; }', 'return { long: norm(r.m * 6), short: norm(r.h * 30 + r.m / 2) }; }'],
  ['the rim bolds every five minutes at every level', 'act', "var boldEvery = lv === 'oh' ? 30 : lv === 'q' ? 15 : 5;", 'var boldEvery = 5;'],
  ['the short hand snaps to whole hours', 'core', 'function snapShort(d) { return norm(Math.round(norm(d) / 2.5) * 2.5); }', 'function snapShort(d) { return norm(Math.round(norm(d) / 30) * 30); }'],
  ['square tolerance zero', 'core', 'var square = off <= 5;', 'var square = off <= 0 && false;'],
  ['the readout is live while the hands are set', 'act', 'var rd = st.done ? { h: st.round.h, m: st.round.m } : vr && v.shown ? vr.readout : null;', 'var rd = st.done ? { h: st.round.h, m: st.round.m } : C.readout(st.long, st.short);'],
  ['the :20/:25 help says "more than halfway"', 'core', "m < 30 ? 'helpLess' : m === 30", "m < 30 ? 'helpMore' : m === 30"],
  ['Check again unchanged counts a miss', 'core', "if (st.verdict) return { result: 'note', key: 'hintChange' };", ''],
  ['the :05 help counts one five', 'core', "m === 5 ? 'helpFive' : ", ''],
  /* the rest of the model */
  ['Check before any move counts a miss', 'core', "if (!st.moved) return { result: 'note', key: 'hintEmpty' };", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the readout hour rounds to the nearest number', 'core', 'var h = m === 0 ? Math.round(a / 30) % 12 : Math.floor(a / 30 + 1e-9) % 12;', 'var h = Math.round(a / 30) % 12;'],
  ['the run-on turns the short hand a whole number per step', 'act', 'short: v.run.short + 2.5 * v.run.i', 'short: v.run.short + 30 * v.run.i'],
  ['the gear is in while the hands are set', 'act', 'var geared = !!v.run || st.done', 'var geared = true'],
  ['the minute ring never shows on miss 2', 'act', 'if (this._ringOn() || help)', 'if (this._ringOn())'],
  ['the o\'clock long hint says "minutes"', 'core', "return m === 0 ? 'hintLongOn' : 'hintLong';", "return 'hintLong';"],
  ['a solved clock still moves', 'core', 'function setLong(st, d) { if (st.done) return false;', 'function setLong(st, d) {'],
  ['the reshuffle repeats the previous order', 'core', "if (!prev || prev.join() !== c.join()) return c;", 'return c;'],
  ['a round table drifts', 'core', 'T(9, 20), T(4, 40)', 'T(9, 20), T(4, 45)'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['fr prints 3:20', 'core', "if (l === 'fr') return h + '", "if (l === 'fr') return h + ':' + mm; if (0) return h + '"],
  ['the grips shrink below 44 px', 'act', '.ro-grip{position:absolute;width:44px;height:44px;', '.ro-grip{position:absolute;width:30px;height:30px;'],
  ['the row points at the old tool', 'man', '"tool": "run-on-activity"', '"tool": "clock-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ro-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-run-on-core.js')], { env: Object.assign({}, process.env, { RO_CORE: files.core, RO_ACT: files.act, RO_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-run-on: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
