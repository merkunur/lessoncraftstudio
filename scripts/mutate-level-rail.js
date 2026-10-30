#!/usr/bin/env node
/* =====================================================================
   mutate-level-rail.js — proves verify-level-rail-core.js can fail
   (ACTIVITY #168, The Level Rail). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-level-rail.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'level-rail-core.js'), act: path.join(MINI, 'level-rail-activity.js'), man: path.join(MINI, 'graph-it-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the rail level a step away from the top', 'core', 'st.rail.y === topOf(st, st.rail.on); }', 'Math.abs(st.rail.y - topOf(st, st.rail.on)) <= st.round.s; }'],
  ['the slider stops between ticks', 'core', "y = Math.max(0, Math.min(postMax(st), Math.round(y / u) * u));", 'y = Math.max(0, Math.min(postMax(st), y));'],
  ['the bubble centred while the rail tilts', 'core', '    if (d === 0) return 0;', '    if (Math.abs(d) <= u) return 0;'],
  ['the overhang counts the whole taller picket', 'core', 'steps: (t - y) / s', 'steps: t / s'],
  ['stack puts A beside B, not on it', 'core', '    if (st.stack && st.stack.onto === c) v += st.fence[st.stack.from];\n', ''],
  ['take apart from the wrong picket', 'core', 'st.fence[c] -= st.round.s; st.basket.push(c);', 'st.fence[st.cats[st.cats.length - 1]] -= st.round.s; st.basket.push(c);'],
  ['a scaled post counting by 1', 'core', 'return { s: r.s, steps: Math.max(5, Math.ceil(maxOf(r) / r.s) + 1) };', 'return { s: 1, steps: Math.max(5, Math.ceil(maxOf(r) / r.s) + 1) };'],
  ['half steps at key 5', 'core', 'function unitOf(r) { return r.s === 2 ? 1 : r.s; }', 'function unitOf(r) { return r.s === 2 || r.s === 5 ? 1 : r.s; }'],
  ['the "most" picket always in the card order', 'core', 'var order = isBuild(r) ? r.cats.slice() : shuffle(r.cats.slice(), rnd || Math.random);', 'var order = r.cats.slice();'],
  ['True/False both false', 'core', "Q('tf', [R, 9, F, 6, L, 4], { a: R, b: F, by: 3 })", "Q('tf', [R, 9, F, 6, L, 4], { a: R, b: F, by: 2 })"],
  /* the rest of the model */
  ['Check again unchanged counts a miss', 'core', "    if (st.verdict) return { result: 'note', key: 'hintAgain' };\n    if (st.answer === answerOf(r))", '    if (st.answer === answerOf(r))'],
  ['a build Check again unchanged counts a miss', 'core', "      if (st.verdict) return { result: 'note', key: 'hintAgain' };\n      var wrong", '      var wrong'],
  ['miss 2 never helps', 'core', "    st.misses++; st.help = st.misses >= 2;\n    st.verdict = { why: r.kind };", '    st.misses++; st.help = false;\n    st.verdict = { why: r.kind };'],
  ['an empty picket hint says 0', 'core', "(st.verdict && st.fence[st.verdict.cat] === 0 ? 'hintBuildEmpty' : 'hintBuildWrong')", "'hintBuildWrong'"],
  ['a picket grows past the post', 'core', 'var u = unitOf(r); v = Math.max(0, Math.min(postMax(st), Math.round(v / u) * u));', 'var u = unitOf(r); v = Math.max(0, Math.round(v / u) * u);'],
  ['the post never grows past 10', 'core', 'if (top > p.steps) return { s: 1, steps: top > 10 ? 20 : 10 };', ''],
  ['two totals may sit side by side', 'core', "if (a === b && (a === 'total' || a === 'tf')) return false;", ''],
  ['the reshuffle repeats the previous order', 'core', 'return !prev || prev.join() !== c.join(); };', 'return true; };'],
  ['Pip eats the round index (the old k clash)', 'core', "{ a: A, eat: 4 }", "{ a: A, eat: 4, k: 4 }"],
  ['a design data set drifts', 'core', "B('table', [A, 9, F, 4, L, 7, R, 5])", "B('table', [A, 9, F, 4, L, 7, R, 6])"],
  ['the count tags start at 0', 'core', '    for (var w = s; w <= to; w += s) out.push(w);', '    for (var w = 0; w <= to; w += s) out.push(w);'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['a locale loses its category words', 'act', '    fi: {"leaf":', '    fx: {"leaf":'],
  ['the row points at the old tool', 'man', '"tool": "level-rail-activity"', '"tool": "graph-it-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lr-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-level-rail-core.js')], { env: Object.assign({}, process.env, { LR_CORE: files.core, LR_ACT: files.act, LR_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-level-rail: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
