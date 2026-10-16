#!/usr/bin/env node
/* =====================================================================
   mutate-peek-window.js — does verify-peek-window-core.js BITE?
   Run: node scripts/mutate-peek-window.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'peek-window-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-peek-window-core.js');
const MUTATIONS = [
  ['a 0 round put back',            "{ n: 1, p: 'dice', theme: 'animals', noun: 'pig' },", "{ n: 0, p: 'dice', theme: 'animals', noun: 'pig' },"],
  ['a round dropped',               "      { n: 5, p: 'line', theme: 'animals', noun: 'rabbit' }\n", "\n"],
  ['the toadstool rides',           "{ n: 3, p: 'scatter', theme: 'vegetables', noun: 'tomato' },", "{ n: 3, p: 'scatter', theme: 'vegetables', noun: 'mushroom' },"],
  ['a big scatter',                 "{ n: 9, p: 'five', theme: 'fruits', noun: 'orange' },", "{ n: 9, p: 'scatter', theme: 'fruits', noun: 'orange' },"],
  ['dice four is a line',           "4: [[0, 0], [2, 0], [0, 2], [2, 2]],", "4: [[0, 0], [1, 0], [2, 0], [0, 2]],"],
  ['dice six crowded',              "6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]", "6: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]]"],
  ['scatter pictures overlap',      "3: [[0.6, 0.3], [3.3, 0.8], [1.8, 2.0]],", "3: [[0.6, 0.3], [1.2, 0.8], [1.8, 2.0]],"],
  ['five-and-more starts at five',  "if (n < 6 || n > 10) return null;", "if (n < 5 || n > 10) return null;"],
  ['the second row of five drifts', "for (i = 0; i < n - 5; i++) out.push([i, 1.5]);", "for (i = 0; i < n - 5; i++) out.push([i + 0.5, 1.5]);"],
  ['pairs off centre',              "var x0 = (BOX_W - k) / 2;", "var x0 = 0;"],
  ['odd pairs allowed',             "if (n % 2 || n < 2 || n > 10) return null;", "if (n < 2 || n > 10) return null;"],
  ['a line of six',                 "if (n < 1 || n > 5) return null; var l0", "if (n < 1 || n > 6) return null; var l0"],
  ['looking stops after one',       "function look(st) { if (!st || st.done) return false; st.looks++; return true; }", "function look(st) { if (!st || st.done || st.looks) return false; st.looks++; return true; }"],
  ['0 can be chosen',               "if (!st || st.done || a < 1 || a > st.max", "if (!st || st.done || a < 0 || a > st.max"],
  ['past the rail',                 "if (!st || st.done || a < 1 || a > st.max", "if (!st || st.done || a < 1 || a > 10"],
  ['a stale verdict',               "st.answer = a; st.checked = null; return true;", "st.answer = a; return true;"],
  ['an empty Check is a miss',      "if (res.ok) st.done = true; else if (res.slip !== 'none') st.misses++;", "if (res.ok) st.done = true; else st.misses++;"],
  ['more and fewer swapped',        "slip: a > st.n ? 'more' : 'fewer'", "slip: a > st.n ? 'fewer' : 'more'"],
  ['the window shuts after a miss', "function staysOpen(st) { return st.done || st.misses > 0; }", "function staysOpen(st) { return st.done; }"],
  ['numbers after the first miss',  "else if (lv >= 2) out.push(i === st.n - 1 ? '?' : String(i + 1));", "else if (lv >= 1) out.push(i === st.n - 1 ? '?' : String(i + 1));"],
  ['the help writes the answer',    "else if (lv >= 2) out.push(i === st.n - 1 ? '?' : String(i + 1));", "else if (lv >= 2) out.push(String(i + 1));"],
  ['the five hint everywhere',      "return st.p === 'five' ? 'hintFive' : 'hintCount';", "return 'hintFive';"],
  ['no count-on hint',              "if (st.misses >= 2) return 'hintCountOn';", "if (st.misses >= 3) return 'hintCountOn';"],
  ['done takes more',               "if (!st || st.done) return false; st.looks++", "if (!st) return false; st.looks++"],
  ['giant pictures',                "var cell = Math.min(112, Math.floor((W - 2 * (FRAME + MARGIN)) / BOX_W));", "var cell = Math.min(150, Math.floor(W / 4));"],
  ['tiny desktop pictures',         "pic: cell - 10, winW", "pic: cell - 40, winW"],
  ['tiny chips',                    "var chip = Math.min(56, Math.floor((W - (max - 1) * RAIL_GAP) / max));", "var chip = Math.min(56, Math.floor((W - (max - 1) * RAIL_GAP) / max) - 30);"],
  ['phone window too wide',         "var c2 = Math.min(84, Math.floor((W - 2 * (FRAME + MARGIN) - SIDE_GAP - railW) / BOX_H));", "var c2 = Math.min(84, Math.floor((W - 2 * FRAME) / BOX_H));"],
  ['phone not upright',             "if (L.mode === 'side') { var t = x; x = y; y = t; }", ""],
  ['side layout on desktop',        "if (W >= 560) {", "if (W >= 900) {"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-mut-'));
  fs.writeFileSync(path.join(dir, 'peek-window-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PW_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-peek-window: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
