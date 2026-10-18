#!/usr/bin/env node
/* =====================================================================
   mutate-stamp-frame.js — does verify-stamp-frame-core.js BITE?
   Run: node scripts/mutate-stamp-frame.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   The first ten are the design's list (§12); the rest guard the hints,
   the chips, the rack and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'stamp-frame-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-stamp-frame-core.js');
const MUTATIONS = [
  /* the design's list */
  ['teal accepted in take-away',       "function rack(st) { return st.explore ? ['c', 't', 'x'] : (st.op === '+' ? ['c', 't'] : ['c', 'x']); }", "function rack(st) { return st.explore ? ['c', 't', 'x'] : (st.op === '+' ? ['c', 't'] : ['c', 't', 'x']); }"],
  ['crossed counters counted in the answer', "for (var i = 0; i < st.cells.length; i++) if (st.cells[i] === 'cx') { st.cells[i] = null; moved++; }", "for (var i = 0; i < st.cells.length; i++) if (st.cells[i] === 'cx') { st.cells[i] = 'c'; moved++; }"],
  ['the peel skipped',                 "      if (st.op === '-') peel(st);\n", "\n"],
  ['the second frame fills early',     "if (i >= FRAME && firstHasRoom(st)) return 'fillFirst';", "if (false) return 'fillFirst';"],
  ['the answer read from the data',    "function answerOf(st) { return result(st.a, st.b, st.op); }", "function answerOf(st) { return st.a + st.b; }"],
  ['± 1 orange accepted',              "      if (k.coral > a) res = { ok: false, slip: 'outside', n: a, k: k.coral - a, g: 'a' };\n      else if (k.coral < a) res = { ok: false, slip: 'missing', n: a, k: a - k.coral, g: 'a' };\n      else if (k.teal > b)", "      if (k.coral > a + 1) res = { ok: false, slip: 'outside', n: a, k: k.coral - a, g: 'a' };\n      else if (k.coral < a - 1) res = { ok: false, slip: 'missing', n: a, k: a - k.coral, g: 'a' };\n      else if (k.teal > b)"],
  ['the answer shown in the box before step 2', "    if (st.done) { var ans = answerOf(st); for (i = 0; i < ans; i++) out[i] = i + 1; return out; }", "    { var ans = answerOf(st); for (i = 0; i < ans; i++) out[i] = i + 1; return out; }"],
  ['operator runs of four',            "      if (run > 2) return false;", "      if (run > 4) return false;"],
  ['a 0 lets in',                      "[[2, 1, '+'], [1, 3, '+'], [2, 2, '+'], [3, 2, '+'], [1, 4, '+'], [5, 1, '-'], [4, 2, '-'], [5, 3, '-'], [3, 1, '-'], [4, 3, '-']]", "[[2, 1, '+'], [1, 3, '+'], [2, 2, '+'], [3, 2, '+'], [1, 4, '+'], [5, 1, '-'], [4, 2, '-'], [5, 3, '-'], [3, 3, '-'], [4, 3, '-']]"],
  ['a domino that does not add up',    "var DOMINO = { 7: [4, 3], 8: [4, 4], 9: [5, 4], 10: [5, 5] };", "var DOMINO = { 7: [4, 3], 8: [4, 3], 9: [5, 4], 10: [5, 5] };"],
  /* the hand + the tidy */
  ['the tidy drops a counter',         "      for (i = 0; i < k.teal; i++) out[start + i] = 't';", "      for (i = 1; i < k.teal; i++) out[start + i] = 't';"],
  ['the tidy leaves the order',        "    st.cells = out;\n    return out;", "    return out;"],
  ['take-away tidy leaves a gap',      "      for (i = 0; i < k.cross; i++) out[un + i] = 'cx';", "      for (i = 0; i < k.cross; i++) out[un + 1 + i] = 'cx';"],
  ['the same stamp does not wipe',     "    } else if (v === s) { st.cells[i] = null; out = 'wipe'; }", "    } else if (v === s) { out = 'wipe'; }"],
  ['the cross stamp crosses green',    "      if (v === 'c') out = 'cross'; else if (v === 'cx') out = 'uncross'; else return 'refused';", "      if (v === 'c' || v === 't') out = 'cross'; else if (v === 'cx') out = 'uncross'; else return 'refused';"],
  ['stamping in step 2',               "if (st.done || (!st.explore && st.step !== 1)) return 'locked';", "if (st.done) return 'locked';"],
  ['an empty Check is a miss',         "    if (k.ink === 0) { res = { ok: false, slip: 'empty' }; st.last1 = res; st.showHelp = true; return res; }", "    if (k.ink === 0) { res = { ok: false, slip: 'empty' }; st.misses1++; st.last1 = res; st.showHelp = true; return res; }"],
  ['no crosses passes the take-away',  "      if (k.cross === 0) res = { ok: false, slip: 'noCross', n: b, k: b, g: 'b' };\n", "\n"],
  ['crosses more/less swapped',        "      else if (k.cross < b) res = { ok: false, slip: 'crossMore', n: b, k: b - k.cross, g: 'b' };", "      else if (k.cross < b) res = { ok: false, slip: 'crossLess', n: b, k: b - k.cross, g: 'b' };"],
  ['a stamp does not clear the help',  "    st.showHelp = false;\n    return out;", "    return out;"],
  /* step 2 */
  ['the part hint for any number',     "      if (st.op === '+' && (v === st.a || v === st.b)) res = { ok: false, slip: 'part', n: v };", "      if (st.op === '+') res = { ok: false, slip: 'part', n: v };"],
  ['the part hint never',              "      if (st.op === '+' && (v === st.a || v === st.b)) res = { ok: false, slip: 'part', n: v };", "      if (false) res = { ok: false, slip: 'part', n: v };"],
  ['numbers on the first miss',        "  function help2(st) { return st.done || st.step !== 2 || !st.showHelp ? 0 : Math.min(2, st.misses2); }", "  function help2(st) { return st.done || st.step !== 2 || !st.showHelp ? 0 : Math.min(2, st.misses2 * 2); }"],
  ['the help writes the answer',       "for (i = 0; i < m - 1; i++) out[i] = i + 1; out[m - 1] = '?'; return out; }", "for (i = 0; i < m; i++) out[i] = i + 1; return out; }"],
  ['the right answer does not finish', "    if (v === ans) { res = { ok: true, slip: 'right' }; st.done = true; }", "    if (v === ans) { res = { ok: true, slip: 'right' }; }"],
  /* the bubble + the success line */
  ['slots hint without crosses',       "      if (help1(st) >= 2) return { key: (r.slip === 'crossMore' || r.slip === 'crossLess') ? 'hintSlotsX' : 'hintSlots', n: r.n };", "      if (help1(st) >= 2) return { key: 'hintSlots', n: r.n };"],
  ['one/several mixed',                "      var one = r.k === 1;", "      var one = r.k <= 2;"],
  ['"1 dots" allowed',                 "if (show === 'dots' && round.a >= 2 && round.b >= 2 && round.a <= 10 && round.b <= 10) return 'celebrateDots';", "if (show === 'dots') return 'celebrateDots';"],
  ['"1 are left"',                     "return result(round.a, round.b, round.op) === 1 ? 'celebrateSub1' : 'celebrateSub';", "return 'celebrateSub';"],
  ['take-away numbering stops at the ones left', "var g = (st.op === '+') ? br : (st.last1 && st.last1.g === 'a' ? [br[0]] : [br[1]]);", "var g = (st.op === '+') ? br : [{ from: 0, to: st.a - st.b }, br[1]];"],
  ['a cross slip names the first bracket', "else if (k.cross < b) res = { ok: false, slip: 'crossMore', n: b, k: b - k.cross, g: 'b' };", "else if (k.cross < b) res = { ok: false, slip: 'crossMore', n: b, k: b - k.cross, g: 'a' };"],
  ['a green slip names the first bracket', "else if (k.teal < b) res = { ok: false, slip: 'missing', n: b, k: b - k.teal, g: 'b' };", "else if (k.teal < b) res = { ok: false, slip: 'missing', n: b, k: b - k.teal, g: 'a' };"],
  /* the layout */
  ['phone cells below the floor',      "else cell = Math.min(nFrames === 2 ? 46 : 56, Math.floor((W - 2 * PAD - 4 * GAP) / 5));", "else cell = Math.min(nFrames === 2 ? 40 : 56, Math.floor((W - 2 * PAD - 4 * GAP) / 5));"],
  ['the dish column ignored',          "if (wide) cell = Math.min(nFrames === 2 ? 72 : 80, Math.floor((W - side - (side ? 16 : 0) - 2 * PAD - 4 * GAP) / 5));", "if (wide) cell = Math.min(nFrames === 2 ? 72 : 80, Math.floor((W - 2 * PAD - 4 * GAP) / 5));"],
  ['desktop places stay small',        "if (wide) cell = Math.min(nFrames === 2 ? 72 : 80,", "if (wide) cell = Math.min(nFrames === 2 ? 62 : 62,"],
  ['a dish column on additions',       "side = wide && sub ? SIDE : 0;", "side = wide ? SIDE : 0;"],
  ['the strip in rows of five on desktop', "    perRow = wide ? 10 : 5;", "    perRow = 5;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sf-mut-'));
  fs.writeFileSync(path.join(dir, 'stamp-frame-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SF_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-stamp-frame: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
