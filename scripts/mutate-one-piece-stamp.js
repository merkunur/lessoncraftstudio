#!/usr/bin/env node
/* =====================================================================
   mutate-one-piece-stamp.js — does verify-one-piece-stamp-core.js BITE?
   Run: node scripts/mutate-one-piece-stamp.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed. The gate runs
   with --quick (the two largest enumerations skipped) for speed; the clean
   run is the full gate.
   (What is DRAWN — the cut, the glass stamp, the coral overhang, help
   taken away after a new move — is gated by local-test-one-piece-stamp.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'one-piece-stamp-core.js', act: 'one-piece-stamp-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-one-piece-stamp-core.js');
const MUTATIONS = [
  ['the rectangle gets corner pins (its diagonals)', 'core', "if (shape === 'square') { out.push(seg([8, 8], [92, 92])); out.push(seg([92, 8], [8, 92])); }", "out.push(seg(P[0], P[2])); out.push(seg(P[1], P[3]));"],
  ['spokes are offered on the square', 'core', 'var CENTRE = { circle: [50, 50],', 'var CENTRE = { square: [50, 50], circle: [50, 50],'],
  ['the stamp cannot flip (a fair mirror half is rejected)', 'core', '[0, 1].forEach(function (f) { [0, Math.PI].forEach(function (r) {', '[0].forEach(function (f) { [0, Math.PI].forEach(function (r) {'],
  ['a copy by area only', 'core', 'copy = Math.abs(S.area - T.area) <= TOL * Math.max(S.area, T.area) && score >= 1 - TOL;', 'copy = Math.abs(S.area - T.area) <= TOL * Math.max(S.area, T.area);'],
  ['the tolerance raised to 5 %', 'core', 'var D2R = Math.PI / 180, TOL = 0.005;', 'var D2R = Math.PI / 180, TOL = 0.05;'],
  ['the piece count is not checked', 'core', "    if (st.pieces.length !== st.n) return 'count';\n", ''],
  ['the trap accepts a Check without "Not equal!"', 'core', "if (st.kind === 'trap') return 'trap';", "if (st.kind === 'trap') return 'ok';"],
  ['name: the number of cuts as the bottom number', 'core', 'st.wheels[1] === st.n)', 'st.wheels[1] === st.cuts.length)'],
  ['L2 #8 forgets the halves step', 'core', "if (st.step === 1) { st.step = 2;", "if (false) { st.step = 2;"],
  ['the gold dots show the tempting cut', 'core', 'var R = LEVELS[st.level][st.r][3], pts = [];', 'var R = LEVELS[st.level][st.r][4], pts = [];'],
  ['Check with no cut counts a miss', 'core', "if (k === 'tray') return { result: 'tray' };", "if (k === 'tray') { st.misses++; return { result: 'tray' }; }"],
  ['one cut too many is allowed', 'core', "return st.mode === 'spoke' ? 6 : (st.step === 2 ? 3 : st.n - 1);", "return st.mode === 'spoke' ? 6 : (st.step === 2 ? 3 : st.n);"],
  ['L2 #8 is not kept last', 'core', 'c.splice(c.indexOf(STEP_ROUND), 1); c.push(STEP_ROUND);', ''],
  ['2/4 shades two neighbours instead of opposites', 'core', 'rnd() < 0.5 ? [0, 3] : [1, 2]', 'rnd() < 0.5 ? [0, 1] : [2, 3]'],
  ['the off-centre rectangle trap is the fair cut', 'core', "['rect', 2, 'line', [V('rect', 12)], [V('rect', 10)],", "['rect', 2, 'line', [V('rect', 12)], [V('rect', 12)],"],
  ['a hint prints a count', 'act', "en:'Count your pieces. Make as many equal pieces as the task asks.'", "en:'Count your pieces. Make 4 equal pieces.'"],
  ['an unused variable (control)', 'core', '  function locale(l) {', '  var UNUSED_CONTROL = 0; function locale(l) {']
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 1800000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ops-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE, '--quick'], { env: Object.assign({}, process.env, { OPS_CORE_DIR: dir, OPS_ACT_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-one-piece-stamp: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
