#!/usr/bin/env node
/* =====================================================================
   mutate-question-lamp.js — does verify-question-lamp-core.js BITE?
   Run: node scripts/mutate-question-lamp.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN core first. CRLF collapsed
   before searching. (The lamp's swing, the beam and the cards as drawn are
   rendering properties, gated by local-test-question-lamp.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(MT, 'question-lamp-core.js'), 'utf8').replace(/\r\n/g, '\n');
const ACT = fs.readFileSync(path.join(MT, 'question-lamp-activity.js'), 'utf8');
const GATE = path.join(__dirname, 'verify-question-lamp-core.js');
const MUTATIONS = [
  ['the lamp moves when a key goes in',          "st.blank = kind; clearHelp(st); return true;", "st.blank = kind; clearHelp(st); st.lamp = lampTarget(st.r, kind); return true;"],
  ['the lamp always shines on the first card',   "function lampTarget(r, kind) { for (var i = 0; i < r.chunks.length; i++) if (r.chunks[i].k === kind) return i; return 'none'; }", "function lampTarget(r, kind) { for (var i = 0; i < r.chunks.length; i++) if (r.chunks[i].k === kind) return 0; return 'none'; }"],
  ['the lamp never finds nothing',               "if (r.chunks[i].k === kind) return i; return 'none'; }", "if (r.chunks[i].k === kind) return i; return 0; }"],
  ['any word is right',                          "      if (k !== r.ask) reason = st.lamp === 'none' ? 'none' : 'wrong';\n", ""],
  ['the asked key wears a different form',       "r.keys = KEYS_OF[level].map(function (k) { return { kind: k, form: C.forms[k] }; });", "r.keys = KEYS_OF[level].map(function (k) { return { kind: k, form: k === x.ask ? C.forms[k].toUpperCase() : C.forms[k] }; });"],
  ['an empty Check counts as a miss',            "      if (k === null) { st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }", "      if (k === null) { st.misses++; st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }"],
  ['a stranger word counts as a miss',           "      if (k === 'unknown') { st.last = { reason: 'unknown' }; return { ok: false, reason: 'unknown' }; }", "      if (k === 'unknown') { st.misses++; st.last = { reason: 'unknown' }; return { ok: false, reason: 'unknown' }; }"],
  ['the marks on the first miss',                "st.help = Math.min(2, st.tries);", "st.help = Math.min(2, st.tries + 1);"],
  ['any match card is right',                    "      if (st.placed !== r.right) reason = 'wrongCard';\n", ""],
  ['any tray is right',                          "if (st.trays[i] !== r.cards[i].k) wrong.push(i);", "if (false) wrong.push(i);"],
  ['a half-sorted board is checked',             "      if (n < r.cards.length) { st.last = { reason: 'notAll' }; return { ok: false, reason: 'notAll' }; }\n", ""],
  ['the l3 keys are only four',                  "l3: KINDS, l4: [],", "l3: ['who', 'what', 'where', 'when'], l4: [],"],
  ['the tour visits only the gold card',         "if (c.k !== 'verb' && r.keys.some(", "if (c.k === r.ask && r.keys.some("],
  ['a typed word ignores case and spaces',       "function norm(s) { return String(s || '').toLocaleLowerCase().replace(/[’']/g, '’').replace(/\\s+/g, ' ').trim(); }", "function norm(s) { return String(s || ''); }"],
  ['the next pass may start with the last round', "(prev.join() === o.join() || prev[prev.length - 1] === o[0])", "(prev.join() === o.join())"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 300000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ql-mut-'));
  fs.writeFileSync(path.join(dir, 'question-lamp-core.js'), SRC.replace(needle, () => repl));
  fs.writeFileSync(path.join(dir, 'question-lamp-activity.js'), ACT);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { QL_CORE_DIR: dir }), timeout: 30000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-question-lamp: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
