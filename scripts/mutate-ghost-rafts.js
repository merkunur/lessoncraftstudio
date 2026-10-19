#!/usr/bin/env node
/* =====================================================================
   mutate-ghost-rafts.js — does verify-ghost-rafts-core.js BITE?
   Run: node scripts/mutate-ghost-rafts.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 120 s
   cap. The first eleven are the design's list (§12); the rest guard the
   no-miss paths, the order, the help, the deal and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'ghost-rafts-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-ghost-rafts-core.js');
const MUTATIONS = [
  /* the design's list */
  ['seal at 9',                            "    if (st.tank.seats === 10) return seal(st);", "    if (st.tank.seats === 9) return seal(st);"],
  ['pop loses a bubble',                   "    st.tank.raft = 0; st.tank.loose += 10; st.popped = true;", "    st.tank.raft = 0; st.tank.loose += 9; st.popped = true;"],
  ['the ghost of 41 is 1 raft + 4',        "  function ghostOf(m) { return { rafts: Math.floor(m / 10), ones: m % 10 }; }", "  function ghostOf(m) { return { rafts: m % 10, ones: Math.floor(m / 10) }; }"],
  ['the reversal accepted',                "    if (m === st.n) {", "    if (m === st.n || m === (st.n % 10) * 10 + Math.floor(st.n / 10)) {"],
  ['a second raft for teens',              "    if (st.tank.raft || st.tank.seats) return { refused: 'oneTen' };\n", ""],
  ['the right card always in slot 1',      "      slots[seq[j]] = right;", "      slots[0] = right;"],
  ['every decoy a reversal',               "{ kind: 'pop', n: 12, cards: [12, 2, 10] }", "{ kind: 'pop', n: 12, cards: [12, 21, 10] }"],
  ['two tanks with different rafts',       "{ kind: 'two', a: 13, b: 18, bigLeft: false }", "{ kind: 'two', a: 13, b: 28, bigLeft: false }"],
  ['the success sentence from the card',   "    return { key: st.kind === 'pop' ? 'okPop' : 'okMake', args: { n: st.n, k: st.n - 10 } };", "    return { key: st.kind === 'pop' ? 'okPop' : 'okMake', args: { n: st.pick || st.n, k: (st.pick || st.n) - 9 } };"],
  ['the drift too fast to catch',          "  var WANDER = 8, BOB_A = 3, BOB_W = 1.2;", "  var WANDER = 30, BOB_A = 3, BOB_W = 1.2;"],
  ['the leftovers keep drifting',          "  function seal(st) { st.tank.raft = 1; st.tank.seats = 0; st.tank.tow += st.tank.loose; st.tank.loose = 0; return { sealed: true }; }", "  function seal(st) { st.tank.raft = 1; st.tank.seats = 0; return { sealed: true }; }"],
  /* the rules */
  ['a card before the ten is a miss',      "    if (!ready(st)) { st.last = { result: 'notyet' }; return st.last; }\n", ""],
  ['an empty Check is a miss',             "    if (st.kind === 'dock' && v === 0) { st.last = { result: 'empty' }; return st.last; }\n", ""],
  ['a pass opens on any round',            "      if (pool[a[0]].kind !== 'catch') continue;\n", ""],
  ['the same order twice',                 "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;\n", ""],
  ['a catch round\'s raft pops',           "    if (st.done || !st.tank.raft || !(st.kind === 'pop' || st.explore)) return null;", "    if (st.done || !st.tank.raft) return null;"],
  ['no counting on at miss 2',             "    if (st.help >= 2) return { key: st.kind === 'pop' ? 'hintTenLoose' : 'hintOneTen', k: st.n - 10, wrong: true };\n", ""],
  ['the coin never swaps',                 "    var out = { slots: {}, swap: rand() < 0.5 };", "    var out = { slots: {}, swap: false };"],
  ['a stale deal accepted',                "opts.slots && opts.slots.slice().sort(num).join() === r.cards.slice().sort(num).join() ? opts.slots : r.cards", "opts.slots ? opts.slots : r.cards"],
  ['the pairing glows at miss 1',          "    return { rows: [st.two[0] - 10, st.two[1] - 10], glow: st.help >= 2 };", "    return { rows: [st.two[0] - 10, st.two[1] - 10], glow: st.help >= 1 };"],
  ['the missing place counted backwards',  "missing: Math.max(0, want - have), extra: Math.max(0, have - want)", "missing: Math.max(0, have - want), extra: Math.max(0, want - have)"],
  ['a bubble under the tap floor',         "    L.bubble = 46;", "    L.bubble = 40;"],
  ['seats too big for a phone',            "Math.max(32, Math.min(42, Math.floor((L.tankW - L.duck - 22 - 4 * 4 - 12 - 4) / 5)))", "Math.max(32, Math.min(48, Math.floor((L.tankW - L.duck - 4 * 4 - 12) / 5)))"],
  ['the wide layout too early',            "    var wide = W >= 600;", "    var wide = W >= 540;"],
  ['the help stays after a move',          "  function moved(st) { st.help = 0; st.last = null; st.ghost = null; st.pick = null; }", "  function moved(st) { st.last = null; st.ghost = null; st.pick = null; }"],
  ['the tank holds 20',                    "var SPARE = 9, TANK_MAX = 19,", "var SPARE = 9, TANK_MAX = 20,"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gr-mut-'));
  fs.writeFileSync(path.join(dir, 'ghost-rafts-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { GR_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-ghost-rafts: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
