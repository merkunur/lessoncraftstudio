#!/usr/bin/env node
/* =====================================================================
   mutate-snip-tape.js — proves verify-snip-tape-core.js can fail
   (ACTIVITY #155, The Snip-Out Tape). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-snip-tape.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'snip-tape-core.js'), act: path.join(MINI, 'snip-tape-activity.js'), man: path.join(MINI, 'span-length-gap-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the longer length is accepted', 'core', "else if (st.typed !== r.gap) kind = 'number';", "else if (st.typed !== r.gap && st.typed !== Math.max(r.a.len, r.b.len)) kind = 'number';"],
  ['the sum is accepted', 'core', "else if (st.typed !== r.gap) kind = 'number';", "else if (st.typed !== r.gap && st.typed !== r.a.len + r.b.len) kind = 'number';"],
  ['grading ignores where the clips are', 'core', "if (st.clipA !== r.a.len) kind = 'clipA';\n    else if (st.clipB !== r.b.len) kind = 'clipB';\n    else if", 'if'],
  ['loose mode grades before the push', 'core', "if (!atWall(st)) return { result: 'note', key: 'hintWall', which: st.startA !== 0 ? 'a' : 'b' };", ''],
  ['the dots sit on the lines (gap + 1 dots)', 'act', 'for (var d = 0; d < r.gap; d++)', 'for (var d = 0; d <= r.gap; d++)'],
  ['the dashed strip starts at a clip', 'act', "d=\"M' + g.x0 + ' ' + gy + 'H' + (g.x0 + gl)", "d=\"M' + X(lo) + ' ' + gy + 'H' + (X(lo) + gl)"],
  ['a picture scaled by its image box', 'act', 'S = len / (p.r - p.l)', 'S = len'],
  ['a round where the gap equals the shorter length', 'core', "['airplane', 11, 'car', 6, [1, 3]]", "['airplane', 12, 'car', 6, [1, 3]]"],
  ['the reshuffle repeats the previous order', 'core', 'if (!prev || prev.join() !== c.join()) return c;', 'return c;'],
  ['Check with nothing typed counts a miss', 'core', "else if (st.typed === null) return { result: 'note', key: 'hintType' };", "else if (st.typed === null) kind = 'number';"],
  /* the rest of the model */
  ['nothing placed counts a miss', 'core', "if (st.clipA === null || st.clipB === null) return { result: 'note', key: 'hintClips' };", "if (st.clipA === null || st.clipB === null) { st.misses++; return { result: 'note', key: 'hintClips' }; }"],
  ['the order never shuffles', 'core', 'var c = shuffle(ks.slice(), rnd);', 'var c = ks.slice();'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the two clip hints swapped', 'core', "if (v.kind === 'clipA') return 'hintClipA';", "if (v.kind === 'clipA') return 'hintClipB';"],
  ['a move keeps the old verdict', 'core', 'function clear(st) { if (!st.done) st.verdict = null; }', 'function clear(st) { }'],
  ['a leading zero is typed', 'core', "if (s.length >= 2 || (s === '' && d === '0')) return false;", 'if (s.length >= 2) return false;'],
  ['three digits fit', 'core', "if (s.length >= 2 || (s === '' && d === '0')) return false;", "if (s.length >= 3 || (s === '' && d === '0')) return false;"],
  ['a clip runs off the tape', 'core', 'var max = st.round.max, v = Math.max(0, Math.min(max + 1, Math.round(+cm)));', 'var max = st.round.max, v = Math.max(0, Math.round(+cm));'],
  ['loose starts that are equal', 'core', "['caterpillar', 5, 'centipede', 7, [2, 1]]", "['caterpillar', 5, 'centipede', 7, [2, 2]]"],
  ['a loose thing past the tape', 'core', "['stapler', 12, 'frog', 7, [1, 3]]", "['stapler', 12, 'frog', 7, [2, 3]]"],
  ['a lined-up thing can be moved', 'core', 'if (!st.loose || st.done) return false;', 'if (st.done) return false;'],
  ['the key left standing', 'core', "key: { theme: 'around the house', ang: 90,", "key: { theme: 'around the house', ang: 0,"],
  ['the glue ink box is not the pixels', 'core', "glue: { theme: 'classroom', ang: 90, l: -0.4873,", "glue: { theme: 'classroom', ang: 90, l: -0.4373,"],
  ['the parking zone forgotten', 'act', 'padX = Math.max(4, (W - wall - park - (r.max + 1) * u) / 2);', 'padX = Math.max(4, (W - wall - (r.max + 1) * u) / 2) + park;'],
  ['pictures shrunk below the floor', 'act', 'laneMax = wide ? 150 : cramp ? 60 : 88;', 'laneMax = wide ? 80 : cramp ? 36 : 46;'],
  ['the tape snipped on a clip miss', 'act', "snipped = !!(st.done || (st.verdict && st.verdict.kind === 'number'))", 'snipped = !!(st.done || st.verdict)'],
  ['the dots without help', 'act', 'if (st.help) for (var d = 0', 'if (true) for (var d = 0'],
  ['the strip shows the answer, not the child\'s number', 'act', "data-ghost=\"' + st.verdict.typed", "data-ghost=\"' + r.gap"],
  /* strings */
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['fr loses a narrow space', 'act', 'Est-elle aussi longue que le morceau découpé ?', 'Est-elle aussi longue que le morceau découpé ?'],
  ['a hint carries the answer', 'act', '"en":"Now type how much longer."', '"en":"Now type how much longer: 3."'],
  ['a hint names an inch', 'act', '"en":"Now type how much longer."', '"en":"Now type how many inches longer."'],
  ['the word free in a string', 'act', '"en":"Check"', '"en":"Free check"'],
  ['the success line drops the subtraction', 'act', '"en":"The top one is {a} cm, the bottom one is {b} cm: {a} − {b} = {gap}.', '"en":"The top one is {a} cm, the bottom one is {b} cm.'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "snip-tape-activity"', '"tool": "span-length-gap-activity"'],
  ['a fish drawn longer than a pet fish is', 'core', "['lizard', 7, 'fish', 8, [1, 2]]", "['lizard', 7, 'fish', 13, [1, 2]]"],
  ['the clips graded before the push', 'core', "    if (!atWall(st)) return { result: 'note', key: 'hintWall', which: st.startA !== 0 ? 'a' : 'b' };\n    if (st.clipA === null || st.clipB === null) return { result: 'note', key: 'hintClips' };", "    if (st.clipA === null || st.clipB === null) return { result: 'note', key: 'hintClips' };\n    if (!atWall(st)) return { result: 'note', key: 'hintWall', which: st.startA !== 0 ? 'a' : 'b' };"],
  ['a new locale without its intro', 'man', '"fi": "Kaksi esinettä', '"fi": "", "xx": "Kaksi esinettä']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'st-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-snip-tape-core.js')], { env: Object.assign({}, process.env, { ST_CORE: files.core, ST_ACT: files.act, ST_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-snip-tape: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
