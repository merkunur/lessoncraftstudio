#!/usr/bin/env node
/* =====================================================================
   mutate-dough-press.js — proves verify-dough-press-core.js can fail
   (ACTIVITY #171, The Dough Press). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-dough-press.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'dough-press-core.js'), act: path.join(MINI, 'dough-press-activity.js'), man: path.join(MINI, 'choice-board-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const PERIM = 'var A = fig.pieces.map(function (p) { var s = 0; for (var i = 0; i < p.length; i++) { var q = p[(i + 1) % p.length]; s += Math.hypot(q[0] - p[i][0], q[1] - p[i][1]); } return s; }), m = A.reduce(function (s, x) { return s + x; }, 0) / A.length;';
const M = [
  /* the design's list (§12) */
  ['equal shares judged by shape (perimeter) instead of amount', 'core', 'function isEqualShares(fig) { var A = areas(fig), m = total(fig) / A.length;', 'function isEqualShares(fig) { ' + PERIM],
  ['patty radius ∝ area instead of √area', 'core', 'function pattyR(a) { return Math.sqrt(K * a / Math.PI); }', 'function pattyR(a) { return K * a / Math.PI / 30; }'],
  ['MATCH counts the pieces only, not their equality', 'core', 'var m = figure(st.round.model); return isEqualShares(f) && nPieces(f) === nPieces(m);', 'var m = figure(st.round.model); return nPieces(f) === nPieces(m);'],
  ['MATCH checks equality only, not the count', 'core', 'var m = figure(st.round.model); return isEqualShares(f) && nPieces(f) === nPieces(m);', 'var m = figure(st.round.model); return isEqualShares(f);'],
  ['WHICH accepts k shaded of n pieces even when unequal', 'core', 'function shows(fig, shaded, card) { return isEqualShares(fig) && Math.abs(share(fig, shaded) - card[0] / card[1]) <= EPS; }', 'function shows(fig, shaded, card) { return shaded.length === card[0] && nPieces(fig) === card[1]; }'],
  ['the ✓ tile always in slot 1', 'core', 'function matchSlot(k, pass) { return ((k % 4) + (pass || 0)) % 4; }', 'function matchSlot(k, pass) { return 0; }'],
  ['the showing survives a new choice', 'core', 'function changed(st) { st.verdict = null; }', 'function changed(st) { }'],
  ['the squash changes the amount (no area rescale)', 'core', 'var a2 = area(M), s = a2 > 0 ? Math.sqrt(A / a2) : 1;', 'var a2 = area(M), s = 1.1;'],
  /* the rest of the model */
  ['an uneven fourths cut with a piece of exactly one fourth', 'core', "case 'fourths-uneq': P = vstrips(W, H, [0.14, 0.38, 0.66]); break;", "case 'fourths-uneq': P = vstrips(W, H, [0.14, 0.39, 0.64]); break;"],
  ['the staircase cut off-centre', 'core', "P = [[[0, 0], [30, 0], [30, 20], [50, 20], [50, 40], [70, 40], [70, 60], [0, 60]], [[100, 60], [70, 60], [70, 40], [50, 40], [50, 20], [30, 20], [30, 0], [100, 0]]]; break;", "P = [[[0, 0], [30, 0], [30, 20], [50, 20], [50, 40], [74, 40], [74, 60], [0, 60]], [[100, 60], [74, 60], [74, 40], [50, 40], [50, 20], [30, 20], [30, 0], [100, 0]]]; break;"],
  ['the mixed fourths made of four congruent pieces', 'core', "if (m[1] === 'sq') P = [R(0, 0, W / 2, H / 2), R(W / 2, 0, W, H / 2), [[0, H / 2], [W, H / 2], [W, H]], [[0, H / 2], [W, H], [0, H]]];", "if (m[1] === 'sq') P = [R(0, 0, W / 2, H / 2), R(W / 2, 0, W, H / 2), R(0, H / 2, W / 2, H), R(W / 2, H / 2, W, H)];"],
  ['a WHICH distractor shades the wrong uneven strip (a second right answer)', 'core', "W('sq-fourths-uneq', [3]), W('sq-thirds-v', [0])", "W('sq-fourths-uneq', [2]), W('sq-thirds-v', [0])"],
  ['a FAIR round loses a fair tile from its ✓', 'core', "'sq-halves-v ✓ · sq-halves-uneq · rect-halves-diag ✓", "'sq-halves-v · sq-halves-uneq · rect-halves-diag ✓"],
  ['the WHICH slots are not rotated per pass', 'core', 'function whichSlot(k, pass) { var base = [0, 1, 2, 3, 0, 1, 2, 3, 3][k]; return (base + (pass || 0)) % 4; }', 'function whichSlot(k, pass) { var base = [0, 0, 2, 3, 0, 1, 2, 3, 3][k]; return (base + (pass || 0)) % 4; }'],
  ['the fair tiles may all sit in one row', 'core', 'return Object.keys(rows).length >= 2 && Object.keys(cols).length >= 2;', 'return true;'],
  ['the fair board keeps an unfair ribbon after a miss', 'core', 'st.ribbons = st.ribbons.filter(function (i) { return wrongOn.indexOf(i) < 0; });', ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2; st.verdict = { pressed: [st.sel] };', 'st.misses++; st.help = false; st.verdict = { pressed: [st.sel] };'],
  ['no reminder when nothing is chosen', 'core', "if (st.sel == null) return { result: 'note', key: 'hintPick' };", "if (st.sel == null) return { result: 'miss' };"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && okRuns(c)) return c;', 'if (okRuns(c)) return c;'],
  ['the plan lets the ✓ sit in one slot three rounds running', 'core', "var okRuns = function (c) { if (board === 'fair') return true;", 'var okRuns = function (c) { return true;'],
  ['a design round drifts', 'core', "['sq-fourths-diag', 'sq-fourths-grid', 'sq-fourths-uneq · sq-halves-diag · sq-notsplit']", "['sq-fourths-diag', 'sq-fourths-grid', 'sq-fourths-uneq · sq-halves-v · sq-notsplit']"],
  ['the one-half success never explains 2 of 4', 'act', "return this._t(n === c[1] ? 'okWhich' : 'okWhichEq',", "return this._t('okWhich',"],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['a locale loses its fraction words', 'act', '    fi: {"plural":', '    fx: {"plural":'],
  ['the row points at the old tool', 'man', '"tool": "dough-press-activity"', '"tool": "choice-board-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-dough-press-core.js')], { env: Object.assign({}, process.env, { DP_CORE: files.core, DP_ACT: files.act, DP_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 60) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
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
console.log(`mutate-dough-press: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
