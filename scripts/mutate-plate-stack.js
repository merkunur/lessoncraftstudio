#!/usr/bin/env node
/* =====================================================================
   mutate-plate-stack.js — does verify-plate-stack-core.js BITE?
   Run: node scripts/mutate-plate-stack.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT (never skipped); the
   gate must be green on the CLEAN core first. CRLF collapsed before
   searching. (The stand, the bench and the tray as drawn are rendering
   properties, gated by local-test-plate-stack.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'plate-stack-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'plate-stack-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-plate-stack-core.js');
const MUTATIONS = [
  ['the slot opens with one holder',             "return st.r.cls !== 'flip' && (st.holders >= 2 ||", "return st.r.cls !== 'flip' && (st.holders >= 1 ||"],
  ['an ending seats with one holder',            "    if (st.holders < 2) return { seated: false, reason: 'one' };              /* the slot is shut with one */\n", ""],
  ['an ending seats on a word that changes',     "    if (st.r.cls === 'flip') return { seated: false, reason: 'changes' };     /* no slot: this word changes inside */\n", ""],
  ['the flip tile changes a regular word',       "      if (st.r.cls !== 'flip') return { seated: false, reason: 'nochange' };    /* the card turns all the way round and comes back the same */\n", ""],
  ['back to one accepts the ending left on',     "if (r.cls === 'flip' ? st.flipped : (!!st.tile || st.typed.length > 0)) reason = 'stillOn';", "if (false) reason = 'stillOn';"],
  ['an empty Check counts as a miss',            "    if (sig(st) === st.at0) {", "    if (false) {"],
  ['the right tile always in slot 1',            "var slot = SLOTS[idx % 9], tray", "var slot = 0, tray"],
  ['the count ignored',                          "    if (st.holders !== r.target) reason = 'count';\n    else if (r.back)", "    if (r.back)"],
  ['the last holder leaves',                     "if (st.done || st.holders <= 1) return false; st.holders--;", "if (st.done || st.holders <= 0) return false; st.holders--;"],
  ['back to one drops the ending by itself',     "st.holders--; clear(st); return { rattle:", "st.holders--; st.tile = null; clear(st); return { rattle:"],
  ['pt sentence says dois/duas',                 "    if (level === 'l5' && loc === 'pt' && n === 2) n = 3;\n", ""],
  ['the glow on the first miss',                 "st.help = Math.min(2, st.tries);", "st.help = Math.min(2, st.tries + 1);"],
  ['writing with one holder',                    "if (st.holders < 2 || st.typed.length >= 3) return false;", "if (st.typed.length >= 3) return false;"],
  ['the other tile is the right one again',      "var other = w.pEnd !== A ? A : B; if (other === w.pEnd) other = B === A ? A : B;", "var other = A;"],
  ['the singular\'s vowel stays in the open slot', "    return open(st) ? '' : null;", "    return null;"],
  ['no beat dots',                               "reason = vowelGroups(word(st)) !== vowelGroups(r.plural) ? 'beats' : 'wrongEnding';", "reason = 'wrongEnding';"],
  ['a sixth holder',                             "var MAXH = 5;", "var MAXH = 6;"],
  ['the keys without the ending letters',        "    LEVELS.forEach(function (lv) { P.levels[lv].forEach(function (w) { if (w.cls === 'end') w.pEnd.split('').forEach(function (c) { set[c] = 1; }); }); });\n", ""],
  ['the next pass may start with the last round', "(prev.join() === o.join() || prev[prev.length - 1] === o[0])", "(prev.join() === o.join())"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 300000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ps-mut-'));
  fs.writeFileSync(path.join(dir, 'plate-stack-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'plate-stack-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PS_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-plate-stack: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
