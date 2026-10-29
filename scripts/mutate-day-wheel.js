#!/usr/bin/env node
/* =====================================================================
   mutate-day-wheel.js — proves verify-day-wheel-core.js can fail
   (ACTIVITY #158, The Day Wheel). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-day-wheel.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'day-wheel-core.js'), act: path.join(MINI, 'day-wheel-activity.js'), man: path.join(MINI, 'clock-ampm-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the lap ignored (any 7:00 accepted)', 'core', 'if (st.minutes === r.answer) {', 'if (sameFace(st.minutes, r.answer)) {'],
  ['the lap flips at 6 instead of 12', 'core', "function lapOf(min) { return ((min % 1440) + 1440) % 1440 < 720 ? 'am' : 'pm'; }", "function lapOf(min) { return ((min % 1440) + 1440) % 1440 < 360 ? 'am' : 'pm'; }"],
  ['the wheel turns at hand speed', 'core', 'function wheelAngle(min) { return min / 1440 * 360; }', 'function wheelAngle(min) { return (min % 720) / 720 * 360; }'],
  ['the stop pins missing', 'core', 'return Math.max(0, Math.min(maxMinutes(level), Math.round(min / s) * s));', 'return Math.round(min / s) * s;'],
  ['the noon riddle graded a.m.', 'core', "['riddlePm', null, null, 12, 30]", "['riddlePm', null, null, 0, 30]"],
  ['Check at midnight counts a miss', 'core', "if (st.minutes === 0) return { result: 'note', key: 'hintIdle' };", "if (st.minutes === 0) { st.misses++; return { result: 'note', key: 'hintIdle' }; }"],
  ['an override breaks the lap balance', 'core', 'var LATE = { dinner: 19,', 'var LATE = { dinner: 8,'],
  ['fr says 12 h 30 du matin', 'core', "fr: { 30: 'minuit et demi',", "fr: { 31: 'minuit et demi',"],
  ['sv calls 12.30 på eftermiddagen', 'core', "[12, 'mitt på dagen'], ", ''],
  ['the badge words the lap in label mode', 'act', "b.textContent = this._label() ? '' : C.part(loc, min);", 'b.textContent = C.part(loc, min);'],
  /* the rest of the model */
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the lap help points the wrong way', 'core', "dir: r.answer > st.minutes ? 'more' : 'back' }", "dir: r.answer > st.minutes ? 'back' : 'more' }"],
  ['the face reads 0 at midnight', 'core', 'return { h: h === 0 ? 12 : h, m: min % 60 };', 'return { h: h, m: min % 60 };'],
  ['de calls 0:30 vormittags', 'core', "de: [[0, 'nachts'],", "de: [[0, 'vormittags'],"],
  ['fr prints 7:30 instead of 7 h 30', 'core', "if (l === 'fr') return", "if (l === 'xx') return"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c;', 'if (runsOk(level, c)) return c;'],
  ['three rounds of one lap in a row', 'core', '&& runsOk(level, c)) return c;', ') return c;'],
  ['a solved round can still be wound', 'core', 'function wind(st, min) {\n    if (st.done) return false;', 'function wind(st, min) {'],
  ['the toothbrush only in one lap', 'core', "['brushPm', 'around-the-house', 'toothbrush', 20, 30]", "['brushPm', 'furniture', 'bed', 20, 30]"],
  /* drawing */
  ['the event picture shows before success', 'act', 'if (st.done && r.pic) {', 'if (r.pic) {'],
  ['the lap arrow on a time miss', 'act', "if (st.help && vk === 'lap') {", 'if (st.help) {'],
  ['label mode shows the picture', 'act', 'var hide = lab && !st.done;', 'var hide = false;'],
  /* strings */
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['a story prints its time', 'act', '"en":"You eat breakfast."', '"en":"You eat breakfast at 7:00."'],
  ['the time hint names the lap', 'act', '"en":"The card says {card}. Your clock says {set}."', '"en":"The card says {card}. Your clock says {set} {part}."'],
  ['the idle hint names a time', 'act', '"en":"Wind the hour hand round to the time on the card."', '"en":"Wind the hour hand round to 7:00."'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "day-wheel-activity"', '"tool": "clock-ampm-activity"'],
  ['a new locale without its title', 'man', '"fi": "Sprocketin kello', '"xx": "Sprocketin kello']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dw-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-day-wheel-core.js')], { env: Object.assign({}, process.env, { DW_CORE: files.core, DW_ACT: files.act, DW_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-day-wheel: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
