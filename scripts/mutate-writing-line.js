#!/usr/bin/env node
/* =====================================================================
   mutate-writing-line.js — does verify-writing-line-core.js BITE?
   Run: node scripts/mutate-writing-line.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   The two instruments the core loads (number-trace-core, stroke-trace-core)
   are copied beside the doctored core so it resolves them from the tmp dir.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MINI, 'writing-line-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-writing-line-core.js');
const MUTATIONS = [
  ['fading plan does not fade',     "fading: ['full', 'ghost', 'blank']", "fading: ['full', 'full', 'blank']"],
  ['alone plan starts full',        "alone: ['ghost', 'blank', 'blank']", "alone: ['full', 'blank', 'blank']"],
  ['blank corridor as tight as full', "var CORRIDOR = { full: 8, ghost: 12, blank: 16 };", "var CORRIDOR = { full: 8, ghost: 12, blank: 8 };"],
  ['help never comes',              "var HELP_AFTER = 3;", "var HELP_AFTER = 300;"],
  ['help comes at once',            "var HELP_AFTER = 3;", "var HELP_AFTER = 1;"],
  ['ghost never steps to full',     "var LEVEL_UP = { blank: 'ghost', ghost: 'full', full: 'full' };", "var LEVEL_UP = { blank: 'ghost', ghost: 'ghost', full: 'full' };"],
  ['symmetry tolerance huge',       "var SYM_TOL = 3;", "var SYM_TOL = 60;"],
  ['one digit missing',             "for (var d = 0; d <= 9; d++) out.push(", "for (var d = 1; d <= 9; d++) out.push("],
  ['only two boxes',                "for (var i = 0; i < 3; i++) cells.push(newCell(strokes, levels[i]));", "for (var i = 0; i < 2; i++) cells.push(newCell(strokes, levels[i]));"],
  ['corridor ignores the level',    "trace: ST.newTrace(strokes, { corridor: CORRIDOR[level] })", "trace: ST.newTrace(strokes, {})"],
  ['raw path not kept',             "    c.raw.push(pt);\n", "\n"],
  ['live ink keeps off-path points', "if (r.on) c.live.push(pt);", "c.live.push(pt);"],
  ['the round never ends',          "if (st.at >= 3) { st.done = true;", "if (st.at >= 4) { st.done = true;"],
  ['a slip keeps its spurious ink', "if (slip !== 'short') { ST.clearStroke(c.trace); c.live = []; }", "if (false) { ST.clearStroke(c.trace); c.live = []; }"],
  ['stalls not counted',            "    c.fails++; c.raw = [];\n", "    c.raw = [];\n"],
  ['short threshold dropped',       "if (progress >= 0.5) return 'short';", "if (progress >= 0.05) return 'short';"],
  ['reversed never named',          "if (completes([reverseStroke(s)], raw, corridor)) return 'reversed';", "if (false) return 'reversed';"],
  ['mirror named as off',           "if (!isSymmetric && completes([m], raw, corridor)) return 'mirror';", "if (false) return 'mirror';"],
  ['symmetric mirror named mirror', "if (isSymmetric && completes([m], raw, corridor)) return 'direction';", "if (false) return 'direction';"],
  ['rub out forgets the corridor',  "c.trace = ST.newTrace(st.strokes, { corridor: CORRIDOR[c.level] });", "c.trace = ST.newTrace(st.strokes, {});"],
  ['rub out keeps the ink',         "    c.ink = []; c.live = []; c.raw = [];\n    return true;", "    c.live = []; c.raw = [];\n    return true;"],
  ['three boxes on a phone',        "if (W >= 480) { var cell", "if (W >= 200) { var cell"],
  ['boxes may shrink',              "var cell = Math.min(220, Math.floor((W - 2 * gap) / 3));", "var cell = Math.min(140, Math.floor((W - 2 * gap) / 3));"],
  ['phone box small',               "var one = Math.min(320, Math.round(W * 0.82));", "var one = Math.min(320, Math.round(W * 0.6));"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-mut-'));
  fs.writeFileSync(path.join(dir, 'writing-line-core.js'), SRC.replace(needle, repl));
  for (const dep of ['number-trace-core.js', 'stroke-trace-core.js']) fs.copyFileSync(path.join(MINI, dep), path.join(dir, dep));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { WL_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-writing-line: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
