#!/usr/bin/env node
/* =====================================================================
   mutate-overflow-trays.js — does verify-overflow-trays-core.js BITE?
   Run: node scripts/mutate-overflow-trays.js — every mutation must be
   KILLED; a missed needle is a harness fault, never a skip. CRLF collapsed.
   120 s cap. The first thirteen are the design's list (§12); the rest guard
   the misses, the shape, the hints and the order.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'overflow-trays-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-overflow-trays-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the bottom fills before the top',     "  function top(st) { return Math.min(st.poured, 10); }", "  function top(st) { return Math.min(st.poured, 9); }"],
  ['take back the first, not the last',   "      if (fromTop && bottom(st) > 0) return { refused: 'full' };", ""],
  ['the readout shown during a task',     "  function readoutVisible(st) { return !!st.explore; }", "  function readoutVisible(st) { return true; }"],
  ['target ± 1 accepted',                 "    if (tot === s.target) {", "    if (Math.abs(tot - s.target) <= 1) {"],
  ['the split digits swapped',            "  function split(n) { return { tens: String(Math.floor(n / 10)), ones: String(n % 10) }; }", "  function split(n) { return { tens: String(n % 10), ones: String(Math.floor(n / 10)) }; }"],
  ['ten more adds to the ones',           "      var steps = [{ kind: 'build', target: d.n }, { kind: 'more', target: d.n + 10 },", "      var steps = [{ kind: 'build', target: d.n }, { kind: 'more', target: d.n + 1 },"],
  ['ten less from the ten-more state',    "      else if (st.steps[st.step].kind !== 'more') rewind(st);", ""],
  ['the tray seals at 9',                 "    if (st.open === 10) { st.open = 0; st.sealed++; return { sealed: true }; }", "    if (st.open === 9) { st.open = 0; st.sealed++; return { sealed: true }; }"],
  ['the spout pours faster than 4/s',     "var MAX = 99, POUR_MS = 250;", "var MAX = 99, POUR_MS = 60;"],
  ['the stack delivers loose counters',   "    st.sealed++; moved(st); return true;\n  }\n  /* take back", "    st.open += 10; moved(st); return true;\n  }\n  /* take back"],
  ['one less from 30 goes below the tray',"    if (st.sealed > 0) { st.sealed--; st.open = 9; moved(st); return { broke: true }; }", "    if (st.sealed > 0) { st.sealed--; moved(st); return { broke: true }; }"],
  ['the tally for numbers past 20',       "tally: n >= 1 && n <= 20 ? n : null", "tally: n >= 1 ? n : null"],
  ['a 0 target',                          "{ n: 18 }, { n: 85 }, { n: 30, extra: 'less' }", "{ n: 10 }, { n: 85 }, { n: 30, extra: 'less' }"],
  /* the rules */
  ['an empty Check is a miss',            "    if (tot === 0 && s.kind === 'build') { res = { result: 'empty' }; st.last = res; return res; }", ""],
  ['the help stays after a move',         "  function moved(st) { st.help = 0; st.last = null; }", "  function moved(st) { st.last = null; }"],
  ['the dotted shape a ten short',        "    return st.level === 'teen' ? { top: Math.min(t, 10), bottom: Math.max(0, t - 10) } : { sealed: Math.floor(t / 10), open: t % 10 };", "    return st.level === 'teen' ? { top: Math.min(t, 10), bottom: Math.max(0, t - 10) } : { sealed: Math.max(0, Math.floor(t / 10) - 1), open: t % 10 };"],
  ['a sealed ten leaves while ones remain',"    if (!(st.open === 0 || st.explore || (s && s.kind === 'less'))) return false;", ""],
  ['past 99',                             "    if (total(st) >= MAX) return null;", "    if (total(st) >= 100) return null;"],
  ['"stayed 0" after ten more on 30',     "    if (L.kind === 'more') return { key: L.ones ? 'okMore' : 'okMoreNone', args: a };", "    if (L.kind === 'more') return { key: 'okMore', args: a };"],
  ['"0 more" on a round ten',             "    return ones ? 'hintShapeDay' : 'hintShapeDayNone';", "    return 'hintShapeDay';"],
  ['the break hint never offered',        "    if (s && s.kind === 'oneLess' && st.open === 0 && st.sealed > 0) return { key: 'hintBreak', wrong: true };", ""],
  ['a fourth step in every round',        "      if (d.extra) steps.push(", "      if (true) steps.push("],
  ['the same order twice',                "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;", ""],
  ['the trays hold 21',                   "if (st.poured >= 20) return null;", "if (st.poured >= 21) return null;"],
  ['a 0 on the empty free-play card',  "    var n = st.explore ? (total(st) || null) : st.faces.build;", "    var n = st.explore ? total(st) : st.faces.build;"],
  ['wide layout at 600',                  "    var L = { mode: W >= 640 ? 'wide' : 'narrow' };", "    var L = { mode: W >= 600 ? 'wide' : 'narrow' };"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ot-mut-'));
  fs.writeFileSync(path.join(dir, 'overflow-trays-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { OT_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-overflow-trays: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
