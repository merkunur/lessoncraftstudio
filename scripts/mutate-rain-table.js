#!/usr/bin/env node
/* =====================================================================
   mutate-rain-table.js — proves verify-rain-table-core.js can fail
   (ACTIVITY #172, The Rain Table). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n. Runs four gates at a time (each one enumerates
   every buildable wall set).
   Usage: node scripts/mutate-rain-table.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'rain-table-core.js'), act: path.join(MINI, 'rain-table-activity.js'), man: path.join(MINI, 'fractions-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the square offered notches AND pegs (re-admits the 4 % near miss)', 'core', "R('square', ['pegs'], ['p:0', 'p:8', 'p:16'], 2, true)", "R('square', ['pegs', 'top'], ['p:0', 'p:8', 'p:16'], 2, true)"],
  ['the square pegs start at top-middle (a congruent pair; pegs on edge middles)', 'core', '[[50, 20], [80, 20], [80, 80], [20, 80], [20, 20]], 5 + 10 * i)', '[[50, 20], [80, 20], [80, 80], [20, 80], [20, 20]], 10 * i)'],
  ['accept by count only', 'core', 'function isEqual(parts, n, W) { return parts.length === n && parts.every(', 'function isEqual(parts, n, W) { return parts.length === n || parts.every('],
  ['a rectangle given a centre pin', 'core', 'rectL: { outline: [[8, 26], [92, 26], [92, 74], [8, 74]], box: [8, 26, 92, 74], pin: null }', 'rectL: { outline: [[8, 26], [92, 26], [92, 74], [8, 74]], box: [8, 26, 92, 74], pin: [50, 50] }'],
  ['the oval pegs at polar angles', 'core', 'o.push([50 + 44 * Math.cos(b), 50 + 30 * Math.sin(b)]); }', 'var rr = 1 / Math.sqrt(Math.pow(Math.cos(b) / 44, 2) + Math.pow(Math.sin(b) / 30, 2)); o.push([50 + rr * Math.cos(b), 50 + rr * Math.sin(b)]); }'],
  ['a tube level not proportional to the area', 'core', '{ part: i, level: parts[i].area / share }', '{ part: i, level: Math.sqrt(parts[i].area / share) }'],
  ['the triangle thirds also offer vertical notches (re-admits the 4.7 % near miss)', 'core', "R('triangle', ['pegs', 'side'], ['p:0', 'p:4', 'p:8'], 2)", "R('triangle', ['pegs', 'side', 'base'], ['p:0', 'p:4', 'p:8'], 2)"],
  ['a loose tolerance accepts unequal parts', 'core', 'var TOL = 0.005;', 'var TOL = 0.2;'],
  ['the color step opens on unequal parts', 'core', '      st.misses++; st.help = st.misses >= 2;\n      var kind', "      if (st.colourOn && parts.length === st.n) { st.step = 'colour'; return { result: 'built' }; }\n      st.misses++; st.help = st.misses >= 2;\n      var kind"],
  ['the help survives a new wall', 'core', 'st.verdict = null; st.help = false;\n    return { ok: true, up: j < 0 };', 'st.verdict = null;\n    return { ok: true, up: j < 0 };'],
  ['the turned square called a diamond in a string', 'act', '"en":"Try the dotted walls."', '"en":"Try the dotted walls on the diamond."'],
  /* the rest of the model */
  ['a spoke walls its whole line (one spoke = two parts)', 'core', 'return reach >= m.hi - 1e-6;', 'return iv.length > 0;'],
  ['a fifth wall is allowed', 'core', 'var MAXWALLS = 4;', 'var MAXWALLS = 5;'],
  ['the count and unequal hints swapped', 'core', "return res.kind === 'count' ? 'hintCount' : 'hintUnequal';", "return res.kind === 'count' ? 'hintUnequal' : 'hintCount';"],
  ['miss 2 never shows the dotted walls', 'core', "    if (st.help) return 'hintGhost';\n", ''],
  ['the reshuffle repeats the previous order', 'core', 'if (!prev || prev.join() !== c.join()) return c;', 'return c;'],
  ['a ghost that is not a right answer', 'core', "R('hexagon', ['pegs', 'top'], ['p:1', 'p:5', 'p:9'], 1)", "R('hexagon', ['pegs', 'top'], ['p:1', 'p:5', 'p:8'], 1)"],
  ['the color targets drift', 'core', "R('circle', ['pegs', 'top', 'left'], ['p:0', 'p:8', 'p:16'], 1)", "R('circle', ['pegs', 'top', 'left'], ['p:0', 'p:8', 'p:16'], 2)"],
  ['the surprise round loses its surprise line', 'core', "['p:0', 'p:8', 'p:16'], 2, true)", "['p:0', 'p:8', 'p:16'], 2)"],
  ['a locale loses a hint', 'act', '"fi":"Kokeile pisteviivoilla merkittyjä väliseiniä."', '"fi":""'],
  ['the settings and the task line use different fraction nouns', 'act', 'pThirds: {"en":"Thirds"', 'pThirds: {"en":"Threes"'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['the row points at the old tool', 'man', '"tool": "rain-table-activity"', '"tool": "fractions-activity"']
];
for (const [name, file, a] of M) { if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-mut-'));
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) t = t.replace(mod[1], mod[2]); out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 60) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
const run = (files) => new Promise((res) => {
  const p = spawn(process.execPath, [path.join(__dirname, 'verify-rain-table-core.js'), '--quick'], { env: Object.assign({}, process.env, { RT_CORE: files.core, RT_ACT: files.act, RT_MAN: files.man }) });
  let out = ''; p.stdout.on('data', (d) => { out += d; }); p.stderr.on('data', (d) => { out += d; });
  const timer = setTimeout(() => p.kill(), 900000);
  p.on('close', (code) => { clearTimeout(timer); res({ status: code, out }); });
});
(async () => {
  const ONLY = (process.argv.find((x) => x.startsWith('--only=')) || '').slice(7);
  const jobs = [['control (whitespace)', ['core', "'use strict';", "'use strict';  "]]].concat(M.filter(([n]) => !ONLY || ONLY.split('|').some((o) => n.includes(o))).map(([n, f, a, b]) => [n, [f, a, b]]));
  const results = new Array(jobs.length); let next = 0;
  const worker = async () => { while (next < jobs.length) { const i = next++; results[i] = await run(write(jobs[i][0], jobs[i][1])); process.stdout.write('.'); } };
  await Promise.all([worker(), worker(), worker(), worker()]);
  console.log('');
  const control = results[0]; let killed = 0;
  console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
  for (let i = 1; i < jobs.length; i++) {
    const r = results[i], dead = r.status !== 0; if (dead) killed++;
    const why = r.out.split('\n').find((x) => /FAIL|Error/.test(x)) || '';
    console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + jobs[i][0] + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`mutate-rain-table: ${killed}/${jobs.length - 1} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
  process.exit(killed === jobs.length - 1 && control.status === 0 ? 0 : 1);
})();
