#!/usr/bin/env node
/* =====================================================================
   mutate-blend-magnets.js — does verify-blend-magnets-core.js BITE?
   Run: node scripts/mutate-blend-magnets.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The rail drag, the stretch line, the fridge and the magnet test's
   animation are rendering properties, gated by local-test-blend-magnets.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'blend-magnets-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-blend-magnets-core.js');
const MUTATIONS = [
  /* the design's list */
  ['Check accepted without snapping',          "if (!whole(st)) { st.show = true; st.last = { result: 'snap' }; return { ok: false, kase: 'snap' }; }\n", ""],
  ['the rhyme accepted',                       "if (p.role === 'target') {", "if (p.role !== 'onset') {"],
  ['the same-onset picture accepted',          "if (p.role === 'target') {", "if (p.role !== 'rhyme') {"],
  ['the pull zone ignored in gentle mode',     "var PULL = { strong: 0.22, gentle: 0.07 };", "var PULL = { strong: 0.22, gentle: 0.22 };"],
  ['the target always in the middle slot',     "var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);", "var slots = []; for (var i = 0; i < n; i++) slots.push(1);"],
  ['the rhyme always beside the target',       "var rh = t === 1 ? other[Math.floor(rnd() * 2)] : (adj ? 1 : (t === 0 ? 2 : 0));", "var rh = t === 1 ? other[Math.floor(rnd() * 2)] : 1;"],
  ['the first letters shown at miss 1',        "function helpOn(st) { return !st.done && st.show && st.help >= 2; }", "function helpOn(st) { return !st.done && st.show && st.help >= 1; }"],
  ['the help kept after a move',               "function moved(st) { st.show = false; st.last = null; st.test = null; }", "function moved(st) { st.test = null; }"],
  ['pass 2 order = pass 1',                    "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  ['ck split into two sound magnets',          "'s·u·n b·u·n s·o·ck'", "'s·u·n b·u·n s·o·c·k'"],
  /* found in this build */
  ['parts attract anywhere, not in place',     "attract: p.parts[i] !== undefined && p.parts[i] === r.parts[i] }", "attract: p.parts[i] !== undefined && r.parts.indexOf(p.parts[i]) >= 0 }"],
  ['a snapped pair cannot be pulled apart',    "st.gaps[i] = 0.5; if (!st.done) moved(st); return true; }", "return false; }"],
  ['a new choice keeps the old help',          "st.chosen = slot; moved(st); return true; }", "st.chosen = slot; return true; }"],
  ['the pause dots not tied to the gap',       "function dots(g) { return Math.round(g * 6); }", "function dots(g) { return 3; }"],
  ['a struck drawing (the cake slice) back',   "'kakku': '4th of July/cake'", "'kakku': 'At the Supermarket/cake'"],
  ['the German capital lost',                  "return loc === 'de' ? w.charAt(0).toUpperCase() + w.slice(1) : w;", "return w;"],
  ['the rhyme partner swapped for an unrelated word', "'hat cat ham'", "'hat bus ham'"],
  ['a Level 1 round dropped in fr',            "'main pain moto', ", ""],
  ['the Level 2 miss count wrong',             "var stick = t.filter(function (x) { return x.attract; }).length, kase;", "var stick = t.length, kase;"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first'); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bmg-mut-'));
  fs.writeFileSync(path.join(dir, 'blend-magnets-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BMG_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-blend-magnets: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
