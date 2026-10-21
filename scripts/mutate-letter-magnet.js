#!/usr/bin/env node
/* =====================================================================
   mutate-letter-magnet.js — does verify-letter-magnet-core.js BITE?
   Run: node scripts/mutate-letter-magnet.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The drag, the lift and the shiver are rendering properties, gated by
   local-test-letter-magnet.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'letter-magnet-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-letter-magnet-core.js');
const MUTATIONS = [
  ['a wrong picture lifts',                          "if (r.cards[ci].belongs === m) { st.hung[m].push(ci);", "if (r.cards[ci].belongs === m || r.cards[ci].belongs < 0) { st.hung[m].push(ci);"],
  ['the empty switch counts a miss',                 "if (!any) { st.show = true; st.last = { result: 'empty' };", "if (!any) { st.misses++; st.show = true; st.last = { result: 'empty' };"],
  ['right pictures fall back to the table',          "st.hung[m].push(ci); lifted.push", "lifted.push"],
  ['the help at miss 1',                             "st.help >= 2 && st.last", "st.help >= 1 && st.last"],
  ['the help kept after a move',                     "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['a hung picture can be moved',                    "if (w.hung !== undefined || w.zone === m) return false;", "if (w.zone === m) return false;"],
  ['done with hooks still empty',                    "if (empty.every(function (e) { return e === 0; })) { if (stayed.length)", "if (!stayed.length) { if (stayed.length)"],
  ['a picture that stayed down in a won round no miss', "if (stayed.length) st.misses++; st.done = true;", "st.done = true;"],
  ['one magnet pictures dealt in one row',           "if (bad) continue;", "void bad;"],
  ['the reshuffle may repeat the order',             "if (prev && prev.join() === o.join()) continue;", "void prev;"],
  ['levels shown below 7 rounds',                    "return LEVELS.filter(function (lv) { return rounds(loc, lv).length >= MIN_ROUNDS; });", "return LEVELS.slice();"],
  ['the strip drops a letter after the gap',         "after: word.slice(i + team.length) };", "after: word.slice(i + team.length + 1) };"],
  ['a read-and-match decoy pulled by the first word', "return card(loc, w, names.indexOf(w)); }) }; }", "return card(loc, w, Math.max(0, names.indexOf(w))); }) }; }"],
  ['an m word among the m distractors',              "'m|monkey mop map|nose sun fox'", "'m|monkey mop map|nose sun moose'"],
  ['ship hung on the ch magnet',                     "'sh ch th|ship:sh fish:sh", "'sh ch th|ship:ch fish:sh"],
  ['dog points at a B&W drawing',                    "'dog': 'animals/dog'", "'dog': 'animals bw/dog'"],
  ['the team hint never returned',                   "return r.read ? 'hintStayedRead' : team ? 'hintStayedTeam' : 'hintStayed';", "return r.read ? 'hintStayedRead' : 'hintStayed';"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lmg-mut-'));
  fs.writeFileSync(path.join(dir, 'letter-magnet-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LMG_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-letter-magnet: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
