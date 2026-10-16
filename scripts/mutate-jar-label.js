#!/usr/bin/env node
/* =====================================================================
   mutate-jar-label.js — does verify-jar-label-core.js BITE?
   Run: node scripts/mutate-jar-label.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'jar-label-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-jar-label-core.js');
const MUTATIONS = [
  ['jar holds 25',                  "var MAX = 20, DIGITS = 2;", "var MAX = 25, DIGITS = 2;"],
  ['three digits',                  "var MAX = 20, DIGITS = 2;", "var MAX = 20, DIGITS = 3;"],
  ['a teen dropped',                "count: [0, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]", "count: [0, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20]"],
  ['zero dropped from to10',        "count: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", "count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"],
  ['toys never rotate',             "noun: nouns[(k++) % nouns.length], seed: (seed || 'jl') + ':' + range + ':c'", "noun: nouns[0], seed: (seed || 'jl') + ':' + range + ':c'"],
  ['seed ignored for nouns',        "var nouns = shuffle(NOUNS, rng((seed || 'jl') + ':nouns:' + range));", "var nouns = NOUNS.slice();"],
  ['leading zero kept',             "st.typed = (st.typed === '0') ? d : st.typed + d;", "st.typed = st.typed + d;"],
  ['typing never clears the check', "    st.typed = (st.typed === '0') ? d : st.typed + d;\n    st.checked = null;", "    st.typed = (st.typed === '0') ? d : st.typed + d;"],
  ['marks beyond the toys',         "if (st.done || st.kind !== 'count' || i < 0 || i >= st.n) return false;", "if (st.done || st.kind !== 'count' || i < 0 || i >= MAX) return false;"],
  ['marks do not toggle',           "st.marks[i] = !st.marks[i];", "st.marks[i] = true;"],
  ['the jar overfills',             "if (st.done || st.kind !== 'fill' || st.inJar >= MAX) return false; st.inJar++;", "if (st.done || st.kind !== 'fill') return false; st.inJar++;"],
  ['reversal named more',           "if (a >= 10 && rev(a) === n && a % 10 !== 0) return 'reversed';", "if (false) return 'reversed';"],
  ['lone digit named more',         "if (a >= 1 && a < 10 && n >= 10 && n % 10 === a) return 'oneDigit';", "if (false) return 'oneDigit';"],
  ['zero named fewer',              "    if (n === 0) return 'zero';\n", "\n"],
  ['more and fewer swapped',        "if (a < n) return 'more';\n    return 'fewer';", "if (a < n) return 'fewer';\n    return 'more';"],
  ['the right label does not finish', "if (res.ok) st.done = true;", "if (false) st.done = true;"],
  ['leftover count off',            "k: slip === 'more' ? st.n - a : slip === 'fewer' ? a - st.n : 0", "k: slip === 'more' ? st.n - a + 1 : slip === 'fewer' ? a - st.n : 0"],
  ['fill short named fewer',        "slip: d === 0 ? 'right' : d > 0 ? 'fillMore' : 'fillFewer'", "slip: d === 0 ? 'right' : d > 0 ? 'fillFewer' : 'fillMore'"],
  ['places lose the leftovers',     "out.push(i < Math.min(a, n) ? 'ticked' : (i < n ? 'leftover' : 'empty'));", "out.push(i < Math.min(a, n) ? 'ticked' : 'empty');"],
  ['pictures shrink on desktop',    "return { mode: 'row', cols: 5, gap: gap, padW: 0, key: key, jarW: W, jarPad: pad, cell: cell, pic: cell - gap };", "return { mode: 'row', cols: 5, gap: gap, padW: 0, key: key, jarW: W, jarPad: pad, cell: cell, pic: cell - 10 };"],
  ['five columns on a phone',       "var c = Math.floor((inner - 3 * g) / 4);\n    return { mode: 'stack', cols: 4,", "var c = Math.floor((inner - 4 * g) / 5);\n    return { mode: 'stack', cols: 5,"],
  ['a fat phone jar',               "var g = 2, jp = 6, inner = W - 2 * jp;", "var g = 2, jp = 16, inner = W - 2 * jp;"],
  ['desktop cell uncapped',         "var cell = Math.min(112, Math.floor((innerW - 4 * gap) / 5));", "var cell = Math.floor((innerW - 4 * gap) / 5);"],
  ['keys below the tap floor',      "var key = Math.min(52, Math.floor((W - 10 * 4) / 11));", "var key = Math.min(40, Math.floor((W - 10 * 4) / 11));"],
  ['loose jar everywhere',          "if (shown(st) > LOOSE_MAX) return { x: 0, y: 0 };", "if (false) return { x: 0, y: 0 };"],
  ['no jitter at all',              "var JITTER = 0.07;", "var JITTER = 0;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jl-mut-'));
  fs.writeFileSync(path.join(dir, 'jar-label-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { JL_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-jar-label: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
