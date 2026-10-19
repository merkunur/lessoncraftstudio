#!/usr/bin/env node
/* =====================================================================
   mutate-ten-seat-wheel.js — does verify-ten-seat-wheel-core.js BITE?
   Run: node scripts/mutate-ten-seat-wheel.js — every mutation must be
   KILLED; a missed needle is a harness fault, never a skip. CRLF collapsed.
   120 s cap. The first ten are the design's list (§12; the eleventh, seat
   colours, is the activity's CSS and lives in local-test); the rest guard
   the help, the order, the pictures and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'ten-seat-wheel-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-ten-seat-wheel-core.js');
const MUTATIONS = [
  /* the design's list */
  ['an over-call leaves the wheel full',  "      st.boarded = 0; st.extras = 0;\n      return st.explore", "      st.extras = 0;\n      return st.explore"],
  ['an over-call spins',                  "    if (st.extras > 0) {", "    if (st.extras > 0 && false) {"],
  ['full accepted at k + dial = n ± 1',   "    if (f === st.n) { res = { state: 'full' };", "    if (Math.abs(f + st.extras - st.n) <= 1) { res = { state: 'full' };"],
  ['the extras computed as 0',            "    st.extras = Math.max(0, st.dial - free(st));", "    st.extras = 0;"],
  ['no lurch (settle angle fixed)',       "    if (rest != null) st.rot = rest;", "    if (rest != null) st.rot = st.rot;"],
  ['a starting rider can be let off',     "    if (seat != null && (seat < st.k || seat >= filledCount(st))) return false;", "    if (seat != null && seat >= filledCount(st)) return false;"],
  ['WHOLE accepts a + b ± 1',             "      else if (st.hub === st.n) { res = { state: 'wholeRight' }; st.done = true; }", "      else if (Math.abs(st.hub - st.n) <= 1) { res = { state: 'wholeRight' }; st.done = true; }"],
  ['a Make 10 table with a repeated answer', "['F', 10, 8], ['F', 10, 3], ['F', 10, 1]],", "['F', 10, 8], ['F', 10, 3], ['F', 10, 3]],"],
  ['the dial starts at the answer',       "boarded: 0, dial: DIAL_START, extras: 0, hub: null, rot: Math.floor", "boarded: 0, dial: r.answer || DIAL_START, extras: 0, hub: null, rot: Math.floor"],
  ['the visible queue = the answer',      "L.queue = 3; L.qRider = 96; }", "L.queue = 3 + (W % 2); L.qRider = 96; }"],
  ['the help stays after a move',         "  function moved(st) { st.help = 0; st.last = null; }", "  function moved(st) { st.last = null; }"],
  /* the rules */
  ['the lurch puts the empty seats down', "    return norm(90 - Math.atan2(sy, sx) * 180 / Math.PI);", "    return norm(270 - Math.atan2(sy, sx) * 180 / Math.PI);"],
  ['the boarding seat not at the bottom', "    st.rot = norm(90 - filledCount(st) * step(st.n));", "    st.rot = norm(180 - filledCount(st) * step(st.n));"],
  ['an empty brake is a miss',            "    if (st.boarded === 0 && !st.explore) { res = { state: 'empty' }; st.last = res; return res; }", "    if (st.boarded === 0 && !st.explore) return miss(st, { state: 'empty' });"],
  ['an unset hub is a miss',              "      if (st.hub == null) res = { state: 'unset' };", "      if (st.hub == null) return miss(st, { state: 'unset' });"],
  ['the dial reaches 0',                  "var DIAL_START = 5, DIAL_MIN = 1,", "var DIAL_START = 5, DIAL_MIN = 0,"],
  ['a dial lower than boarded ignored',   "    st.boarded = Math.min(st.dial, free(st));", "    st.boarded = Math.max(st.boarded, Math.min(st.dial, free(st)));"],
  ['the dial ignores a let-off',          "    st.dial = Math.max(DIAL_MIN, st.boarded);", "    void 0;"],
  ['count on from 1',                     "    for (var j = 0; j < st.n; j++) out.push(j >= f ? j + 1 : '');", "    for (var j = 0; j < st.n; j++) out.push(j >= f ? j - f + 1 : '');"],
  ['the over-call arrow points up',       "    return st.last.state === 'over' ? 'down' : st.last.state === 'short' ? 'up' : null;", "    return st.last.state === 'short' || st.last.state === 'over' ? 'up' : null;"],
  ['the singular prompt never used',      "    return r.k === 1 ? base + 'One' : base;", "    return base;"],
  ['a pass may open on a WHOLE',          "        if (L === 0 && (x === lastPrev || pool[x].kind !== 'fill')) continue;", "        if (L === 0 && x === lastPrev) continue;"],
  ['two WHOLE side by side',              "        if (L > 0 && pool[x].kind === 'whole' && pool[seq[L - 1]].kind === 'whole') continue;\n", "\n"],
  ['the same order twice',                "      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));", "      if (seq.length === n) return true;"],
  ['the wheel always rests the same way', "rot: Math.floor(rand() * 3600) / 10,", "rot: 0,"],
  ['chick rides with duck',               "var PAIRS = [['chick', 'pig'], ['lamb', 'duck'],", "var PAIRS = [['chick', 'duck'], ['lamb', 'pig'],"],
  ['a picture that does not exist',       "['horse', 'turkey']];", "['horse', 'peacock']];"],
  ['gondolas overlap on phones',          "else if (W >= 300) { L.gond = { w: 70, h: 70 };", "else if (W >= 300) { L.gond = { w: 90, h: 90 };"],
  ['phone riders below 64',               "L.rider = 64; L.hub = 64;", "L.rider = 58; L.hub = 64;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tw-mut-'));
  fs.writeFileSync(path.join(dir, 'ten-seat-wheel-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TW_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-ten-seat-wheel: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
