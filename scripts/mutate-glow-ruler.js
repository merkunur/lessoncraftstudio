#!/usr/bin/env node
/* =====================================================================
   mutate-glow-ruler.js — proves verify-glow-ruler-core.js can fail
   (ACTIVITY #152, The Glow Ruler). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-glow-ruler.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'glow-ruler-core.js'), act: path.join(MINI, 'glow-ruler-activity.js'), man: path.join(MINI, 'choice-board-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the light counts lines (the first count sits on tick 0)', 'core', 'out.push({ count: i, from: i - 1, to: i });', 'out.push({ count: i, from: i - 1, to: i - 1 });'],
  ['the count drawn on the tick, not in the space', 'act', "x=\"' + ((x(s.from) + x(s.to)) / 2).toFixed(1)", "x=\"' + x(s.from).toFixed(1)"],
  ['the object registered by its padded box, not its ink', 'core', 'var f = inkFlat(obj), S = len * ppc / f.w;\n    return { S: S, left: x0 - f.x * S,', 'var f = inkFlat(obj), S = len * ppc;\n    return { S: S, left: x0,'],
  ['N + 1 accepted', 'core', 'if (marker === round.len) return { ok: true };', 'if (marker === round.len || marker === round.len + 1) return { ok: true };'],
  ['the marker starts at the answer', 'core', "return { level: levelOf(level), k: r.k, round: r, marker: 0,", "return { level: levelOf(level), k: r.k, round: r, marker: r.len,"],
  ['level 2 prints every number', 'core', "if (levelOf(level) === 'fives') return [0, 5, 10, 15];", "if (levelOf(level) === 'fives') return [0, 5, 10, 15, 12];"],
  ['over and under reversed', 'core', "return marker > round.len ? { over: marker - round.len } : { under: round.len - marker };", "return marker < round.len ? { over: round.len - marker } : { under: marker - round.len };"],
  ['the drop line from the left edge', 'act', "dl.style.cssText = 'left:' + (g.x(r.len) - 1.5)", "dl.style.cssText = 'left:' + (g.x(0) - 1.5)"],
  ['the rounds sorted by length', 'core', "var EVERY = [['snail', 4, [3, 5]], ['seashell', 5, [4, 7]], ['car', 6, [6, 8]], ['lemon', 7, [7, 9]],\n    ['key', 8, [6, 8]], ['centipede', 9, [3, 10]],", "var EVERY = [['snail', 4, [3, 5]], ['seashell', 5, [4, 7]], ['car', 6, [6, 8]], ['lemon', 7, [7, 9]],\n    ['centipede', 9, [3, 10]], ['key', 8, [6, 8]],"],
  ['the ice pop is not turned (it stands up)', 'core', "popsicle: { theme: 'desserts and sweets', ink: [0.3860677083333333, 0.294921875, 0.9720052083333334, 0.017578125], rot: 90 }", "popsicle: { theme: 'desserts and sweets', ink: [0.3860677083333333, 0.294921875, 0.9720052083333334, 0.017578125], rot: 0 }"],
  ['a round outside its real size (a 14-cm key)', 'core', "['key', 8, [6, 8]]", "['key', 14, [6, 8]]"],
  /* the rest of the model */
  ['the lemon back at 9 cm (too thick at 704)', 'core', "['airplane', 9, [8, 15]]", "['lemon', 9, [7, 9]]"],
  ['a level-2 end on a printed number', 'core', "['popsicle', 11, [11, 14]]", "['popsicle', 10, [11, 14]]"],
  ['a stale ink box', 'core', "kiwi: { theme: 'fruits', ink: [0.9544270833333334,", "kiwi: { theme: 'fruits', ink: [0.9244270833333334,"],
  ['the lie-flat turn maps the wrong way', 'core', "if (p.rot === 90) return { w: b[2], x: 1 - b[3] - b[2], h: b[0], y: b[1] };", "if (p.rot === 90) return { w: b[2], x: b[3], h: b[0], y: b[1] };"],
  ['the picture floats above the ruler', 'core', "top: baseY - (f.y + f.h) * S,", "top: baseY - (f.y + f.h) * S - 6,"],
  ['the ruler squeezed into too few pixels at 320', 'core', 'var PAD_L = 12, PAD_R = 12;', 'var PAD_L = 24, PAD_R = 24;'],
  ['a marker at 0 is a miss', 'core', "if (st.marker === 0) return { result: 'note', key: 'hintStart' };", "if (st.marker === 0) { st.misses++; return { result: 'note', key: 'hintStart' }; }"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['a move keeps the old light', 'core', 'st.verdict = null; st.lit = 0;\n    return true;', 'st.verdict = null;\n    return true;'],
  ['snap rounds down', 'core', 'var n = Math.round((px - x0) / ppc);', 'var n = Math.floor((px - x0) / ppc);'],
  ['the same order every pass', 'core', 'if (!prev || prev.join() !== o.join()) return { order: o };', 'return { order: o };'],
  ['count on from 0 at level 2', 'core', "nearestPrinted(st.round.len, st.level) === 0 ? 'hintDrop0' : 'hintDrop5'", "'hintDrop5'"],
  /* the activity */
  ['the length tag before the win', 'act', 'if (st.done && v.win) {', 'if (true) {'],
  ['the count-on numerals include the printed number', 'act', 'for (var c = m + 1; c <= r.len; c++)', 'for (var c = m; c <= r.len; c++)'],
  ['a note never reaches the screen', 'act', "if (r.result === 'note') { v.note = this._t(r.key, { o: this._obj() });", "if (r.result === 'note') { v.note = '';"],
  ['fr loses a narrow space', 'act', '"fr":"Où est le bout ?', '"fr":"Où est le bout ?'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['a success sentence that forgets 0', 'act', '"de":"Die Muschel beginnt bei 0 und endet bei {n}', '"de":"Die Muschel endet bei {n} und beginnt dort'],
  ['an inch in a string', 'act', '"en":"Ruler numbers"', '"en":"Ruler numbers (inches)"'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  /* the manifest */
  ['the row still points at the choice board', 'man', '"tool": "glow-ruler-activity"', '"tool": "choice-board-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gr-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-glow-ruler-core.js')], { env: Object.assign({}, process.env, { GR_CORE: files.core, GR_ACT: files.act, GR_MANIFEST: files.man }), encoding: 'utf8', timeout: 120000 });
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
console.log(`mutate-glow-ruler: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
