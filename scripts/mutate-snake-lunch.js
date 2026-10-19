#!/usr/bin/env node
/* =====================================================================
   mutate-snake-lunch.js — does verify-snake-lunch-core.js BITE?
   Run: node scripts/mutate-snake-lunch.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 60 s cap.
   The first fourteen are the design's list (§12); the rest guard the
   hints, the help, the order and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'snake-lunch-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-snake-lunch-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the lid shuts at Σ ≥ n',              "function lid(st) { var f = filled(st); return f === st.n ? 'shut' : f < st.n ? 'gap' : 'bonk'; }", "function lid(st) { var f = filled(st); return f >= st.n ? 'shut' : 'gap'; }"],
  ['the lid shuts at Σ ≤ n',              "function lid(st) { var f = filled(st); return f === st.n ? 'shut' : f < st.n ? 'gap' : 'bonk'; }", "function lid(st) { var f = filled(st); return f <= st.n && f > 0 ? 'shut' : 'bonk'; }"],
  ['the feed with the lid open',          "    else if (l === 'gap') res = { ok: false, reason: 'gap' };\n", "\n"],
  ['order-sensitive lunches',             "function wayKey(parts) { return parts.slice().sort(function (a, b) { return b - a; }).join('+'); }", "function wayKey(parts) { return parts.join('+'); }"],
  ['a locked strand removable',           "    if (s.locked) return 'locked';\n    s.at = 'wall';", "    s.at = 'wall';"],
  ['EXACTLY K ignores k',                 "    else if (st.kind === 'exact' && inBox(st).length !== st.k) res = miss(st, { reason: 'clips', k: st.k, have: inBox(st).length });\n", "\n"],
  ['a repeated lunch banked',             "    else if (st.ways.indexOf(wayKey(parts(st))) >= 0) res = miss(st, { reason: 'repeat', key: wayKey(parts(st)) });\n", "\n"],
  ['WHAT DID accepts ± 1',                "      else if (st.cloud !== st.n) res = miss(st, { reason: 'cloud' });", "      else if (Math.abs(st.cloud - st.n) > 1) res = miss(st, { reason: 'cloud' });"],
  ['the overflow drawn as 0',             "    return { inside: out.slice(0, st.n), over: out.slice(st.n) };", "    return { inside: out.slice(0, st.n), over: [] };"],
  ['a vacuous FINISH WITH TWO wall',     "      { kind: 'finish', n: 10, locked: [6], wall: [1, 2, 2, 3, 4] },", "      { kind: 'finish', n: 10, locked: [6], wall: [1, 2, 2, 3] },"],
  ['a vacuous EXACTLY K wall',            "      { kind: 'exact', n: 10, k: 3, wall: [2, 3, 3, 4, 4, 6] },", "      { kind: 'exact', n: 10, k: 3, wall: [2, 3, 3, 4, 4] },"],
  ['a 0-strand on a wall',                "      { kind: 'only', n: 10, wall: [3, 3, 4, 6, 7] },", "      { kind: 'only', n: 10, wall: [0, 3, 4, 6, 7] },"],
  ['the help stays after a move',         "function moved(st) { st.help = 0; st.last = null; st.lidTries = 0; }", "function moved(st) { st.last = null; st.lidTries = 0; }"],
  ['the pegs never move',                 "    shuffle(r.wall, rand).forEach(function (k) { add(k, 'wall', false); });", "    r.wall.forEach(function (k) { add(k, 'wall', false); });"],
  ['the log in drop order',               "  function parts(st) { return inBox(st).map(function (s) { return s.k; }).sort(function (a, b) { return b - a; }); }", "  function parts(st) { return inBox(st).map(function (s) { return s.k; }); }"],
  /* the rules */
  ['FINISH ignores the two',              "    else if (st.kind === 'finish' && added(st).length !== 2) res = miss(st, { reason: 'clips', k: 2, have: added(st).length });\n", "\n"],
  ['a bonk fed',                          "    else if (l === 'bonk') res = { ok: false, reason: 'bonk' };\n", "\n"],
  ['an empty Check is a miss',            "    } else if (!filled(st) || (l === 'gap' && !added(st).length && st.kind !== 'toofull')) res = { ok: false, reason: 'empty' };", "    } else if (!filled(st) || (l === 'gap' && !added(st).length && st.kind !== 'toofull')) res = miss(st, { reason: 'empty' });"],
  ['one lunch ends a two-way round',      "      r.need = (x.kind === 'any' || x.kind === 'two') ? 2 : 1;", "      r.need = 1;"],
  ['the box not emptied after a lunch',   "    else clearBox(st);\n", "\n"],
  ['the strands in a WHAT DID box move',  "    if (st.done || st.kind === 'whatdid') return 'locked';", "    if (st.done) return 'locked';"],
  ['the cloud takes 1',                   "if (!(v >= 2 && v <= cloudRange(st))) return false;", "if (!(v >= 1 && v <= cloudRange(st))) return false;"],
  ['a wrong HALF PACKED answer table',    "      { kind: 'half', n: 7, locked: [4], wall: [2, 3, 5, 6] },", "      { kind: 'half', n: 7, locked: [4], wall: [1, 2, 3, 5, 6] },"],
  /* the help */
  ['count on after one try',              "if (st.lidTries >= 3) st.help = Math.max(st.help, 1); st.last = { ok: false, reason: l === 'gap' ? (filled(st) ? 'gap' : 'empty') : 'bonk', countOn: st.lidTries >= 3 };", "if (st.lidTries >= 1) st.help = Math.max(st.help, 1); st.last = { ok: false, reason: l === 'gap' ? (filled(st) ? 'gap' : 'empty') : 'bonk', countOn: st.lidTries >= 1 };"],
  ['count on from 1',                     "    for (var i = f; i < st.n; i++) out.push(i + 1);", "    for (var i = f; i < st.n; i++) out.push(i - f + 1);"],
  ['the help lights one strand',          "      wallLeft.forEach(function (s) { var i = need.indexOf(s.k); if (i >= 0) { need.splice(i, 1); out[s.id] = true; } });", "      wallLeft.slice(0, 1).forEach(function (s) { var i = need.indexOf(s.k); if (i >= 0) { need.splice(i, 1); out[s.id] = true; } });"],
  ['WHAT DID numbers write the answer',   "    for (var i = 0; i < st.n; i++) out.push(i === st.n - 1 ? '?' : i + 1);", "    for (var i = 0; i < st.n; i++) out.push(i + 1);"],
  ['"a whole new way" never asked',       "more: st.kind === 'any' && !st.done ? 'promptAgain' : null };", "more: null };"],
  /* the order + the snake + the layout */
  ['a pass may open on any kind',         "        if (L === 0 && (x === lastPrev || pool[x].kind !== 'any')) continue;", "        if (L === 0 && x === lastPrev) continue;"],
  ['two TOO FULL side by side',           "        if (L > 0 && lonely(pool[x]) && pool[seq[L - 1]].kind === pool[x].kind) continue;\n", "\n"],
  ['the snake does not turn',             "  function cupPos(i) { var row = Math.floor(i / 5), c = i % 5; return { row: row, col: row % 2 ? 4 - c : c }; }", "  function cupPos(i) { var row = Math.floor(i / 5), c = i % 5; return { row: row, col: c }; }"],
  ['desktop cups below 96',               "      L.right = 120; L.gap = 12;", "      L.right = 140; L.gap = 12;"],
  ['phone faces below 64',                "      L.face = W >= 326 ? 64 : 56;", "      L.face = 56;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sl-mut-'));
  fs.writeFileSync(path.join(dir, 'snake-lunch-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SL_CORE_DIR: dir }), timeout: 60000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-snake-lunch: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
