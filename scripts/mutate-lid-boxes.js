#!/usr/bin/env node
/* =====================================================================
   mutate-lid-boxes.js — does verify-lid-boxes-core.js BITE?
   Run: node scripts/mutate-lid-boxes.js — every mutation must be KILLED;
   a needle found other than once is a harness FAULT; the gate must be
   green on the CLEAN core first. CRLF collapsed before searching.
   (Drag, the bars and the popping lids are rendering properties, gated by
   local-test-lid-boxes.js.)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'lid-boxes-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-lid-boxes-core.js');
/* self-anchored data needles: read the live strings so a reformat cannot blind them */
const enWord = (w) => { const m = SRC.match(new RegExp("'" + w + "': '[^']*'")); if (!m) throw new Error('no en word ' + w); return m[0]; };
const MUTATIONS = [
  /* the design's list */
  ['lids pop by letter, not by sound (cat/kite)',  "p.same = A.keys[p.i] === B.keys[p.j];", "p.same = A.boxes[p.i] === B.boxes[p.j];"],
  ['a distractor sharing another place accepted',  "var hit = lid.filter(function (p) { return p.i === ai && p.same; }).length > 0;", "var hit = lid.filter(function (p) { return p.same; }).length > 0;"],
  ['the asked box pops for a non-match',           "pairs.forEach(function (p) { p.same = A.keys[p.i] === B.keys[p.j]; });", "pairs.forEach(function (p) { p.same = A.keys[p.i] === B.keys[p.j] || p.i === 0; });"],
  ['Task 2 accepts any box with a letter of the sound', "if (st.chosen === r.answer) {", "if (r.target.boxes[st.chosen].indexOf(r.card.charAt(0)) >= 0 || r.card.indexOf(r.target.boxes[st.chosen]) >= 0) {"],
  ['Task 3 sorted by spelling (sh set takes chick)', "'sh|sh|ship fish sheep brush|sock duck cup chick'", "'sh|sh|ship fish sheep chick|sock duck cup brush'"],
  ['box letters not from the bank (kite)',          enWord('kite'), enWord('kite').replace('k.i_e.t', 'k.i.t')],
  ['a counting task reintroduced',                  "TASKS = ['same', 'where', 'sort']", "TASKS = ['same', 'where', 'sort', 'count']"],
  ['the answer always in slot 1',                   "var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);", "var slots = []; for (var i = 0; i < n; i++) slots.push(1);"],
  ['the help at miss 1',                            "function helpOn(st) { return !st.done && st.show && st.help >= 2; }", "function helpOn(st) { return !st.done && st.show && st.help >= 1; }"],
  ['the help kept after a move',                    "function moved(st) { st.show = false; st.last = null; }", "function moved(st) { }"],
  ['pass 2 order = pass 1',                         "if (prev && prev.join() === o.join()) continue;", "void 0;"],
  /* found in this build */
  ['the middle faked in Italian',                   "it: {\n      pos: ['first', 'last'],", "it: {\n      pos: ['first', 'middle', 'last'],"],
  ['c and k as different sounds',                   enWord('cat'), enWord('cat').replace('|k a t|', '|c a t|')],
  ['the middle box compared across different lengths', "if (nA === nB) for (var m = 1; m < nA - 1; m++) pairs.push({ i: m, j: m, role: 'middle' });", "for (var m = 1; m < Math.min(nA, nB) - 1; m++) pairs.push({ i: m, j: m, role: 'middle' });"],
  ['a Check with nothing placed counted as a miss', "if (st.test < 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }", "if (st.test < 0) { st.misses++; st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }"],
  ['a mixed pool repeats a target',                 "if (r && out.length < 9 && !seen[r.target.word]) {", "if (r && out.length < 9) {"],
  ['a picture swapped for a refused drawing',       enWord('fig').replace(/fruits\/fig/, 'fruits/fig'), enWord('fig').replace('fruits/fig', 'At the Supermarket/plum')],
  ['the where answer counted once only (balance)',  "'u bus', 's sun', 'p map'", "'u bus', 'u sun', 'p map'"]
];
const clean = spawnSync(process.execPath, [GATE], { encoding: 'utf8', timeout: 600000 });
if (clean.status !== 0) { console.log('FAULT  the gate fails on the CLEAN core — fix it first\n' + clean.stdout.slice(-400) + clean.stderr.slice(-800)); process.exit(1); }
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1 || needle === repl) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lbx-mut-'));
  fs.writeFileSync(path.join(dir, 'lid-boxes-core.js'), SRC.replace(needle, () => repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { LBX_CORE_DIR: dir }), timeout: 300000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-lid-boxes: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
