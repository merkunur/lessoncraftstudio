#!/usr/bin/env node
/* =====================================================================
   mutate-leapfrog-parts.js — proves verify-leapfrog-parts-core.js can fail.
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-leapfrog-parts.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'leapfrog-parts-core.js'), act: path.join(MINI, 'leapfrog-parts-activity.js'), man: path.join(MINI, 'match-pairs-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['the card leapfrogs on the first tap', 'core', "if (st.held == null) { st.held = i; st.lay = null; st.last = null; if (st.help !== i) st.help = null; return { result: 'lift' }; }", "if (st.held == null) { st.held = i; st.lay = null; st.last = null; st.help = i; return { result: 'lift' }; }"],
  ['twins judged by the total only', 'core', "return { twins: sameCard(L, to), sameTotal:", "return { twins: total(L) === total(to), sameTotal:"],
  ['the leapfrog does not swap', 'core', ": { kind: 'add', a: c.b, b: c.a, s: c.s, pair: c.pair }; }", ": { kind: 'add', a: c.a, b: c.b, s: c.s, pair: c.pair }; }"],
  ['the take-away leapfrog moves the whole', 'core', "return c.kind === 'take' ? { kind: 'take', w: c.w, a: c.b, b: c.a, pair: c.pair }", "return c.kind === 'take' ? { kind: 'take', w: c.a, a: c.w, b: c.b, pair: c.pair }"],
  ['the minus swaps', 'core', "return c && c.kind === 'take' ? 'refused' : 'no';", "return c && c.kind === 'take' ? 'swapped' : 'no';"],
  ['colour by position, not by size', 'core', "var out = [], small = Math.min(c.a, c.b), col = function (n) { return n === small ? 's' : 'l'; };", "var out = [], small = c.a, col = function (n) { return n === small ? 's' : 'l'; };"],
  ['a double in a round', 'core', "[[1, 9], [2, 8], [3, 7]], [[1, 8], [2, 7], [4, 5]]", "[[1, 9], [2, 8], [5, 5]], [[1, 8], [2, 7], [4, 5]]"],
  ['a 0 card', 'core', "[[4, 7], [3, 8], [2, 9]], [[3, 9], [4, 8], [5, 7]]", "[[4, 7], [3, 8], [0, 11]], [[3, 9], [4, 8], [5, 7]]"],
  ['add and take mixed inside a round', 'core', "if (kind === 'take') { all.push({ kind: 'take', w: p[0], a: p[1], b: p[2], pair: k });", "if (kind === 'take' || k === 2) { all.push({ kind: 'take', w: p[0], a: p[1], b: p[2], pair: k });"],
  ['the twin always beside its card', 'core', "var orders = {}; o.forEach(function (r) { orders[r] = shuffle([0, 1, 2, 3, 4, 5], rnd); });", "var orders = {}; o.forEach(function (r) { orders[r] = [0, 1, 2, 3, 4, 5]; });"],
  ['a miss does not hop home', 'core', "if (st.misses[from] >= 2) { st.held = from; st.help = from; } else { st.held = null; st.help = null; }", "if (st.misses[from] >= 2) { st.held = from; st.help = from; } else { st.help = null; }"],
  ['miss 2 never helps', 'core', "if (st.misses[from] >= 2) { st.held = from; st.help = from; }", "if (st.misses[from] >= 3) { st.held = from; st.help = from; }"],
  ['the round never finishes', 'core', "if (st.matched.length === 3) st.done = true;", "if (st.matched.length === 4) st.done = true;"],
  ['a talking round may open a pass', 'core', "if (!same(c, prev) && !talking(num, kindOf(cards, c[0]), c[0])) { o = c; break; }", "if (!same(c, prev)) { o = c; break; }"],
  ['the same order every pass', 'core', "for (var a = 0; a < 400; a++) { var c = shuffle(ids, rnd);", "for (var a = 0; a < 400; a++) { var c = ids;"],
  ['an old pair dropped', 'core', "[[4, 9], [5, 8], [6, 7]], [[5, 9], [6, 8], [4, 10]]", "[[4, 9], [5, 8], [6, 7]], [[5, 9], [3, 11], [4, 10]]"],
  ['a digit in a hint', 'act', 'missSame: {en:"Same', 'missSame: {en:"2 Same'],
  ['the word free in a string', 'act', 'missHelp: {en:"Find', 'missHelp: {en:"Free find'],
  ['a false success line', 'act', 'okAdd: {en:"{a} + {b} = {b} + {a}.', 'okAdd: {en:"{a} + {b} = {a} + {b}.'],
  ['the manifest still on the old tool', 'man', '"tool": "leapfrog-parts-activity"', '"tool": "match-pairs-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { LP_CORE: files.core, LP_ACT: files.act, LP_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-leapfrog-parts-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-leapfrog-parts: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
