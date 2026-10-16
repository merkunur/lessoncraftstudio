#!/usr/bin/env node
/* =====================================================================
   mutate-fruit-crates.js — does verify-fruit-crates-core.js BITE?
   Run: node scripts/mutate-fruit-crates.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'fruit-crates-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-fruit-crates-core.js');
const MUTATIONS = [
  ['three digits',                  "var MAX = 20, DIGITS = 2, CRATE = 10, LINE = 5;", "var MAX = 20, DIGITS = 3, CRATE = 10, LINE = 5;"],
  ['crates of eight',               "var MAX = 20, DIGITS = 2, CRATE = 10, LINE = 5;", "var MAX = 20, DIGITS = 2, CRATE = 8, LINE = 4;"],
  ['a teen dropped',                "to20: [0, 3, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]", "to20: [0, 3, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20]"],
  ['zero dropped from to10',        "to10: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", "to10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"],
  ['a cut fruit slips in',          "'pineapple', 'cherry'];", "'pineapple', 'watermelon'];"],
  ['one fruit for every round',     "noun: nouns[i % nouns.length]", "noun: nouns[0]"],
  ['seed ignored for fruit',        "var nouns = shuffle(NOUNS, rng((seed || 'fc') + ':nouns:' + range));", "var nouns = NOUNS.slice();"],
  ['to 10 gets two crates',         "function crates(range) { return range === 'to10' ? 1 : 2; }", "function crates(range) { return 2; }"],
  ['leading zero kept',             "st.typed = (st.typed === '0') ? d : st.typed + d;", "st.typed = st.typed + d;"],
  ['erase empties the slate',       "st.typed = st.typed.slice(0, -1); return true;", "st.typed = ''; return true;"],
  ['typing after done',             "  function typeDigit(st, d) {\n    if (st.done) return false;", "  function typeDigit(st, d) {"],
  ['reversal named more',           "if (a >= 10 && a % 10 !== 0 && rev(a) === n) return 'reversed';", "if (false) return 'reversed';"],
  ['round tens called reversed',    "if (a >= 10 && a % 10 !== 0 && rev(a) === n) return 'reversed';", "if (a >= 10 && rev(a) === n) return 'reversed';"],
  ['lone digit named more',         "if (a >= 1 && a <= 9 && n >= 10 && n % 10 === a) return 'oneDigit';", "if (false) return 'oneDigit';"],
  ['zero is a lone digit',          "if (a >= 1 && a <= 9 && n >= 10 && n % 10 === a) return 'oneDigit';", "if (a <= 9 && n >= 10 && n % 10 === a) return 'oneDigit';"],
  ['tens-only never named',         "if (a === 10 && n > 10) return 'tensOnly';", "if (false) return 'tensOnly';"],
  ['zero named fewer',              "    if (n === 0) return 'zero';\n", "\n"],
  ['more and fewer swapped',        "return a < n ? 'more' : 'fewer';", "return a < n ? 'fewer' : 'more';"],
  ['an empty Check is a miss',      "if (!res.ok && slip !== 'none') st.misses++;", "if (!res.ok) st.misses++;"],
  ['misses never counted',          "if (!res.ok && slip !== 'none') st.misses++;", "if (false) st.misses++;"],
  ['the right number does not finish', "if (res.ok) st.done = true;", "if (false) st.done = true;"],
  ['help on the first miss is count-on', "    if (st.misses >= 2) return 2;", "    if (st.misses >= 1) return 2;"],
  ['help never reaches count-on',   "    if (st.misses >= 2) return 2;", "    if (st.misses >= 9) return 2;"],
  ['zero climbs the ladder',        "if (st.done || st.misses === 0 || st.n === 0) return 0;", "if (st.done || st.misses === 0) return 0;"],
  ['the landmark at n shows',       "if (LANDMARKS[i] < n) L = LANDMARKS[i];", "if (LANDMARKS[i] <= n) L = LANDMARKS[i];"],
  ['the help writes the answer',    "for (i = L; i < n - 1; i++) out[i] = i + 1; out[n - 1] = '?';", "for (i = L; i < n; i++) out[i] = i + 1;"],
  ['count-on from one always',      "for (i = L; i < n - 1; i++) out[i] = i + 1; out[n - 1] = '?';", "for (i = 0; i < n - 1; i++) out[i] = i + 1; out[n - 1] = '?';"],
  ['landmarks shown at n',          "if (LANDMARKS.indexOf(i + 1) >= 0 && i + 1 < n) out[i] = i + 1;", "if (LANDMARKS.indexOf(i + 1) >= 0) out[i] = i + 1;"],
  ['done shows no number',          "      if (n > 0) out[n - 1] = n;\n", "\n"],
  ['count-on hint never said',      "    if (lv === 2) return 'hintCountOn';", "    if (false) return 'hintCountOn';"],
  ['recount and count-on mixed',    "if (lv === 0) return slip === 'more' ? 'hintRecountMore' : 'hintRecountFewer';", "if (lv === 0) return slip === 'more' ? 'hintMore' : 'hintFewer';"],
  ['frame order by columns',        "line: Math.floor(j / LINE), pos: j % LINE", "line: j % 2, pos: Math.floor(j / 2)"],
  ['desktop boxes stop filling',    "var boxW = Math.min(150, Math.floor((W - 2 * FRAME - 4 * GAP) / 5)), box = Math.min(104, boxW);", "var boxW = Math.min(104, Math.floor((W - 2 * FRAME - 4 * GAP) / 5)), box = Math.min(104, boxW);"],
  ['desktop fruit uncapped',        "box = Math.min(104, boxW);", "box = boxW;"],
  ['keys below the tap floor',      "var key = inline ? Math.min(52, Math.floor((W - SLATE - 12 - 10 * 4) / 11))", "var key = inline ? Math.min(40, Math.floor((W - SLATE - 12 - 10 * 4) / 11))"],
  ['slate inline too early',        "var inline = W >= SLATE + 12 + 11 * 44 + 10 * 4;", "var inline = W >= 560;"],
  ['phone fruit uncapped',          "var b = Math.min(bw, nCrates === 1 ? 84 : 68);", "var b = bw;"],
  ['a fat phone frame',             "var fr = 5, g = 2, between = 8;", "var fr = 12, g = 2, between = 8;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-mut-'));
  fs.writeFileSync(path.join(dir, 'fruit-crates-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { FC_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-fruit-crates: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
