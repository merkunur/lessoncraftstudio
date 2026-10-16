#!/usr/bin/env node
/* =====================================================================
   mutate-letterbox.js — does verify-letterbox-core.js BITE?
   Run: node scripts/mutate-letterbox.js — every mutation must be KILLED;
   a missed needle is a harness fault, never a skip. CRLF collapsed. 30 s cap.
   The two instruments the core loads (number-trace-core, stroke-trace-core)
   are copied beside the doctored core so it resolves them from the tmp dir.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MINI, 'letterbox-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-letterbox-core.js');
const MUTATIONS = [
  ['four houses',                    "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 2;", "var HOUSES = 4, LETTERS = 3, HELP_AFTER = 2;"],
  ['two letters',                    "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 2;", "var HOUSES = 5, LETTERS = 2, HELP_AFTER = 2;"],
  ['help never comes',               "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 2;", "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 200;"],
  ['help at the first miss',         "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 2;", "var HOUSES = 5, LETTERS = 3, HELP_AFTER = 1;"],
  ['a letter dropped from the pool', "[2, 5, 7], [4, 9, 6], [0, 8, 3], [1, 10, 12]", "[2, 5, 7], [4, 9, 6], [0, 8, 3], [1, 10, 10]"],
  ['to10 pool reads to 99',          "var MAXN = { to20: 99, to10: 10 };", "var MAXN = { to20: 99, to10: 99 };"],
  ['no reversal lure',               "if (n % 10 !== 0 && n !== 11) push(strong, rev(n));", "if (false) push(strong, rev(n));"],
  ['reversal never named',           "if (tn && th && rev(n) === h && n % 10 !== 0) return 'reversed';", "if (false) return 'reversed';"],
  ['lone digit named off',           "if (tn && !th && h === n % 10) return 'oneDigit';", "if (false) return 'oneDigit';"],
  ['teen of a digit named off',      "if (!tn && th && h % 10 === n && n !== 0) return 'twoDigits';", "if (false) return 'twoDigits';"],
  ['same tens named off',            "return 'lastDigit';", "return 'off';"],
  ['look-alike named off',           "if (!tn && !th && LOOKALIKE[n] === h) return 'shape';", "if (false) return 'shape';"],
  ['a look-alike pair dropped',      "0: 8, 4: 9 };", "0: 8 };"],
  ['houses not shuffled',            "var houses = shuffle(letters.concat(lures(letters, max, (POLICY[range] || [])[i])), r);", "var houses = letters.concat(lures(letters, max, (POLICY[range] || [])[i]));"],
  ['residents repeat',               "var who = shuffle(RESIDENTS, r).slice(0, HOUSES);", "var who = [RESIDENTS[0], RESIDENTS[0], RESIDENTS[0], RESIDENTS[0], RESIDENTS[0]];"],
  ['seed ignored',                   "var letters = pool[i].slice(), r = rng((seed || 'lb') + ':' + range + ':' + i);", "var letters = pool[i].slice(), r = rng('fixed:' + range + ':' + i);"],
  ['an open door takes another letter', "    if (h.open) return { result: 'none' };\n", "\n"],
  ['the wrong door delivers',        "    if (h.n === n) {\n      h.open = true;", "    if (h.n === n || st.misses >= 1) {\n      h.open = true;"],
  ['misses not counted',             "    st.misses++;\n", "\n"],
  ['misses not reset',               "st.at++; st.misses = 0; st.help = false; st.revealed = !st.spoken;", "st.at++; st.help = false; st.revealed = !st.spoken;"],
  ['the round never ends',           "if (st.at >= st.letters.length) { st.done = true;", "if (st.at > st.letters.length) { st.done = true;"],
  ['spoken mode shows the number',   "spoken: !!opts.spoken, revealed: !opts.spoken, done: false, log: []", "spoken: !!opts.spoken, revealed: true, done: false, log: []"],
  ['the seven loses its bar',        "var strokes = NT.glyphFor(digits[i], lang);", "var strokes = NT.glyphFor(digits[i], 'en');"],
  ['six houses in a row on a phone', "if (W >= 560) { var gap = 12;", "if (W >= 200) { var gap = 12;"],
  ['houses shrink',                  "hw: Math.floor((W - (HOUSES - 1) * gap) / HOUSES) }; }", "hw: Math.floor((W - (HOUSES - 1) * gap) / HOUSES) - 30 }; }"],
  ['the resident shrinks',           "var GEOM = { h: 1.36, plateFont: 0.24, picture: 0.84 };", "var GEOM = { h: 1.36, plateFont: 0.24, picture: 0.60 };"],
  ['a lure may equal a letter',      "if (v !== undefined && letters.indexOf(v) < 0 && out.indexOf(v) < 0 && (pass === 1 || confuses(v))) return v;", "if (v !== undefined && out.indexOf(v) < 0 && (pass === 1 || confuses(v))) return v;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lb-mut-'));
  fs.writeFileSync(path.join(dir, 'letterbox-core.js'), SRC.replace(needle, repl));
  for (const dep of ['number-trace-core.js', 'stroke-trace-core.js']) fs.copyFileSync(path.join(MINI, dep), path.join(dir, dep));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LB_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-letterbox: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
