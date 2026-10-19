#!/usr/bin/env node
/* =====================================================================
   mutate-type-case.js — does verify-type-case-core.js BITE?
   Run: node scripts/mutate-type-case.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT, never a skip.
   The design's list (§12) first, then the latch, the direction, the deal.
   CRLF collapsed before searching.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'type-case-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-type-case-core.js');
const MUTATIONS = [
  /* the design's list */
  ['a wrong sort accepted',                        "if (s.face === st.r.answer) { st.placed = id;", "if (true) { st.placed = id;"],
  ['the back shows the wrong pair',                "return isUpper(ch) ? ch.toLowerCase() : isLower(ch) ? ch.toUpperCase() : null; }", "return isUpper(ch) ? ch.toLowerCase() : isLower(ch) ? ch : null; }"],
  ['the press prints an empty slot',               "      if (!st.placed) { st.last = { result: 'empty' }; return st.last; }\n", ""],
  ['look-alikes pass with a copy unmarked',        "if (extra.length || missing.length) {", "if (extra.length || missing.length > 1) {"],
  ['in words accepts the count off by one',        "if (r.kind === 'words' && st.count !== want.length) {", "if (r.kind === 'words' && Math.abs(st.count - want.length) > 1) {"],
  ['a look-alike counted as the target',           "return st.stick.filter(function (s) { return s.face === r.target; })", "return st.stick.filter(function (s) { return sameLetter(s.face, r.target) || s.face === 'd'; })"],
  ['the answer always in slot 1',                  "var slot = (r.idx + pass) % 4,", "var slot = 0,"],
  ['the stick dealt in table order',               "for (var t = 0; t < 200; t++) { shuffle(chars, rnd); if (stickOk(chars, r.target)) break; }", "void 0;"],
  ['the Swedish poster missing Å',                 "sv: AZ.concat(['Å', 'Ä', 'Ö'])", "sv: AZ.concat(['Ä', 'Ö'])"],
  ['an old round dropped',                         "[\"m\", \"M\", \"NWH\"], [\"q\", \"Q\", \"OGC\"]],", "[\"m\", \"M\", \"NWH\"]],"],
  ['the showing kept after a new mark',            "s.marked = !s.marked; st.show = false; st.last = null; return true;", "s.marked = !s.marked; st.last = null; return true;"],
  /* the latch, the direction, the deal, the ladder */
  ['sorts flip before any miss',                   "function canFlip(st) { return !!(st.done || st.help >= 1); }", "function canFlip(st) { return true; }"],
  ['capital first never turns a round',            "if ((d === 'capital' && !givenUpper) || (d === 'small' && givenUpper))", "if (d === 'small' && givenUpper)"],
  ['all the targets in one half',                  "    if (!a || !b) return false;\n", ""],
  ['the words never re-dealt',                     "var ws = shuffle(r.words.map(function (w, k) { return k; }), rnd);", "var ws = r.words.map(function (w, k) { return k; });"],
  ['a wrong drop is no miss',                      "st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.bounced = id;", "st.show = true; st.bounced = id;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-mut-'));
  fs.writeFileSync(path.join(dir, 'type-case-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { TC_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-type-case: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
