#!/usr/bin/env node
/* =====================================================================
   mutate-minute-train.js — proves verify-minute-train-core.js can fail
   (ACTIVITY #161, The Minute Train). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-minute-train.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'minute-train-core.js'), act: path.join(MINI, 'minute-train-activity.js'), man: path.join(MINI, 'clock-digital-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a carriage passes the barrier in a round', 'core', 'if (st.cars >= maxCars(st.round)) return \'bump\';', 'if (st.cars >= 11) return \'bump\';'],
  ['the roof shows k instead of 5k', 'act', "roofOn ? 5 * k3 : null);", "roofOn ? k3 : null);"],
  ['the hour graded as the NEAREST numeral', 'core', 'if (h === r.h && m === r.m) { st.done = true;', 'if ((h === r.h || (r.m >= 30 && h === r.h % 12 + 1)) && m === r.m) { st.done = true;'],
  ['the hour hand drawn on the hour at :45', 'core', 'return ((h % 12) * 30 + m / 2) % 360;', 'return ((h % 12) * 30) % 360;'],
  ['free-play pushing active during a round', 'core', '    if (st.done) return freeAdd(st);\n', '    freeAdd(st);\n'],
  ['the lap steps the short hand before it is shown', 'act', "if (res.kind === 'nextHour' && !st.help) {", "if (false) {"],
  ['the boxes start with a value', 'core', "cars: 0, h: '', m: '',", "cars: 0, h: '1', m: '',"],
  ['"roof numbers hidden" still lights numbers', 'act', "_roof: function () { return this._setting('roof') !== 'hidden'; },", "_roof: function () { return true; },"],
  ['the aria states the time before success', 'act', "sr.textContent = st.done ? this._t('aClockDone'", "sr.textContent = true ? this._t('aClockDone'"],
  ['the reshuffle repeats the previous order', 'core', 'if (!prev || prev.join() !== c.join()) return c;', 'return c;'],
  /* the rest of the model */
  ['an empty box counts a miss', 'core', "if (st.h === '' || st.m === '') return { result: 'note', key: 'hintBlank' };", "if (st.h === '' || st.m === '') { st.misses++; return { result: 'note', key: 'hintBlank' }; }"],
  ['the next hour not told apart', 'core', "else if (h === r.h % 12 + 1 && r.m > 0) kind = 'nextHour';", ''],
  ['swapped hands read as a minutes error', 'core', "if (h === longNumber(r.m) && h !== r.h && m === (r.h % 12) * 5) kind = 'swap';\n    else if", 'if'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the o\'clock hour hint says "passed"', 'core', "return st.round.m === 0 ? 'hintHourOn' : 'hintHour';", "return 'hintHour';"],
  ['a third digit makes a three-digit box', 'core', 'st[b] = v.length >= 2 ? String(d) : v + d;', 'st[b] = v + d;'],
  ['free play never closes the ring', 'core', "return t % 60 === 0 ? 'ring' : 'push';", "return 'push';"],
  ['the lap is not drawn', 'act', "if (vk === 'nextHour') for (var k4 = C.maxCars(r) + 1; k4 <= 12; k4++)", "if (false) for (var k4 = C.maxCars(r) + 1; k4 <= 12; k4++)"],
  ['miss 2 shows the last roof', 'act', "k2 === mx ? '?' : roofOn ? 5 * k2 : null", "roofOn ? 5 * k2 : null"],
  ['a round table drifts', 'core', 'T(12, 35), T(4, 55), T(9, 5)', 'T(12, 35), T(4, 50), T(9, 5)'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['fr prints 3:20', 'core', "if (l === 'fr') return h + '\u00A0h\u00A0' + mm;", "if (l === 'fr') return h + ':' + mm;"],
  ['an unchanged Check counts a second miss', 'core', "    if (st.verdict) return { result: 'note', key: 'hintChange' };", ''],
  /* strings */
  ['de "halb" names the current hour', 'act', '"de":"{t} — halb {h1}:', '"de":"{t} — halb {h}:'],
  ['en "quarter to" names the current hour', 'act', '"en":"{t} — quarter to {h1}:', '"en":"{t} — quarter to {h}:'],
  ['the instruction says only "passed"', 'act', 'The hour is the number the short hand is on or has passed.', 'The hour is the number the short hand has passed.'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  ['a hint names a time', 'act', '"en":"The train can\'t go past the long hand."', '"en":"The train can\'t go past 3:20."'],
  ['nl uses "half" in a hint', 'act', '"nl":"De kleine wijzer wijst het uur aan. Welk getal is hij al voorbij?"', '"nl":"De kleine wijzer wijst het uur aan, zoals bij half 7. Welk getal is hij al voorbij?"'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "minute-train-activity"', '"tool": "clock-digital-activity"'],
  ['a new locale without its title', 'man', '"fi": "Sprocketin kello – kellonaika', '"xx": "Sprocketin kello – kellonaika']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mt-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-minute-train-core.js')], { env: Object.assign({}, process.env, { MT_CORE: files.core, MT_ACT: files.act, MT_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-minute-train: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
