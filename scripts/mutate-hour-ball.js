#!/usr/bin/env node
/* =====================================================================
   mutate-hour-ball.js — proves verify-hour-ball-core.js can fail
   (ACTIVITY #162, The Hour Ball). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-hour-ball.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'hour-ball-core.js'), act: path.join(MINI, 'hour-ball-activity.js'), man: path.join(MINI, 'clock-digital-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the next-hour card replaced by a far hour', 'core', 'var H = wrap(h + side), mm = 60 - m;', 'var H = wrap(h + 6 * side), mm = 60 - m;'],
  ['a round with two right cards', 'core', "return [{ h: h, m: m }, { h: h, m: mm }, { h: H, m: m }, { h: H, m: mm }];", "return [{ h: h, m: m }, { h: h, m: mm }, { h: h, m: m }, { h: H, m: mm }];"],
  ['the minute mirror removed', 'core', 'mm = 60 - m;', 'mm = (m + 5) % 60;'],
  ['the ball drops at :30', 'core', "while (t < end) { t += step; out.push({ h: t >= end ? wrap(r.h + 1) : r.h, m: t % 60, cup: t >= end ? wrap(r.h + 1) : r.h }); }", "while (t < end) { t += step; out.push({ h: t >= end ? wrap(r.h + 1) : r.h, m: t % 60, cup: t % 60 >= 30 || t >= end ? wrap(r.h + 1) : r.h }); }"],
  ['the ball does not return on an anticlockwise crossing', 'core', 'drops = Math.floor(b / 60) - Math.floor(a / 60);', 'drops = Math.max(0, Math.floor(b / 60) - Math.floor(a / 60));'],
  ['the cup ball visible before Check', 'act', 'var lidOpen = !!vr || !!v.run || st.done,', 'var lidOpen = true,'],
  ['the pin planted at 6·h instead of 6·m', 'act', 'var pa = C.minuteAngle(pinM)', 'var pa = C.minuteAngle(posted ? posted.h : pinM)'],
  ['the shuffle allows one place three times', 'core', "if (!(lastTwo && lastTwo.length === 2 && lastTwo[0] === at && lastTwo[1] === at)) return o;", 'return o;'],
  ['12:45 neighbour computed as 13 (no wrap)', 'core', 'function wrap(h) { return ((h - 1) % 12 + 12) % 12 + 1; }', 'function wrap(h) { return h === 0 ? 12 : h; }'],
  ['Sprocket smaller than 64 px on phones', 'act', 'rooster: wide ? 96 : 64', 'rooster: wide ? 96 : 48'],
  /* the rest of the model */
  ['the tray shows its numbers before Check', 'act', 'up = lidOpen,', 'up = true,'],
  ['the waiting ball always shows its number', 'act', "var showWait = (vr && vr.hourSide === 'later') || !!v.run || help;", 'var showWait = true;'],
  ['Check with no card counts a miss', 'core', "if (st.posted === null) return { result: 'note', key: 'hintEmpty' };", "if (st.posted === null) { st.misses++; return { result: 'note', key: 'hintEmpty' }; }"],
  ['an unchanged Check counts a second miss', 'core', "    if (st.verdict) return { result: 'note', key: 'hintChange' };", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['later and earlier hours confused', 'core', "c.h === wrap(r.h + 1) ? 'later' : 'earlier'", "c.h === wrap(r.h - 1) ? 'later' : 'earlier'"],
  ['the run-on uses five-minute steps on level 1', 'core', "var step = r.level === '1' ? 15 : 5,", 'var step = 5,'],
  ['a phrase re-derived instead of copied', 'core', '"45":"quarter to {N}"', '"45":"quarter to {H}"'],
  ['a round table drifts', 'core', '[4, 55, -1]', '[4, 50, -1]'],
  ['the aria states the time before success', 'act', "sr.textContent = st.done ? this._t('aClockDone'", "sr.textContent = true ? this._t('aClockDone'"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c;', 'if (runsOk(level, c)) return c;'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  /* strings */
  ['"an hour ago" comes back', 'act', '"en":"Ball {g} dropped before ball {h}. The cup holds ball {h}."', '"en":"Ball {g} dropped an hour ago. The cup holds ball {h}."'],
  ['the minutes hint states the minutes', 'act', '"en":"The long hand is on the {n}. Your pin is at the {p}. How many minutes does the {n} stand for?"', '"en":"The long hand is on the {n}. Your pin is at the {p}. The long hand shows {mm} minutes."'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  ['de uses "halb" in a hint', 'act', '"de":"Schau zuerst auf beide Zeiger. Dann tippe auf eine Karte."', '"de":"Schau zuerst auf beide Zeiger, wie bei halb 4. Dann tippe auf eine Karte."'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "hour-ball-activity"', '"tool": "clock-digital-activity"'],
  ['a new locale without its title', 'man', '"fi": "Sprocketin kello – vartti yli', '"xx": "Sprocketin kello – vartti yli']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hb-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-hour-ball-core.js')], { env: Object.assign({}, process.env, { HB_CORE: files.core, HB_ACT: files.act, HB_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-hour-ball: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
