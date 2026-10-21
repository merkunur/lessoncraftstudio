#!/usr/bin/env node
/* =====================================================================
   mutate-picture-bingo.js — does verify-picture-bingo-core.js BITE?
   Run: node scripts/mutate-picture-bingo.js — every mutation must be
   KILLED; a needle found other than once is a harness FAULT; the gate
   must be green on the CLEAN core first. CRLF collapsed before searching.
   (The flip, the chip and the narrow transpose are rendering properties,
   gated by local-test-picture-bingo.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'picture-bingo-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-picture-bingo-core.js');
const MUTATIONS = [
  ['a wrong chip flips the square',                 "if (st.chip === r.sq) {", "if (st.chip === r.sq || st.chip !== null) {"],
  ['Check with no chip counts a miss',              "if (st.chip === null) { st.show = true; st.last = { result: 'empty' };", "if (st.chip === null) { st.misses++; st.show = true; st.last = { result: 'empty' };"],
  ['the right square pulses at miss 2',             "pulse: st.help >= 3 ? st.r.sq : -1", "pulse: st.help >= 2 ? st.r.sq : -1"],
  ['miss 2 leaves only the right word lit',         "return [right.i].concat(others.slice(0, 2).map(function (s) { return s.i; }));", "return [right.i];"],
  ['miss 2 compares random words, not the nearest', "return dist(a.word, right.word) - dist(b.word, right.word) || a.i - b.i;", "return a.i - b.i;"],
  ['a flipped square takes a chip again',           "if (i < 0 || i >= c.sq.length || st.cs.flipped.indexOf(i) >= 0) return false;", "if (i < 0 || i >= c.sq.length) return false;"],
  ['a line counted before it is full',              "return L.indexOf(r.sq) >= 0 && L.every(", "return L.indexOf(r.sq) >= 0 && L.some("],
  ['the card full while a call is left',            "return s.called; }).every(function (s) { return st.cs.flipped", "return s.called; }).some(function (s) { return st.cs.flipped"],
  ['accents ignored in the diff',                   "if (low(a[i]) !== low(b[i])) glow.push(i);", "if (low(a[i]).normalize('NFD')[0] !== low(b[i]).normalize('NFD')[0]) glow.push(i);"],
  ['the order may call one row twice in a row',     "cand = ys.filter(function (y) { return String(y) !== String(prevRow); });", "cand = ys;"],
  ['the next pass may repeat the order',            "if (prev && prev.join() === o.join()) continue;", ""],
  ['You call: Bingo covers a look-alike as BINGO',  "if (at === yc.pos) {", "if (at === yc.pos || at >= 0) {"],
  ['You call: the needed card always first',        "h.push(s === slots[k] ? r.need : others[oi++]);", "h.push(s === 0 ? r.need : others[oi++]);"],
  ['You call: a decoy on the chipped line',         "var off = []; for (var j = 0; j < 9; j++) if (line.indexOf(j) < 0) off.push(j);", "var off = []; for (var j = 0; j < 9; j++) if (j !== pos) off.push(j);"],
  ['You call: the picture always in the middle',    "var all = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8], seeded('pos' + (seed || '') + Math.floor(pass / 2)))", "var all = [4, 4, 4, 4, 4, 4, 4, 4, 4]"],
  ['a level with 6 calls is shown',                 "var MIN_ROUNDS = 7;", "var MIN_ROUNDS = 6;"],
  ['Bingo drawn as the call picture',               "var BINGO_PIC = 'farm animals/dog';", "var BINGO_PIC = 'animals/dog';"],
  ['a word with no library picture called (it pazza)', "'*tazza *gazza pazza", "'*tazza *gazza *pazza"],
  ['a library word left over (fr char)',             "'*chat chut *chou", "'*chat char *chou"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 900000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pbg-mut-'));
  fs.writeFileSync(path.join(dir, 'picture-bingo-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { PBG_CORE_DIR: dir }), timeout: 600000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-picture-bingo: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
