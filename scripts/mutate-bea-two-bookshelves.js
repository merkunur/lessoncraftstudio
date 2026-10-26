#!/usr/bin/env node
/* =====================================================================
   mutate-bea-two-bookshelves.js — does verify-bea-two-bookshelves-core.js
   BITE? Run: node scripts/mutate-bea-two-bookshelves.js — every mutation
   must be KILLED; a needle found other than once is a harness FAULT (never
   skipped); the gate must be green on the CLEAN files first; the last
   needle is a control that must SURVIVE. CRLF collapsed.
   (What is DRAWN — the open book, the shelves, the ribbon, the shake, the pages laid open on the desk — is gated by local-test-bea-two-bookshelves.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const FILES = { core: 'bea-two-bookshelves-core.js', act: 'bea-two-bookshelves-activity.js' };
const SRC = { core: fs.readFileSync(path.join(MT, FILES.core), 'utf8').replace(/\r\n/g, '\n'), act: fs.readFileSync(path.join(MT, FILES.act), 'utf8').replace(/\r\n/g, '\n') };
const GATE = path.join(__dirname, 'verify-bea-two-bookshelves-core.js');
const MUTATIONS = [
  ['a story passes the shaker test', 'core', "function shakerTest(id) { return { upright: kindOf(id) === 'fact' }; }", "function shakerTest(id) { return { upright: true }; }"],
  ['a fact book passes the ribbon test', 'core', "function ribbonTest(id) { return { tied: kindOf(id) === 'story' }; }", "function ribbonTest(id) { return { tied: kindOf(id) !== 'nope' }; }"],
  ['the topic decides (Same topic accepts the twin)', 'core', 'var bad = tests.filter(function (t) { return !t.pass; });', "var bad = tests.filter(function (t) { return !t.pass && !(st.level === 'topic' && st.right && DATA.BOOKS[t.id].topic === DATA.BOOKS[st.right].topic); });"],
  ['the asked book always in the first slot', 'core', 'var SLOTS = { ask: [0, 1, 2, 0, 1, 2, 2, 1], topic: [1, 2, 0, 2, 0, 1, 0, 1] };', 'var SLOTS = { ask: [0, 0, 0, 0, 0, 0, 0, 0], topic: [0, 0, 0, 0, 0, 0, 0, 0] };'],
  ['a shaken book stays shaken after closing', 'core', "function close(st) { st.sel = null; st.shake = null; return 'closed'; }", "function close(st) { st.sel = null; return 'closed'; }"],
  ['a shake can leave the pages as they were', 'core', 'for (var k = 0; k < 50 && same(o, cur); k++) o = shuffle([0, 1, 2], rnd);\n    if (same(o, cur)) o = [cur[1], cur[2], cur[0]];', 'o = shuffle([0, 1, 2], rnd);'],
  ['the same order every pass', 'core', 'if (!same(c, prev)) { o = c; break; }', 'if (!same(c, prev)) { o = prev || c; break; }'],
  ['the slot table does not move with the pass', 'core', "return level === 'fill' ? pass % 4 : (SLOTS[level][r] + pass) % 3;", "return level === 'fill' ? 0 : SLOTS[level][r] % 3;"],
  ['Fill takes three books a shelf', 'core', "function capacity(st) { return st.level === 'fill' ? 2 : 1; }", "function capacity(st) { return st.level === 'fill' ? 3 : 1; }"],
  ['the help before miss 2', 'core', "return !st.done && st.show >= 2 && (st.last === 'storyOnShaker'", "return !st.done && st.show >= 1 && (st.last === 'storyOnShaker'"],
  ['a new move keeps the help', 'core', 'function moved(st) { st.last = null; st.wrong = []; }', 'function moved(st) { }'],
  ['a wrong book stays on the shelf', 'core', 'else { st.place[t.id] = null; }', 'else { }'],
  ['an empty Check counts a miss', 'core', "st.last = 'empty'; st.wrong = []; return { result: 'empty' };", "st.last = 'empty'; st.wrong = []; st.misses++; return { result: 'empty' };"],
  ['the other shelf takes a book', 'core', "if (st.ask && shelf !== shelfOf(st.ask)) return 'no';", ''],
  ['a fact page carries a sequence word', 'core', 'Bees drink sweet nectar from flowers.', 'Then bees drink sweet nectar from flowers.'],
  ['a story loses its ending', 'core', 'At last they curled up in a warm cave and snored.', 'They curled up in a warm cave and snored.'],
  ['a hint prints a digit', 'act', `en:"Put a book on Bea's story shelf."`, `en:"Put 1 book on Bea's story shelf."`],
  ['an unused variable (control)', 'core', "  var LEVELS = ['ask', 'topic', 'fill'];", "  var UNUSED_CONTROL = 0; var LEVELS = ['ask', 'topic', 'fill'];"]
];
const CONTROL = 'an unused variable (control)';
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN files — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0, controlOk = false;
for (const [name, which, needle, repl] of MUTATIONS) {
  const n = SRC[which].split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bs-mut-'));
  for (const k of Object.keys(FILES)) fs.writeFileSync(path.join(dir, FILES[k]), k === which ? SRC[k].replace(needle, () => repl) : SRC[k]);
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BS_CORE_DIR: dir, BS_ACT_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT', dead = !timedOut && r.status !== 0;
  if (name === CONTROL) { controlOk = !dead; console.log(`${dead ? 'FAULT  the control was killed' : 'control  survived (as it must)'} — ${name}`); if (dead) faults++; }
  else if (dead) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-bea-two-bookshelves: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length - 1} (+1 control: ${controlOk ? 'survived' : 'NOT OK'})`);
process.exit(survived || faults || !controlOk ? 1 : 0);
