#!/usr/bin/env node
/* =====================================================================
   mutate-spring-switch.js — does verify-spring-switch-core.js BITE?
   Run: node scripts/mutate-spring-switch.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   The first ten are the design's list (§12); the rest guard the hints,
   the help, the order and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'spring-switch-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-spring-switch-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a crate ignores the switch',         "    var side = st.sealed ? openSide(st) : st.sw;", "    var side = st.sealed ? openSide(st) : 'L';"],
  ['back up loses a crate',              "    st.hill += st.L + st.R; st.L = 0; st.R = 0;", "    st.hill += Math.max(0, st.L + st.R - 1); st.L = 0; st.R = 0;"],
  ['a repeated way banked',              "        if (st.found.indexOf(key) >= 0) {", "        if (false) {"],
  ['a plate that mismatches banked',     "      else if (st.plate.a !== st.L) res = miss(st, { reason: 'wrongL', side: 'L' });\n", "\n"],
  ['an empty car allowed',               "      else if (!st.L || !st.R) res = { ok: false, reason: 'oneEmpty', side: st.L ? 'R' : 'L' };\n", "\n"],
  ['the hidden crates counted twice',    "var a = side === 'L' ? open : st.sealed.k, b = side === 'L' ? st.sealed.k : open;", "var a = side === 'L' ? open + st.sealed.k : st.sealed.k, b = side === 'L' ? st.sealed.k : open + st.sealed.k;"],
  ['Make ten repeats a sealed value',    "['sealed', 10, 9, 1, 'L']", "['sealed', 10, 7, 3, 'L']"],
  ['the mirror banks without the coupler', "    st.hill = 0; st.L = m.b; st.R = m.a; moved(st);", "    st.hill = 0; st.L = m.b; st.R = m.a; st.found.push(m.b + '+' + m.a); moved(st);"],
  ['the equation auto-printed',          "    st.plate[box] = v; moved(st);", "    st.plate[box] = v; if (st.kind === 'all') { st.plate.a = st.L; st.plate.b = st.R; } moved(st);"],
  ['the switch unlocked in sealed rounds', "    if (st.done || st.sealed || st.kind === 'backup') return false;", "    if (st.done || st.kind === 'backup') return false;"],
  /* the coupler */
  ['crates on the hill accepted',        "      else if (st.hill > 0) res = { ok: false, reason: 'hill' };\n", "\n"],
  ['an empty Check is a miss',           "      if (!st.L && !st.R) res = { ok: false, reason: 'empty' };", "      if (!st.L && !st.R) res = miss(st, { reason: 'empty' });"],
  ['the right part unchecked',           "      else if (st.plate.b !== st.R) res = miss(st, { reason: 'wrongR', side: 'R' });\n", "\n"],
  ['done one way early',                 "          if (st.found.length >= st.need) { st.done = true; res.complete = true; }", "          if (st.found.length >= st.need - 1) { st.done = true; res.complete = true; }"],
  ['sealed: any amount accepted',        "      else if (open !== want) res = miss(st, { reason: 'sealedWrong', side: side, more: open < want });\n", "\n"],
  ['sealed: the dial unchecked',         "      else if (st.plate[box] !== open) res = miss(st, { reason: side === 'L' ? 'wrongL' : 'wrongR', side: side });\n", "\n"],
  ['back up rounds skip the back up',    "      if (!st.backed) res = { ok: false, reason: 'backFirst' };\n      else if", "      if"],
  ['the whole unchecked',                "      else if (st.plate.w !== st.a + st.b) res = miss(st, { reason: 'wrongWhole' });\n", "\n"],
  ['the wagon gives the sealed answer away', "      st.hill = WAGON;", "      st.hill = r.n - r.k;"],
  ['banking keeps the parts',            "function clearParts(st) { if (st.kind === 'all') { st.plate.a = null; st.plate.b = null; } }", "function clearParts(st) { }"],
  ['the mirror of a double',             "    return m.a !== m.b && st.found.indexOf(m.b + '+' + m.a) < 0", "    return st.found.indexOf(m.b + '+' + m.a) < 0 || m.a === m.b"],
  ['the Make-ten book not kept',         "        if (st.tenBook && st.tenBook.indexOf(a + '+' + b) < 0) st.tenBook.push(a + '+' + b);\n", "\n"],
  /* the help */
  ['a move keeps the help',              "function moved(st) { st.help = 0; st.last = null; }", "function moved(st) { st.last = null; }"],
  ['the help writes the count',          "for (i = 0; i < m; i++) out[L.side].push(i === m - 1 ? '?' : i + 1);", "for (i = 0; i < m; i++) out[L.side].push(i + 1);"],
  ['numbers on the first miss',          "    if (st.explore || st.done || st.help < 2 || !st.last) return out;", "    if (st.explore || st.done || st.help < 1 || !st.last) return out;"],
  ['count on from 1, not k',             "for (i = 0; i < st.n - st.sealed.k; i++) out.slots.push(st.sealed.k + i + 1);", "for (i = 0; i < st.n - st.sealed.k; i++) out.slots.push(i + 1);"],
  ['the wrong count-on hint',            "return { key: st.help >= 2 ? 'hintCountOn' : 'hintTogether',", "return { key: 'hintTogether',"],
  /* the order */
  ['a pass may open on a sealed round',  "        if (L === 0 && hasAll && pool[x].kind !== 'all') continue;\n", "\n"],
  ['three of one kind in a row',         "        if (L > 1 && tag(pool[seq[L - 1]]) === tag(pool[x]) && tag(pool[seq[L - 2]]) === tag(pool[x])) continue;\n", "\n"],
  ['the same order twice',               "      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));", "      if (seq.length === n) return true;"],
  /* the layout */
  ['phone levers below 44',              "      L.train = 64; L.lever = 52;", "      L.train = 64; L.lever = 40;"],
  ['desktop train below 96',             "      L.train = 96; L.lever = 64;", "      L.train = 84; L.lever = 64;"],
  ['the yard ignores the column',        "      L.col = 196; L.gap = 12; L.yard = W - L.col - L.gap;", "      L.col = 196; L.gap = 12; L.yard = W - L.gap;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sw-mut-'));
  fs.writeFileSync(path.join(dir, 'spring-switch-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { SW_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-spring-switch: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
