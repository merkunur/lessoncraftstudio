#!/usr/bin/env node
/* =====================================================================
   mutate-music-box.js — does verify-music-box-core.js BITE?
   Run: node scripts/mutate-music-box.js — every mutation must be KILLED; a
   missed needle is a harness fault, never a skip. CRLF collapsed. 120 s cap.
   The first twelve are the design's list (§12); the rest guard the songs,
   the order, the help and the layout.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'music-box-core.js'), 'utf8').replace(/\r\n/g, '\n');
const GATE = path.join(__dirname, 'verify-music-box-core.js');
const MUTATIONS = [
  /* the design's list */
  ['the tempo not from the song',      "var d = (st.beats[i] || 1) * st.tempo;", "var d = (st.beats[i] || 1) * st.tempo * 8 / st.punched.length;"],
  ['bars ring in-round with At the end',  "return (st.explore || notes === 'go' || st.done) ? freq(st.level, k) : TOK;", "return freq(st.level, k);"],
  ['a wrong bar punches',                 "    st.wrong++; st.help = Math.min(2, st.wrong);", "    st.punched.push(k); st.wrong++; st.help = Math.min(2, st.wrong);"],
  ['a wrong tap advances',                "    st.last = { k: k, fact: f, diff: ans - k };", "    st.last = { k: k, fact: f, diff: ans - k }; st.pos++;"],
  ['a fact whose answer is not its note', "      out.push({ a: f.a, b: f.b, op: f.op });", "      out.push(n === 3 ? { a: 2, b: 2, op: '+' } : { a: f.a, b: f.b, op: f.op });"],
  ['a 0 result in the pool',              "      if (mode !== 'add' && a - b >= lo && a - b >= 1) out[a - b].push({ a: a, b: b, op: '-' });", "      if (mode !== 'add' && a - b >= lo && a - b >= 1) out[a - b].push({ a: a, b: b, op: '-' });\n      if (lo === 1 && a === b && a === 3) out[1].push({ a: 3, b: 3, op: '-' });"],
  ['the rods the wrong height',           "{ kept: [f.a - f.b], off: f.b, height: f.a - f.b }", "{ kept: [f.a], off: f.b, height: f.a }"],
  ['the crank before the strip is full',  "    if (!st.full && !(st.explore && st.punched.length)) return null;", "    if (!st.punched.length) return null;"],
  ['the pitch order reversed',            "to5: { 5: NOTE.C5, 4: NOTE.D5, 3: NOTE.E5, 2: NOTE.F5, 1: NOTE.G5 },", "to5: { 1: NOTE.C5, 2: NOTE.D5, 3: NOTE.E5, 4: NOTE.F5, 5: NOTE.G5 },"],
  ['add only leaks a − fact',             "      if (mode !== 'add' && a - b >= lo", "      if (a - b >= lo"],
  ['the old fact 5 − 2 missing',          "      if (mode !== 'add' && a - b >= lo && a - b >= 1) out[a - b].push", "      if (mode !== 'add' && a - b >= lo && a - b >= 1 && !(a === 5 && b === 2)) out[a - b].push"],
  ['the help stays after a tap',          "    st.help = 0; st.last = null;\n    if (k === ans) {", "    if (k === ans) {"],
  /* the songs */
  ['a wrong note in Frère Jacques',       "notes: [5, 4, 3, 5, 5, 4, 3, 5], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 420 },\n      { id: 'ode1'", "notes: [5, 4, 3, 2, 5, 4, 3, 5], beats: [1, 1, 1, 1, 1, 1, 1, 1], tempo: 420 },\n      { id: 'ode1'"],
  ['Twinkle a step out',                  "notes: [10, 10, 6, 6, 5, 5, 6]", "notes: [10, 10, 6, 6, 4, 4, 6]"],
  ['an add-only tune needing 1',          "{ id: 'moon1', song: 'moon', pic: ['space', 'moon'], notes: [5, 5, 5, 4, 3, 4]", "{ id: 'moon1', song: 'moon', pic: ['space', 'moon'], notes: [5, 5, 5, 4, 3, 1]"],
  ['a missing beat',                      "beats: [1, 1, 2, 1, 1, 2], tempo: 380 },\n      { id: 'row2'", "beats: [1, 1, 2, 1, 1], tempo: 380 },\n      { id: 'row2'"],
  ['the trombone as a picture',           "pic: ['music', 'trumpet'], notes: [3, 3, 2, 1, 1, 2, 3, 4]", "pic: ['music', 'trombone'], notes: [3, 3, 2, 1, 1, 2, 3, 4]"],
  ['facts never re-drawn',                "      var f = cands[Math.floor(rand() * cands.length)];", "      var f = cands[0];"],
  ['a fact repeated while unused remain', "      var cands = P[n].filter(function (f) { return !used[key(f)]; });", "      var cands = P[n];"],
  ['the same order twice',                "      if (prev && prev.length === n && prev.join(',') === a.join(',')) continue;", ""],
  ['a pass opens on the last seam',       "      if (a[0] === lastPrev) continue;", ""],
  ['the frame never opens at miss 2',     "  function frameOpen(st, asked) { return !!asked || st.help >= 2; }", "  function frameOpen(st, asked) { return !!asked; }"],
  ['miss 2 rods jump to the answer bar',  "function rodBar(st) { if (!st.last) return null; return st.last.k; }", "function rodBar(st) { if (!st.last) return null; return st.help >= 2 ? answerOf(st.last.fact) : st.last.k; }"],
  ['subtraction counts the crossed ones', "return { key: st.last.fact.op === '-' ? 'hintCountLeft' : 'hintCount', wrong: true };", "return { key: 'hintCount', wrong: true };"],
  ['ten bars in one row on phones',       "    L.rows = n === 10 && W < 600 ? 2 : 1;", "    L.rows = 1;"],
  ['phone pictures below 64',             "    L.pic = W >= 600 ? 96 : 64;", "    L.pic = W >= 600 ? 96 : 56;"],
  ['the Music box holds 13',              "  var PLAY_MAX = 12;", "  var PLAY_MAX = 13;"]
];
let killed = 0, survived = 0, faults = 0;
for (const [name, needle, repl] of MUTATIONS) {
  const n = SRC.split(needle).length - 1;
  if (n !== 1) { faults++; console.log(`FAULT  needle found ${n}× — "${name}"`); continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-mut-'));
  fs.writeFileSync(path.join(dir, 'music-box-core.js'), SRC.replace(needle, repl));
  const r = spawnSync(process.execPath, [GATE], { env: Object.assign({}, process.env, { MB_CORE_DIR: dir }), timeout: 120000, encoding: 'utf8' });
  const timedOut = r.error && r.error.code === 'ETIMEDOUT';
  if (!timedOut && r.status !== 0) { killed++; console.log(`killed    ${name}`); } else { survived++; console.log(`SURVIVED  ${name}${timedOut ? ' (timed out)' : ''}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`mutate-music-box: ${killed} killed, ${survived} survived, ${faults} harness faults of ${MUTATIONS.length}`);
process.exit(survived || faults ? 1 : 0);
