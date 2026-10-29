#!/usr/bin/env node
/* =====================================================================
   mutate-drive-cables.js — proves verify-drive-cables-core.js can fail
   (ACTIVITY #160, The Drive Cables). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-drive-cables.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'drive-cables-core.js'), act: path.join(MINI, 'drive-cables-activity.js'), man: path.join(MINI, 'clock-digital-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the hour hand drawn ON the hour at :30', 'core', 'return ((x.h % 12) * 30 + x.m / 2) % 360;', 'return ((x.h % 12) * 30) % 360;'],
  ['the ghost hands use the clock\'s time', 'act', 'var c = r.cards[pair.card]; opts.ghost = c;', 'var c = r.cards[pair.card]; opts.ghost = t;'],
  ['a socket accepts two plugs', 'core', 'if (owner >= 0) { if (st.locked[owner]) return false; st.plugs[owner] = null; }', ''],
  ['Check grades with two plugs', 'core', "if (st.plugs.indexOf(null) >= 0) return { result: 'note', key: 'hintPlug' };", ''],
  ['right pairs unplugged after a miss', 'core', 'pairs.forEach(function (p) { if (p.error === null) st.locked[p.card] = true; });', ''],
  ['the aria reads a clock\'s time before success', 'act', "var label = st.done ? self._t('aClockDone'", "var label = true ? self._t('aClockDone'"],
  ['"only 12, 3, 6, 9" hides the ticks too', 'act', 'for (var i = 0; i < 60; i++) { var a1', "for (var i = 0; i < 60; i++) { if (q && i % 15) continue; var a1"],
  ['a lure equal to a card', 'core', '[[T(3, 0), T(7, 30), T(11, 0)], T(6, 30)', '[[T(3, 0), T(7, 30), T(11, 0)], T(7, 30)'],
  ['the reshuffle repeats the previous order', 'core', 'if (!prev || prev.join() !== c.join()) return c;', 'return c;'],
  /* the rest of the model */
  ['a slot layout drifts (answer-position balance)', 'core', "[[T(10, 15), T(5, 20), T(8, 0)], T(10, 45), [1, 'L', 2, 0]]", "[[T(10, 15), T(5, 20), T(8, 0)], T(10, 45), [0, 'L', 1, 2]]"],
  ['swapped hands read as "other"', 'core', "if (a.m % 5 === 0 && swapped(c) === k) return 'swap';", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['a lit card can be moved', 'core', 'if (st.done || st.locked[card] || slot < 0 || slot > 3) return false;', 'if (st.done || slot < 0 || slot > 3) return false;'],
  ['the tip explains the wrong card', 'core', 'var c = r.cards[r.baited], x = hm(c)', 'var c = r.cards[0], x = hm(c)'],
  ['the dots come without the help', 'act', 'if (st.help) { opts.dots = C.minuteAngle(c);', 'if (true) { opts.dots = C.minuteAngle(c);'],
  ['two bold numbers at o\'clock', 'act', 'opts.bold = x.m ? [x.h % 12 || 12, (x.h % 12) + 1] : [x.h % 12 || 12];', 'opts.bold = [x.h % 12 || 12, (x.h % 12) + 1];'],
  ['a lamp lights before Check', 'act', 'var lit = pair && pair.lit', 'var lit = !!pair'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['fr prints 7:30', 'core', "if (l === 'fr') return x.h + ' h ' + mm;", "if (l === 'fr') return x.h + ':' + mm;"],
  /* strings */
  ['the hour-hand hint says "just passed" again', 'act', '"en":"Look at the short hand: which number has it already passed? Not the one it is nearly at."', '"en":"Look at the short hand: which number has it just passed?"'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  ['a hint names a time', 'act', '"en":"Count by fives from the 12 to the long hand."', '"en":"Count by fives from the 12 to the long hand. It is 3:45."'],
  ['de uses "halb acht" in a hint', 'act', '"de":"Steht der große Zeiger auf der 6, ist der kleine Zeiger genau zwischen zwei Zahlen.', '"de":"Um halb acht steht der große Zeiger auf der 6, ist der kleine Zeiger genau zwischen zwei Zahlen.'],
  ['a placeholder dropped in one locale', 'act', '"sv":"{a}, {b} och {c}: alla stämmer!"', '"sv":"{a} och {b}: alla stämmer!"'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "drive-cables-activity"', '"tool": "clock-digital-activity"'],
  ['a new locale without its title', 'man', '"fi": "Sprocketin kello – yhdistä', '"xx": "Sprocketin kello – yhdistä']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dc-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-drive-cables-core.js')], { env: Object.assign({}, process.env, { DC_CORE: files.core, DC_ACT: files.act, DC_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
for (const [name, file, a] of M) { const t = read(FILES[file]); if (t.indexOf(a) < 0) throw new Error('needle gone: ' + name); if (t.split(a).length !== 2) throw new Error('needle not unique: ' + name); }
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
console.log(`mutate-drive-cables: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
