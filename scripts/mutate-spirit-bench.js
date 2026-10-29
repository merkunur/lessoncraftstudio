#!/usr/bin/env node
/* =====================================================================
   mutate-spirit-bench.js — proves verify-spirit-bench-core.js can fail
   (ACTIVITY #156, The Spirit Level). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-spirit-bench.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'spirit-bench-core.js'), act: path.join(MINI, 'spirit-bench-activity.js'), man: path.join(MINI, 'bram-board-shop-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['grading accepts the decoy', 'core', "    if (decoyOn(st)) kind = 'decoy';\n    else if (!modelRight(st))", '    if (!modelRight(st))'],
  ['grading ignores which rail a board is on', 'core', "    else if (!modelRight(st)) kind = 'wrongRail';\n", ''],
  ['the mystery place drawn before two boards are placed', 'act', 'if (m && !st.done && !vk) {', 'if (!st.done && !vk && (m = m || "top")) {'],
  ['the keypad unlocked before the bench is built', 'core', 'if (st.done || mystery(st) === null) return false;', 'if (st.done) return false;'],
  ['the cut board drawn at the right length, not the typed one', 'act', 'cut = st.verdict ? st.verdict.typed : st.done ? r.answer : null;', 'cut = st.verdict || st.done ? r.answer : null;'],
  ['a shape solved the wrong way (an answer that drifts)', 'core', "    takeStart: { top: '?', bottom: ['b', 'a'] },", "    takeStart: { top: 'b', bottom: ['a', '?'] },"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c;', 'if (runsOk(level, c)) return c;'],
  ['Check with nothing counts a miss', 'core', "if (placed(st) < 2) return { result: 'note', key: 'hintBoards' };", "if (placed(st) < 2) { st.misses++; return { result: 'note', key: 'hintBoards' }; }"],
  ['a balanced wrong bench reads as plain "too long"', 'core', 'var flat = v.top === v.bottom;', 'var flat = false;'],
  ['the level calls 1 cm "flat"', 'act', 't = Rl.bottom - Rl.top,', 't = Math.abs(Rl.bottom - Rl.top) <= 1 ? 0 : Rl.bottom - Rl.top,'],
  /* the rest of the model */
  ['a third board allowed on the bench', 'core', "    if (rail !== 'rack' && from === 'rack' && placed(st) >= 2) return { ok: false, full: true };\n", ''],
  ['the fix leaves the decoy on the bench', 'core', 'st.bottom = r.bottomKnown.map(pick);', 'st.bottom = r.bottomKnown.map(pick); if (st.top === null) st.top = r.rack.indexOf(r.decoy);'],
  ['the count-up help starts at 0', 'core', ": { s: r.bottomKnown[0], e: r.topKnown }; }", ": { s: 0, e: r.topKnown }; }"],
  ['the mystery three rounds in a row on one rail', 'core', '&& runsOk(level, c)) return c;', ') return c;'],
  ['the decoy is not the keyword answer', 'core', '[20, 35, 55, [20, 35, 55]]', '[20, 35, 50, [20, 35, 50]]'],
  ['a number that does not regroup', 'core', '[[38, 27, 11, [38, 11, 27]]', '[[38, 21, 17, [38, 17, 21]]'],
  ['a decoy equal to a known', 'core', '[35, 30, 5, [35, 5, 30]]', '[35, 30, 35, [35, 35, 30]]'],
  ['the cmp-smaller story becomes cmp-bigger (no trap)', 'core', "    cmpSmaller: { top: 'a', bottom: ['b', '?'] },", "    cmpSmaller: { top: '?', bottom: ['a', 'b'] },"],
  ['a move keeps the old verdict', 'core', 'function clear(st) { if (!st.done) { st.verdict = null; st.testing = false; } }', 'function clear(st) { }'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  /* the review's findings */
  ['the top-rail count-up names its end (the answer)', 'act', '"en":"The mystery board has to reach the end of the bottom rail. The first piece ends at {s}: count on by the second piece."', '"en":"The mystery board has to reach {e}. Count up from {s} to {e}."'],
  ['hintFull points at the third (decoy) board', 'act', '"en":"Only two boards go on the bench. The saw cuts the mystery board for the empty place."', '"en":"Only two boards go on the bench. The saw cuts the third one."'],
  ['the top-rail help counts from 0', 'core', "return { s: p[0], e: p[0] + p[1] }; }", "return { s: 0, e: p[0] + p[1] }; }"],
  ['the help marks the answer on the ruler', 'act', "(r.mystery === 'top' ? [sp.s] : [sp.s, sp.e])", '[sp.s, sp.e]'],
  /* strings */
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['the longer-trap lost in Swedish', 'act', '"sv":"Brams bräda är {a} cm. Den är {b} cm längre än hans ribba.', '"sv":"Brams bräda är {a} cm. Den är {b} cm mer än hans ribba.'],
  ['a story gives the answer away', 'act', '"en":"A board is {a} cm. Bram saws off {b} cm. How long is the board now?"', '"en":"A board is {a} cm. Bram saws off {b} cm. How long is the board now ({c} cm)?"'],
  ['a success line with a hyphen minus', 'act', '"en":"{a} − {b} = {c}. The board is {c} cm now!"', '"en":"{a} - {b} = {c}. The board is {c} cm now!"'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  ['an inch in a hint', 'act', '"en":"Read the order again: is that board in the story?"', '"en":"Read the order again: is that board 3 inches?"'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "spirit-bench-activity"', '"tool": "bram-board-shop-activity"'],
  ['a new locale without its title', 'man', '"fi": "Pituustehtävät senttimetreinä', '"xx": "Pituustehtävät senttimetreinä']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-spirit-bench-core.js')], { env: Object.assign({}, process.env, { SB_CORE: files.core, SB_ACT: files.act, SB_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-spirit-bench: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
