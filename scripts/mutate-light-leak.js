#!/usr/bin/env node
/* =====================================================================
   mutate-light-leak.js — does verify-light-leak-core.js BITE? Run:
   node scripts/mutate-light-leak.js — every mutation must be KILLED; a
   needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN files first; the last needle is a
   control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the glow, the wall shadow, the etched seams, the
   rigid pane sliding in — is gated by local-test-light-leak.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'light-leak-core.js', act: 'light-leak-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-light-leak-core.js');
const MUTATIONS = [
  ['an overhang is never seen (sealed while sticking out)', 'core', 'for (var k in cov) { if (!tset[k]) over.push(k); if (cov[k] > 1) dup.push(k); }', 'for (var k in cov) { if (cov[k] > 1) dup.push(k); }'],
  ['a one-cell gap is ignored', 'core', 'T.forEach(function (k) { tset[k] = 1; if (!cov[k]) unc.push(k); });', 'T.forEach(function (k) { tset[k] = 1; if (!cov[k]) unc.push(k); }); if (unc.length === 1) unc = [];'],
  ['a pattern block may land on another', 'core', "      if (cells.some(function (q) { return occ[cellKey(q)]; })) continue;\n", ''],
  ['a tan may land on another', 'core', 'if (quarters(poly).some(function (q) { return occ[q]; })) continue;', ''],
  ['"a new way" accepts the same seams', 'core', "if (R.cog === 'new' && sameSet(seamsOf(st.placed), st.remembered)) return 'same';", ''],
  ['"a new way" compares only the number of seams (rejects the mirrored filling)', 'core', 'sameSet(seamsOf(st.placed), st.remembered)', 'seamsOf(st.placed).length === st.remembered.length'],
  ['a spare that leaks is accepted (size ignored)', 'core', "if (R.spares) return (!c.uncovered.length && !c.overhang.length) ? 'ok' : 'spare';", "if (R.spares) return !c.overhang.length ? 'ok' : 'spare';"],
  ['the parallelogram spare cannot be flipped', 'core', "var s = st.spares[slot]; if (!(st.grid === 'tan' && s.kind === 'para')) return 'no';", "var s = st.spares[slot]; return 'no';"],
  ['the M7 parallelogram is not dealt mirrored', 'core', "spares: [{ kind: 'para', rot: 0, flip: 1 }", "spares: [{ kind: 'para', rot: 0, flip: 0 }"],
  ['a flipped pane matches the shadow', 'core', "var f = function (q) { return how === 'flip' ? tanFlip(q)", "var f = function (q) { return how === 'flip' ? q"],
  ['a turned pane matches the shadow', 'core', ": how === 'turn' ? tanTurn(q)", ": how === 'turn' ? q"],
  ['the riveted piece can be taken out', 'core', "var p = byId(st, id); if (!p || p.locked) return 'no';\n    st.placed = st.placed.filter", "var p = byId(st, id); if (!p) return 'no';\n    st.placed = st.placed.filter"],
  ['the ghost is solved over the whole frame (may sit on a piece)', 'core', 'var s = solve(st, c.uncovered, tray, 0);', 'var s = solve(st, targetSet(st.R), tray, 0);'],
  ['Check with nothing placed counts a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['the pattern-block trapezoid gets a flip', 'core', "if (!(st.grid === 'tan' && kind === 'para')) return 'no'; st.flip[kind]", 'st.flip[kind]'],
  ['T7 is not kept last', 'core', "if (level === 'tangram') return o[o.length - 1] === 'T7';", "if (level === 'tangram') return true;"],
  ['#8 may come before #7', 'core', "return o.indexOf('L8') > o.indexOf('L7') && o.indexOf('L9') > o.indexOf('L6');", "return o.indexOf('L9') > o.indexOf('L6');"],
  ['the leftover slots always go to the first slots', 'core', 'pool = pool.concat(shuffle([0, 1, 2], rnd).slice(0, m % 3));', 'pool = pool.concat([0, 1, 2].slice(0, m % 3));'],
  ['the hexagon cell list draws another shape', 'core', 'var HEX = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]]', 'var HEX = [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [1, 3]]'],
  ['the classic square loses its parallelogram', 'core', "{ kind: 'para', poly: CL([[0, 4], [1, 3], [3, 3], [2, 4]]) }", "{ kind: 'para', poly: CL([[0, 4], [1, 3], [3, 3], [1, 4]]) }"],
  ['a hint prints a count', 'act', "en:'Light is still shining through. Can you fill every gap?'", "en:'Light is still shining through. Can you fill all 2 gaps?'"],
  ['fi rhombus as vinoneliö', 'act', "fi:'1 neljäkäs|{n} neljäkästä'", "fi:'1 vinoneliö|{n} vinoneliötä'"],
  ['a tap-turn may push a piece out of the frame', 'core', 'snapTri(st, p.kind, rot, c[0], c[1], p.id, within, true)', 'snapTri(st, p.kind, rot, c[0], c[1], p.id, within, false)'],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'll-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LL_CORE_DIR: dir, LL_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-light-leak: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
