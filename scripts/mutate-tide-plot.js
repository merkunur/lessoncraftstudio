#!/usr/bin/env node
/* =====================================================================
   mutate-tide-plot.js — proves verify-tide-plot-core.js can fail
   (ACTIVITY #167, The Tide You Push). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-tide-plot.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'tide-plot-core.js'), act: path.join(MINI, 'tide-plot-activity.js'), man: path.join(MINI, 'line-plot-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a shore may stop ON a column', 'core', 'v = Math.max(0, Math.min(n, Math.round(v)));', 'v = Math.max(0, Math.min(n, v));'],
  ['"longer than" accepts the n column dry', 'core', "if (r.kind === 'longer') return all.filter(function (x) { return x.v > r.n; });", "if (r.kind === 'longer') return all.filter(function (x) { return x.v >= r.n; });"],
  ['the mode answered by its count', 'core', "if (r.kind === 'mode') return mode(d);", "if (r.kind === 'mode') return count(d, mode(d)) * 2;"],
  ['the range accepts max − min + 1', 'core', "if (r.kind === 'range') return (maxOf(d) - minOf(d)) / 2;", "if (r.kind === 'range') return (maxOf(d) - minOf(d)) / 2 + 1;"],
  ['measure accepts the right-edge position', 'core', 'var wrong = st.shells.filter(function (s) { return s.col !== s.len; });', 'var wrong = st.shells.filter(function (s) { return s.col !== s.len && s.col !== s.len + s.off; });'],
  ['shells always arrive at 0', 'core', "return { len: s[0] * 2, off: s[1] * 2 }; }) }; };", "return { len: s[0] * 2, off: 0 }; }) }; };"],
  ['an X may land between numbers', 'core', 'if (st.done || i == null || st.cols.indexOf(v) < 0) return null;', 'if (st.done || i == null) return null;'],
  ["water hides the X's", 'act', '.tp-x.is-wet{color:#4B8FB0;opacity:.75;}', '.tp-x.is-wet{color:#4B8FB0;opacity:0;}'],
  ['the shell sized by its image box, not its ink', 'act', 'INK: { inset: 22 / 1024, frac: 980 / 1024 },', 'INK: { inset: 0, frac: 1 },'],
  /* the rest of the model */
  ['the shores may cross', 'core', "if (side === 'L') v = Math.min(v, n - t.R); else v = Math.min(v, n - t.L);", ''],
  ['the sea may rise above every stack', 'core', 'v = Math.max(0, Math.min(top, Math.round(v)));', 'v = Math.max(0, Math.round(v));'],
  ['the tide is not checked (any tide with the right number)', 'core', "if (tideOk && st.answer === answerOf(r)) { st.done = true; return { result: 'ok' }; }", "if (st.answer === answerOf(r)) { st.done = true; return { result: 'ok' }; }"],
  ['the range accepts shores that do not touch', 'core', "if (r.kind === 'range') return t.L === st.cols.indexOf(minOf(r.data)) && t.R === n - 1 - st.cols.indexOf(maxOf(r.data)) && t.S === 0;", "if (r.kind === 'range') return t.L <= st.cols.indexOf(minOf(r.data)) && t.R <= n - 1 - st.cols.indexOf(maxOf(r.data));"],
  ['miss 2 never moves the sea', 'core', 'if (st.help) st.tide = canonicalTide(st);', ''],
  ['Check again unchanged counts a miss', 'core', "if (st.verdict) return { result: 'note', key: 'hintAgain' };\n    var tideOk", 'var tideOk'],
  ['the slide never snaps to the stop', 'core', 'if (mm <= 3) mm = 0;', ''],
  ['the shell may leave the ruler', 'core', 'mm = Math.max(0, Math.min(max, Math.round(mm)));', 'mm = Math.max(0, Math.round(mm));'],
  ['undrop forgets where the shell was measured', 'core', 's.col = null; s.pos = s.droppedAt == null ? s.pos : s.droppedAt;', 's.col = null; s.pos = s.off * 5;'],
  ['two mode rounds may sit side by side', 'core', "if (a === b && (a === 'mode' || a === 'range')) return false;", ''],
  ['the reshuffle repeats the previous order', 'core', 'return !prev || prev.join() !== c.join(); };', 'return true; };'],
  ['a design data set drifts', 'core', 'D4 = cm([3, 3, 4, 4, 4, 6, 8])', 'D4 = cm([3, 4, 4, 4, 4, 6, 8])'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['the row points at the old tool', 'man', '"tool": "tide-plot-activity"', '"tool": "line-plot-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tp-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-tide-plot-core.js')], { env: Object.assign({}, process.env, { TP_CORE: files.core, TP_ACT: files.act, TP_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-tide-plot: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
