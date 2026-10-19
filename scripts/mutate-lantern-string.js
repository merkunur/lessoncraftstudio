#!/usr/bin/env node
/* =====================================================================
   mutate-lantern-string.js — does verify-lantern-string-core.js BITE?
   Run: node scripts/mutate-lantern-string.js — every mutation must be
   KILLED; a missed needle is a harness fault, never a skip. CRLF collapsed.
   120 s cap. The first eleven are the design's list (§12); the rest guard
   the light past the end, the help, the order and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'lantern-string-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-lantern-string-core.js');
const MUTATIONS = [
  /* the design's list */
  ['meet accepted at a + b = n ± 1',      "    if (s === len) return { result: 'meet', k: 0 };", "    if (Math.abs(s - len) <= 1) return { result: 'meet', k: 0 };"],
  ['the cross count off by one',          "return s > len ? { result: 'cross', k: s - len }", "return s > len ? { result: 'cross', k: s - len + 1 }"],
  ['the dark bulbs drawn lit',            "      out.push(L && R ? 'twice' : L ? 'left' : R ? 'right' : 'dark');", "      out.push(L && R ? 'twice' : L ? 'left' : 'right');"],
  ['a board missing one pair',            "      { kind: 'pair', n: 8, cards: [1, 7, 2, 6, 3, 5, 4, 4] },", "      { kind: 'pair', n: 8, cards: [1, 7, 2, 6, 3, 5] },"],
  ['a duplicate pair on a board',         "      { kind: 'pair', n: 7, cards: [1, 6, 2, 5, 3, 4] },", "      { kind: 'pair', n: 7, cards: [1, 6, 2, 5, 2, 5] },"],
  ['a found pair found again',            "    if (!c || c.found) return { act: 'locked' };", "    if (!c) return { act: 'locked' };"],
  ['a MISSING tray without the answer',   "      { kind: 'missing', n: 9, given: 2, tray: [5, 6, 7, 8] },", "      { kind: 'missing', n: 9, given: 2, tray: [3, 4, 5, 6] },"],
  ['a 0 card',                            "      { kind: 'pair', n: 5, cards: [1, 4, 2, 3] },", "      { kind: 'pair', n: 5, cards: [0, 5, 1, 4, 2, 3] },"],
  ['answers always in slot 1',            "      { kind: 'missing', n: 10, given: 1, tray: [6, 7, 8, 9] },", "      { kind: 'missing', n: 10, given: 1, tray: [9, 10, 11, 12] },"],
  ['the help stays after a move',         "  function moved(st) { st.help = 0; st.last = null; }", "  function moved(st) { st.last = null; }"],
  ['the left light from the bigger card', "    var a = card(st, st.left).v, b = card(st, st.right).v, t = light(a, b, st.n);", "    var a = Math.max(card(st, st.left).v, card(st, st.right).v), b = Math.min(card(st, st.left).v, card(st, st.right).v), t = light(a, b, st.n);"],
  /* the light past the end, the marks */
  ['nothing runs past the end',           "  function over(a, b, len) { return { pastL: Math.max(0, (b || 0) - len), pastR: Math.max(0, (a || 0) - len) }; }", "  function over(a, b, len) { return { pastL: 0, pastR: 0 }; }"],
  ['the marks miss the spilled bulbs',    "    for (var q = 0; q < o.pastR; q++) m.pastR.push(++c);", "    for (var q = 0; q < o.pastR; q++) m.pastR.push('');"],
  ['the marks count from 2',             "o = over(a, b, len), c = 0,", "o = over(a, b, len), c = 1,"],
  /* the rounds */
  ['WHOLE judged by any length',          "      res = { result: t.result, k: t.k, a: p[0], b: p[1] };\n      if (t.result === 'meet')", "      res = { result: t.result, k: t.k, a: p[0], b: p[1] };\n      if (t.result !== 'cross')"],
  ['a WHOLE string of 1',                 "if (!(v >= 2 && v <= 10)) return false;", "if (!(v >= 1 && v <= 10)) return false;"],
  ['an empty Light it is a miss',         "    if (st.kind === 'missing' && p[1] == null) res = { result: 'empty' };", "    if (st.kind === 'missing' && p[1] == null) { res = { result: 'empty', miss: true }; st.misses++; st.help = Math.min(2, st.misses); }"],
  ['the first card unplugs on a 2nd miss',"      if (st.help < 2) st.left = null;", "      st.left = null;"],
  ['the board ends after one pair',       "      if (st.cards.every(function (c) { return c.found; })) { st.done = true; res.complete = true; }", "      { st.done = true; res.complete = true; }"],
  ['MISSING given plugged right',         "    var L = st.kind === 'missing' ? st.given : (st.left ? card(st, st.left).v : null);", "    var L = st.left ? card(st, st.left).v : null;"],
  ['"every way" on a partial board',      "r.all = r.pairs === Math.floor(x.n / 2);", "r.all = true;"],
  /* the help */
  ['the bracket the wrong size',          "    return { from: p[0], to: st.n, count: st.n - p[0] };", "    return { from: p[0], to: st.n, count: st.n - p[0] + 1 };"],
  ['the ghost writes the answer',         "    for (var i = 0; i < st.n; i++) out.push(i === st.n - 1 ? '?' : i + 1);", "    for (var i = 0; i < st.n; i++) out.push(i + 1);"],
  ['the plural key for 1 bulb',           "    return { key: L.k === 1 ? 'hintShort1' : 'hintShort', k: L.k, wrong: true };", "    return { key: 'hintShort', k: L.k, wrong: true };"],
  ['too short and too long swapped',      "return { key: L.result === 'cross' ? (L.k === 1 ? 'hintWholeCross1' : 'hintWholeCross') : (L.k === 1 ? 'hintWholeShort1' : 'hintWholeShort'), k: L.k, wrong: true };", "return { key: L.result === 'short' ? (L.k === 1 ? 'hintWholeCross1' : 'hintWholeCross') : (L.k === 1 ? 'hintWholeShort1' : 'hintWholeShort'), k: L.k, wrong: true };"],
  /* the order + the layout */
  ['a pass may open on any kind',         "        if (L === 0 && (x === lastPrev || pool[x].kind !== 'pair')) continue;", "        if (L === 0 && x === lastPrev) continue;"],
  ['two WHOLE side by side',              "        if (L > 0 && pool[x].kind === 'whole' && pool[seq[L - 1]].kind === 'whole') continue;\n", "\n"],
  ['the same order twice',                "      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));", "      if (seq.length === n) return true;"],
  ['partners laid side by side',         "      if (!sorted || a.length < 2) return a;", "      return values.slice();"],
  ['a board in counting order',           "      if (!sorted || a.length < 2) return a;", "      return a.sort(function (x, y) { return x - y; });"],
  ['the string overflows the stage',      "L.bulb = Math.max(18, Math.min(wide ? 44 : 34, Math.floor((W - 2 * L.socket - 16 - five - (n - 1) * sp) / n)));", "L.bulb = Math.max(18, wide ? 44 : 34);"],
  ['phone cards below 56',                "var cw = Math.max(52, Math.min(60, Math.floor((W - 32) / 5)));", "var cw = 52;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-mut-'));
  fs.writeFileSync(path.join(dir, 'lantern-string-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LS_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-lantern-string: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
