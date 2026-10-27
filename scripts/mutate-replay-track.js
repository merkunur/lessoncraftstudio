#!/usr/bin/env node
/* =====================================================================
   mutate-replay-track.js — proves verify-replay-track-core.js can fail (ACTIVITY #136, The Replay Track).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-replay-track.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'replay-track-core.js'), act: path.join(MINI, 'replay-track-activity.js'), man: path.join(MINI, 'number-bond-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['grade by adding all the told numbers', 'core', "if (P.ok) { st.done = true;", "if (P.ok || +st.typed === st.rd.told.reduce(function (x, y) { return x + y; }, 0)) { st.done = true;"],
  ['a two-step story stops at its middle', 'core', "['A', 'grey'], ['A', 'add', 't2'], ['C', 'set', '?']", "['A', 'grey'], ['C', 'set', '?']"],
  ['a bar one off counts as landing', 'core', "hit = ends[L] === at;", "hit = Math.abs(ends[L] - at) <= 1;"],
  ['sharing replayed as making groups', 'core', "type: 'share', told: [24, 4], eq: '24/4=?', s: [['A', 'rep', 't1', '?']", "type: 'share', told: [24, 4], eq: '24/4=?', s: [['A', 'rep', '?', 't1']"],
  ['the backwards help shows the step of the child', 'core', "if (P.frames[i].yours) you = P.frames[i]; else back.push(P.frames[i]);", "if (P.frames[i].yours) you = P.frames[i]; back.push(P.frames[i]);"],
  ['a shipped story reworded', 'act', 'Im Beet stehen 20 rote Tulpen', 'Im Garten stehen 20 rote Tulpen'],
  ['an answer equal to a told number', 'core', "told: [10, 18], eq: '10+?=18'", "told: [8, 16], eq: '8+?=16'"],
  ['two of one story type in a row allowed', 'core', "for (var i = 1; i < ord.length; i++) if (rs[ord[i]].type === rs[ord[i - 1]].type) return false;", ""],
  ['within 100 made 6 add : 8 subtract', 'core', "eq: '36+25=?', s: [['A', 'set', 't0'], ['A', 'add', 't1']", "eq: '36-25=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1']"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['a new digit keeps the help', 'core', "st.typed += d; st.help = false; return 'typed';", "st.typed += d; return 'typed';"],
  ['free play after success is judged', 'core', "if (st.done) { st.last = { result: 'free', play: P }; return st.last; }", ""],
  ['the hint names the wrong flag', 'core', "return L.flag.told ? 'miss1' : 'miss1End';", "return L.flag.told ? 'miss1End' : 'miss1';"],
  ['German gets the times cross', 'core', "var DOT = { de: 1, sv: 1,", "var DOT = { sv: 1,"],
  ['the bond whole is not the sum', 'core', "return { whole: ns[0], parts: [ns[1], ns[2]] };", "return { whole: ns[0] + 1, parts: [ns[1], ns[2]] };"],
  ['the box takes four digits', 'core', "if (st.typed.length >= 3) return 'full';", "if (st.typed.length >= 4) return 'full';"],
  ['a picture that does not exist', 'core', "pic: 'toys/boat'", "pic: 'toys/boats'"],
  ['the same order every pass', 'core', "for (var k = n - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = o[k]; o[k] = o[j]; o[j] = x; }", ""],
  ['a digit in a hint', 'act', 'hEmpty: {"en":"Type your number', 'hEmpty: {"en":"Type your 2 number'],
  ['the word free in a string', 'act', 'aNone: {"en":"No number yet"', 'aNone: {"en":"Free: no number yet"'],
  ['the manifest still on the old tool', 'man', '"tool": "replay-track-activity"', '"tool": "number-bond-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { RT_CORE: files.core, RT_ACT: files.act, RT_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-replay-track-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-replay-track: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
