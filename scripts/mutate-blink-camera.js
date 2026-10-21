#!/usr/bin/env node
/* =====================================================================
   mutate-blink-camera.js — does verify-blink-camera-core.js BITE?
   Run: node scripts/mutate-blink-camera.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The iris, the flip and the album are rendering properties, gated by
   local-test-blink-camera.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'blink-camera-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-blink-camera-core.js');
const MUTATIONS = [
  ['the cards show while the shutter is open',       "function visible(st) { return st.up && !st.open; }", "function visible(st) { return st.up; }"],
  ['snapping again counts a miss',                    "st.open = true; st.snaps++; return true;", "st.open = true; st.snaps++; st.misses += st.snaps > 1 ? 1 : 0; return true;"],
  ['the photo at miss 1',                             "return !st.done && st.show && st.help >= 2 && !!st.last", "return !st.done && st.show && st.help >= 1 && !!st.last"],
  ['the word always in slot 1',                       "out.push(s === slots[k] ? r.target : looks[li++]);", "out.push(s === 0 ? r.target : looks[li++]);"],
  ['the story count ignores capitals',                "return tk.word && !tk.elided && same(tk.t, target); }).length;", "return tk.word && !tk.elided && tk.t === target; }).length;"],
  ['«they» accepted as «the»',                        "var tk = r.tokens[i]; return !!(tk && tk.word && !tk.elided && same(tk.t, r.target));", "var tk = r.tokens[i]; return !!(tk && tk.word && !tk.elided && low(tk.t).indexOf(low(r.target)) === 0);"],
  ['an elided l’ counted as «la»',                    "return tk.word && !tk.elided && same(tk.t, target); }).length;", "return tk.word && same(tk.t.replace(/['’]$/, 'a'), target); }).length;"],
  ['the count accepts copies ± 1',                    "if (st.count === copiesAt(st).length) {", "if (Math.abs(st.count - copiesAt(st).length) <= 1) {"],
  ['the help kept after a move',                      "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['brackets on look-alikes stay',                    "st.brackets = st.brackets.filter(function (i) { return wrong.indexOf(i) < 0; });", "void wrong;"],
  ['a found grid counts a miss',                      "if (r.game === 'hunt') { st.phase = 'count'; st.show = true;", "if (r.game === 'hunt') { st.phase = 'count'; st.misses++; st.show = true;"],
  ['the blink never lengthens after a miss',          "return BLINKS[LADDER[Math.min(LADDER.length - 1, i + (misses || 0))]];", "return BLINKS[LADDER[i]];"],
  ['the capital glow at miss 2 too',                  "return !st.done && st.show && st.help === 1 && st.last", "return !st.done && st.show && st.help >= 1 && st.last"],
  ['miss 1 keeps the wrong card chosen',              "if (st.help < 2) st.chosen = null;", "void 0;"],
  ['a row may hold every copy',                       "if (lineHasAll(set, 4, r.copies) || lineHasAll(set, 3, r.copies)) continue;", "void lineHasAll;"],
  ['no grid with 3 copies',                           "var COPIES = [4, 5, 3, 4, 3, 5, 4, 3];", "var COPIES = [4, 5, 4, 4, 4, 5, 4, 4];"],
  ['a look-alike set the letter-sharing bot reads',   "'and|an hand band'", "'and|an end said'"],
  ['a set the first letter solves',                   "'ist|im isst fast'", "'ist|Ast Mist fast'"],
  ['a story picture in black and white',              "'animals/cat|The cat was on the bed.", "'animals bw/cat|The cat was on the bed."],
  ['a story with the word in one place only',         "Go, bus, go! We got on the bus. Do we go to the park?", "We go on the bus. We got on it. Do we go to the park?"],
  ['the count step offered before the grid is found', "function pickCount(st, n) { if (st.done || st.phase !== 'count' ||", "function pickCount(st, n) { if (st.done ||"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bcm-mut-'));
  fs.writeFileSync(path.join(dir, 'blink-camera-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { BCM_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-blink-camera: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
