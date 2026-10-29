#!/usr/bin/env node
/* =====================================================================
   mutate-second-ring.js — proves verify-second-ring-core.js can fail
   (ACTIVITY #159, The Second Ring). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-second-ring.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'second-ring-core.js'), act: path.join(MINI, 'second-ring-activity.js'), man: path.join(MINI, 'clock-convert-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['"always +12" accepted', 'core', 'if (t === r.t) { st.done = true;', 'if (t === r.t || t === r.t + 720) { st.done = true;'],
  ['midnight accepted as 24:00', 'core', "if (r.dir === 'to24') return h <= 23 ? h * 60 + m : null;", "if (r.dir === 'to24') return h <= 24 ? (h % 24) * 60 + m : null;"],
  ['tokens dropped in the first lap', 'core', 'for (var x = 13; x <= h; x++) toks.push(x);', 'for (var x = 1; x <= h; x++) toks.push(x);'],
  ['miss 1 runs the given time, not the child\'s', 'act', 'if (st.verdict && st.verdict.t !== null) return st.verdict.t;', 'if (st.verdict) return st.round.t;'],
  ['the day-part ignored for 12-hour answers', 'core', 'var h24 = c.hours.indexOf(lo) >= 0 ? lo : c.hours.indexOf(hi) >= 0 ? hi : null;', 'var h24 = lo === r.h24 % 12 ? r.h24 : lo;'],
  ['"8" refused where "08" is right', 'core', "var r = st.round, h = parseInt(st.h, 10)", "var r = st.round, h = st.h.length === 2 ? parseInt(st.h, 10) : NaN"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c;', 'if (runsOk(level, c)) return c;'],
  ['three rounds of one direction in a row', 'core', '&& runsOk(level, c)) return c;', ') return c;'],
  ['the ring emptied although it keeps', 'act', "SecondRingCore.newState(this._level(), k, this._loc());\n    if (this._setting('ring') === 'empty') this._ring = [];", 'SecondRingCore.newState(this._level(), k, this._loc());\n    this._ring = [];'],
  /* the rest of the model */
  ['an empty answer counts a miss', 'core', "if (st.h === '' || st.m === '') return { result: 'note', key: 'hintBlank' };", "if (st.h === '' || st.m === '') { st.misses++; return { result: 'note', key: 'hintBlank' }; }"],
  ['chips on a 24-hour answer', 'core', "if (st.done || st.round.dir !== 'to12') return false;", 'if (st.done) return false;'],
  ['a third digit makes a three-digit hour', 'core', 'st[b] = v.length >= 2 ? String(d) : v + d;', 'st[b] = v + d;'],
  ['a morning answer keeps a token', 'core', 'return t === 0 ? 0 : h >= 13 ? h : null; }', 'return t === 0 ? 0 : h; }'],
  ['a minutes miss gets the hour help', 'core', "    if (v.kind === 'minute') return 'hintMinute';\n    if (st.help)", '    if (st.help)'],
  ['a minutes miss shows the hour help on the ring', 'act', "vk !== 'minute' && !v.anim ? r.h24 : null;", '!v.anim ? r.h24 : null;'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the wrong lap read as a wrong hour', 'core', "else if ((t >= 720) !== (r.t >= 720)) kind = t >= 720 ? 'pastNoon' : 'beforeNoon';\n", ''],
  ['abends from noon', 'core', "['abends', 'abends', R(17, 23)]", "['abends', 'abends', R(12, 23)]"],
  ['a round table drifts', 'core', "['to12', 20, 0], ['to24', 21, 30]", "['to12', 20, 0], ['to24', 21, 0]"],
  ['fi writes 08.00', 'core', "return (l === 'fi' ? String(h) : pad2(h))", 'return (pad2(h))'],
  ['the passed tokens stay after success', 'act', '&& (!st.done || token === keep)', ''],
  ['the last token face-up on miss 2', 'act', "if (token === helpH) { val = '?'; cls = ' is-ask'; }", "if (token === helpH) { val = token; cls = ' is-ask'; }"],
  /* strings */
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['the success sum is wrong', 'act', '"en":"{open} is {ans}: 12 + {h12} = {h24}!"', '"en":"{open} is {ans}: 10 + {h12} = {h24}!"'],
  ['a hint names a time', 'act', '"en":"Look where your hour hand stopped. Count the hours after 12."', '"en":"Look where your hour hand stopped. It should be 15:00."'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "second-ring-activity"', '"tool": "clock-convert-activity"'],
  ['a new locale without its title', 'man', '"fi": "24 tunnin kello', '"xx": "24 tunnin kello']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-second-ring-core.js')], { env: Object.assign({}, process.env, { SR_CORE: files.core, SR_ACT: files.act, SR_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-second-ring: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
